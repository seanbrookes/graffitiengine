/**
 * Graffiti Engine
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:57 PM
 *
 */
define(['sf1','modules/security/security.models','modules/security/security.views','text!modules/security/security.templates.html'],
    function(sf1, Model, View, template){
        var anchorSelector = '#TemplateContainer';

        _.templateSettings.variable = sf1.tplKey;
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
            //targetLayoutView.container.show(targetView);

            return targetLayoutView;
        };
        var loginView = function(){

            var targetView = new View.Login();

            return targetView;
        };
        var signUpView = function(){

            var targetView = new View.SignUp();

            return targetView;
        };
        return{
            IndexView:indexView,
            LoginView:loginView,
            SignUpView:signUpView
        };
    }
);