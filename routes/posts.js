/**
 * fourfivesix

 *
 * User: sean
 * Date: 09/06/13
 * Time: 7:58 AM
 *
 */
var Post = require('../models/post-model');
var User = require('../models/user-model');
var _ = require('underscore');
var winston = require('winston');
var fs = require('fs');
var querystring = require('querystring');
var http = require('http');


var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './logs/posts.log' })
  ]
});

var getSlug = function (title) {

  // replace spaces with dashes

  // remove question marks

  var retVal = title;
  if (title.indexOf(' ') > -1) {
    retVal = replaceAll(' ', '-', title).toLowerCase();
  }
  return retVal;
};

exports.getPosts = function (req, res) {

  //Post.find({},function(err,dox){
  Post.find({}).sort({lastUpdate: -1}).execFind(function (err, dox) {
    if (err) {
      return res.send(500, err);
    }
    return res.send(dox);

  });
};
exports.getUserPosts = function (req, res) {
  var userId = req.param('userId', null);
  logger.info('getUserPosts 1: userId: ' + userId);
  if (userId) {
    logger.info('getUserPosts 2: ');
    //Post.find({},function(err,dox){
    Post.find({userId: userId}).sort({lastUpdate: -1}).execFind(function (err, dox) {
      logger.info('getUserPosts 3: ');
      if (err) {
        logger.info('getUserPosts 4: ');
        return res.send(500, err);
      }
      logger.info('getUserPosts 5: ');
      return res.send(dox);

    });
  }
  else {
    logger.info('ERROR getUserPosts A: no user supplied ');
    return res.send(400, 'no user supplied');
  }

};
exports.getPublishedPosts = function (req, res) {

  //Post.find({},function(err,dox){
  Post.find({status: 'published'}).sort({lastUpdate: -1}).execFind(function (err, dox) {
    if (err) {
      return res.send(500, err);
    }
    return res.send(dox);

  });
};
exports.getRecentPosts = function (req, res) {

  //Post.find({},function(err,dox){
  Post.find({status: 'published'}).sort({lastUpdate: -1}).execFind(function (err, dox) {
    if (err) {
      return res.send(500, err);
    }
    return res.send(dox);

  });
};
exports.getPost = function (req, res) {

  var postId = req.param('id', null);
  if (!postId) {
    return res.send(400);
  }
  Post.find({_id: postId}, function (err, doc) {
    if (err) {
      return res.send(500, err);
    }
    return res.send(200, doc[0]);
  });

};
exports.getPostBySlugSync = function (slug) {
  var postSlug = slug;
  if (!postSlug) {
    // throw error;
    return false;
  }
  Post.find({slug: postSlug}, function (err, doc) {
    if (err) {
      // throw error;
      return false;
    }
    return doc[0];
  });
};
exports.getPostBySlug = function (req, res) {
  var postSlug = req.param('slug', null);
  if (!postSlug) {
    return res.send(400);
  }
  Post.find({slug: postSlug}, function (err, doc) {
    if (err) {
      return res.send(500, err);
    }
    return res.send(200, doc[0]);
  });
};
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

exports.addPost = function (req, res) {
  var postUserId = req.param('userId', null);
  var postTitle = req.param('title', null);
  var postBody = req.param('body', null);
  var status = req.param('status', null);
  var postSummary = req.param('summary', null);

  if (postTitle && postUserId) {
    var postModel = new Post({
      userId: postUserId,
      title: postTitle,
      slug: getSlug(postTitle),
      summary: postSummary,
      version: 0,
      body: postBody,
      status: status

    });
    Post.find({slug: postModel.slug}, function (err, dox) {
      if (err) {
        return res.send(500, err);
      }
      if (dox.length > 0) {
        return res.send(400, 'already exists');
      }
      // no error, no pre-existing doc so create it
      postModel.save(function (err, doc) {
        if (err) {
          return res.send(500, 'err creating doc: ' + err);
        }
        return res.send(200, doc);
      });

    });
  }
  else {
    return res.send(400, 'no title');
  }

};
function renderDate(dateInput, format) {
  var d_names = new Array("Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday");

  var m_names = new Array("January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December");

  var d = new Date(dateInput);
  var curr_day = d.getDay();
  var curr_date = d.getDate();
  var sup = "";
  if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
    sup = "st";
  }
  else if (curr_date == 2 || curr_date == 22) {
    sup = "nd";
  }
  else if (curr_date == 3 || curr_date == 23) {
    sup = "rd";
  }
  else {
    sup = "th";
  }
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();

  retVal = m_names[curr_month] + " " + curr_date + "<SUP>" + sup + "</SUP> " + curr_year;
