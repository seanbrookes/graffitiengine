/**
 * Graffiti Engine
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['backbone', 'marionette', 'modules/app/app.views', 'text!modules/app/app.templates.html'],
  function (sf1, Marionette, View, template) {


    var BaseLayout = Backbone.Marionette.Layout.extend({
        template: '#BaseTemplate',
        className: 'container'
//                regions: {
//                    appMainRegion: '.app-main',
//                    appHeaderRegion:'.app-header',
//                    appFooterRegion:'.app-footer',
//                    mainNavRegion:'.main-nav'
//                }
      }
    );

    return {
      BaseLayout: BaseLayout

    };


  }
);