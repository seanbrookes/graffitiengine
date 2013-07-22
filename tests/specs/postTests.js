/**
 * seanica

 *
 * User: sean
 * Date: 20/06/13
 * Time: 9:43 PM
 *
 */
define(function(require) {
    var ca = require('ca');
    var app   = require('app');

    describe('Create New Post ', function(){
        it('create hello world test post', function(){
            var post = require('post');
//            var posts = require('./posts');
            var testPostEditor = new post.PostEditor();
            // create a new post
            var testPostObj = {
              title:'hello world test post',
              body:'hello world test post body'
            };
            var newPost = post.createNewPost(testPostObj);
            var postSlug = 'hello-world-test-post';
            post.getPostBySlug(postSlug);

            //expect(post.)
            // title 'hello world'
            // body 'test post'
            // status 'draft
            //var postController = new post.

        });
    });

});