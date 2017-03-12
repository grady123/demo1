/**
 * Created by Administrator on 2016/11/6.
 */
window.onload=function(){
var getData=function(callback){
    $.ajax({
        type:"get",
        data:itcast.getArgsObject(),
        url:"http://mmb.ittun.com/api/getmoneyctrlproduct",
        success:function(result){
            callback&&callback(result);
            //console.log(result.totalCount);
        }

    })
}
    getData(function (result) {
        var productHtml = template("productid",{items:result["result"][0]});
       $(".con").html(productHtml);

        $(".tjdp").on("click",function(){
           var content=$("textarea").val();
           var li=$(".list ul").children()[0].cloneNode(true);
           li.className="youke";
           $(".list ul").prepend(li);
           $(".youke .con .content").text(content);
           $(".youke .name .username").text("游客留言");
           var time=new Date();
           $(".youke .name .time").text(time.toLocaleDateString());
           $("textarea").val(" ");
        });
    });
   
}


