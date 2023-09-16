const patterns: Record<string, RegExp> = {
    "#": /[0-9]/,
    A: /[a-z]/i,
    N: /[a-z0-9]/i,
    X: /./
};

export function registerPattern(key: string, pattern: RegExp): void {
    patterns[key] = pattern;
}

export function removePattern(key: string): void {
    delete patterns[key];
}

export type Mask =
    | string
    | Array<string | RegExp>
    | ((v: string) => Array<string | RegExp>);

export function parseMask(mask: Mask): Mask {
    if (typeof mask === "function") return mask;
    let mustEscape = false;
    return (Array.isArray(mask) ? mask : `${mask}`.split(""))
        .map(item => {
            if (item instanceof RegExp) {
                return item;
            } else {
                if (mustEscape) {
                    mustEscape = false;
                    return item;
                } else {
                    if (item == "!") {
                        mustEscape = true;
                        return "";
                    } else {
                        return patterns[item] || item;
                    }
                }
            }
        })
        .filter(Boolean);
}
