'use strict'

const datastore = require('@google-cloud/datastore');
const conf = require('./config/env');

class ds {

    constructor(namespace) {        
        
        this.datastore = datastore({
            projectId: 'datastore-dev',
            namespace: namespace,
            apiEndpoint: "datastore:8081"
        });
    }
};


module.exports = ds;
