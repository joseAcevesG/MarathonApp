const config = {
	// Existing configuration...
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "./coverage",
	coverageProvider: "v8",
	testMatch: ["**/__tests__/**/*.[j]s?(x)", "**/?(*.)+(spec|test).[j]s?(x)"],

	// Add this transform section
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
};

module.exports = config;
