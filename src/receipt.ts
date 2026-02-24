import { readFile, writeFile } from "node:fs/promises";
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
  } catch {
    return null;
  }
}

export async function writeReceipt(receipt: Receipt): Promise<void> {
  await ensureDir();
  await writeFile(paths.receipt, JSON.stringify(receipt, null, 2) + "\n");
}
