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


exports.publishPost = function (req, res) {
  var postId = req.param('id', null);
  var postAuthor = req.param('author', null);
  logger.info('author: ' + postAuthor);
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

    post.publishDate = Date.now();
    post.lastUpdate = Date.now();

    logger.info('| here | SAVE POST PUBLISH AUTHOR: ' + post.author);
    post.save(function (err) {
      if (err) {
        logger.error('error saving post: ' + err);
        return res.send(500, 'error saving post: ' + err);
      }
      logger.info('saved published post author' + post.author);

      User.findById(post.userId, function (err, user) {
        //post.author = user.userName;
        logger.info('| here | just before POSTING: ' + post.slug);


        var targetConfig = {
          host: 'www.fourfivesix.ca',
          port: '80',
          path: '/inbox.php',
          apiKey: 'sdfaersdf23ewdrrwdfs5'
        };
//        var targetConfig = {
//          host: 'localhost',
//          port: '8888',
//          path: '/fourfivesixtest/inbox.php',
//          apiKey: 'sdfaersdf23ewdrrwdfs5'
//        };

        var publishDoc;

        fs.readFile('./views/postTemplate.html', 'utf8', function (err, template) {
          if (err) {
            return logger.error(err);
          }
          var pubDate = new Date(post.publishDate);
          post.publishDate = renderDate(post.publishDate);
          logger.info('|');
          logger.info('|');
          logger.info('|     publishDate Date: ' + post.publishDate);
          logger.info('|');
          logger.info('|');
          logger.info('|');
          logger.info('|');
          logger.info('|');
          logger.info('|     Raw Date: ' + post.publishDate);
          logger.info('|');
          logger.info('|');
          logger.info('|');
          logger.info('|');
          logger.info('|     Next Date [year]: ' + new Date(post.publishDate).getFullYear());
          logger.info('|');
          logger.info('|');


          post.publishYear = pubDate.getFullYear();
          post.publishMonth = (pubDate.getMonth() + 1);
          logger.info('|');
          logger.info('|');
          logger.info('|     Post Year 1: ' + post.publishYear);
          logger.info('|');
          logger.info('|     Post Month 1:  ' + post.publishMonth);
          logger.info('|');
          logger.info('|');
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

          logger.info('|');
          logger.info('|');
          logger.info('|     Post Year: ' + post.publishYear);
          logger.info('|');
          logger.info('|     Post Month:  ' + post.publishMonth);
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
              logger.info('| ');
              logger.info('Response: ' + chunk);
              logger.info('| ');
            });
          });
          post_req.write(post_data);
          post_req.end();

        });
        return res.send(200);
      });
      return res.send(200);


    });

  });
};
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
    logger.info('| here |  file wright AUTHOR: ' + post.author);

    fs.writeFile(filePath + fileName, fileContent, function (err) {
      if (err) {
        logger.error('Error writing file' + err);
      }
      logger.info('It\'s saved! ' + post.title);
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
exports.deletePost = function (req, res) {
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
};