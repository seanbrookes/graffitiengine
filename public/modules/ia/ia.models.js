/**
 * Greenfinger
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1','backbone', 'text!/modules/ia/config.json'],
    function(sf1, Backbone, config){
        /*
         * initialize data store mdel
         *
         * */
        var navConfigObj = JSON.parse(config);

        /*
         * Nav Item Model / Collection
         *
         * */
        var NavItemModel = Backbone.Model.extend({});
        var NavItemCollection = Backbone.Collection.extend({
            model: NavItemModel
        });

        return {
            getGlobalNavConfig:function(){
                return navConfigObj.globalNav;
            },
            getMainNavConfig:function(){
                return navConfigObj.mainNav;
            },
            NavItemCollection:NavItemCollection
        };

    }
);