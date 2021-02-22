function pad2(n) { return n < 10 ? '0' + n : n }

exports.header = {
    height: "1cm",
    contents: function(pageNum, numPages) {
        var date = new Date();
        var str=date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds() ) ;
        str=date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate());
        return "<small>Roslyn Source Code Generator version " + str  +"</small>";
    }
 };


exports.footer = {
    height: "1cm",
    contents: function(pageNum, numPages) {
        if (pageNum == numPages) {
            return "";
        }
        
        return "<small>Page <span style='float:right'>" + pageNum + " / " + numPages + "</span></small>";
    }
}
