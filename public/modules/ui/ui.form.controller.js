/**
 * Greenfinger
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:57 PM
 *
 */
define(['sf1','modules/ui/ui.form.models','modules/ui/ui.form.views','text!modules/ui/ui.form.templates.html'],
    function(sf1, Model, View, template){
        var anchorSelector = '#TemplateContainer';

        _.templateSettings.variable = 'S';
        var baseMarkup = $(template);
        // attach the module template markup to the DOM
        $(anchorSelector).append(baseMarkup);

        var indexView = function(){
            var targetLayoutView = new View.IndexLayout();
            targetLayoutView.render();


            var targetView = new View.IndexView();
           // targetLayoutView.container.show(targetView);

            var indexContainerRegion = new Backbone.Marionette.Region({
                el: ".view-index"
            });

            targetLayoutView.on('show',function(layout){
                indexContainerRegion.show(targetView)
            });

            return targetLayoutView;
        };

        return{
            IndexView:indexView,
            UIButton:View.UIButton,
            UIForm:View.UIForm,
            UIFormText:View.UIFormText,
            UIDataList:View.UIFormDataList,
            DataListModel:Model.UIFormDataList,
            DataListOptionCollection:Model.UIFormDataListOptionCollection,
            UIButtonModel:Model.UIButton
        };
    }
);