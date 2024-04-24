const jwt = require("jsonwebtoken");
const authMiddleware = require("./auth.middleware");

describe("Auth Middleware", () => {
	let req, res, next;

	beforeEach(() => {
		req = { header: jest.fn() };
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		next = jest.fn();
	});

	test("should return 401 if no token provided", () => {
		req.header.mockReturnValueOnce(undefined);
		authMiddleware(req, res, next);
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
	});

	test("should return 401 if token is invalid", () => {
		req.header.mockReturnValueOnce("invalid-token");
		jwt.verify.mockImplementationOnce(() => {
			throw new Error();
		});
		authMiddleware(req, res, next);
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
	});

	test("should set req.user if token is valid", () => {
		req.header.mockReturnValueOnce("valid-token");
		const decodedUser = { id: "123", username: "testuser" };
		jwt.verify.mockReturnValueOnce({ user: decodedUser });
		authMiddleware(req, res, next);
		expect(req.user).toEqual(decodedUser);
		expect(next).toHaveBeenCalled();
	});
});
