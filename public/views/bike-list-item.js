define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/bike-list-item.html'
], ($, _, Backbone, bikesListItemTemplate) => {
    const ListView = Backbone.View.extend({
        initialize: function () {
            this.el = $('#bike-list');
            this.template = _.template(bikesListItemTemplate);
        },
        render: function () {
            $(this.el).append(this.template(this.model.toJSON()));
        }
    });

    return ListView;
});
