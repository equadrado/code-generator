const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const axios = require("axios");
const process = require("process");

// Read command line arguments
const args = process.argv.slice(2);
const swaggerUrl = args[0];
const language = args[1];
const outputFolder = args[2];

// Ensure required arguments are provided
if (!swaggerUrl || !language || !outputFolder) {
  console.error(
    "Usage: node app.js <swagger-url> <language> <output-folder>"
  );
  process.exit(1);
}

// Supported languages (JavaScript or Java)
const supportedLanguages = {
  javascript: "nodejs-express-server",
  java: "spring",
};

// Validate the programming language input
if (!supportedLanguages[language.toLowerCase()]) {
  console.error("Supported languages are JavaScript and Java");
  process.exit(1);
}

(async () => {
  try {
    // Generate server-side code
    const codegenCommand = `npx openapi-generator-cli generate -g ${
      supportedLanguages[language.toLowerCase()]
    } -i ${swaggerUrl} -o ${outputFolder}`;
    exec(codegenCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Generated code successfully in ${outputFolder}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
})();
