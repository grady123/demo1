window.onload = function () {
    var getData = function (callback) {
        $.ajax({
            type: "get",
            data: itcast.getArgsObject(),
           url:"http://mmb.ittun.com/api/getdiscountproduct",
            success: function (result) {
                callback && callback(result);
                console.log(result["result"]);

            }

        });
    }
    var rander = function () {
        getData(function (result) {
            var html = template("product", {items: result["result"]});
            $(".cu-content").html(html);
        });
    }
    rander();
     $(".ctrl").on("click",function(){
            console.log(1);
     });
}