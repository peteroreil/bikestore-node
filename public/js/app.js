// 'jquery', 'underscore', 'backbone', => $, _, Backbone,
define(['router', 'backbone'], (Router, Backbone) => {
    const start = () => {
        const router = new Router();
        router.initialize();
        Backbone.history.start();
    };
    return { start };
});