//            document.write(d_names[curr_day] + " " + curr_date + "<SUP>"
//                + sup + "</SUP> " + m_names[curr_month] + " " + curr_year);
  return retVal;
}

exports.supersedePost = function(req,res){
  var postId = req.param('id', null);
  logger.info('|');
  logger.info('|');
  logger.info('|  SUPERSEDE POST: ' + postId);
  logger.info('|');
  logger.info('|');

  if (postId){
    // find the original post
    Post.findById(postId, function (err, post) {
      if (err) {
        logger.error('error requesing post for edit: ' + err);
        return res.send(500, err);
      }
      var originalVerion = 1;
      if (post.version){
        originalVersion = post.version;
      }

      var supersededTitle = post.title + ' version ' + originalVersion;
     // post.title = supersededTitle;
      // create new slug on original document
      //post.slug = getSlug(supersededTitle);


      if (!post.version){
        post.version = 1;
      }
      // get the slug from the original - this will be the slug on new document
      var originalSlug = post.slug;
      var originalTitle = post.title;
      // get the version number from the original
      var originalVersion = post.version;
      // clone the original document to make a new document

      // create new title on original document based on 'version ' plus version number
      var supersededTitle = post.title + ' version ' + originalVersion;
      var supersededSlug = getSlug(supersededTitle);
      //post.title = supersededTitle;
      // create new slug on original document
      //post.slug = getSlug(supersededTitle);
      // change status on original to 'superseded'
      //post.status = 'superseded';
      // generate prepend message for original document
      var publishYear = new Date(post.publishDate).getFullYear();
      var publishMonth = (new Date(post.publishDate).getMonth() + 1);

      // get link to original document
      var postUrl = '/posts/' + publishYear + '/' + publishMonth + '/' + originalSlug + '.html';
      var supersededMessage = '<p class="supersession-message">This document has been superseded by an updated version the latest version can be found here:<a href="' + postUrl +'" target="_new">' + originalTitle + '</a></p>';
      // prepend update message fragment to post body on original document
      var supersededBody = supersededMessage + post.body;

      var supersededUrl = '/posts/' + publishYear + '/' + publishMonth + '/' + supersededSlug + '.html';

      // generate update fragment for new doc
      var orderVersionMessage = '<ul class="supersession-message"><li>Previous version: <a href="' + supersededUrl +'" target="_new">' + post.title + '</a></li></ul>';



      var supersedeModel = new Post({
        userId: post.userId,
        title: supersededTitle,
        slug: supersededSlug,
        summary: post.summary,
        version: originalVersion,
        body: supersededBody,
        publishDate: post.publishDate,
        status: 'superseded'

      });



      // append update fragment to new doc
      post.body = post.body + orderVersionMessage;

      // update version on new document
      post.version += 1;
      // update the status to 'pendingedits'
      post.status = 'pendingedits';
      // save original document
      //logger.info('Prepare to save post: ' + JSON.stringify(supersedeModel));
      supersedeModel.save(function(err,doc){
        if(err){
          return res.send(500,'Error saving superseded post: ' + err);
        }
        // post it to the site
        postPost(req,res,doc);

        // save new document
//        logger.info('|');
//        logger.info('|');
//        logger.info('|');
//        logger.info('|');
//        logger.info('Prepare to save new post: ' + JSON.stringify(post));
//        logger.info('|');
//        logger.info('|');
//        logger.info('|');
//        logger.info('|');
//        logger.info('|');
//        logger.info('|');

        post.save(function(err,doc){
          if (err){
            return res.send(500,'Error saving new version of document: ' + err);
          }
          // return it in the response
          return res.send(doc);
        });

      });
    });
  }
  else{
    return res.send(400, 'no id supplied');
  }


};

