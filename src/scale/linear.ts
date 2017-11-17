export default function linear(domain: [number, number], range: [number, number]) {
	const d0 = domain[0];
	const r0 = range[0];
	const m = (range[1] - r0) / (domain[1] - d0);

	return Object.assign((num: number) => {
		return r0 + (num - d0) * m;
	}, {
		inverse: () => linear(range, domain)
	});
}