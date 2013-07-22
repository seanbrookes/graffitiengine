// Set the require.js configuration for your application.
requirejs.config({
	baseUrl: '/public',
	// Initialize the application with the main application file
	//deps: ["main"],

    paths: {
        'jquery'        : 'scripts/lib/jquery-1.8.2.min',
        'cookie'        : 'scripts/lib/plugins/jquery.cookie',
        'tabs'          : 'scripts/lib/plugins/kube.tabs',
        'rtelib'        : 'scripts/lib/ckeditor/ckeditor',
        'prettydate'    : 'scripts/lib/plugins/jquery.prettydate',
        'contextmenu'   : 'scripts/lib/plugins/jquery.contextmenu',
        'underscore'    : 'scripts/lib/underscore',
        'json2'         : 'scripts/lib/json2',
        'i18n'          : 'scripts/lib/i18next.amd-1.6.0',
        'backbone'      : 'scripts/lib/backbone',
        'marionette'    : 'scripts/lib/backbone.marionette',
        'bootstrap'     : 'bootstrap/js/bootstrap',
        'client'        : 'client.app',
        'app'           : 'modules/app/app.controller',
        'sf1'           : 'scripts/sf1.0.2',
        'security'      : 'modules/security/security.controller',
        'admin'         : 'modules/admin/admin.controller',
        'post'          : 'modules/post/post.controller',
        'index'         : 'modules/index/index-module',
        'home'          : 'modules/home/home.controller',
        'io'            : 'modules/io/io-module',
        'ui'            : 'modules/ui/ui-module',
        'uirte'         : 'modules/ui/ui.rte.controller',
        'uiform'        : 'modules/ui/ui.form.controller',
        'ia'            : 'modules/ia/ia.controller',
        'router'        : 'router',
        'ca'            : 'client.app',
        'eventbus'      : 'eventbus',
        'raphael'       : 'scripts/lib/raphael-min',
        'd3'            : 'scripts/lib/d3.v3.min',
        'morris'        : 'scripts/lib/morris.min',
        'composer'      : 'modules/composer/composer.controller',
        'user'          : 'modules/user/user.controller',
        'modal'         : 'scripts/lib/plugins/jquery.simplemodal-1.4.4',
        'chai'            : '/tests/libs/chai',
        'mocha.common'    : '/tests/libs/mocha.common'




    },
    shim: {

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette : {
            deps : ['backbone','underscore','jquery'],
            exports : 'Marionette'
        },
        underscore: {
            exports: '_'
        },
        i18n: {
            deps: ['jquery'],
            exports: 'i18n'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        sf1: {
            deps: ['jquery'],
            exports: 'sf1'
        },
        prettydate: {
            deps: ['jquery']
        },
        contextmenu: {
            deps: ['jquery']
        },
        cookie: {
            deps: ['jquery']
        },
        raphael:{
            deps: ['jquery'],
            exports: 'Raphael'
        },
        morris: {
            deps: ['jquery','raphael'],
            exports: 'Morris'
        },
        d3: {
            exports: 'd3'
        }
    }
});

mocha.setup({
    ui: 'bdd',
    ignoreLeaks: true
});

// Protect from barfs
console = window.console || function() {};

// Don't track
window.notrack = true;

// Helper... not really needed but in case we want to do something fancy
var runMocha = function() {
	if (window.mochaPhantomJS) { 
		mochaPhantomJS.run(); 
	} else { 
		mocha.run(); 
	}
};
