function biowidget(){

  var biowidget = {};
  var outputMarkup = '<div><span class="avatar-frame"><img class="avatar-image" src="/scripts/widgets/bio/images/avatar.png" /></span><p>My name is Sean and this is my blog</p></div>';
  var twitterButtonMarkup = '<p>you can follow me on twitter:</p><a href="https://twitter.com/seanbrookes" target="_new" >@seanbrookes</a>';

  return {
    getMarkup:function(){
      return outputMarkup + twitterButtonMarkup;
    }
  };
}
