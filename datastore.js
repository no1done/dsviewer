"use strict"

const datastore = require("@google-cloud/datastore")
const conf = require("./config/env")

class ds {
  constructor(namespace = false) {
    if (!namespace) {
      this.datastore = datastore({
        projectId: "datastore-dev",
        apiEndpoint: "localhost:8081"
      })
    } else {
      this.datastore = datastore({
        projectId: "datastore-dev",
        namespace: namespace,
        apiEndpoint: "localhost:8081"
      })
    }
  }
}

module.exports = ds