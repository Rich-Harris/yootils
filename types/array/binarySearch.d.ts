/**
 * @template T
 * @param {T[]} array
 * @param {number} search
 * @param {Comparator<T>} [fn]
 */
export default function binarySearch<T>(array: T[], search: number, fn?: Comparator<T>): number;
/**
 * <T=any>
 */
export type Comparator<T> = (item: T, needle?: number) => number;
