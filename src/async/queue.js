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
export default function queue(max = 4) {
	/** @type {Item[]} */
	const items = []; // TODO

	let pending = 0;

	let closed = false;

	/** @type {(value: any) => void} */
	let fulfil_closed;

	function dequeue() {
		if (pending === 0 && items.length === 0) {
			if (fulfil_closed) fulfil_closed();
		}

		if (pending >= max) return;
		if (items.length === 0) return;

		pending += 1;

		const { fn, fulfil, reject } = items.shift();
		const promise = fn();

		try {
			promise.then(fulfil, reject).then(() => {
				pending -= 1;
				dequeue();
			});
		} catch (err) {
			reject(err);
			pending -= 1;
			dequeue();
		}

		dequeue();
	}

	return {
		/** @param {() => Promise<any>} fn */
		add(fn) {
			if (closed) {
				throw new Error(`Cannot add to a closed queue`);
			}

			return new Promise((fulfil, reject) => {
				items.push({ fn, fulfil, reject });
				dequeue();
			});
		},

		close() {
			closed = true;

			return new Promise((fulfil, reject) => {
				if (pending === 0) {
					fulfil();
				} else {
					fulfil_closed = fulfil;
				}
			});
		},
	};
}
