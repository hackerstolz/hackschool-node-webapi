'use strict';

const customerInMemoryService = require('./customer.inmemory.js');

/**
 * @public
 * @constructor
 */
function Services() {
    this.customer = customerInMemoryService;
}

let servicesInstance;

module.exports = {
    get: () => {
        if (servicesInstance) {
            return Promise.resolve(servicesInstance);
        }

        return new Promise(resolve => {
            var instance = new Services();
            resolve(instance);
        });
    }
};
