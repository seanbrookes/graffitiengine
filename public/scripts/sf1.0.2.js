/**
 * kickoff the core app object
 *
 * Define sf1 as the root namespace
 *
 * The core bootstrap algorithm needs some work as there are some cross dependencies
 * with client-app and app.controller
 * needs some attention to get into final state.
 *
 *
 */
define(
    ['jquery','eventbus','marionette','cookie'],
    function($,EventBus){
        var sf1 = {};

        // usage: POF.log('inside coolFunc',this,arguments);
        // inspired by: http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
        sf1.log =  function(){
            sf1.log.history = sf1.log.history || [];   // store logs to an array for reference
            sf1.log.history.push(arguments);
            if(window.console){
                console.log( Array.prototype.slice.call(arguments) );
            }
        };
        sf1.io = Object.create({});
        sf1.io.ajax = function(ioObj){
            if (ioObj){
                // check if there is an ajax request type and other properties
                // make sure the required parameters (url and type are there )
                $.ajax(ioObj);
                sf1.log('in sfo.io.ajax');
                sf1.log(ioObj);


            }
        };


        var defaultLocale = 'en';
        sf1.getUserLocale = function(){
            var returnVal;
            if ($.cookie('userLocale')){
                returnVal = $.cookie('userLocale');// get cookie value
            }
            else{
                returnVal = defaultLocale;
            }
            return returnVal;
        };

        //
        //  EVENT BUS
        //
        sf1.EventBus = EventBus;

        // HTML5
        sf1.hasStorage = (function() {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch(e) {
                return false;
            }
        }());
        sf1.translate = function(obj){
            sf1.log('translate this string key: ' + JSON.stringify(obj) + '  with this locale value: ' + sf1.getUserLocale());
            return obj.key;
        };
        sf1.isUserAuth = function(){
            if ($.cookie('isAuthenticated')){
                var isAuthVal = $.cookie('isAuthenticated');
                if (isAuthVal === 'true'){
                    return true;
                }
                return false;
            }
            else{
                return false;
            }
        };
        sf1.currUserId = function(){
            if ($.cookie('userId')){
                return $.cookie('userId');
            }
            else{
                return null;
            }
        };
        sf1.app = new Backbone.Marionette.Application();
        //sf1.app = app;
        sf1.app.addRegions({
            viewPort:'.viewport'
        });
        return sf1;

    }
);