window.onload = function () {
    var start = 0;
    var end = 0;

    function getData(page) {
        $.ajax({
            type: "get",
            url: " http://mmb.ittun.com/api/getinlanddiscount",
            beforeSend: function () {
                $(".jiazai").addClass("loading");
            },
            success: function (result) {
                var str = result.result;
                end = start + page;
                var str1 = str.slice(start, end);
                var html = template("zhekou", {items: str1});
                $(".product").append(html);
                start = end;
                console.log(start);
                $(".jiazai").removeClass("loading");
            }
        });
    }

    // ..先请求8条数据
    getData(8);
    window.onscroll = function () {
        var ulH = $(".product").height();
        var clientH = $(window).height();
        var scrollTop = $(this).scrollTop();
        if (ulH < clientH + scrollTop && !$(".jiazai").hasClass("loading")) {
            setTimeout(function () {
                getData(4);
                $(".jiazai>span").css("animation","rotate .5s linear 10");
            }, .5);

        }
    }
    // 点击切换样式
     var j=1;
    $(".tab").on("click", function(){
        var arr=["main","list","pc"];
        for (var i = 0; i < arr.length; i++) {
             $(".product").parent().removeClass(arr[i]);
        };
        if(j==3){
            j=0;
        }
       
       
       $(".product").parent().addClass(arr[j]);
         j++;
    });
}


