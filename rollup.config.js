import typescript from 'rollup-plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		file: 'yootils.es.js',
		format: 'es'
	},
	plugins: [
		typescript({
			typescript: require('typescript'),
			declaration: true
		})
	]
};