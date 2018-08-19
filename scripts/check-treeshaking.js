const { rollup } = require('rollup');

async function check() {
	const bundle = await rollup({
		input: 'scripts/check-treeshaking-entry.js',
		onwarn: (warning, handle) => {
			if (warning.code !== 'EMPTY_BUNDLE') handle(warning);
		}
	});

	const output = await bundle.generate({
		format: 'esm'
	});

	if (output.code.trim() !== '') {
		throw new Error('Tree-shaking failed');
	}
}

check();