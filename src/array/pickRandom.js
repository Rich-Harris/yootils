/** @param {any[]} array */
export default function pickRandom(array) {
	const i = ~~(Math.random() * array.length);
	return array[i];
}
