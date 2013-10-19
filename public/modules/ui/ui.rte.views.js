/**
 * fourfivesix
 *
 * User: sean
 * Date: 08/06/13
 * Time: 10:13 PM
 *
 */
define(['sf1','marionette'],
    function(sf1, Marionette){

        var rteView = Backbone.Marionette.CompositeView.extend({
                template:'#UIRTETemplate',
                events:{
                    'blur #wysihtml5-textarea':function(event){
                        sf1.logger.info('EDITOR ON KEY UP uauaasdfasdfasdfuuooooo!!!');
                    },
                    'keyUp #wysihtml5-textarea':function(event){
                        sf1.logger.info('EDITOR ON KEY UP uauaasdfasdfasdfuuooooo!!!');
                    }
                }
            }
        );

        return {
            RTEView:rteView
        };
    }
);