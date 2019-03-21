type Deferred = {
	fulfil: (value?: any) => void;
	reject: (error?: Error) => void;
	promise: Promise<any>;
};

export default function queue(max = 4) {
	const items: Array<{
		fn: () => Promise<any>;
		fulfil: (value: any) => void;
		reject: (error: Error) => void;
	}> = []; // TODO

	let pending = 0;

	let closed = false;
	let fulfil_closed: () => void;

	function dequeue() {
		if (pending === 0 && items.length === 0) {
			if (fulfil_closed) {
				closed = true;
				fulfil_closed();
			}
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
		} catch(err) {
			reject(err);
			pending -= 1;
			dequeue();
		}

		dequeue();
	}

	return {
		add(fn: () => Promise<any>) {
			if (closed) {
				throw new Error(`Cannot add to a closed queue`);
			}

			return new Promise((fulfil, reject) => {
				items.push({ fn, fulfil, reject });
				dequeue();
			});
		},

		close() {
			return new Promise((fulfil, reject) => {
				if (pending === 0) {
					closed = true;
					fulfil();
				} else {
					fulfil_closed = fulfil;
				}
			});
		}
	};
}