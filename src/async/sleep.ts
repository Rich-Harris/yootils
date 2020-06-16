export default function sleep(ms: number) {
	return new Promise(fulfil => {
		setTimeout(fulfil, ms);
	});
}