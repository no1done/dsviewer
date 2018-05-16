const express = require('express')
const app = express()
const path = require('path'); 
const Datastore = require('./datastore');
const useragent = require('useragent');
const https = require('https');

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

app.get('/', function (req, res) {
    
    let datastore = new Datastore(null).datastore;    

    // Query for namespace and pass through
    let startKey = datastore.key(['__namespace__', '1']);
    let endKey = datastore.key(['__namespace__', 'zzzz']);

    let query = datastore
        .createQuery('__namespace__')
        .select('__key__')
        .filter('__key__', '>=', startKey)
        .filter('__key__', '<', endKey);

    datastore.runQuery(query).then(results => {

        const entities = results[0];
        const namespaces = entities.map(
            entity => entity[datastore.KEY].name
        );

        res.render('index', {
            namespaces: namespaces
        });
    });

});

app.get('/filter/:namespace', function (req, res) {

    let namespace = req.params.namespace;
    let datastore = new Datastore(namespace).datastore; 

    // Query for kinds under this namespace
    const query = datastore.createQuery('__kind__').select('__key__');

    return datastore.runQuery(query).then(results => {
        const entities = results[0];
        const kinds = entities.map(entity => entity[datastore.KEY].name);

       res.render('kinds', {
           namespace: namespace,
           kinds: kinds
       }); 
    });
});

app.get('/filter/:namespace/:kind', function (req, res) {

    // List entities

    let namespace = req.params.namespace;
    let kind = req.params.kind;
    let datastore = new Datastore(namespace).datastore; 

    // Query for kinds under this namespace
    const query = datastore.createQuery(kind);

    datastore.runQuery(query).then(async results => {
        // entities found.
        const entities = results[0];

        let headers = await sortHeaders(entities);

        return res.render('entities', {
            namespace: namespace,
            kind: kind,
            entities: entities,
            headers: headers
        });
    });
});

app.delete('/entity/:namespace/:kind/:id', function (req, res) {

    let namespace = req.params.namespace;
    let kind = req.params.kind;
    let entityId = req.params.id;
    let datastore = new Datastore(namespace).datastore; 

    // Query for kinds under this namespace
    const query = datastore.createQuery(kind);

    datastore.runQuery(query).then(async results => {
        // entities found.
        const entities = results[0];

        //console.dir(entities);
        let keys = [];

        for (i = 0;i < entities.length; i++) {

            keys.push(entities[i][datastore.KEY]);
        }

        datastore.delete(keys).then(() => {
            // Tasks deleted successfully.
            res.send('done');
        });

    });
});

function sortHeaders(entities) {

    return new Promise((resolve, reject) => {

        let headers = [];

        entities.forEach(entity => {
            Object.keys(entity).forEach(function(key) {

                if (headers.includes(key) == false) {
                    headers.push(key);
                }
            });
        });

        resolve(headers);
    });
}
 
app.listen(3001, function() {
    console.log('Running on port 80');
});
