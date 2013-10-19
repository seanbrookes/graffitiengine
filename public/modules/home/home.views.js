/**
 * Graffiti Engine
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1','marionette'],
    function(sf1, Marionette){

        var indexView = Backbone.Marionette.CompositeView.extend({
                template:'#IndexTemplate'
            }
        );
        var indexDefaultLayout = Backbone.Marionette.Layout.extend({
            template:'#IndexLayoutTemplate',
            regions:{
                container:'.view-index',
                recentPostRegion:'[data-region="recentPostRegion"]'
            }
        });
        return {
            IndexView:indexView,
            IndexLayout:indexDefaultLayout
        };
    }
);