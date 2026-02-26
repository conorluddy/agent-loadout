import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateBrewfileFromCatalog } from "../src/catalog.js";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const OUTPUT = join(ROOT, "Brewfile");

const content = generateBrewfileFromCatalog();
await writeFile(OUTPUT, content);
console.log(`Brewfile written to ${OUTPUT}`);
