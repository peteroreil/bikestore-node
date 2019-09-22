define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home.html'
], ($, _, Backbone, homeTemplate) => {
    const HomeView = Backbone.View.extend({
        initialize: function () {
            this.el = $('.container');
            this.template = _.template(homeTemplate);
            $(this.el).html(this.template);
        },
        render: function () {
            $('.container').empty();
			$(this.el).html(this.template);
        }
    });

    return HomeView;
});
