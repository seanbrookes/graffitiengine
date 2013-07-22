/**
 * sf1
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:58 PM
 *
 */
define(['sf1','marionette','uirte'],
    function(sf1, Marionette){

        var viewHelpers = {
            getPubYear:function(pubDate){
                var t = {
                    currentDate:new Date(pubDate)
                };
                var pubYear = t.currentDate.getFullYear();
                return pubYear;
            },
            publishDateRender:function(pubDate){
                return sf1.util.renderDate(pubDate, "mmmm dS, yyyy");
            }
        };

        var indexView = Backbone.Marionette.CompositeView.extend({
                template:'#PostIndexTemplate',
                regions:{
                    editorRegion:'[data-region="editorRegion"]',
                    composerRegion:'[data-region="composerRegion"]',
                    postListRegion:'[data-region="postListRegion"]'
                },
                onShow:function(){
                    // hide preview close button

                }

            }
        );

        var PostEditorLayout = Backbone.Marionette.Layout.extend({
            template:'#PostEditorLayoutTemplate',
            events:{
                'click .btn-save-post':function(event){
                    event.preventDefault();
                    sf1.EventBus.trigger('post.savePostButtonClicked',event);
                },
                'click .btn-preview-post':function(event){
                    event.preventDefault();
                    sf1.EventBus.trigger('post.previewPostButtonClicked',event);

                },
                'click .btn-close-preview':function(event){
                    event.preventDefault();
                    sf1.EventBus.trigger('post.closePostPreviewButtonClicked',event);

                },
                'click .btn-reset-post':function(event){
                    event.preventDefault();
                    sf1.EventBus.trigger('post.resetPostButtonClicked',event);

                }

            },
            onShow:function(){
                if (!sf1.isUserAuth()){
                    $('.form-controls-container').hide();
                }
            }
        });

        var postStatusCmdView = Backbone.Marionette.ItemView.extend({
            template:'#PostStatusCmdTemplate'
        });
        var postStatusSelectView = Backbone.Marionette.ItemView.extend({
            template:'#PostStatusSelectTemplate',
            onShow:function(){
                var selectElement = this.$el.find('select');
                var id = $(selectElement).data('id');
                var status = $(selectElement).data('status');
                var selectEl = $('select[data-id="' + id + '"]');
                selectEl.val(status);
                selectEl.on('change',function(event){
                    sf1.EventBus.trigger('post.postStatusSelectChanged',{'id':id,'status':selectEl.val()});
                });
            }
        });

        var postListItemView = Backbone.Marionette.ItemView.extend({
            template:'#PostListItemTemplate',
            tagName:'tr'
        });
        var postListView = Backbone.Marionette.CompositeView.extend({
            template:'#PostListTemplate',
            itemView:postListItemView,
            itemViewContainer:'tbody',
            events:{
                'click .post-status':function(event){
                    sf1.EventBus.trigger('post.changePostStatusClicked',event);
                },
                'click .btn-post-title':function(event){
                    sf1.EventBus.trigger('post.editPostRequest',event);
                }
            }
        });
        // Publish Post Dialog
        var publishPostDialog = Backbone.Marionette.ItemView.extend({
            template: '#PostPublishDialogTemplate',
            events:{
                'click [data-cmd="publishPost"]':function(event){
                    event.preventDefault();
                    sf1.EventBus.trigger('post.publishPostBtnClicked',event);
                }
            },
            onShow:function(){
                var xyz = this.model;
                var abc =xyz;
                // check if there is a localstorage entry for post author
                // if so populate form input
                // if not populate with the default model value
                // on submit, save the author value as local storage
            }
        });
        var recentPostListItemView = Backbone.Marionette.ItemView.extend({
            template:'#RecentPostListItemTemplate',
            tagName:'li',
            templateHelpers:viewHelpers
        });
        var recentPostListView = Backbone.Marionette.CompositeView.extend({
            template:'#RecentPostListTemplate',
            itemView:recentPostListItemView,
            itemViewContainer:'ul'
//            events:{
//                'click .post-status':function(event){
//                    sf1.EventBus.trigger('post.changePostStatusClicked',event);
//                },
//                'click .btn-post-title':function(event){
//                    sf1.EventBus.trigger('post.editPostRequest',event);
//                }
//            }
        });

        var indexDefaultLayout = Backbone.Marionette.Layout.extend({
            template:'#PostIndexLayoutTemplate',
            regions:{
                container:'.view-index'
            }
        });
        return {
            IndexView:indexView,
            IndexLayout:indexDefaultLayout,
            PostEditorLayout:PostEditorLayout,
            PostListView:postListView,
            PostStatusSelectView:postStatusSelectView,
            PostStatusCmdView:postStatusCmdView,
            RecentPostListView:recentPostListView,
            PublishPostDialog:publishPostDialog

        };



    }
);