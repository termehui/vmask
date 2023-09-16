import { ObjectDirective } from "@vue/runtime-core";
import { createTextMaskInputElement } from "text-mask-core";
import { parseMask } from "./options";

const records = new Map<HTMLInputElement, any>();
const attachMasker = (el: HTMLInputElement, options: any): any => {
    const { parseOptions } = useUtils();
    const _options = parseOptions(options);
    const instance = createTextMaskInputElement({
        inputElement: el,
        mask: _options.mask,
        ...(_options.options || {})
    });
    records.set(el, instance);
    instance.update();
    return instance;
};

/**
 * Clear input value by escape key
 */
export const vMask: ObjectDirective<any> = {
    mounted(el, { value }) {
        const { findInput } = useUtils();
        const _el = findInput(el);
        _el && attachMasker(_el, value);
    },
    updated(el, { oldValue, value }) {
        const { findInput } = useUtils();
        const _el = findInput(el);
        if (!_el) return;
        if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
            attachMasker(_el, value);
        } else {
            const instance = records.get(_el);
            instance && instance.update();
        }
        _el.dispatchEvent(
            new Event("input", { bubbles: true, cancelable: true })
        );
    },
    beforeUnmount(el) {
        const { findInput } = useUtils();
        const _el = findInput(el);
        _el && records.delete(_el);
    }
};

function useUtils() {
    function findInput(el: any): HTMLInputElement | null {
        return el instanceof HTMLInputElement
            ? el
            : el.querySelector("input") || null;
    }
    function parseOptions(v: any) {
        const def = { mask: "", options: { guide: false } };
        const options = v.mask ? v : { mask: v };
        options.mask = parseMask(options.mask);
        return Object.assign(def, options);
    }
    return { findInput, parseOptions };
}
