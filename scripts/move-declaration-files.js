const sander = require('sander');
const glob = require('tiny-glob/sync.js');

glob('src/**/*.js').forEach(file => {
	sander.unlinkSync(file);
});

sander.rimrafSync('types');
glob('src/**/*.d.ts').forEach(file => {
	sander.renameSync(file).to(file.replace(/^src/, 'types'));
});