/**
 * Graffiti Engine

 * User: sean
 * Date: 11/12/12
 * Time: 10:43 PM
 *
 */
// Router
define(['sf1','marionette','app'],
    function(sf1,Marionette,app){


        /*
         *
         * Initialize the AppRouter
         *
         *
         *  pass in a config object from app module
         * */
        var AppRouter = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                ""          : "index",
                "home"      : "index",
                "login"     : "login",
                "signup"    : "signup",
                "admin"     : "admin",
                "security"  : "security",
                "post"      : "post",
                "post/edit/:slug"   : "postEdit",
                "composer"  : "composer",
                "user"      : "user"
            },
            controller: app.getRouterConfig()

        });
        return {
            AppRouter:AppRouter
        };
    }
);





