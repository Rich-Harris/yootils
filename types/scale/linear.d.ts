/**
 * Generates a `scale` function that maps from `domain` to `range`.
 * `scale.inverse()` returns a function that maps from `range` to `domain`
 * @param {[number, number]} domain
 * @param {[number, number]} range
 */
export default function linear(domain: [number, number], range: [number, number]): {
    (num: number): number;
    inverse(): any;
};
