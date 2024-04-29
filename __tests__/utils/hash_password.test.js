const bcrypt = require("bcryptjs");

// Assuming we are using bcrypt for hashing
function hashPassword(password) {
	if (!password) {
		throw new Error("Password is required");
	}
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}

describe("Password Hashing", () => {
	// TC1: Correct Password Hashing
	test("hashes a password correctly", () => {
		const password = "testPassword123"; // pragma: allowlist secret
		const hash = hashPassword(password);
		expect(hash).not.toBe(password);
	});

	// TC2: Consistent Hash for the Same Input
	test("generates a consistent hash for the same input", () => {
		const password = "consistentInput"; // pragma: allowlist secret
		const hash1 = hashPassword(password);
		const hash2 = hashPassword(password);
		expect(hash1).toBe(hash2);
	});

	// TC3: Unique Hashes for Different Passwords
	test("generates unique hashes for different passwords", () => {
		const password1 = "uniquePassword1"; // pragma: allowlist secret
		const password2 = "uniquePassword2"; // pragma: allowlist secret
		const hash1 = hashPassword(password1);
		const hash2 = hashPassword(password2);
		expect(hash1).not.toBe(hash2);
	});

	// TC4: Handling Empty Input
	test("throws an error when password is empty", () => {
		expect(() => {
			hashPassword("");
		}).toThrow("Password is required");
	});

	// TC5: Performance and Execution Time Tests
	test("hash function execution time is reasonable", () => {
		const password = "performanceTest"; // pragma: allowlist secret
		const startTime = Date.now();
		hashPassword(password);
		const endTime = Date.now();
		const diff = endTime - startTime;
		// Assuming the threshold for "reasonable" is 1000 milliseconds
		expect(diff).toBeLessThan(1000);
	});
});
