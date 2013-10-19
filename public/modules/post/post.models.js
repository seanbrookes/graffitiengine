/**
 * Graffiti Engine
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1','backbone'],
    function(sf1, Backbone){

        var postModel = Backbone.Model.extend();
        var postCollection = Backbone.Collection.extend({
            model:postModel
        });

        return {
            PostCollection:postCollection,
            PostModel:postModel

        };

    }
);