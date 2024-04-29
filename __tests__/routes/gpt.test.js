jest.mock("../services/gptService"); // Assume this is your service that communicates with GPT
const gptService = require("../services/gptService");
const app = require("../app");

describe("Training Plan Generation", () => {
	test("TC10: Successful Training Plan Generation", async () => {
		gptService.generatePlan.mockResolvedValue({
			plan: "Your personalized training plan",
		});
		const response = await request(app)
			.post("/gpt/generate")
			.send({
				userPreferences: { distance: 42, weeks: 12 },
			});
		expect(response.statusCode).toBe(200);
		expect(response.body.plan).toContain("training plan");
	});

	test("TC11: Incomplete Requests", async () => {
		const response = await request(app)
			.post("/gpt/generate")
			.send({
				userPreferences: { distance: 42 }, // Missing weeks
			});
		expect(response.statusCode).toBe(400);
	});

	test("TC12: Error Handling in GPT Model", async () => {
		gptService.generatePlan.mockRejectedValue(new Error("GPT model error"));
		const response = await request(app)
			.post("/gpt/generate")
			.send({
				userPreferences: { distance: 42, weeks: 12 },
			});
		expect(response.statusCode).toBe(500);
	});
});