exports.publishPost = function (req, res) {
  var postId = req.param('id', null);
  var postAuthor = req.param('author', null);
  if (!postId) {
    return res.send(400);
  }
  Post.findById(postId, function (err, post) {
    if (err) {
      logger.error('error requesing post for edit: ' + err);
      return res.send(500, err);
    }
    var postTitle = req.param('title', null);
    var postStatus = req.param('status', null);
    if (postTitle) {
      post.title = postTitle;
    }
    if (postAuthor) {
      post.author = postAuthor;
    }
    post.slug = getSlug(post.title);

    post.status = 'published';
    if (post.version){
      post.version += 1;
    }
    else{
      post.version = 1;
    }

    post.publishDate = Date.now();
    post.lastUpdate = Date.now();

//    logger.info('| here | SAVE POST PUBLISH AUTHOR: ' + post.author);
    post.save(function (err) {
      if (err) {
        logger.error('error saving post: ' + err);
        return res.send(500, 'error saving post: ' + err);
      }
     // logger.info('saved published post author' + post.author);

      User.findById(post.userId, function (err, user) {
        //post.author = user.userName;
     //   logger.info('| here | just before POSTING: ' + post.slug);



//        var targetConfig = {
//          host: 'localhost',
//          port: '8888',
//          path: '/fourfivesixtest/inbox.php',
//          apiKey: 'sdfaersdf23ewdrrwdfs5'
//        };


        postPost(req,res,post);

        return res.send(200);
      });
      return res.send(200);


    });

  });
};
function postPost(req,res,post){


  var targetConfig = {
    host: 'www.fourfivesix.ca',
    port: '80',
    path: '/inbox.php',
    apiKey: 'sdfaersdf23esdfa33adfasdfwdrrwdfs5'
  };
  var publishDoc;
  fs.readFile('./views/postTemplate.html', 'utf8', function (err, template) {
    if (err) {
      return logger.error(err);
    }
    var pubDate = new Date(post.publishDate);
    post.publishDate = renderDate(post.publishDate);



    post.publishYear = pubDate.getFullYear();
    post.publishMonth = (pubDate.getMonth() + 1);

    //logger.info('readFile  ' + template);
//                    var filePath = './public/posts/2013/';
//                    var fileName = post.slug + '.html';
    publishDoc = _.template(template, post);
    //fs.writeFileSync( './public/posts/2013/' + post.slug + '.html', _.template( template, { title: post.title,body:post.body } ) );
//          logger.info('| here |  the doc to post: ' + publishDoc);

    var post_data = querystring.stringify({
      'ApiKey': targetConfig.apiKey,
      'PostPublishYear': post.publishYear,
      'PostPublishMonth': post.publishMonth,
      'PostSlug': post.slug,
      'PostBody': publishDoc
    });



    // An object of options to indicate where to post to
    var post_options = {
      host: targetConfig.host,
      port: targetConfig.port,
      path: targetConfig.path,
//            path: '/inbox.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
      }
    };


    // Set up the request
    /*
     *
     *
     *  POST PUBLISH DOCUMENT TO INBOX
     *
     * Request
     *
     *
     * */

    //logger.info('| here |  the doc to post: ' + publishDoc);
    var post_req = http.request(post_options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        //logger.info('| ');
        logger.info('Response: ' + chunk);
        //logger.info('| ');
      });
    });
    post_req.write(post_data);
    post_req.end();

  });
}
/*
 *
 *
 *
 *   Write the HTML File
 *
 *
 *
 * */
