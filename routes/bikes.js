'use strict';

function BikeRoutes(bikeService) {
    this.service = bikeService;

    this.findAll = function (req, res, next) {
        this.service.findAll()
            .then((all) => {
                const status = all.length ? 200 : 404;
                return res.status(status).json(all);
            }).catch(next);
    };

    this.findById = function (req, res, next) {
        return this.service.findById(req.params.id)
            .then((bike) => {
                const status = bike ? 200 : 404;
                return res.status(status).json(bike);
            }).catch(next);
    };

    this.deleteBike = function (req, res, next) {
        return this.service.deleteById(req.params.id)
            .then(() => res.status(204).send())
            .catch(next);
    };

    this.update = function (req, res, next) {
        const bike = req.body;
        /* eslint-disable no-underscore-dangle */
        delete bike._id;
        return this.service.update(req.params.id, bike)
            .then(updatedBike => res.status(200).json(updatedBike))
            .catch(next);
    };

    this.addBike = function (req, res, next) {
        const bike = req.body;
        return this.service.add(bike)
            .then(addedBike => res.status(200).json(addedBike))
            .catch(next);
    };
}

module.exports = BikeRoutes;
