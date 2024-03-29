export default {
  external: [],
	input: 'src/laboratory-vue.js',
	output: {
		file: 'dist/laboratory-vue.mjs',
		format: 'system'
	},
  watch: {
    include: 'src/**',
    buildDelay: 1000
  }
};