Running the Application

Example command:

node app.js https://raw.githubusercontent.com/OpenAPITools/openapi-generator/master/modules/openapi-generator/src/test/resources/3_0/petstore.yaml javascript ./dist

It's trowing an error, however getting the command ran by the app and running it directly in the terminal it works perfectly

npx openapi-generator-cli generate -g nodejs-express-server -i https://raw.githubusercontent.com/OpenAPITools/openapi-generator/master/modules/openapi-generator/src/test/resources/3_0/petstore.yaml -o ./dist