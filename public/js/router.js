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

    const bikeCollection = new BikeCollection();
    const bikesView = new BikeListView({ collection: bikeCollection });
	const homeView = new HomeView();
    const headerView = new HeaderView({ bikesView });

    const Router = Backbone.Router.extend({
      	routes: {
            '': 'home',
            'bikes': 'listBikes',
            'bikes/add': 'addBike',
            'bikes/:id': 'getBike'
        },

		initialize: function() {
            Backbone.on('bikeDeleted', this.bikeDeleted, this);
			headerView.render();
		},

		home: function() {
			homeView.render();
		},

        listBikes: function() {
            bikesView.render();
        },

        getBike: function(bikeId) {
            const model = new BikeModel({ _id: bikeId });
            const bikeDetailView = new BikeDetailView({ model });
            bikeDetailView.render();
        },

        addBike: function() {
            const model = new BikeModel();
            const bikeDetailView = new BikeAddView({ model })
            bikeDetailView.render();
        },

        bikeDeleted: function () {
            this.navigate('bikes', { trigger: true, replace: true })
        }
    });
	return Router;
});
