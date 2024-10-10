const codeGenerator = require("./codeGenerator");

describe("Code Generator", () => {
  // Test the initialization of the code generator
  describe("initialization", () => {
    it("should initialize without errors", () => {
      expect(() => codeGenerator.init()).not.toThrow();
    });
  });

  // Test the generation of code from an OpenAPI spec
  describe("generateCode", () => {
    it("should generate code from a valid OpenAPI spec", async () => {
      const mockOpenApiSpec = {
        openapi: "3.0.0",
        info: { title: "Test API", version: "1.0.0" },
        paths: {
          "/test": {
            get: {
              summary: "Test endpoint",
              responses: {
                200: {
                  description: "Successful response",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      const generatedCode = await codeGenerator.generateCode(mockOpenApiSpec);
      expect(generatedCode).toBeDefined();
      expect(typeof generatedCode).toBe("string");
      expect(generatedCode).toContain("app.get('/test'");
    });

    it("should throw an error for invalid OpenAPI spec", async () => {
      const invalidSpec = { invalid: "spec" };
      await expect(codeGenerator.generateCode(invalidSpec)).rejects.toThrow();
    });
  });

  // Test the parsing of OpenAPI spec
  describe("parseOpenApiSpec", () => {
    it("should parse a valid OpenAPI spec", () => {
      const validSpec = {
        openapi: "3.0.0",
        info: { title: "Test API", version: "1.0.0" },
        paths: {},
      };
      expect(() => codeGenerator.parseOpenApiSpec(validSpec)).not.toThrow();
    });

    it("should throw an error for invalid OpenAPI spec", () => {
      const invalidSpec = { invalid: "spec" };
      expect(() => codeGenerator.parseOpenApiSpec(invalidSpec)).toThrow();
    });
  });

  // Test the generation of specific parts of the code
  describe("generateEndpoint", () => {
    it("should generate code for a GET endpoint", () => {
      const endpoint = {
        path: "/test",
        method: "get",
        summary: "Test endpoint",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      };

      const generatedCode = codeGenerator.generateEndpoint(endpoint);
      expect(generatedCode).toContain("app.get('/test'");
      expect(generatedCode).toContain("res.status(200).json({");
    });

    // Add more tests for other HTTP methods and scenarios
  });

  // Test error handling
  describe("error handling", () => {
    it("should handle errors gracefully", () => {
      expect(() => codeGenerator.someErrorProneFunction()).not.toThrow();
    });
  });
});
