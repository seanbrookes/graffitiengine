/**
 * Greenfinger
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1','marionette'],
    function(sf1, Marionette){

        _.templateSettings.variable = 'S';
        var indexView = Backbone.Marionette.CompositeView.extend({
                template:'#UIFormIndexTemplate'

            }
        );

        var uiForm = Backbone.Marionette.CompositeView.extend({
            template:'#UIFormTemplate',
            tagName:'form',
            attributes: function() {
                return{
                    'method':'POST',
                    'class':'ui-form'
                };
            }

        });
        var uiButton = Backbone.Marionette.CompositeView.extend({
            template:'#UIButtonTemplate',
            tagName:'button',
            attributes: function() {
                return{
                    'class':'btn btn-round'
                }
            }

        });
        var uiFormText = Backbone.Marionette.ItemView.extend({
            template:'#UIFormFieldTextTemplate',
            tagName:'input',
            attributes: function() {
                return {
                    'data-id': 'test',
                    'type' : 'text'
                };
            }
        });
        var uiForm = Backbone.Marionette.CompositeView.extend({
            template:'#UIFormTemplate',
            tagName:'form',
            attributes: function() {
                return{
                    'method':'POST',
                    'class':'ui-form'
                }
            }

        });
        var uiFormText = Backbone.Marionette.ItemView.extend({
            template:'#UIFormFieldTextTemplate',
            tagName:'input',
            attributes: function() {
                return {
                    'data-id': 'test',
                    'type' : 'text'
                };
            }
        });
        var indexDefaultLayout = Backbone.Marionette.Layout.extend({
            template:'#UIFormIndexLayoutTemplate',
            regions:{
                container:'.view-index'
            }
        });
        var uiFormDataListOption = Backbone.Marionette.ItemView.extend({
            template:'#UIFormDataListOptionTemplate'
        });
        var uiFormDataList = Backbone.Marionette.CompositeView.extend({
            template:'#UIFormDataListTemplate',
            itemView:uiFormDataListOption,
            itemViewContainer:'datalist'
        });
        return {
            IndexView:indexView,
            IndexLayout:indexDefaultLayout,
            UIForm:uiForm,
            UIButton:uiButton,
            UIFormText:uiFormText,
            UIFormDataList:uiFormDataList
        };



    }
);