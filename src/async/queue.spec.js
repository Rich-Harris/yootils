import { test } from 'uvu';
import * as assert from 'uvu/assert';
import queue from './queue.js';

/**
 * @typedef {import('./queue').Deferred} Deferred
 */

// TODO more and better tests
test('max parallel check', async () => {
	const max = 4;
	const q = queue(max);

	/** @type {number[]} */
	const executing = [];

	/** @param {number} delay */
	function sleep(delay) {
		return new Promise(function (resolve) {
			executing.push(1);
			setTimeout(() => {
				executing.push(-1);
				resolve();
			}, delay);
		});
	}

	for (let i = 0; i < 10; i++) {
		q.add(() => sleep(10));
	}

	q.close();

	let concurrent = 0;
	while ((concurrent += executing.shift())) {
		assert.ok(concurrent <= max);
	}
});

test('queues tasks', async () => {
	const q = queue();

	const letters = [];

	letters.push(
		await q.add(() => {
			return Promise.resolve('a');
		})
	);

	letters.push(
		await q.add(() => {
			return Promise.resolve('b');
		})
	);

	letters.push(
		await q.add(() => {
			return Promise.resolve('c');
		})
	);

	await letters.push(
		await q.add(() => {
			return Promise.resolve('d');
		})
	);

	assert.equal(letters, ['a', 'b', 'c', 'd']);
});

test('queue.close returns a promise that resolves and closes when all items are completed', async () => {
	const deferred = () => {
		let fulfil;
		let reject;

		const promise = new Promise((f, r) => {
			fulfil = f;
			reject = r;
		});

		return { promise, fulfil, reject };
	};

	const q = queue();

	/** @type {Deferred[]} */
	const deferreds = [];

	/** @type {number[]} */
	const values = [];

	for (let i = 0; i < 5; i += 1) {
		const d = deferred();
		d.promise.then((value) => {
			values.push(value);
		});

		deferreds.push(d);
		q.add(() => d.promise);
	}

	for (let i = 5; i < 10; i += 1) {
		const d = deferred();
		d.promise.then((value) => {
			values.push(value);
		});

		deferreds.push(d);
		q.add(() => d.promise);
	}

	const promise = q.close();

	deferreds.forEach((d, i) => d.fulfil(i * 2));

	await promise;
	assert.equal(values, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
});

test('queue.close returns a promise that resolves once all items are completed', async () => {
	const deferred = () => {
		let fulfil;
		let reject;

		const promise = new Promise((f, r) => {
			fulfil = f;
			reject = r;
		});

		return { promise, fulfil, reject };
	};

	const q = queue();

	/** @type {Deferred[]} */
	const deferreds = [];

	/** @type {number[]} */
	const values = [];

	for (let i = 0; i < 10; i += 1) {
		const d = deferred();
		d.promise.then((value) => {
			values.push(value);
		});

		deferreds.push(d);
		q.add(() => d.promise);
	}

	const promise = q.close();

	deferreds.forEach((d, i) => d.fulfil(i * 2));

	await promise;
	assert.equal(values, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
});

test('queue.close throws if a task is subsequently added', async () => {
	const q = queue();

	q.close();

	assert.throws(() => {
		q.add(() => Promise.resolve(42));
	}, /Cannot add to a closed queue/);
});

test.run();
