$(function(){

        $.ajax({
            type:'get',
            url: "http://mmb.ittun.com/api/getcouponproduct",
            //url: "http://mmb.ittun.com/api/getcouponproduct",
            data:itcast.getArgsObject(),
            success:function(result){
            console.log(result);
                var html=template("chanpin1",{"items":result});
                $(".libiao").append(html);
                var html2=template("chanpin2",{"items":result});
                $(".lunbo").append(html2);


                var win=document.querySelectorAll(".ff");
                var win3=document.querySelectorAll(".item2");
                var win2=document.querySelector(".zezao");
                var zuo1=document.querySelector(".zuo1")
                var you1=document.querySelector(".you1")
                var win4=document.querySelector(".lunbo");
                  var  ziji=win4.children[0]
                for(var i=0;i<win.length;i++){
                    win[i].onclick=function(){
                        var win2=document.querySelector(".zezao");
                        win2.style.display="block";
                    }
                    win2.onclick = function (){
                        this.style.display = "none";
                    }

                }

                for(var i=0;i<win3.length;i++){
                    win3[i].style.float="left"
                }

                var leng=win3.length
                    var width=200*leng
                $(win4).width(width)
                var index=0
                $(zuo1).click(function (){
                    if(index==win3.length-3){
                        index=0
                        var we=-200*index;
                        $(".lunbo").css({
                            left: we
                        })
                    }
                    index++;
                    var we=-200*index;
                    console.log(we);
                    $(".lunbo").animate({
                        left: we
                    },200,"swing"); // 先慢后快再慢
                    // 匀速的运动
                })
                $(you1).click(function (){
                    if(index==0){
                        index=win3.length-3
                        var we=-200*index;
                        $(".lunbo").css({
                            left: we
                        })
                    }
                    index--;
                    var we=-200*index;
                    console.log(we);
                    $(".lunbo").animate({
                        left: we
                    },200,"swing"); // 先慢后快再慢
                    // 匀速的运动
                })



                zuo1.addEventListener("click",function(event){

                    event.stopPropagation();//
                },false);
                you1.addEventListener("click",function(event){

                    event.stopPropagation();//
                },false);



            }
        });



})