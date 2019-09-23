define([
    'jquery',
    'underscore',
    'backbone',
    'views/header',
    'views/home',
    'collections/bikes',
    'views/bike-list',
    'models/bike',
    'views/bike-detail',
    'views/bike-add'
], ($, _, Backbone, HeaderView, HomeView, BikeCollection, BikeListView, BikeModel, BikeDetailView, BikeAddView) => {
    const Router = Backbone.Router.extend({
      	routes: {
            '': 'home',
            'bikes': 'listBikes',
            'bikes/add': 'addBike',
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
            console.log('get bike called');
            const model = new BikeModel({ _id: bikeId });
            const bikeDetailView = new BikeDetailView({ model });
            bikeDetailView.render();
        },

        addBike: function() {
            console.log('add bike called');
            const model = new BikeModel();
            const bikeDetailView = new BikeAddView({ model })
            bikeDetailView.render();
        }
    });
	return Router;
});
