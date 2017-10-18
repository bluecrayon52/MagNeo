const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'magneo'));  


const session = driver.session();

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get layers 
router.get('/layers', (req, res) => {
    session 
        .run('MATCH(n:Layer) RETURN n') // return all layers 
        .then((layers) => {
            layers.records.forEach((record) => {
                response.data.push({
                    name: record._fields[0].properties.name, 
                    lat: record._fields[0].properties.lat,
                    long: record._fields[0].properties.long, 
                    elev: record._fields[0].properties.elev.low,
                    g1: record._fields[0].properties.g1,
                    g2: record._fields[0].properties.g2,
                    g3: record._fields[0].properties.g3
                });
            });
            
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
   
});

// get a single Layer 
router.getLayer('/layer', (req, res) => {
    session 
        .run('MATCH(n:Layer {name:"' +req.params.node+ '"}) RETRURN n')  
        .then((layer) => {
                response.data.push({
                    name: layer.record._fields[0].properties.name, 
                    lat: layer.record._fields[0].properties.lat,
                    long: layer.record._fields[0].properties.long, 
                    elev: layer.record._fields[0].properties.elev.low 
                });
            
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
   
});

// create a single Relationship
router.setRel('/rel', (req, res) => {
    session 
        .run('MATCH(n1:Layer {name:"' +req.params.node1+ '"})\
              MATCH(n2:Layer {name:"' +req.params.node2+ '"})\
              CREATE (n1)-[r:'+req.params.rel+']->(n2)\
              RETURN n1,r,n2')  
        .then((data) => {
                response.data.push({
                    data:data       // not sure about formatting just yet  
                });
            
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
   
});

module.exports = router;