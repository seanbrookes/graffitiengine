function biowidget(){

  var biowidget = {};
  var outputMarkup = '<div><img src="/widgets/bio/images/avatar.png" /><p>Hello My Name is Sean</p></div>';

  return {
    getMarkup:function(){
      return outputMarkup;
    }
  };
//  return biowidget;
}
