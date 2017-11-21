export default function pickRandom(array: any[]) {
	const i = ~~(Math.random() * array.length);
	return array[i];
}