$(function(){
    $.ajax({
        type:'get',
        url: "http://mmb.ittun.com/api/getcoupon",
        //url: "http://mmb.ittun.com/api/getcoupon",
        success:function(result){
            console.log(result);
            var html=template("chanpin",{"items":result});
            $(".chanpin1").append(html);
        }
    });
})
