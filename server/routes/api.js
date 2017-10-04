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
        .run('MATCH(n:Layer) RETURN n LIMIT 25') 
        .then((layers) => {
            response.data = layers;
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
   
});

module.exports = router;