# vMask

Input and text mask library for vue 3 (based on [text-mask-core](https://www.npmjs.com/package/text-mask-core)).

## Installation

### CDN

this package published as `vMask` module in umd.

```html
<script src="https://unpkg.com/@termehui/vmask"></script>
```

### NPM

```bash
npm i @termehui/vmask
```

## Patterns

You can use regex array as mask (like text-mask-core). For easy usage you can use string patterns instead of regex array.
Pattern characters are helper character for easily define pattern.

You can pass string, regex array or function as mask input. All following types are valid:

```ts
mask("12345", "###-##");
mask("12345", [/\d/, /\d/, /\d/, "-", /\d/, /\d/]);
mask("12345", (v:string) => { ... });
```

Predefined patterns is:

| Character | RegExp        | Description                                                      |
| :-------- | :------------ | :--------------------------------------------------------------- |
| `"#"`     | `/[0-9]/`     | match number                                                     |
| `"A"`     | `/[a-z]/i`    | match any alpha character (uppercase and lowercase)              |
| `"N"`     | `/[a-z0-9]/i` | match any alpha character and number (uppercase and lowercase)   |
| `"X"`     | `/./`         | match any character                                              |
| `"!"`     | `-`           | escape next character (use before pattern characters. e.g. `!#`) |

### registerPattern

Register new pattern character.

```ts
// Signature:
registerPattern(key: string, pattern: RegExp): void;

// Example:
registerPattern("$", /\d/);
```

### removePattern

Remove registered pattern.

```ts
// Signature:
removePattern(key: string): void;
// Example:
registerPattern("$");
```

## Functions

### mask

Mask string by pattern. Mask function accept [`conformToMask`](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) methods config.

```ts
// Signature:
mask(input: string, mask: Mask, options: Object = null): string;

// Example:
mask("123456", "####-##"); // 1234-56
```

### unMask

Get raw string from masked string.

```ts
// Signature:
unMask(input: string, mask: Mask): string;

// Example:
unMask("1234-56", "####-##"); // 123456
```

## Directive

**Caution**: directive only work on input with `v-model`!

```ts
import { vMask } from "@termehui/vmask";
app.directive("mask", vMask);
```

### Options

You can pass only mask or mask and options as vMask directive parameter. vMask directive accept [`createTextMaskInputElement`](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) options.

```html
<input v-mask="'####-##'" />
<input v-mask="{ mask: '####-##', options: { guide: true} }" />
```
