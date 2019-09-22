define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header.html'
], ($, _, Backbone, headerTemplate) => {
    const HeaderView = Backbone.View.extend({
        initialize: function () {
            this.el = $('#header');
            this.template = _.template(headerTemplate);
            $(this.el).html(this.template);
        },
        render: function () {
            $('#header').empty();
			$(this.el).html(this.template);
        }
    });

    return HeaderView;
});
