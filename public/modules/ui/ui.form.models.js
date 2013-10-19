/**
 * Greenfinger
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1','backbone'],
    function(sf1, Backbone){

        var uiButton = Backbone.Model.extend({});
        var uiFormDataList = Backbone.Model.extend({});
        var uiFormDataListOption = Backbone.Model.extend({});
        var uiFormDataListOptionCollection = Backbone.Collection.extend({});

        return {
            UIButton:uiButton,
            UIFormDataList:uiFormDataList,
            UIFormDataListOption:uiFormDataListOption,
            UIFormDataListOptionCollection:uiFormDataListOptionCollection
        };

    }
);