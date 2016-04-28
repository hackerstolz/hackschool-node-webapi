'use strict';

// Require the services
const services = require('../service');

/**
 * @public
 * @constructor
 */
function CustomerController() {
    this.initialize = function (server) {
        // Define a HTTP GET route which will execute "handleCustomerList"
        server.get('api/customer/list', handleCustomerList);

        // Define a HTTP POST route
        server.post('api/customer', handleCustomerCreation);

        // Define a HTTP DELETE route
        server.del('api/customer/:id', handleCustomerDeletion);
    };

    function handleCustomerList(req, res) {
        // Call list method of the customer service
        services.get()
            .then(srv => srv.customer.list())
            .then(
                // Successful handler: Return a json
                customers => res.json(200, customers),

                // Error handler: Send a HTTP status code 500 together with the error
                err => res.json(500, err)
            );
    }

    function handleCustomerCreation(req, res) {
        // req.body contains the json object which was transmitted
        services.get()
            .then(srv => srv.customer.create(req.body.firstName, req.body.lastName))
            .then(
                () => res.send(200),
                err => res.json(500, err)
            );
    }

    function handleCustomerDeletion(req, res) {
        // req.params contains the url parameters defined in the route (:id)
        services.get()
            .then(srv => srv.customer.remove(req.params.id))
            .then(
                () => res.send(200),
                err => res.send(500, err)
            );
    }
}

module.exports = new CustomerController();
