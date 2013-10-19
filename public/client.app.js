/**
 * Simple Framework One

 * User: sean
 * Date: 11/12/12
 * Time: 10:43 PM
 *
 *
 * client-app
 *
 *
 */
// Client App
define(['jquery', 'marionette', 'sf1','router','app'],
    function($, Marionette, sf1,Router,app){


        /*
        *
        * context is initialized
        *
        * start the application
        *
        * (from main.js)
        * */
        sf1.EventBus.bind('app.contextInitSuccess',
            function(){


                sf1.app.addInitializer(function(options){
                    // do useful stuff here
                    sf1.router = new Router.AppRouter();

                });

                sf1.app.on("initialize:after", function(){
                    if (Backbone.history){
                        Backbone.history.start(
                           // { pushState: true }
                        );
                    }

                });


                // app currently declared in scripts/sf1.0.2.js
                sf1.app.start();

            }
        );


        // constructor function
        // create a new scoped instance of a content load request
        // to make sure no competing load content requests collide
        var RegionContentLoaderRequest = function(req){
            var that = this;
            that.region = req.region; //'sf1.app.mainContentRegion',
            that.module = req.module; // :'score',
            that.view = req.view; // 'SummaryView'
            that.data = req.data;
            that.callback = req.callback;

            require([that.module],function(mod){

                var targetRegion = sf1.app[that.region];

                targetRegion.show(mod[that.view](that.data));

                if (that.callback){
                    that.callback();
                }

            });
        };
        /*
         *
         * App Event Listeners
         *
         *
         *   LOAD REGION CONTENT REQUEST
         *
         * */
        sf1.EventBus.bind('ia.loadRegionContentRequest',function(obj){

            // scope the request object
            var localVal = obj;
            var loadRequest = new RegionContentLoaderRequest(localVal);


        });

        return {
            sf1:sf1
        };

    }
);





