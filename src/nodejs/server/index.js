'use strict';

// Require the restify npm module
const restify = require('restify'),

// Require the cors middleware for restify
    corsMiddleware = require('restify-cors-middleware'),

// Require node.js' path module
    path = require('path');

// Require the controllers
const controllers = require('../controllers/index');

/**
 * Restify server exposing some APIs to manipulate customer data
 *
 * @public
 * @constructor
 */
function Server() {
    /**
     * Starts the server on the given port
     * @param {number} port - The port where the server should listen on
     */
    this.start = port => {
        // Create a new restify server
        const server = restify.createServer();

        // Enable cors for restify
        const cors = corsMiddleware({
            allowHeaders: ['Authorization']
        });

        // server.pre runs before other server.use middlewares. It will run before all http requests, so we can handle CORS preflights
        server.pre(cors.preflight);

        // Allow cors on all routes
        server.use(cors.actual);

        // Include a query parser middleware which will expose all parsed query parameters on a special "req.params" object
        server.use(restify.queryParser());

        // Include a body parser middleware which will parse the body to json objects (in case of application/json)
        // Will parse other content types like application/form-data or application/x-www-form-urlencoded
        server.use(restify.bodyParser());

        // Initialize all controllers
        controllers.initialize(server);

        // Start the server on the given port and output a console message, if it started successfully
        server.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        });
    };
}

// Expose the Server, so it can be used outside of this JavaScript file. Like a "public class Server..."
module.exports = Server;
