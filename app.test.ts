const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerParser = require('swagger-parser');
const { generateModels, generateRoutes, generateControllers } = require('./codeGenerator');

// Mock the required modules
jest.mock('fs');
jest.mock('swagger-parser');
jest.mock('./codeGenerator');

// Create a mock Express app
const app = express();
require('./app');

describe('API Code Generator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /generate', () => {
    it('should return 400 if Swagger file is not found', async () => {
      fs.existsSync.mockReturnValue(false);

      const response = await request(app)
        .post('/generate')
        .send({ swaggerFilePath: 'nonexistent.yaml' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Swagger file not found' });
    });

    it('should generate API code successfully', async () => {
      fs.existsSync.mockReturnValue(true);
      swaggerParser.dereference.mockResolvedValue({});
      generateModels.mockImplementation(() => {});
      generateRoutes.mockImplementation(() => {});
      generateControllers.mockImplementation(() => {});

      const response = await request(app)
        .post('/generate')
        .send({ swaggerFilePath: 'valid-swagger.yaml' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'API code generated successfully' });
      expect(swaggerParser.dereference).toHaveBeenCalled();
      expect(generateModels).toHaveBeenCalled();
      expect(generateRoutes).toHaveBeenCalled();
      expect(generateControllers).toHaveBeenCalled();
    });

    it('should return 500 if code generation fails', async () => {
      fs.existsSync.mockReturnValue(true);
      swaggerParser.dereference.mockRejectedValue(new Error('Parsing error'));

      const response = await request(app)
        .post('/generate')
        .send({ swaggerFilePath: 'invalid-swagger.yaml' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Failed to generate API code',
        error: 'Parsing error'
      });
    });
  });
});
