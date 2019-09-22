require.config({
    paths: {
        jquery: '../lib/jquery',
        underscore: '../lib/underscore-min',
        backbone: '../lib/backbone-min',
        templates: '../templates',
        views: '../views',
        models: '../models',
        collections: '../collections'
    }
});

require(['app'], function(app) { app.start(); });
