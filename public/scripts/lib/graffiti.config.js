/**
 * Created with JetBrains WebStorm.
 * User: seanbrookes
 * Date: 2013-09-25
 * Time: 10:57 PM
 * To change this template use File | Settings | File Templates.
 */
var graffitiConfig = {
  mainAsside:function(){
    var div = document.createElement("div");
    div.innerHTML = "<li><a></a></li>";
    var fragment = document.createDocumentFragment();
    while ( div.firstChild ) {
      fragment.appendChild( div.firstChild );
    }
    return fragment;
  }
};