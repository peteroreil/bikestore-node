define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header.html'
], ($, _, Backbone, headerTemplate) => {
    const HeaderView = Backbone.View.extend({

        events: {
            'click .search-bike': 'searchBike',
            'click .navigation-menu': 'setActiveMenu'
        },

        initialize: function (params) {
            this.bikesView = params.bikesView;
            this.el = $('#header');
            this.template = _.template(headerTemplate);
        },

        render: function () {
            $('#header').empty();
            this.delegateEvents();
            this.$el.html(this.template);
            $(this.el).html(this.$el);
        },

        searchBike: function (event) {
            event.preventDefault();
            const searchTerm = $('input.bikeSearch').val();
            this.bikesView.render(searchTerm);
            $('.navigation-menu li').each((i, el) => { $(el).removeClass('active') });
            Backbone.history.navigate('/#bikes')
        },

        setActiveMenu: function (event) {
            $('.navigation-menu li').each((i, el) => { $(el).removeClass('active') });
            $(event.srcElement).parent().addClass('active');
        }
    });

    return HeaderView;
});
