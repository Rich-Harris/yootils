import * as assert from 'assert';
import * as yootils from '../src/index';

describe('yootils', () => {
	// array
	describe('pickRandom', () => {
		it('picks an item from an array', () => {
			const item = yootils.pickRandom(['a', 'b', 'c']);

			assert.ok(item === 'a' || item === 'b' || item === 'c');
		});

		it('does not mutate the array', () => {
			const array = ['a', 'b', 'c'];
			const item = yootils.pickRandom(array);

			assert.deepEqual(array, ['a', 'b', 'c']);
		});
	});

	describe('shuffle', () => {
		it('shuffles an array in place', () => {
			const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

			const shuffled = yootils.shuffle(arr);

			assert.strictEqual(shuffled, arr);

			// this *could* happen, but would be vanishingly unlikely
			assert.notDeepEqual(shuffled, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']);
		});
	});

	// async
	describe('queue', () => {
		// TODO more and better tests
		it('max parallel check', async () => {
			const max = 4;
			const q = yootils.queue(max);

			const executing: number[] = [];

			function sleep(delay: number): Promise<any> {
				return new Promise(function(resolve) {
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
			while (concurrent += executing.shift()) {
				assert.ok(concurrent <= max);
			}
		});

		it('queues tasks', async () => {
			const queue = yootils.queue();

			const letters = [];

			letters.push(await queue.add(() => {
				return Promise.resolve('a');
			}));

			letters.push(await queue.add(() => {
				return Promise.resolve('b');
			}));

			letters.push(await queue.add(() => {
				return Promise.resolve('c');
			}));

			await letters.push(await queue.add(() => {
				return Promise.resolve('d');
			}));

			assert.deepEqual(letters, ['a', 'b', 'c', 'd']);
		});

		describe('queue.close', () => {

			it('returns a promise that resolves and closes when all items are completed', async () => {
				type Deferred = {
					fulfil: (value: any) => void;
					reject: (error: Error) => void;
					promise: Promise<any>;
				};

				const deferred = (): Deferred => {
					let fulfil;
					let reject;

					const promise = new Promise((f, r) => {
						fulfil = f;
						reject = r;
					});

					return { promise, fulfil, reject };
				};

				const q = yootils.queue();

				const deferreds: Deferred[] = [];
				const values: number[] = [];

				for (let i = 0; i < 5; i += 1) {
					const d = deferred();
					d.promise.then(value => {
						values.push(value);
					});

					deferreds.push(d);
					q.add(() => d.promise);
				}

				for (let i = 5; i < 10; i += 1) {
					const d = deferred();
					d.promise.then(value => {
						values.push(value);
					});

					deferreds.push(d);
					q.add(() => d.promise);
				}

				const promise = q.close();

				deferreds.forEach((d, i) => d.fulfil(i * 2));

				await promise;
				assert.deepEqual(values, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
			});

			it('returns a promise that resolves once all items are completed', async () => {
				type Deferred = {
					fulfil: (value: any) => void;
					reject: (error: Error) => void;
					promise: Promise<any>;
				};

				const deferred = (): Deferred => {
					let fulfil;
					let reject;

					const promise = new Promise((f, r) => {
						fulfil = f;
						reject = r;
					});

					return { promise, fulfil, reject };
				};

				const q = yootils.queue();

				const deferreds: Deferred[] = [];
				const values: number[] = [];

				for (let i = 0; i < 10; i += 1) {
					const d = deferred();
					d.promise.then(value => {
						values.push(value);
					});

					deferreds.push(d);
					q.add(() => d.promise);
				}

				const promise = q.close();

				deferreds.forEach((d, i) => d.fulfil(i * 2));

				await promise;
				assert.deepEqual(values, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
			});

			it('throws if a task is subsequently added', async () => {
				const q = yootils.queue();

				q.close();

				assert.throws(() => {
					q.add(() => Promise.resolve(42));
				}, /Cannot add to a closed queue/);
			});
		});
	});

	// scales
	describe('linearScale', () => {
		it('scales a number', () => {
			const scale = yootils.linearScale([10, 20], [50, 100]);
			assert.equal(scale(15), 75);
			assert.equal(scale(5), 25);
		});

		it('provides an inverse() method', () => {
			const scale = yootils.linearScale([10, 20], [50, 100]);
			const inverse = scale.inverse();
			assert.equal(inverse(75), 15);
			assert.equal(inverse(25), 5);
		});
	});

	// number
	describe('clamp', () => {
		it('clamps a number', () => {
			assert.equal(yootils.clamp(10, 20, 30), 20);
			assert.equal(yootils.clamp(25, 20, 30), 25);
			assert.equal(yootils.clamp(40, 20, 30), 30);
		});
	});

	describe('random', () => {
		it('generates a random number', () => {
			const n = yootils.random(10);
			assert.ok(n >= 0);
			assert.ok(n <= 10);
		});

		it('generates a random number between a and b', () => {
			const n = yootils.random(50, 60);
			assert.ok(n >= 50);
			assert.ok(n <= 60);
		});
	});

	// string
	describe('commas', () => {
		it('adds commas to a number', () => {
			assert.equal(yootils.commas(1234), '1,234');
		});

		it('adds commas to a large number', () => {
			assert.equal(yootils.commas(1234567890), '1,234,567,890');
		});

		it('adds commas to a number with decimal point', () => {
			assert.equal(yootils.commas(1234.5678), '1,234.5678');
		});
	});
});
