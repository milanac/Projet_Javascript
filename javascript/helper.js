(function( window, undefined ) {
    var characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
    parseExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
    matchExpr = {
        "ID": new RegExp("^#(" + characterEncoding + ")"),
        "CLASS": new RegExp("^\\.(" + characterEncoding + ")")
    };
    Helper = {
        Selector :function (select) {
            if(!select || typeof select !== "string" ){
                return {};
            }

            if(match = parseExpr.exec(select)){
                if (m = match[1]) {
                    return document.getElementById(m);
                }else{
                    if(m = match[3]){
                        return document.getElementsByClassName(m);
                    }
                }
            }else{
                return {};
            }
        }
    }



    window.Helper = Helper;
})( window );