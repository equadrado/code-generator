const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const mkdirp = require("mkdirp");
const swaggerParser = require("swagger-parser");

// Helper function to create directories if they don't exist
const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    mkdirp.sync(dirPath);
  }
};

// Parse the Swagger file
const parseSwagger = async (swaggerFile) => {
  try {
    const api = await swaggerParser.parse(swaggerFile);
    return api;
  } catch (error) {
    console.error("Error parsing Swagger file:", error);
    process.exit(1);
  }
};

// Function to generate Sequelize models based on OpenAPI definitions
const generateModels = (api, config) => {
  const definitions = api.definitions || api.components?.schemas || {};
  const modelsPath = path.join(__dirname, "models");
  createDir(modelsPath);

  Object.keys(definitions).forEach((modelName) => {
    const model = definitions[modelName];
    const modelPath = path.join(modelsPath, `${modelName}.js`);

    const attributes = {};
    if (model.properties) {
      Object.keys(model.properties).forEach((property) => {
        const prop = model.properties[property];
        attributes[property] = {
          type: mapSwaggerTypeToSequelize(prop.type),
          allowNull: prop.required ? false : true,
        };
      });
    }

    const modelCode = `
      const { Sequelize, DataTypes } = require('sequelize');
      const sequelize = require('../config/database')(Sequelize, DataTypes);

      const ${modelName} = sequelize.define('${modelName}', ${JSON.stringify(
      attributes,
      null,
      2
    )});

      module.exports = ${modelName};
    `;

    fs.writeFileSync(modelPath, modelCode);
  });
};

// Helper function to map Swagger types to Sequelize data types
const mapSwaggerTypeToSequelize = (swaggerType) => {
  switch (swaggerType) {
    case "string":
      return DataTypes.STRING;
    case "integer":
      return DataTypes.INTEGER;
    case "boolean":
      return DataTypes.BOOLEAN;
    case "array":
      return DataTypes.JSON;
    case "object":
      return DataTypes.JSON;
    default:
      return DataTypes.STRING;
  }
};

// Function to generate routes based on OpenAPI paths
const generateRoutes = (api) => {
  const routesPath = path.join(__dirname, "routes");
  createDir(routesPath);

  const paths = api.paths || {};
  Object.keys(paths).forEach((pathKey) => {
    Object.keys(paths[pathKey]).forEach((method) => {
      const operation = paths[pathKey][method];
      const routeFilePath = path.join(
        routesPath,
        `${method}-${pathKey.replace(/{[^}]+}/g, ":param")}.js`
      );
      createDir(path.dirname(routeFilePath));

      const routeCode = `
        const express = require('express');
        const router = express.Router();
        const { ${operation.operationId} } = require('../controllers/${operation.operationId}');

        router.${method}('${pathKey}', ${operation.operationId});

        module.exports = router;
      `;
      fs.writeFileSync(routeFilePath, routeCode);
    });
  });
};

// Function to generate controllers from OpenAPI operations
const generateControllers = (api) => {
  const controllersPath = path.join(__dirname, "controllers");
  createDir(controllersPath);

  const paths = api.paths || {};
  Object.keys(paths).forEach((pathKey) => {
    Object.keys(paths[pathKey]).forEach((method) => {
      const operation = paths[pathKey][method];
      const controllerPath = path.join(
        controllersPath,
        `${operation.operationId}.js`
      );
      createDir(path.dirname(controllerPath));

      const controllerCode = `
        const { ${operation.operationId} } = require('../models');

        exports.${operation.operationId} = async (req, res) => {
          try {
            const result = await ${operation.operationId}.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      `;
      fs.writeFileSync(controllerPath, controllerCode);
    });
  });
};

// Generate all necessary code
const generateCode = (api, config) => {
  generateModels(api, config);
  generateRoutes(api);
  generateControllers(api);
};

module.exports = { parseSwagger, generateCode };
