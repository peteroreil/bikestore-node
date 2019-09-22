define([
    'jquery',
    'underscore',
    'backbone'
], ($, _, Backbone) => {
    const BikeModel = Backbone.Model.extend({
        idAttribute: '_id',
        url: function() { return `/bikes/${this.id}` }

    });
    return BikeModel;
});
