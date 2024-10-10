#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { parseSwagger, generateCode } = require("./codeGenerator");

// Define the command-line options
const argv = yargs
  .usage("Usage: $0 --url [swagger_url] --config [config_path]")
  .option("url", {
    alias: "u",
    describe: "URL of the OpenAPI/Swagger file",
    demandOption: true,
    type: "string",
  })
  .option("config", {
    alias: "c",
    describe: "Path to the database config file (optional)",
    default: "./config.js",
    type: "string",
  })
  .help("h")
  .alias("h", "help").argv;

// Fetch OpenAPI file from the URL
const fetchSwaggerFile = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Swagger file:", error);
    process.exit(1);
  }
};

// Main logic to parse Swagger and generate code
const main = async () => {
  const swaggerUrl = argv.url;
  const configPath = argv.config;

  // Read the database config
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found at ${configPath}`);
    process.exit(1);
  }
  const config = require(configPath);

  console.log("Fetching Swagger file from:", swaggerUrl);
  const swaggerFile = await fetchSwaggerFile(swaggerUrl);

  console.log("Parsing Swagger file...");
  const api = await parseSwagger(swaggerFile);

  console.log("Generating code...");
  generateCode(api, config);

  console.log("Code generation complete!");
};

main();
