/*

Adapted from http://davidbau.com/encode/seedrandom.js

LICENSE (MIT)
-------------

Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

const width = 256; // width: each RC4 output is 0 <= x < 256
const chunks = 6; // chunks: at least six RC4 outputs for each double
const digits = 52; // digits: there are 52 significant digits in a double

//
// The following constants are related to IEEE 754 limits.
//
const startdenom = Math.pow(width, chunks);
const significance = Math.pow(2, digits);
const overflow = significance * 2;
const mask = width - 1;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
class ARC4 {
	/** @param {number[]} key */
	constructor(key) {
		this.i = 0;
		this.j = 0;

		/** @type {number[]} */
		this.S = [];

		// Set up S using the standard key scheduling algorithm.
		for (let i = 0; i < width; i += 1) {
			this.S[i] = i;
		}

		const len = key.length;
		let t;
		let j = 0;

		for (let i = 0; i < width; i += 1) {
			this.S[i] = this.S[(j = mask & (j + key[i % len] + (t = this.S[i])))];
			this.S[j] = t;
		}

		// For robust unpredictability, the function call below automatically
		// discards an initial batch of values.  This is called RC4-drop[256].
		// See http://google.com/search?q=rsa+fluhrer+response&btnI
		this.g(width);
	}

	/** @param {number} count */
	g(count) {
		const s = this.S;
		let r = 0;

		while (count--) {
			const t = s[(this.i = mask & (this.i + 1))];
			r =
				r * width +
				s[
					mask &
						((s[this.i] = s[(this.j = mask & (this.j + t))]) + (s[this.j] = t))
				];
		}

		return r;
	}
}

/**
 * Create a seeded random number generator that returns a random number between `a` and `b`, or between 0 and `a` if `b` is unspecified
 * @param {string} seed
 */
export default function seedRandom(seed) {
	if (!seed) seed = '\0';

	/** @type {number[]} */
	const key = [];

	/** @type {number} */
	let smear;

	for (let i = 0; i < seed.length; i += 1) {
		key[mask & i] = mask & ((smear ^= key[mask & i] * 19) + seed.charCodeAt(i));
	}

	// Use the seed to initialize an ARC4 generator.
	const arc4 = new ARC4(key);

	function prng() {
		let n = arc4.g(chunks); // Start with a numerator n < 2 ^ 48
		let d = startdenom; //   and denominator d = 2 ^ 48.
		let x = 0; //   and no 'extra last byte'.

		while (n < significance) {
			// Fill up all significant digits by
			n = (n + x) * width; //   shifting numerator and
			d *= width; //   denominator and generating a
			x = arc4.g(1); //   new least-significant-byte.
		}

		while (n >= overflow) {
			// To avoid rounding up, before adding
			n /= 2; //   last byte, shift everything
			d /= 2; //   right using integer math until
			x >>>= 1; //   we have exactly the desired bits.
		}

		return (n + x) / d; // Form the number within [0, 1).
	}

	/**
	 * Generate a random number between `a` and `b`, or between 0 and `a` if `b` is unspecified
	 * @param {number} a
	 * @param {number} [b]
	 */
	function random(a, b) {
		if (b === undefined) return prng() * a;
		return a + prng() * (b - a);
	}

	return random;
}
