/**
 * sf1
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:57 PM
 *
 */
define(['sf1','modules/home/home.models','modules/home/home.views','text!modules/home/home.templates.html','post'],
    function(sf1, Model, View, template, Post){
        var anchorSelector = '#TemplateContainer';

        _.templateSettings.variable = 'S';
        var baseMarkup = $(template);
        // attach the module template markup to the DOM
        $(anchorSelector).append(baseMarkup);

        var indexView = function(){
            var targetLayoutView = new View.IndexLayout();

            var indexView = new View.IndexView();

            var indexContainerRegion = new Backbone.Marionette.Region({
                el: ".view-index"
            });

            targetLayoutView.on('show',function(layout){
                indexContainerRegion.show(indexView);
            });

            var recentPostCollection = new Post.PostCollection();
            recentPostCollection.fetch({
                url:'/recentposts',
                success:function(response){
                    targetLayoutView.recentPostRegion.show(new Post.RecentPostListView({
                        collection:recentPostCollection
                    }));
                }
            });

            return targetLayoutView;
        };

        return{
            IndexView:indexView
        };
    }
);