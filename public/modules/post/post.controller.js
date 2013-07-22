/**
 * Seanica
 *
 * User: sean
 * Date: 13/04/13
 * Time: 10:57 PM
 *
 */
define(['sf1','modules/post/post.models','modules/post/post.views','text!modules/post/post.templates.html','uirte'],
    function(sf1, Model, View, template, RTE){
        var anchorSelector = '#TemplateContainer';

        _.templateSettings.variable = 'S';
        var baseMarkup = $(template);
        // attach the module template markup to the DOM
        $(anchorSelector).append(baseMarkup);

        var editorMode = 'new';
        var userId;

        /*
        *
        * Index View
        *
        * */
        var indexView = function(slug){
            var targetLayoutView = new View.IndexLayout();

            var indexView = new View.IndexView();
           // targetLayoutView.container.show(targetView);

            var indexContainerRegion = new Backbone.Marionette.Region({
                el: ".view-index"
            });

            targetLayoutView.on('show',function(layout){
                indexContainerRegion.show(indexView);
                var editorRegion = new Marionette.Region({
                    el:'[data-region="editorRegion"]'
                });
                var composerRegion = new Marionette.Region({
                    el:'[data-region="composerRegion"]'
                });
                composerRegion.show(new View.PostEditorLayout());
                editorRegion.show(new RTE.RTE());
                $('#sf1RTEEditor').on('keyup', function(event){
                    sf1.EventBus.trigger('post.previewPostRequest');
                });
                // check if slug passed in
                if (slug){
                    sf1.EventBus.trigger('post.loadEditPostBySlug',slug);
                }
                if (sf1.isUserAuth()){
                    $('.form-controls-container').show();
                    userId = sf1.currUserId();
                    sf1.EventBus.trigger('post.loadUserPosts',userId);


                }

            });
            //targetLayoutView.container.show(targetView);



          //


            return targetLayoutView;
        };


        /*
        *
        * Functions
        *
        *
        * */

        function createNewPost(postObj){
            postObj.status = 'draft';
            // save new post
            sf1.io.ajax({
                type:'POST',
                url:'/posts',
                data:postObj,
                success:function(response){
                    sf1.log('success saving post: ' + response);
                    sf1.EventBus.trigger('post.createNewPostSuccess');
                },
                error:function(response){
                    sf1.log('error saving post: ' + response);
                    sf1.EventBus.trigger('post.createNewPostFailed');
                }
            });
        }
        function getPostBySlug(slug){
            if (slug){
                var postObj = {
                    slug:slug
                };
                // get post
                sf1.io.ajax({
                    type:'POST',
                    url:'/postbyslug/' + slug,
                    data:postObj,
                    success:function(response){
                        sf1.log('success getting post: ' + response);
                        sf1.EventBus.trigger('post.getPostBySlugSuccess',response);
                    },
                    error:function(response){
                        sf1.log('error getting post: ' + response);
                        sf1.EventBus.trigger('post.getPostBySlugFailed');
                    }
                });
            }
        }
        function publishPostDialog(options){
            return new View.PublishPostDialog({
                model:new Model.PostModel(options.data)
            });
        }


        /*
        *
        * EVENT BINDING
        *
        *
        * */
        /*
        *
        * Load Edit Post by Slug
        *
        * */
        sf1.EventBus.bind('post.loadEditPostBySlug',function(slug){
            if (slug){
                sf1.io.ajax({
                    type:'GET',
                    url:'/postbyslug/' + slug,
                    success:function(response){
                        sf1.log('success retrieve post: ' + response);
                        sf1.EventBus.trigger('post.initializeEditForm',response);
                    },
                    error:function(response){
                        sf1.log('error getting post: ' + response);
                    }
                });

            }
        });
        /*
        *
        * Load User Post List
        *
        * */
        sf1.EventBus.bind('post.loadUserPosts',function(userId){
            if (userId){
                var postCollection = new Model.PostCollection();
                var postsUrl = '/userposts/' + userId;
                postCollection.fetch({
                    url:postsUrl,
                    success:function(response){
                        sf1.log('success get posts: ' + response);
                        var postListRegion = new Marionette.Region({
                            el:'[data-region="postListRegion"]'
                        });
                        // postListRegion.show(new View.PostListView());

                        postListRegion.show(new View.PostListView({
                            model:new Backbone.Model({'collectionTitle':'Your Posts'}),
                            collection:postCollection
                        }));
                    },
                    error:function(response){
                        sf1.log('error get posts: ' + response);
                    }
                });
            }

        });
        /*
        *
        * Initialize Edit Post Form
        *
        * */
        sf1.EventBus.bind('post.initializeEditForm',function(post){
            editorMode = 'update';
            $('#PostId').val(post._id);
            $('#PostTitle').val(post.title);
            $('#PostSlug').text(post.slug);
            $('#sf1RTEEditor').val(post.body);
//            CKEDITOR.instances.sf1RTEEditor.setData(post.body);
            $('#PostStatus').val(post.status);

        });
          /*
         *
         * Load Post to Edit
         *
         *
         * */
        sf1.EventBus.bind('post.loadEditPost',function(postId){
            if (postId){
                sf1.io.ajax({
                    type:'GET',
                    url:'/posts/' + postId,
                    success:function(response){
                        sf1.log('success retrieve post: ' + response);
                        sf1.EventBus.trigger('post.initializeEditForm',response);
                    },
                    error:function(response){
                        sf1.log('error getting post: ' + response);
                    }
                });

            }
        });
        /*
         *
         * Save Button
         *
         * */
        sf1.EventBus.bind('post.savePostButtonClicked',function(event){
            sf1.logger.info('save post button click event');
            sf1.logger.info('Post Contents: ' + $('#sf1RTEEditor').val());
            if (userId){
                var postObj = {};
                postObj.userId = userId;
                postObj.title = $('#PostTitle').val();
                postObj.body = $('#sf1RTEEditor').val();
                if ('new' === editorMode){
                    postObj.status = 'draft';
                    // save new post
                    sf1.io.ajax({
                        type:'POST',
                        url:'/posts',
                        data:postObj,
                        success:function(response){
                            sf1.logger.info('success saving post: ' + response);
                        },
                        error:function(response){
                            sf1.logger.error('error saving post: ' + response);
                        }
                    });

                }
                if ('update' === editorMode){
                    var postId = $('#PostId').val();


                    if (postId){
                        postObj.id = postId;
                        postObj.status = $('#PostStatus').val();
                        // update post
                        sf1.io.ajax({
                            type:'PUT',
                            url:'/posts/' + postObj.id,
                            data:postObj,
                            success:function(response){
                                sf1.logger.info('success saving post: ' + response);
                            },
                            error:function(response){
                                sf1.logger.error('error saving post: ' + response);
                            }
                        });
                    }

                }
            }
            else{
                sf1.logger.warn('warn - no user id');
            }

        });
        /*
         *
         * Preview Button
         *
         * */
        sf1.EventBus.bind('post.previewPostButtonClicked',function(event){
            sf1.logger.info('Preview post button click event');
            sf1.EventBus.trigger('post.previewPostRequest');
        });
        /*
        *
        * Preview Request
        *
        * */
        sf1.EventBus.bind('post.previewPostRequest',function(){
            sf1.logger.info('Post Contents: ' + $('#sf1RTEEditor').val());
            var postData = $('#sf1RTEEditor').val();
            if (postData){
                $('.btn-close-preview').show();
                $('.post-preview').html(postData);
            }
        });
         /*
         *
         * Reset Button
         *
         * */
        sf1.EventBus.bind('post.resetPostButtonClicked',function(event){
            sf1.logger.info('Reset post button click event');
            sf1.logger.info('Post Contents: ' + $('#sf1RTEEditor').val());
        });
        /*
         *
         * Close Preview Button
         *
         * */
        sf1.EventBus.bind('post.closePostPreviewButtonClicked',function(event){
            sf1.logger.info('close preview post button click event');
            sf1.logger.info('Post Contents: ' + $('#sf1RTEEditor').val());
            $('.btn-close-preview').hide();
            $('.post-preview').empty();
        });
        /*
        * Change Post Status
        *
        * */
        sf1.EventBus.bind('post.changePostStatusClicked',function(event){
            // replace link with select control
            // set the value of the control
            var postId = $(event.target).data('id');
            var postStatus = $(event.target).data('status');

            if (postId){
                sf1.logger.info('in post.changePostStatusClicked: ' + postId);

                var postItemStatusRegion = new Marionette.Region({
                    el:'td.col-post-status[data-id="' + postId + '"]'
                });
                // hide the link
                // show the select
                postItemStatusRegion.show(new View.PostStatusSelectView({
                    model:new Backbone.Model({'_id':postId,'status':postStatus})
                }));
                // set the value of the select
                // set the event listener on select change
            }
            else{
                sf1.logger.info('attempt to edit status chang but no post id');
            }
        });
        /*
         *
         * Change Post Status Select Element Change Event
         *
         * */
        sf1.EventBus.bind('post.postStatusSelectChanged',function(data){
            var postId = data.id;
            var postStatus = data.status;
            var postData = {};
            postData.id = postId;
            postData.status = postStatus;
            postData.title = $('a[data-id="' + postId + '"]').prop('title');
            if (postId){
                switch(postStatus){
                    /*
                    *
                    *
                    *   Publish
                    *
                    *
                    * */
                    case 'published':

                        sf1.EventBus.trigger('post.publishPostDialogRequest',postData);


                        break;
                    case 'draft':
                        sf1.logger.info('TO BE IMPLEMENTED change to draft THIS POST: ' + postId);
                        break;

                    case 'deleted':
                        if (confirm('delete this post?')){
                            sf1.logger.info('DELETE THIS POST: ' + postId);
                        }
                        break;
                    default:
                        sf1.logger.warn('warn - attempt to change post status with no status');

                }
            }
            else{
                sf1.logger.warn('warn - attempt to change status with no post id');
            }
        });


        /*
        *
        * Edit Post
        *
        * */
        sf1.EventBus.bind('post.editPostRequest',function(event){
            var postId = $(event.target).data('id');
            if (postId){
                sf1.EventBus.trigger('post.loadEditPost',postId);
            }
        });


        /*
        *
        * Publish Post Request
        *
        * */
        sf1.EventBus.bind('post.publishPostDialogRequest',function(post){

            // set the author
            var author = sf1.currUserName();
            if (sf1.hasStorage){
                if (localStorage.getItem('sf1UserPrefs')){
                    var userPrefsObj = JSON.parse(localStorage.getItem('sf1UserPrefs'));
                    if (userPrefsObj){
                        if (userPrefsObj.publishSettings){
                            if (userPrefsObj.publishSettings.authorName){
                                author = userPrefsObj.publishSettings.authorName;
                            }
                        }
                    }
                }
            }
            post.author = author;
            sf1.EventBus.trigger('ia.loadRegionContentRequest',{
                region:'modalRegion',
                module:'post',
                view:'PublishPostDialog',
                data:{data:post},
                callback:function(){
                    sf1.EventBus.bind('post.publishPostSuccess',function(){
                        $.modal.close();
                        userId = sf1.currUserId();
                        sf1.EventBus.trigger('post.loadUserPosts',userId);
                    });
                }

            });

        });

        sf1.EventBus.bind('post.publishPostBtnClicked',function(event){
            // get the post data

            var postId = $(event.target).data('id');
            var postAuthor = $('#InputPublishPostAuthor').val();

            if (sf1.hasStorage){
                if (!localStorage.getItem('sf1UserPrefs')){
                    localStorage.setItem('sf1UserPrefs','');
                }
                var userPrefs = localStorage.getItem('sf1UserPrefs');
                if (!userPrefs){
                    userPrefs = '{}';
                }
                var userPrefsObj = JSON.parse(userPrefs);
                if (userPrefsObj){
                    if (!userPrefsObj.publishSettings){
                        userPrefsObj.publishSettings = {};
                    }
                    userPrefsObj.publishSettings.authorName = postAuthor;
                    localStorage.setItem('sf1UserPrefs',JSON.stringify(userPrefsObj));
                }
            }

            var postData = {};
            postData.id = postId;
            postData.author = postAuthor;
            sf1.EventBus.trigger('post.publishPostRequest',postData);
        });
        /*
        *
        * AJAX
        *
        * Publish Post
        *
        *
        * */
        sf1.EventBus.bind('post.publishPostRequest',function(postObj){
            sf1.io.ajax({
                type:'PUT',
                url:'/publishpost/' + postObj.id,
                data:postObj,
                error:function(response){
                    sf1.log('error publishing: ' + response);
                },
                success:function(response){
                    sf1.log('SUCCESS PUBLISH');
                    //close modal window
                    sf1.EventBus.trigger('post.publishPostSuccess');
                }
            });
        });

        return{
            IndexView:indexView,
            PostEditor:function(){
                return new View.PostEditorLayout();
            },
            createNewPost:createNewPost,
            getPostBySlug:getPostBySlug,
            PostListView:View.PostListView,
            PostCollection:Model.PostCollection,
            RecentPostListView:View.RecentPostListView,
            PublishPostDialog:publishPostDialog
        };
    }
);