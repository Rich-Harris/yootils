/**
 * @typedef {{
 *   fulfil: (value?: any) => void;
 *   reject: (error?: Error) => void;
 *   promise: Promise<any>;
 * }} Deferred
 *
 * @typedef {{
 *   fn: () => Promise<any>;
 *   fulfil: (value: any) => void;
 *   reject: (error: Error) => void;
 * }} Item
 */
/**
 * Create a queue for running promise-returning functions in sequence, with concurrency=`max`
 * @param {number} max
 */
export default function queue(max?: number): {
    /** @param {() => Promise<any>} fn */
    add(fn: () => Promise<any>): Promise<any>;
    close(): Promise<any>;
};
export type Deferred = {
    fulfil: (value?: any) => void;
    reject: (error?: Error) => void;
    promise: Promise<any>;
};
export type Item = {
    fn: () => Promise<any>;
    fulfil: (value: any) => void;
    reject: (error: Error) => void;
};
