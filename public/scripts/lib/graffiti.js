/**
 * Created with JetBrains WebStorm.
 * User: seanbrookes
 * Date: 2013-09-25
 * Time: 10:39 PM
 * To change this template use File | Settings | File Templates.
 */
var Graffiti = (function(window, undefined){

  var Graffiti = {};

  function loadSupportingFiles(callback){}
  function getWidgetParams(){}
  function getRatingsData(params, callback){}
  function drawWidget(){}

  loadSupportingFiles(function(){

    var params = getWidgetParams();

    getRatingsData(params, function(){
      drawWidget();
    });

  });
  function renderMainAside(){
    $.getScript('widgets/bio/bio.widget.js',function(){
//      var x = data;
//      var p = biowidget().getMarkup();
//      console.log('fuck yeah: ' + p);
      $('.main-aside').append(biowidget().getMarkup());
      var div = document.createElement("div");
      div.innerHTML = "<li><a>holy fuck it works</a></li>";
      var fragment = document.createDocumentFragment();
      while ( div.firstChild ) {
        fragment.appendChild( div.firstChild );
      }
      $('.main-aside').append(fragment);
      renderTwitterFollowButton();


    });

  }
  function renderTwitterFollowButton(){
    var twitterButtonMarkup = '<a href="https://twitter.com/seanbrookes" target="_new" >@seanbrookes</a>';
    $('.main-aside').append(twitterButtonMarkup);
  }
  function renderTweetButton(){
    var tweetButtonMarkup = "<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-via=\"seanbrookes\" data-count=\"none\">Tweet</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>";
    $('.main-article').append(tweetButtonMarkup);

  }

  function documentReady(){
    $(document).ready(function() {
      if (console){
        if (console.log){
          console.log('GRAFFITI');
          renderMainAside();
          renderTweetButton();
        }
      }
    });

  }

  var timeout = setInterval(function(){
    if (window.jQuery) {
      clearTimeout(timeout);
      documentReady();
    }
    else{
      console.log('checking');
    }
  },100);


  return Graffiti;
})(window);