const express = require('express');
const bodyParser = require('body-parser');
const swaggerParser = require('swagger-parser');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const config = require('./resources/config');
const Sequelize = require('sequelize');
const { generateModels, generateRoutes, generateControllers } = require('./codeGenerator');

const app = express();
const port = 3000;
const newAppPath = 'api-generated';

// Middleware
app.use(bodyParser.json());

// Connect to the database
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  port: config.db.port
});

// Swagger file parsing and code generation
const parseSwagger = async (swaggerFilePath) => {
  try {
    const api = await swaggerParser.dereference(swaggerFilePath);
    
    // Generate models, routes, and controllers based on OpenAPI definitions
    generateModels(api);
    generateRoutes(api);
    generateControllers(api);
    
    console.log("Code generation complete.");
  } catch (error) {
    console.error("Error parsing Swagger file:", error);
  }
};

// Endpoint to receive OpenAPI file
app.post('/generate', (req, res) => {
   console.log("Received request to generate code from Swagger file:", req.body.swaggerFilePath);
   const swaggerFilePath = path.join(__dirname, newAppPath, req.body.swaggerFilePath);
   console.log("Received request to generate code from Swagger file:", swaggerFilePath);

  if (!fs.existsSync(swaggerFilePath)) {
    return res.status(400).json({ message: 'Swagger file not found' });
  }

  parseSwagger(swaggerFilePath)
    .then(() => res.status(200).json({ message: 'API code generated successfully' }))
    .catch((err) => res.status(500).json({ message: 'Failed to generate API code', error: err.message }));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