function writePublishedFile(post, successCallback, errorCallback) {
  logger.info('writePublishedFile');
  // write the file
  //var template = new ejs({url: '/views/index.html'});
  // var html = template.render(post);
  // logger.info('TEMPLATE RENDER: ' + html);

  fs.readFile('./views/postTemplate.html', 'utf8', function (err, template) {
    if (err) {
      return logger.error(err);
    }
    post.publishMonth = renderDate(post.publishDate);
    //logger.info('readFile  ' + template);
    var filePath = './public/posts/2013/';
    var fileName = post.slug + '.html';
    var fileContent = _.template(template, post);
    //fs.writeFileSync( './public/posts/2013/' + post.slug + '.html', _.template( template, { title: post.title,body:post.body } ) );
  //  logger.info('| here |  file wright AUTHOR: ' + post.author);

    fs.writeFile(filePath + fileName, fileContent, function (err) {
      if (err) {
        logger.error('Error writing file' + err);
      }
      //logger.info('It\'s saved! ' + post.title);
    });

    //fileGuts.filename = __dirname + '/placemark.ejs';
    //var html = ejs.render(fileGuts,post);
    //logger.info('RENDER OUTPUT: ' +  html);

  });

  // if error call error function
  // if not then call the success
}
/*
*
*   GENERATE HOME PAGE
*
* */
exports.generateHomePage = function(req,res){
  fs.readFile('./views/homeTemplate.html', 'utf8', function (err, template) {
    if (err) {
      return logger.error(err);
    }
    var targetConfig = {
      host: 'www.fourfivesix.ca',
      port: '80',
      path: '/homepage.php',
      apiKey: 'sdfaersdf23esdfa33adfasdfwdrrwdfs5'
    };
//    var targetConfig = {
//      host: 'localhost',
//      port: '8888',
//      path: 'fourfivesixtest/homepage.php',
//      apiKey: 'sdfaersdf23ewdrrwdfs5'
//    };

    var posts = [];

    Post.find({status: 'published'}).sort({lastUpdate: -1}).execFind(function (err, dox) {
      if (err) {
        return res.send(500, err);
      }
      if (dox){
        var listMarkup = '<ul>';

        for (var i = 0;i < dox.length;i++){
          listMarkup += '<li>';
          var pDate = new Date(dox[i].publishDate);
          var pubYear = pDate.getFullYear();
          var pubMonth = (pDate.getMonth() + 1);
          var postLink = 'posts/' + pubYear + '/' + pubMonth + '/' + dox[i].slug + '.html';
          listMarkup += '<a href="' + postLink + '">';
          listMarkup += dox[i].title;
          listMarkup += '</a>';
          listMarkup += '</li>';
        }
        listMarkup += '</ul>';

        var markup = {markup:listMarkup};

        var publishDoc = _.template(template, markup);

        var post_data = querystring.stringify({
          'ApiKey': targetConfig.apiKey,
          'PostBody': publishDoc
        });

        logger.info('|');
        logger.info('|');
        logger.info('| post_data  ' + post_data);
        logger.info('|');
        logger.info('|');


        // An object of options to indicate where to post to
        var post_options = {
          host: targetConfig.host,
          port: targetConfig.port,
          path: targetConfig.path,
//            path: '/inbox.php',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
          }
        };


        logger.info('|');
        logger.info('|');
        logger.info('| post_options  ' + JSON.stringify(post_options));
        logger.info('|');
        logger.info('|');


        // Set up the request
        /*
         *
         *
         *  POST PUBLISH DOCUMENT TO INBOX
         *
         * Request
         *
         *
         * */

        //logger.info('| here |  the doc to post: ' + publishDoc);
        var post_req = http.request(post_options, function (res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            //logger.info('| ');
            logger.info('Response --- : ' + chunk);
            //logger.info('| ');
          });
        });
        post_req.write(post_data);
        logger.info('POST REQ - ' + post_data);
        post_req.end();

        return res.send(dox);



      }
      return res.send('No published documents were found');

    });




  });
};

/*
 *
 * UPDATE
 *
 * */
exports.updatePost = function (req, res) {
  var postId = req.param('id', null);
  if (!postId) {
    return res.send(400);
  }
  Post.findById(postId, function (err, post) {
    if (err) {
      logger.error('error requesing post for edit: ' + err);
      return res.send(500, err);
    }
    var postTitle = req.param('title', null);
    var postStatus = req.param('status', null);
    var postSummary = req.param('summary', null);
    var postBody = req.param('body', null);
    logger.info('| ');
    logger.info('| ');
    logger.info('POST BODU: ' + postBody);
    logger.info('| ');
    logger.info('| ');
    if (postTitle) {
      post.title = postTitle;
    }
    if (postStatus) {
      post.status = postStatus;
    }
    if (postSummary) {
      post.summary = postSummary;
    }
    if (postBody) {
      post.body = postBody;
    }
    post.lastUpdate = Date.now();
    post.save(function (err) {
      if (err) {
        logger.error('error saving post: ' + err);
        return res.send(500, 'error saving post: ' + err);
      }
      return res.send(200);

    });

  });
};
// this should be converted to a disabled state instead of full delete
// keep as full delete while in development
exports.deletePost = function (req, res) {
  var postId = req.param('id', null);
  if (!postId) {
    return res.send(400);
  }
//  Post.remove({_id: postId}, function (err) {
//    if (err) {
//      return res.send(500, err);
//    }
//    return res.send(200);
//  });
  return res.send(400);
};
exports.hardDelete = function (req, res) {
  var postId = req.param('id', null);
  if (!postId) {
    return res.send(400);
  }
  Post.remove({_id: postId}, function (err) {
    if (err) {
      return res.send(500, err);
    }
    return res.send(200);
  });
//  return res.send(400);
};