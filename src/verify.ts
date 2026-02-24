import { execa } from "execa";
import chalk from "chalk";
import type { Tool } from "./catalog.js";

export type VerifyResult = {
  id: string;
  name: string;
  installed: boolean;
  version: string;
};

async function checkTool(tool: Tool): Promise<VerifyResult> {
  try {
    const [cmd, ...args] = tool.verify.split(" ");
    const result = await execa(cmd, args, { timeout: 5000 });
    const version = result.stdout.split("\n")[0].trim();
    return { id: tool.id, name: tool.name, installed: true, version };
  } catch {
    return { id: tool.id, name: tool.name, installed: false, version: "" };
  }
}

export async function verifyTools(tools: Tool[]): Promise<VerifyResult[]> {
  return Promise.all(tools.map(checkTool));
}

export function printVerifyResults(results: VerifyResult[]): void {
  const maxName = Math.max(...results.map((r) => r.name.length));

  for (const r of results) {
    const name = r.name.padEnd(maxName);
    if (r.installed) {
      console.log(`  ${chalk.green("✓")} ${name}  ${chalk.dim(r.version)}`);
    } else {
      console.log(`  ${chalk.red("✗")} ${name}  ${chalk.red("not found")}`);
    }
  }

  const installed = results.filter((r) => r.installed).length;
  const total = results.length;
  console.log();
  console.log(
    installed === total
      ? chalk.green(`  All ${total} tools installed.`)
      : chalk.yellow(`  ${installed}/${total} tools installed.`),
  );
}

export function verifyResultsToJson(
  results: VerifyResult[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const r of results) {
    if (r.installed) out[r.id] = r.version;
  }
  return out;
}
