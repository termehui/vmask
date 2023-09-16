import { Mask, parseMask } from "./options";
import { conformToMask } from "text-mask-core";
export function mask(
    input: string,
    mask: Mask,
    options: Record<string, unknown> | null = null
): string {
    const { conformedValue } = conformToMask(
        input,
        parseMask(mask),
        options || { guide: false }
    );
    return conformedValue;
}

export function unMask(input: string, m: Mask): string {
    const _mask = typeof m === "function" ? parseMask(m(input)) : parseMask(m);
    if (!_mask || !_mask.length || typeof _mask === "function") return input;
    return mask(input, _mask)
        .split("")
        .map((v, index) => {
            if (_mask[index] && !(_mask[index] instanceof RegExp)) {
                return "";
            } else {
                return v;
            }
        })
        .filter(Boolean)
        .join("");
}
