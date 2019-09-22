// 'jquery', 'underscore', 'backbone', =>
define([
    'jquery',
    'underscore',
    'backbone',
    'views/header',
    'views/home',
    'collections/bikes',
    'views/bike-list',
    'models/bike',
    'views/bike-detail'
], ($, _, Backbone, HeaderView, HomeView, BikeCollection, BikeListView, BikeModel, BikeDetailView) => {
    const Router = Backbone.Router.extend({
      	routes: {
            '': 'home',
            'bikes': 'listBikes',
            'bikes/:id': 'getBike'
        },

		initialize: function() {
			const headerView = new HeaderView();
			headerView.render();
		},

		home: function() {
			const homeView = new HomeView();
			homeView.render();
		},

        listBikes: function() {
            const bikeCollection = new BikeCollection();
            const bikesView = new BikeListView({ collection: bikeCollection });
            bikesView.render();
        },

        getBike: function(bikeId) {
            const model = new BikeModel({ _id: bikeId });
            const bikeDetailView = new BikeDetailView({ model });
            bikeDetailView.render();
        }
    });
	return Router;
});
