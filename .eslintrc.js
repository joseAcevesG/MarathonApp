prettier = require("eslint-config-prettier"); // Import the prettier plugin

module.exports = {
	files: ["**/*.js"], // Target JavaScript files
	plugins: {
		prettier: prettier, // Correctly configured plugin object
	},
	rules: {
		eqeqeq: ["error", "always"],
		"no-empty-function": "error",
		"no-unused-vars": "error",
	},
	ignores: [
		"node_modules/**", // Ignore all files in the node_modules directory
		"package.json", // Ignore package.json file
		"package-lock.json", // Ignore package-lock.json file
	],
};
