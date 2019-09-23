define([
    'jquery',
    'underscore',
    'backbone'
], ($, _, Backbone) => {
    const BikeModel = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: `/bikes`,

        defaults: {
            _id: null,
            name: 'name',
            country: 'country',
            brakes: 'brakes',
            description: 'description',
            type: 'type',
            picture: 'placeholder.jpg',
            thumbnail: 'thumbnail',
            price: '0.00',
            year: 'year'
        }

    });
    return BikeModel;
});
