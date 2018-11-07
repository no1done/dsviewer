"use strict"

const datastore = require("@google-cloud/datastore")
const conf = require("./config/env")

class ds {
  constructor(namespace) {
    if (namespace == undefined) {
      this.datastore = datastore({
        projectId: "seopluggedhq",
        keyFilename: './keyfile.json'
        // apiEndpoint: "localhost:8081"
      })
    } else {
      this.datastore = datastore({
        projectId: "seopluggedhq",
        namespace: namespace,
        keyFilename: './keyfile.json'
        // apiEndpoint: "localhost:8081"
      })
    }
  }
}

module.exports = ds