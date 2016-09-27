Todos:
- check the eslint reference styleguide and use the same classification: https://github.com/FortechRomania/eslint-config/blob/master/.eslintrc
- check all dependencies in package.json (is save-mongodb or mongoose-timestamps needed?)
- add readme.txt(markup for github) when you can specify the dependencies for running the project (ex: npm i -g nodemon, apidoc, etc.)
- annotate all functions with documentation comments
- add apidoc to the project + demo
- refactor "validationError" to not rely on a static array of validations, but to display all errors for each field separately (a simpler version in the end)
- add a models folder and a test mongoose model as a reference (with validations) + controller again as a reference
- add a middleware for authentication via jwt - https://github.com/auth0/node-jsonwebtoken