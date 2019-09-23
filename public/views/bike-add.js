define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/bike-add.html'
], ($, _, Backbone, bikeAddTemplate) => {
    const ListView = Backbone.View.extend({
        events: {
            'click .bike-edit': 'edit',
            'submit': 'create',
            'change #bike-image-file': 'renderFile'
        },

        initialize: function () {
            this.el = $('.container');
            this.template = _.template(bikeAddTemplate);
            _.bindAll(this, 'render', 'renderSuccess');
        },

        render: function () {
            $('.container').empty();
            this.delegateEvents();
            this.renderSuccess(this.model);
        },

        renderSuccess: function(model) {
            this.$el.html(this.template(model.toJSON()));
            $(this.el).html(this.$el);
        },

        renderFile: function(event) {
            console.log('event is firing')
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.model.set('base64image', event.target.result);
                $('#picture').attr('src', event.target.result);
            };

            reader.onerror = (e) => {
                console.log('error', e.message)
            }
            if (file) reader.readAsDataURL(file);
        },

        create: function() {
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
        }

    });

    return ListView;
});
