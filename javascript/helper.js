(function( window, undefined ) {
    var selectorFirst = function(query){
        return document.querySelector(query);
    },
    selectorAll = function (query) {
        document.querySelectorAll(query);
    },
    creator = function (type, append, attributes, styles){
        var element;
        attributes = attributes || undefined;
        styles = styles || undefined;

        element = document.createElement(type);
        if (attributes){
            for(var key in attributes) {
            element.setAttribute(key,attributes[key]);
          }
      }

      if(styles){
        for(var key in styles){
            element.style.setProperty(key,styles[key])
        }
      }
      if(typeof append === "string"){
        element.appendChild(document.createTextNode(append));
      }else{
        element.appendChild(element);
      }

      return element;
  };

  window.selectorFirst = selectorFirst;
  window.creator = creator;
  window.selectorAll= selectorAll;
})( window );