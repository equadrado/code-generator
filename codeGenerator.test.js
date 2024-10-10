const fs = require("fs");
const path = require("path");
const swaggerParser = require("swagger-parser");
const { parseSwagger, generateCode } = require("./codeGenerator");

// Mocking external modules
jest.mock("fs");
jest.mock("path");
jest.mock("swagger-parser");
jest.mock("mkdirp");

describe("codeGenerator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("parseSwagger", () => {
    it("should successfully parse a valid Swagger file", async () => {
      const mockApi = { info: { title: "Test API" } };
      swaggerParser.parse.mockResolvedValue(mockApi);

      const result = await parseSwagger("valid-swagger.yaml");
      expect(result).toEqual(mockApi);
      expect(swaggerParser.parse).toHaveBeenCalledWith("valid-swagger.yaml");
    });

    it("should throw an error for an invalid Swagger file", async () => {
      swaggerParser.parse.mockRejectedValue(new Error("Invalid Swagger"));

      await expect(parseSwagger("invalid-swagger.yaml")).rejects.toThrow(
        "Invalid Swagger"
      );
    });
  });

  describe("generateModels", () => {
    it("should generate model files based on API definitions", () => {
      const mockApi = {
        definitions: {
          User: {
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              isActive: { type: "boolean" },
            },
          },
        },
      };
      const mockConfig = {};

      fs.writeFileSync.mockImplementation(() => {});
      path.join.mockImplementation((...args) => args.join("/"));

      generateModels(mockApi, mockConfig);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("models/User.js"),
        expect.stringContaining("sequelize.define('User'")
      );
    });
  });

  describe("generateRoutes", () => {
    it("should generate route files based on API paths", () => {
      const mockApi = {
        paths: {
          "/users": {
            get: { operationId: "getUsers" },
            post: { operationId: "createUser" },
          },
        },
      };

      fs.writeFileSync.mockImplementation(() => {});
      path.join.mockImplementation((...args) => args.join("/"));

      generateRoutes(mockApi);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("routes/get-/users.js"),
        expect.stringContaining("router.get('/users'")
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("routes/post-/users.js"),
        expect.stringContaining("router.post('/users'")
      );
    });
  });

  describe("generateControllers", () => {
    it("should generate controller files based on API operations", () => {
      const mockApi = {
        paths: {
          "/users": {
            get: { operationId: "getUsers" },
            post: { operationId: "createUser" },
          },
        },
      };

      fs.writeFileSync.mockImplementation(() => {});
      path.join.mockImplementation((...args) => args.join("/"));

      generateControllers(mockApi);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("controllers/getUsers.js"),
        expect.stringContaining("exports.getUsers = async (req, res)")
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining("controllers/createUser.js"),
        expect.stringContaining("exports.createUser = async (req, res)")
      );
    });
  });

  describe("generateCode", () => {
    it("should call generateModels, generateRoutes, and generateControllers", () => {
      const mockApi = {
        definitions: {},
        paths: {},
      };
      const mockConfig = {};

      const spyGenerateModels = jest.spyOn(
        { generateModels },
        "generateModels"
      );
      const spyGenerateRoutes = jest.spyOn(
        { generateRoutes },
        "generateRoutes"
      );
      const spyGenerateControllers = jest.spyOn(
        { generateControllers },
        "generateControllers"
      );

      generateCode(mockApi, mockConfig);

      expect(spyGenerateModels).toHaveBeenCalledWith(mockApi, mockConfig);
      expect(spyGenerateRoutes).toHaveBeenCalledWith(mockApi);
      expect(spyGenerateControllers).toHaveBeenCalledWith(mockApi);
    });
  });
});
