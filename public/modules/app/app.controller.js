/**
 * Graffiti Engine
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:57 PM
 *
 */
define(['sf1','modules/app/app.models','modules/app/app.views','text!modules/app/app.templates.html', 'modal'],
    function(sf1,Model,View,template){

        var anchorSelector = '#TemplateContainer';


        _.templateSettings.variable = 'G';
        var baseMarkup = $(template);
        // attach the module template markup to the DOM
        $(anchorSelector).append(baseMarkup);

        /*
        *
        *   MODAL REGION
        *
        *   --  this has to move
        *   // TODO move this
        *
        *
        *
        * */
        var ModalRegion = Backbone.Marionette.Region.extend({
            el: '[data-region="modalWin"]',

            constructor: function(){
                _.bindAll(this);
                Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
                this.on("show", this.showModal, this);
                this.on("hide", this.hideModal, this);
            },

            getEl: function(selector){
                var $el = $(selector);
                $el.on("hidden", this.close);
                return $el;
            },
//
            showModal: function(view){
                //view.on("close", this.hideModal, this);
                sf1.logger.info('| Show Modal');
                // simplemodal-container

                // simplemodal-overlay DropZone

                this.$el.modal({
//                    overlayClose:true,
                    autoResize:true,
                    minWidth:700,
                    modal:true,
                    onShow:function(dialog){
                        //$(dialog.container).draggable();
                    },
                    onOpen: function (dialog) {
                        dialog.overlay.fadeIn('slow', function () {
                            dialog.data.hide();
                            dialog.container.fadeIn('slow', function () {
                                dialog.data.slideDown('slow');
                            });
                        });
                        $('#simplemodal-container').prop('draggable', true);
                        // drop
                        var drop = $('#simplemodal-overlay');
                        drop.ondrop = function (event){
                            var data = JSON.parse(event.dataTransfer.getData('text/plain'));
                            this.innerHTML += '<div class="test-layout" draggable="true" data-element="target-element" data-region-type="' + data.element + '">' + data.element + '</div>';
                            $('.test-layout')[0].ondrop= function(event){
                                sf1.logger.info('test layout is working');
                            };

                        };

                        // dragover
                        drop.ondragover = function () {
                            return false;
                        };
                    },
                    onClose: function (dialog) {
                        dialog.data.fadeOut('slow', function () {
                            dialog.container.hide('slow', function () {
                                dialog.overlay.slideUp('slow', function () {
                                    $.modal.close();
                                });
                            });
                        });
                    }
                });
            },

//            hideModal: function(){
//                this.$el.modal('hide');
//            },


            onShow:function(){
                //  this.showModal(this);
            },


//                showModal: function(view){
//                    view.on("close", this.hideModal, this);
//                    var $modalEl = $('#ModalWin');
//                    $modalEl.modal({overlayClose:true});
//                },

            hideModal: function(){
                this.$el.modal('hide');
            }
        });

        /*
        *
        * On Start
        *
        * */
        sf1.app.addInitializer(function(options){

            // in case we want to override the default
            sf1.tplKey = 'S';
            // do useful stuff here
            var baseLayout = new View.BaseLayout();
            baseLayout.render();
            sf1.app.addRegions({
                appMainRegion: '.app-main',
                appHeaderRegion:'.app-header',
                appFooterRegion:'.app-footer',
                mainNavRegion:'.main-nav',
                modalRegion: ModalRegion
            });

            sf1.app.viewPort.show(baseLayout);

            // load Main Nav in the header
            sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                region:'appHeaderRegion',
                module:'ia',
                view:'GlobalNavView'
            });
            sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                region:'mainNavRegion',
                module:'ia',
                view:'MainNavView'
            });

        });


       // var xyp = baseLayout.appMainRegion;

        // this should be moved to a model on the app module

        /*
        *
        *
        *   ROUTER
        *
        *
        * */
        var routerConfig = {
            index: function () {
                sf1.logger.info('index');
                sf1.EventBus.trigger('ia.mainNavEvent', [
                    {route: 'index'}
                ]);
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'home',
                    view:'IndexView'
                });
            },
            post: function () {
                sf1.logger.info('post');
                sf1.EventBus.trigger('ia.mainNavEvent', [
                    {route: 'post'}
                ]);
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'post',
                    view:'IndexView'
                });
            },
            postEdit: function (slug) {
                sf1.logger.info('post edit');
                sf1.EventBus.trigger('ia.mainNavEvent', [
                    {route: 'post/edit'}
                ]);
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'post',
                    view:'IndexView',
                    data:slug

                });

            },

            signup:function () {
                sf1.logger.info('signup route');
                sf1.EventBus.trigger('ia.mainNavEvent',{route:'signup'});
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'security',
                    view:'SignUpView'
                });

            },

            login:function () {
                sf1.logger.info('login route');
                sf1.EventBus.trigger('ia.mainNavEvent',{route:'login'});
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'security',
                    view:'LoginView'
                });

            },
            security:function(){
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'security',
                    view:'IndexView'
                });
            },

            admin:function () {
                sf1.logger.info('admin route');

                /*
                 *
                 * Test to see if the module should be loaded
                 * - is the current user authenticated
                 * - if they are do they have permission to load the admin module
                 *
                 * need a central property mapped to event listeners on login / logout
                 *
                 * could test the cookie
                 *
                 * need to determine is this a framework issue or an application/security issue
                 *
                 * also maps to IA and other areas of the application.
                 *
                 * */
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'admin',
                    view:'IndexView'

                });
            },
            user: function () {
                sf1.logger.info('user');
                sf1.EventBus.trigger('ia.mainNavEvent', [
                    {route: 'user'}
                ]);
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'user',
                    view:'IndexView'

                });

            },
            home: function () {
                sf1.logger.info('home');
                sf1.EventBus.trigger('ia.mainNavEvent', [
                    {route: 'home'}
                ]);
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'home',
                    view:'IndexView'

                });

            },
            composer: function(){
                sf1.logger.info('composer');
                sf1.EventBus.trigger('ia.mainNavEvent',[{route: 'composer'}]);
                sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                    region:'appMainRegion',
                    module:'composer',
                    view:'MainView'
                });
            }
        };

        return {
            getRouterConfig:function(){
                return routerConfig;
            }
        };
    }
);