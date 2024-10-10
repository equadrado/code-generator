Running the Application

Make the CLI script executable (on Unix-like systems):

chmod +x cli.js

Run the CLI tool:

Example command:

./cli.js --url https://example.com/path/to/swagger.json --config ./config.js

This will:

Fetch the Swagger file from the provided URL.
Parse the file and generate the models, routes, and controllers.
Create a MySQL connection using the details provided in config.js.
