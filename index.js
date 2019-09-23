'use strict';

const path = require('path');
const express = require('express');
const config = require('config');

const ImageWriter = require('./services/imageWriter');
const BikeService = require('./services/bikes');
const BikeRoutes = require('./routes/bikes');

const imageService = new ImageWriter();
const bikeService = new BikeService(config.mongo);
const bikes = new BikeRoutes(bikeService, imageService);
const app = express();

const port = config.server.port;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb'}));
app.get('/bikes', bikes.findAll.bind(bikes));
app.get('/bikes/:id', bikes.findById.bind(bikes));
app.delete('/bikes/:id', bikes.deleteBike.bind(bikes));
app.put('/bikes/:id', bikes.update.bind(bikes));
app.post('/bikes', bikes.addBike.bind(bikes));

bikeService.init()
    .then(() => {
        app.listen(port, () => {
            console.log(`application listening on port: ${port}`);
        });
    });
