module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{js,ico,html,png,json,css}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};