/**
 * sf1
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1','marionette'],
    function(sf1, Marionette){

//
//        var indexView = Backbone.Marionette.CompositeView.extend({
//                template:'#TplIndexTemplate'
//
//            }
//        );
        var indexView = Backbone.Marionette.CompositeView.extend({
                template:'#AdminModuleContainer',
                events:{
                    'click .btn-list-pending':'btnListPendingClicked'
                },
                btnListPendingClicked:function(event){
                    sf1.log('list accounts');
                    $.ajax({
                        type:'get',
                        url:'/pendingaccounts',
                        success:function(response){
                            sf1.log('success get pending accounts');
                            var outPutMarkup = '';
                            sf1.log(response);
                            if (response.length){

                                sf1.EventBus.trigger('admin.pendingAccountsRequestSuccess',response);
//
//
//                                for (var i = 0;i < response.length;i++){
//                                    var user = response[i];
//                                    outPutMarkup += '<li><a href="#">' + user.userName  + '</a></li>';
//                                    //sf1.log('response[' + i +  '][' + JSON.stringify(response[i]) + ']');
//                                }
//                                $('.pending-account-list').html(outPutMarkup);
                            }

                        },
                        error:function(response){
                            sf1.log('error get pending accounts: ' + response);
                        }
                    });
                }
            }
        );
        var pendingAccountView = Backbone.Marionette.ItemView.extend({
            template:'#AdminPendingAccountItemTemplate'
        });
        var pendingAccountsView = Backbone.Marionette.CompositeView.extend({
            template:'#AdminPendingAccountsTemplate',
            itemViewContainer: 'ul',
            itemView:pendingAccountView
        });


        var indexDefaultLayout = Backbone.Marionette.Layout.extend({
            template:'#TplIndexLayoutTemplate',
            regions:{
                container:'.view-index'
            }
        });
        return {
            IndexView:indexView,
            IndexLayout:indexDefaultLayout,
            PendingAccounts:pendingAccountsView

        };



    }
);