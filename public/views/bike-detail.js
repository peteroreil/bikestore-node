define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/bike-detail.html',
  'views/bike-list'
], ($, _, Backbone, bikeDetailTemplate, bikeListView) => {
    const ListView = Backbone.View.extend({
        events: {
            'click .bike-edit': 'edit',
            'submit': 'update',
            'click .bike-delete': 'delete'
        },

        initialize: function () {
            Backbone.on('bikeDeleted')
            this.el = $('.container');
            this.template = _.template(bikeDetailTemplate);
            _.bindAll(this, 'render', 'renderSuccess');
        },

        render: function () {
            $('.container').empty();
            this.delegateEvents();
            this.model.fetch({
                success: this.renderSuccess
            });
        },

        renderSuccess: function(model) {
            this.$el.html(this.template(model.toJSON()));
            $(this.el).html(this.$el);
        },

        edit: function() {
            $('input[readonly]')
                .each((i, input) => $(input).attr('readonly', false));
            $('.bike-submit').attr('hidden', false);
            $('.bike-edit').attr('disabled', true);
        },

        update: function(event) {
            event.preventDefault();
            $('input.bike-detail')
                .map((i, input) => {
                    const prop = {};
                    const key = $(input).attr('id');
                    prop[key] = $(input).val() ?
                        $(input).val() : $(input).attr('placeholder');
                    return prop;
                }).each((i, prop) => {
                    this.model.set(prop)
                });

            this.model.save(null, {
                success: this.render
            });
        },

        delete: function(event) {
            event.preventDefault();
            this.model.destroy({
                success: () => Backbone.trigger('bikeDeleted')
            })

        }

    });

    return ListView;
});
