const request = require("supertest");
const app = require("./app"); // Assuming your Express app is exported from app.js

describe("API Endpoints", () => {
  it("should respond with 200 OK for the root path", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  // Test for a non-existent route
  it("should respond with 404 Not Found for non-existent routes", async () => {
    const response = await request(app).get("/non-existent-route");
    expect(response.statusCode).toBe(404);
  });

  // Add more tests for your specific endpoints
  // For example, if you have a /generate endpoint:
  it("should generate code based on OpenAPI file", async () => {
    const response = await request(app)
      .post("/generate")
      .send({ openApiFile: "your-openapi-spec.yaml" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("generatedCode");
  });
});
