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
        render: function () {
            $('.container').empty();
            $(this.el).html(this.template);
            this.collection.fetch({
                success: (collection) => {
                    collection.forEach(model => new BikeListItemView({ model }).render())
                }
            });
        }
    });

    return ListView;
});
