'use strict'

const datastore = require('@google-cloud/datastore');
const conf = require('./config/env');

class ds {

    constructor(namespace) {        
        
        this.datastore = datastore({
            projectId: 'hallowed-byte-144310',
            namespace: namespace,
            apiEndpoint: "localhost:8081"
        });
    }
};


module.exports = ds;
