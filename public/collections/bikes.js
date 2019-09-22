define(['jquery',
  'backbone',
  'models/bike'
], ($, Backbone, BikeModel) => {
    const BikeCollection = Backbone.Collection.extend({
        url: '/bikes',
        model: BikeModel
    });

    return BikeCollection;
});
