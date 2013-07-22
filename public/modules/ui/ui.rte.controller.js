/**
 * Seanica
 *
 * User: sean
 * Date: 08/06/13
 * Time: 10:13 PM
 *
 */
define(['sf1','modules/ui/ui.rte.models','modules/ui/ui.rte.views','text!modules/ui/ui.rte.templates.html','rteconfig','rtelib'],
    function(sf1, Model, View, template,rteconfig){
        var anchorSelector = '#TemplateContainer';

        _.templateSettings.variable = 'S';
        var baseMarkup = $(template);
        // attach the module template markup to the DOM
        $(anchorSelector).append(baseMarkup);

        var mySettings = rteconfig;
        var rteView = function(){
            var rteComponentView = new View.RTEView();
            rteComponentView.on('show',function(){
                //CKEDITOR.replace( 'editor' );
                $("#sf1RTEEditor").markItUp(mySettings);
            });


            return rteComponentView;
        };

        return{
            RTE:rteView,
            RTEModel:Model.RTEModel
        };
    }
);