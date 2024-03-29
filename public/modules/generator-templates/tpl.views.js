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
                template:'#TplIndexTemplate'

            }
        );



        var indexDefaultLayout = Backbone.Marionette.Layout.extend({
            template:'#TplIndexLayoutTemplate',
            regions:{
                container:'.view-index'
            }
        });
        return {
            IndexView:indexView,
            IndexLayout:indexDefaultLayout

        };



    }
);