import { Command } from "commander";
import chalk from "chalk";
import { PRESETS, TOOLS, getToolsByIds } from "./catalog.js";
import type { PresetId } from "./catalog.js";
import {
  checkBrewInstalled,
  generateBrewfile,
  writeBrewfile,
  runBrewBundle,
} from "./brew.js";
import {
  checkNpmInstalled,
  getNpmInstallCommand,
  runNpmInstall,
} from "./npm.js";
import {
  verifyTools,
  printVerifyResults,
  verifyResultsToJson,
} from "./verify.js";
import { writeReceipt, readReceipt } from "./receipt.js";
import {
  selectPresets,
  selectTools,
  printPreview,
  confirmInstall,
} from "./ui.js";
import { writeSkills } from "./skills.js";

const program = new Command();

program
  .name("agent-loadout")
  .description("One command to load out your terminal for agentic coding")
  .version("0.1.0");

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log(chalk.dim("\n  Cancelled."));
  process.exit(0);
});

// ── Default command: install ────────────────────────────

program
  .command("install", { isDefault: true })
  .description("Install tools (interactive by default)")
  .option("--preset <presets...>", "Install specific presets without prompts")
  .option("--all", "Install everything")
  .option("--apply", "Actually run the install (default is preview only)")
  .action(async (opts) => {
    // Check brew
    const hasBrew = await checkBrewInstalled();
    if (!hasBrew) {
      console.log(chalk.red("Homebrew is required but not installed."));
      console.log(
        chalk.dim(
          'Install it: https://brew.sh  →  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
        ),
      );
      process.exit(1);
    }

    let tools;

    if (opts.all) {
      tools = TOOLS;
    } else if (opts.preset) {
      const rawIds = opts.preset as string[];
      const validIds = PRESETS.map((p) => p.id);
      const invalid = rawIds.filter((p) => !validIds.includes(p as PresetId));
      if (invalid.length > 0) {
        console.log(
          chalk.red(
            `Unknown preset${invalid.length > 1 ? "s" : ""}: ${invalid.map((p) => `'${p}'`).join(", ")}. Available: ${validIds.join(", ")}`,
          ),
        );
        process.exit(1);
      }
      const presetIds = rawIds as PresetId[];
      tools = TOOLS.filter((t) => presetIds.includes(t.preset));
    } else {
      // Interactive flow
      const presetIds = await selectPresets();
      if (presetIds.length === 0) {
        console.log(chalk.dim("No presets selected. Nothing to install."));
        return;
      }
      tools = await selectTools(presetIds);
      if (tools.length === 0) {
        console.log(chalk.dim("No tools selected. Nothing to install."));
        return;
      }
    }

    // Preview
    printPreview(tools);

    // Non-interactive modes need --apply
    if (!opts.apply && (opts.all || opts.preset)) {
      console.log(
        chalk.yellow("Dry run — add --apply to install. Example:"),
      );
      console.log(
        chalk.dim(
          `  npx agent-loadout install ${opts.all ? "--all" : `--preset ${(opts.preset as string[]).join(" ")}`} --apply`,
        ),
      );
      return;
    }

    // Interactive mode: ask to confirm
    if (!opts.all && !opts.preset) {
      const proceed = await confirmInstall();
      if (!proceed) {
        console.log(chalk.dim("Cancelled."));
        return;
      }
    }

    // Check npm if needed
    const npmPackages = getNpmInstallCommand(tools);
    if (npmPackages.length > 0) {
      const hasNpm = await checkNpmInstalled();
      if (!hasNpm) {
        console.log(
          chalk.yellow(
            `npm is required for: ${npmPackages.join(", ")}. Skipping npm packages (install Node.js to include them).`,
          ),
        );
      }
    }

    // Install
    console.log();
    const brewfile = generateBrewfile(tools);
    if (brewfile) {
      console.log(chalk.bold("Installing brew packages..."));
      await writeBrewfile(brewfile);
      await runBrewBundle();
    }

    if (npmPackages.length > 0 && (await checkNpmInstalled())) {
      console.log(chalk.bold("Installing npm globals..."));
      await runNpmInstall(npmPackages);
    }

    // Verify
    console.log();
    console.log(chalk.bold("Verifying..."));
    const results = await verifyTools(tools);
    printVerifyResults(results);

    // Write skills
    const skillCount = await writeSkills(tools);
    if (skillCount > 0) {
      console.log(
        chalk.dim(`\n  ${skillCount} skill files written to ~/.claude/skills/`),
      );
    }

    // Write receipt
    await writeReceipt({
      selections: tools.map((t) => t.id),
      installed: verifyResultsToJson(results),
      timestamp: new Date().toISOString(),
    });
    console.log(chalk.dim("  Receipt saved to ~/.agent-loadout/receipt.json"));
  });

// ── Verify command ──────────────────────────────────────

program
  .command("verify")
  .alias("doctor")
  .description("Check which tools are installed")
  .option("--json", "Output as JSON")
  .action(async (opts) => {
    const receipt = await readReceipt();
    const toolIds = receipt?.selections ?? TOOLS.map((t) => t.id);
    const tools = getToolsByIds(toolIds);

    const results = await verifyTools(tools);
    const installed = results.filter((r) => r.installed).length;
    const allInstalled = installed === results.length;

    if (opts.json) {
      console.log(
        JSON.stringify(
          {
            ok: allInstalled,
            installed,
            total: results.length,
            tools: results,
          },
          null,
          2,
        ),
      );
    } else {
      printVerifyResults(results);
    }

    process.exit(allInstalled ? 0 : 1);
  });

// ── List command ────────────────────────────────────────

program
  .command("list")
  .description("Print the tool catalog")
  .option("--json", "Output as JSON")
  .action((opts) => {
    if (opts.json) {
      console.log(JSON.stringify({ presets: PRESETS, tools: TOOLS }, null, 2));
      return;
    }

    for (const preset of PRESETS) {
      const marker = preset.defaultOn ? chalk.green("●") : chalk.dim("○");
      console.log(
        `\n${marker} ${chalk.bold(preset.name)} — ${preset.description}`,
      );
      const presetTools = TOOLS.filter((t) => t.preset === preset.id);
      const maxName = Math.max(...presetTools.map((t) => t.name.length));
      for (const t of presetTools) {
        const method =
          t.installMethod === "npm" ? chalk.cyan("npm") : chalk.yellow("brew");
        console.log(
          `    ${t.name.padEnd(maxName)}  ${method}  ${chalk.dim(t.description)}`,
        );
      }
    }
    console.log();
  });

program.parse();
