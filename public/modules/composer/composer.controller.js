/**
 * Graffiti Engine
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:57 PM
 *
 */
define(['sf1','uiform','modules/composer/composer.models','modules/composer/composer.views','text!modules/composer/composer.templates.html','tabs'],
    function(sf1, Form, Model, View, template){
        var anchorSelector = '#TemplateContainer';

        _.templateSettings.variable = sf1.tplKey;
        var baseMarkup = $(template);
        // attach the module template markup to the DOM
        $(anchorSelector).append(baseMarkup);

        var indexView = function(){
            var targetLayoutView = new View.IndexLayout();

            targetLayoutView.render();

            targetLayoutView.on('show',function(layout){

                this.layoutMenuRegion.show(new View.LayoutChooser());
                this.formMenuRegion.show(new View.FormChooser());
                this.viewMenuRegion.show(new View.ViewChooser());
                //this.codeEditorRegion.show(new View.CodeEditor());
                this.demoDataListRegion.show(new Form.UIDataList({
                    model:new Form.DataListModel({
                        label:'Demo Data List',
                        i18n:'composer.demoDataList',
                        inputId:'DemoDataList',
                        listId:'OptionList'
                    }),
                    collection:new Form.DataListOptionCollection([
                        {
                            label:'ppk',
                            value:'ppk',
                            display:'ppk'
                        },
                        {
                           label:'sean',
                           value:'sean',
                           display:'sean'
                        },
                        {
                           label:'ppx',
                           value:'ppx',
                           display:'ppx'
                        }
                    ])
                }));

            });

            return targetLayoutView;
        };

        return{
            MainView:indexView
        };
    }
);



//var targetView = new Form.UIForm();
//var textField = new Form.UIFormText();
//
//var codeButton = new Form.UIButton({
//    model:new Form.UIButtonModel({text:'Code Button'}),
//    attributes:{class:'btn-post-code'}
////                postCodeFromComposer:function(){
////                    sf1.log('|| - Post Code Button Clicked Event ');
////                },
////                events:{
////                    'click .btn-post-code':'postCodeFromComposer'
////                }
//
//});