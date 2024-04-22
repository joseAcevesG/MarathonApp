import UsersController from "../../src/controllers/users.controller";
import user from "../../src/models/user";
import ResponseStatus from "../../src/types/response-codes";
import { code as createToken } from "../../src/utils/create-token";

jest.mock("../../src/models/user", () => ({
	create: jest.fn().mockResolvedValue(Promise.resolve("User created")),
	findOne: jest.fn().mockResolvedValue(
		Promise.resolve({
			name: "TestUser",
			password: "password123", // pragma: allowlist secret
			email: "test@example.com",
		}),
	),
	updateOne: jest.fn().mockResolvedValue(Promise.resolve("")),
}));

jest.mock("../../src/utils/hash-password", () =>
	jest.fn().mockReturnValue("hashed_password"),
);

jest.mock("../../src/utils/create-token", () => ({
	code: jest.fn().mockReturnValue("token"),
}));

describe("UsersController", () => {
	describe("signUp", () => {
		let req;
		let res;

		beforeEach(() => {
			req = {
				body: {
					name: "TestUser",
					password: "password123", // pragma: allowlist secret
					email: "test@example.com",
				},
			};

			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			};
		});

		test("should create a new user and send a CREATED response", async () => {
			// Arrange
			// Cast the req object to the correct type
			await UsersController.signUp(req, res);

			// Assert
			expect(user.create).toHaveBeenCalledWith({
				name: "TestUser",
				password: "hashed_password", // pragma: allowlist secret
				email: "test@example.com",
			});
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.CREATED);
			expect(res.send).toHaveBeenCalledWith("User created");
		});

		test("should handle 'email already exists' error", async () => {
			// Arrange

			const createMock = user.create;
			createMock.mockRejectedValueOnce({ code: 11000 });

			try {
				// Act
				await UsersController.signUp(req, res);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Email already exists");
				console.log(error);
			}
		});

		test("should handle validation errors", async () => {
			// Arrange

			const createMock = user.create;
			const validationError = new Error("Validation error");
			validationError.name = "ValidationError";
			createMock.mockRejectedValueOnce(validationError);

			try {
				// Act
				await UsersController.signUp(req, res);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Invalid data");
				console.log(error);
			}
		});

		test("should handle generic errors", async () => {
			// Arrange

			const createMock = user.create;
			createMock.mockRejectedValueOnce(new Error("Generic error"));

			try {
				// Act
				await UsersController.signUp(req, res);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Something went wrong");
				console.log(error);
			}
		});
	});

	describe("logIn", () => {
		let req;
		let res;

		// Mock the Express req and res objects before each test
		beforeEach(() => {
			req = {
				body: {
					name: "TestUser",
					password: "password123", // pragma: allowlist secret
					email: "test@example.com",
				},
			};

			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			};
		});
		test("should log in an existing user and send back a token", async () => {
			// Arrange
			user.findOne.mockResolvedValue({
				name: "TestUser",
				email: "test@example.com",
			});

			// Act
			await UsersController.logIn(req, res);

			// Assert
			expect(user.findOne).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "hashed_password", // pragma: allowlist secret
			});
			expect(createToken).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.SUCCESS);
			expect(res.send).toHaveBeenCalledWith({ token: "token" });
		});

		test("should handle invalid credentials", async () => {
			// Arrange
			user.findOne.mockResolvedValue(null);

			// Act
			await UsersController.logIn(req, res);

			// Assert
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.UNAUTHORIZED);
			expect(res.send).toHaveBeenCalledWith("Invalid credentials");
		});

		test("should handle generic errors", async () => {
			// Arrange
			user.findOne.mockRejectedValue(new Error("Generic error"));

			// Act
			try {
				await UsersController.logIn(req, res);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Something went wrong");
				console.log(error);
			}
		});
	});
});
