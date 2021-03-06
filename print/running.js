function pad2(n) { return n < 10 ? '0' + n : n }

exports.header = {
    height: "1cm",
    contents: function(pageNum, numPages) {
        var date = new Date();
        var str=date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds() ) ;
        str=date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate());
        return "<small>Examples of usefull Roslyn Source Code Generator </small> <br />";
    }
 };


exports.footer = {
    height: "1cm",
    contents: function(pageNum, numPages) {
        if (pageNum == numPages) {
            return "";
        }
        var date = new Date();
        var str=date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds() ) ;
        str=date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate());
        
        return "<small>v"+str+" <span style='float:right'>Page " + pageNum + " / " + numPages + "</span></small>";
    }
}
