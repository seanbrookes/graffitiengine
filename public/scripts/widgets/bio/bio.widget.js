function biowidget(){

  var biowidget = {};
  var outputMarkup = '<div><img src="/scripts/widgets/bio/images/avatar.png" /><p>My name is Sean and this is my blog</p></div>';

  return {
    getMarkup:function(){
      return outputMarkup;
    }
  };
}
