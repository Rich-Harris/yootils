export default function queue(max = 4) {
	const items: Array<{
		fn: () => Promise<any>;
		fulfil: (value: any) => void;
		reject: (error: Error) => void;
	}> = []; // TODO

	let pending = 0;

	function dequeue() {
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
			return new Promise((fulfil, reject) => {
				items.push({ fn, fulfil, reject });
				dequeue();
			});
		}
	};
}