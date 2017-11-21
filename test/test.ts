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

	// async
	describe('queue', () => {
		// TODO more and better tests
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

	// string
	describe('commas', () => {
		it('adds commas to a numnber', () => {
			assert.equal(yootils.commas(1234), '1,234');
		});

		it('adds commas to a large numnber', () => {
			assert.equal(yootils.commas(1234567890), '1,234,567,890');
		});

		it('adds commas to a numnber with decimal point', () => {
			assert.equal(yootils.commas(1234.5678), '1,234.5678');
		});
	});
});