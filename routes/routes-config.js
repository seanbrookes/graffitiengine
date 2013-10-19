/**
 * Created with JetBrains WebStorm.
 * User: sean
 * Date: 16/03/13
 * Time: 8:48 AM
 * To change this template use File | Settings | File Templates.
 */
var user = require('./user');
var admin = require('./admin');
var posts = require('./posts');
module.exports = function (app) {

  /*
   *
   * ROUTES
   *
   * */
  app.get('/logout', user.logout);
  app.get('/isauth', user.isUserAuth);
  app.post('/auth', user.postAuthenticate);
  app.post('/user', user.createUser);
  app.get('/pendingaccounts', admin.getPendingAccountList);

  /*
   *
   * Posts
   *
   * */
  app.post('/posts', posts.addPost);
  app.get('/publishedposts', posts.getPublishedPosts);
  app.get('/recentposts', posts.getRecentPosts);

  app.get('/userposts/:userId', posts.getUserPosts);
  app.get('/posts', posts.getPosts);
  app.get('/posts/:id', posts.getPost);
  app.get('/postbyslug/:slug', posts.getPostBySlug);
  app.put('/publishpost/:id', posts.publishPost);
  app.put('/supersedepost/:id', posts.supersedePost);
  app.put('/posts/:id', posts.updatePost);
  //app.put('/publishpost/:id',posts.publishPost);
  app.delete('/posts/:id', posts.deletePost);
  app.delete('/harddelete/:id', posts.hardDelete);


  app.get('/generate/homepage', posts.generateHomePage);
};
