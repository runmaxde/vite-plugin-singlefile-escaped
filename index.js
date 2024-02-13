import fs from "fs";
import jsesc from "jsesc";

/**
 * Will escape the single file HTML based on an optional config -- for config see also jsecs docs https://www.npmjs.com/package/jsesc#api
 * @param {string} wrapBefore
 * @param {string} wrapAfter
 * @param {{numbers: "binary" | "octal" | "decimal" | "hexadecimal", quotes: "double" | "backstick" | "single", wrap: boolean, es6: boolean, escapeEverything: boolean, minimal: boolean, isScriptContext: boolean, compact: boolean, indent: string, indentLevel:  number, json: boolean, lowercaseHex: boolean}} config
 * @returns () => void
 */

export default function viteSingleFileEscaped(
  wrapBefore,
  wrapAfter,
  {
    numbers,
    quotes,
    wrap,
    es6,
    escapeEverything,
    minimal,
    isScriptContext,
    compact,
    indent,
    indentLevel,
    json,
    lowercaseHex,
  }
) {
  const config = {};
  if (numbers) config.numbers = numbers;
  if (quotes) config.quotes = quotes;
  if (wrap) config.wrap = wrap;
  if (es6) config.es6 = es6;
  if (escapeEverything) config.escapeEverything = escapeEverything;
  if (minimal) config.minimal = minimal;
  if (isScriptContext) config.isScriptContext = isScriptContext;
  if (compact) config.compact = compact;
  if (indent) config.indent = indent;
  if (indentLevel) config.indentLevel = indentLevel;
  if (json) config.json = json;
  if (lowercaseHex) config.lowercaseHex = lowercaseHex;
  return {
    name: " vite-plugin-singlefile-escaped",
    writeBundle(_, bundle) {
      // Assuming there's only one output file from vite-plugin-singlefile
      const fileName = Object.keys(bundle)[0];
      const filePath = `./dist/${fileName}`;

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the file:", err);
          return;
        }

        // Use string-escape to escape the file content
        const escapedContent = jsesc(data, { ...config });

        // Wrap if needed
        const wrapBeforeClean = wrapBefore ? wrapBefore : "";
        const wrapAfterClean = wrapAfter ? wrapAfter : "";
        const wrappedContent =
          wrapBeforeClean + escapedContent + wrapAfterClean;

        // Write the modified content back to the file or a new file
        fs.writeFile(filePath, wrappedContent, "utf8", (writeErr) => {
          if (writeErr) {
            console.error("Error writing the file:", writeErr);
          }
        });
      });
    },
  };
}
