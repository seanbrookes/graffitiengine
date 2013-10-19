/**
 * Graffiti Engine
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:57 PM
 *
 *
 *
 * removed to avoid new accounts being created but might be
 *
 * might be needed in the futuer
 *
 {
     "renderRules":[
         {
             "isAuth":false
         }
     ],
     "href":"#signup",
     "cssClasses":[
         "global-nav-item"
     ],
     "dataAttribs":[
         {
             "name":"route",
             "value":"signup"
         },
         {
             "name":"i18n",
             "value":"ia.signup"
         }
     ],
     "i18nKey":"ia.signup",
     "title":"iaI18n.k18SignUp",
     "name":"iaI18n.k18SignUp"
 }
 *
 *
 *
 *
 */
define(['sf1','modules/ia/ia.models','modules/ia/ia.views','text!modules/ia/ia.templates.html'],
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
                indexContainerRegion.show(targetView);

            });
            //targetLayoutView.container.show(targetView);

            return targetLayoutView;
        };

        /*
        *
        * MAIN NAV VIEW
        *
        * */
        var MainNavView = function(){
            return new View.MainNavView();
        };
        /*
         *
         * GLOBAL NAV VIEW
         *
         * */
        var globalNavView = function(){
            var globalNavView = new View.GlobalNav({
                collection:new Model.NavItemCollection(Model.getGlobalNavConfig())
            });
            return globalNavView;
        };

        /*
        *
        *   EVENT BINDINGS
        *
        *
        *
        *
        *
        * ISAUTH - CONFIGURE GREETING IF USER IS AUTHENTICATED
        *
        *
        * */
        sf1.EventBus.bind('ia.configureGreetingRequest',function(event){
            sf1.logger.info('inside configureGreetingRequest');
            $.ajax({
                type:'GET',
                url:'/isauth',
                success:function(response){
                    sf1.logger.info(response);
                    /*
                     *
                     * tighten this up (event pub/sub)
                     *
                     * */
                    if (response.isAuthenticated){
                        $('[data-i18n="ia.login"]').text('hello ' + response.userName + ' (logout)');
                        $('[data-i18n="ia.login"]').click(function(event){
                            event.preventDefault();
                            sf1.EventBus.trigger('ia.logoutRequest');
                        });
                    }
                    else{
                        sf1.EventBus.trigger('route-event',{route:'login'});
                        $('[data-i18n="ia.login"]').text('login');
                        $('[data-i18n="ia.login"]').click(function(event){
                            event.preventDefault();
                            document.location.href = "#login";
                        });
                    }
                },
                error:function(response){
                    sf1.logger.error(response);
                }
            });
        });
        /*
        *
        * LOGOUT REQUEST
        *
        * */
        sf1.EventBus.bind('ia.logoutRequest',function(event){
            $.ajax({
                type:'GET',
                url:'/logout',
                success:function(response){
                    sf1.logger.info(response);
                    if (response.isAuthenticated){
                        $('[data-i18n="ia.login"]').text('hello ' + response.userName + ' (logout)');
                        $('[data-i18n="ia.login"]').click(function(event){
                            event.preventDefault();
                            sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                                region:'appMainRegion',
                                module:'home',
                                view:'IndexView'
                            });
                            //sf1.EventBus.trigger('ia.logoutRequest');
                        });
                    }
                    else{

                        sf1.EventBus.trigger('route-event',{route:'login'});
                        $('[data-i18n="ia.login"]').text('login');
                        $('[data-i18n="ia.login"]').click(function(event){
                            event.preventDefault();
                            document.location.href = '#login';
                        });
                    }
                },
                error:function(response){
                    sf1.logger.error(response);
                }
            });
        });

        return{
            IndexView:indexView,
            MainNavView:MainNavView,
            GlobalNavView:globalNavView
        };
    }
);