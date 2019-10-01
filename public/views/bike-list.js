define([
  'jquery',
  'underscore',
  'backbone',
  'views/bike-list-item',
  'text!templates/bike-list.html'
], ($, _, Backbone, BikeListItemView, bikesListTemplate) => {
    const ListView = Backbone.View.extend({
        initialize: function () {
            this.el = $('.container');
            this.template = _.template(bikesListTemplate);
            $(this.el).html(this.template);
        },
        render: function (searchTerm) {
            this.$el.find('.container').empty();
            $(this.el).html(this.template);
            this.getCollection(searchTerm, (collection) => {
                collection.forEach((model) => {
                    new BikeListItemView({ model }).render()
                })
            });
        },
        getCollection: function (searchTerm, callback) {
            this.collection.fetch({
                success: (collection) => {
                    let filteredCollection = collection;
                    if (searchTerm) {
                        filteredCollection = collection.filter((model) => {
                            let lcSearchTerm = searchTerm.toLowerCase();
                            let lcModelName = model.get('name').toLowerCase();
                            return lcModelName.includes(lcSearchTerm);
                        });
                    }
                    return callback(filteredCollection);
                }
            });

        }
    });

    return ListView;
});
