import { readFile, writeFile } from "node:fs/promises";
import chalk from "chalk";
import { paths, ensureDir } from "./paths.js";

export type Receipt = {
  selections: string[];
  installed: Record<string, string>;
  timestamp: string;
};

export async function readReceipt(): Promise<Receipt | null> {
  try {
    const raw = await readFile(paths.receipt, "utf-8");
    return JSON.parse(raw) as Receipt;
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log(
        chalk.yellow(
          "  Warning: ~/.agent-loadout/receipt.json is corrupted. Ignoring.",
        ),
      );
    }
    return null;
  }
}

export async function writeReceipt(receipt: Receipt): Promise<void> {
  await ensureDir();
  await writeFile(paths.receipt, JSON.stringify(receipt, null, 2) + "\n");
}
