'use strict';

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// seed data to populate db
const seedData = require('./seed');

function BikeService(mongoConfig) {
    const mongoUrl = mongoConfig.url;
    const mongoDbName = mongoConfig.name;
    let mongoDb = null;

    // Seed MongoDb with data if required
    function seed(db) {
        const collection = db.collection('bikes');
        return collection.find({}).toArray()
            .then((bikes) => {
                if (bikes.length >= 1) return false;
                return collection.insertMany(seedData);
            });
    }

    this.init = async function () {
        return MongoClient.connect(mongoUrl, { useNewUrlParser: true })
            .then(client => client.db(mongoDbName))
            .then((db) => {
                mongoDb = db;
                return db;
            })
            .then(seed);
    };

    this.findAll = function () {
        return mongoDb.collection('bikes')
            .find({}).toArray();
    };

    this.findById = function (id) {
        return mongoDb.collection('bikes')
            .findOne({ _id: new ObjectId(id) });
    };

    this.deleteById = function (id) {
        return mongoDb.collection('bikes')
            .remove({ _id: new ObjectId(id) });
    };

    this.update = function (id, bike) {
        const filter = { _id: new ObjectId(id) };
        return mongoDb.collection('bikes')
            .update(filter, bike)
            .then(() => mongoDb.collection('bikes').findOne(filter));
    };

    this.add = function (bike) {
        delete bike.base64image;
        return mongoDb.collection('bikes')
            .insertOne(bike)
            .then(res => res.ops[0]);
    };
}

module.exports = BikeService;
