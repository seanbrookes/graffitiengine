/**
 * Graffiti Engine
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1', 'marionette'],
  function (sf1, Marionette) {


    var indexView = Backbone.Marionette.CompositeView.extend({
        template: '#IAIndexTemplate'

      }
    );
    var mainNavView = Backbone.Marionette.ItemView.extend({
      template: '#IAMainNavTemplate',
      tagName: 'nav',
      className: 'nav-h'
    });
    var navItemView = Backbone.Marionette.ItemView.extend({
      template: '#NavItemTemplate',
      tagName: 'li'
    });

    /*
     * GlobalNavView
     *
     * */
    var globalNavView = Backbone.Marionette.CompositeView.extend({
      template: '#IAGlobalNavTemplate',
      itemViewContainer: 'ul',
      itemView: navItemView,
      onShow: function (event) {
        $('.global-nav-container').i18n();
        $('[data-i18n="ia.signup"]').hide();

        sf1.EventBus.trigger('ia.configureGreetingRequest');
      }
    });


    var indexDefaultLayout = Backbone.Marionette.Layout.extend({
      template: '#IAIndexLayoutTemplate',
      regions: {
        container: '.view-index'
      }
    });
    return {
      IndexView: indexView,
      IndexLayout: indexDefaultLayout,
      MainNavView: mainNavView,
      GlobalNav: globalNavView

    };


  }
);