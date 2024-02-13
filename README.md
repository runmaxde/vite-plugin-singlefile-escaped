# vite-plugin-singlefile-escaped

This Vite plugin allows you to escape the output of `vite-plugin-singlefile` and optionally wrap it with custom strings before and after. It uses `jsesc` to escape the content, making it safe for embedding in specific environments or as part of a larger string.
Installation

`npm install vite-plugin-singlefile-escaped --save-dev`

or if you prefer using Yarn:

`yarn add vite-plugin-singlefile-escaped --dev`

## Usage

To use `vite-plugin-singlefile-escaped` in your Vite project, import it into your `vite.config.js` or `vite.config.ts` and add it to the `plugins` array. You also need to have `vite-plugin-singlefile` installed and configured, as this plugin works on its output.

```js
// vite.config.js
import { viteSingleFile } from "vite-plugin-singlefile";
import viteSingleFileEscaped from 'vite-plugin-singlefile-escaped';

export default {
  plugins: [
    viteSingleFile(),
    viteSingleFileEscaped()
  ],
};
```

## Configuration

`viteSingleFileEscaped` accepts two optional parameters to customize the wrapping of the escaped content

```js
function viteSingleFileEscaped(wrapBefore: string, wrapAfter: string): void
```
- wrapBefore: A string to prepend before the escaped content.
- wrapAfter: A string to append after the escaped content.

If not provided, these parameters default to an empty string, meaning no wrapping will be applied beyond escaping the content.
Example

Here is an example configuration that escapes the entire output of your single-file bundle and wraps it in a JavaScript log function:

```js
// vite.config.js
import { viteSingleFile } from "vite-plugin-singlefile";
import viteSingleFileEscaped from 'vite-plugin-singlefile-escaped';

export default {
  plugins: [
    viteSingleFile(),
    viteSingleFileEscaped('console.log("', ');')
  ],
};
```

```js
// dist/<???.html>
console.log("<ESCAPED_CODE_PLACEHOLDER>");
```

This setup escapes the single-file output and wraps it with `console.log("` at the beginning and `");` at the end, making it ready to be logged directly to the console as part of a larger script or debugging tool.

## License

This plugin is open-sourced software licensed under the MIT license.
