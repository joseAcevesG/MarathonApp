prettier = require("eslint-config-prettier");

module.exports = {
	plugins: {
		prettier: prettier,
	},
	rules: {
		eqeqeq: ["error", "always"],
		"no-empty-function": "error",
		"no-unused-vars": "error",
	},
};
