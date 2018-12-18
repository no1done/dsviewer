"use strict"

const datastore = require("@google-cloud/datastore")
const projectId = process.env.DATASTORE_PROJECT_ID
const endpoint = process.env.DATASTORE_LISTEN_ADDRESS

class ds {
  constructor(namespace = false) {
    if (!namespace) {
      this.datastore = new datastore({
        projectId: projectId,
        apiEndpoint: endpoint
      })
    } else {
      this.datastore = new datastore({
        projectId: projectId,
        namespace: namespace,
        apiEndpoint: endpoint
      })
    }
  }
}

module.exports = ds
