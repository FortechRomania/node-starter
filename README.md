This project is an application skeleton for a typical [Node.js](https://nodejs.org/) web app.

## Getting Started
To get you started you can simply clone the node-seed repository and install the dependencies:

### Prerequisites
You need git to clone the node-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test node-seed. You must have node.js and its package manager (npm) installed. You can get them from  [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb and mongoose.

### Clone node-seed
Clone the node-seed repository using [git][git]:

    git clone "path from git"

### Install node-seed project dependencies

    npm install

### Run the Application

The project is preconfigured with a simple development web server.  The simplest way to start this server is:

    npm start

### Generate API documentation

    npm run doc

The command will generate a /doc folder that will contain an index.html file. Open it in any browser. The file contains information about API routes.

### Project Structure

The project contains two main folders.
The first is called /app and has the following subfolders:
* /config - folder that contains: express and mongoose setup, API routes and configurations for development and production environments.
* /controllers - folder that will contain all controllers involved in the app
* /models - folder with the models considered
* /middlewares - folder with functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle
* /utilities - folder with functions that can be used in app to avoid repetitive code
The second folder is called /doc and contains API route documentation generated with apidoc ( see above how to re-generate the index.html )

## Credits

## Licence
