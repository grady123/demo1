/**
 * Created by CrazyBoy on 2016/11/5.
 */
$(function () {
    $.ajax({
        type:"get",
        url:"http://mmb.ittun.com/api/getbrandtitle",
        data:{},
        success: function (result) {
            //console.log(result);
            var html = template("content",{items:result["result"]});
            $(".hot-category-content ul").append(html);
        }
    })
})


