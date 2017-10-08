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
                    elev: record._fields[0].properties.elev.low 
                });
            });
            
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
   
});

module.exports = router;