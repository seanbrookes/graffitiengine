/**
 * sf1
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:57 PM
 *
 */
define(['sf1','modules/admin/admin.models','modules/admin/admin.views','text!modules/admin/admin.templates.html'],
    function(sf1, Model, View, template){
        var anchorSelector = '#TemplateContainer';

        _.templateSettings.variable = sf1.tplKey;
        var baseMarkup = $(template);
        // attach the module template markup to the DOM
        $(anchorSelector).append(baseMarkup);


// old file ocde
        function init(){
            sf1.log('Admin module init');
            var baseMarkup = $(markup);
            $(anchorSelector).html(baseMarkup);
            var adminModuleContainer = $('script#AdminModuleContainer').html();

            var template = _.template(adminModuleContainer);

            var templateData = {};

            var templateMarkup = template( templateData );
            $('.main-content-wrapper').html(templateMarkup);


        }









        var indexView = function(){
            var targetLayoutView = new View.IndexLayout();
            targetLayoutView.render();


            var targetView = new View.IndexView();
           // targetLayoutView.container.show(targetView);

            var indexContainerRegion = new Backbone.Marionette.Region({
                el: ".view-index"
            });

            targetLayoutView.on('show',function(layout){
                indexContainerRegion.show(targetView);
                var pendingAccountRegion = new Backbone.Marionette.Region({
                   el:'div[data-region="pendingAccounts"]'
                });

                sf1.EventBus.bind('admin.pendingAccountsRequestSuccess',function(response){
                    pendingAccountRegion.show(new View.PendingAccounts({
                        collection:new Model.PendingAccounts(response)
                    }));
                });




            });
            //targetLayoutView.container.show(targetView);

            return targetLayoutView;
        };

        return{
            IndexView:indexView,
            PendingAccountsView:View.PendingAccounts
        };
    }
);