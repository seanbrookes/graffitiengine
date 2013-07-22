/**
 * sf1
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1','backbone'],
    function(sf1, Backbone){

        var pendingAccountItemModel = Backbone.Model.extend({});
        var pendingAccountsCollection = Backbone.Collection.extend({
           itemView: pendingAccountItemModel
        });
        return {
            PendingAccounts:pendingAccountsCollection
        };

    }
);