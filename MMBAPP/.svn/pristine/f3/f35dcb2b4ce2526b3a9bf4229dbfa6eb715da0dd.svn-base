$(function(){

    var deg=360
    var deg2=0
    var index2=3
    var flas=true

    $(".choujian1").on("click",function(){


        if(flas && index2>0){
            flas=false
            deg2=deg2+deg*Math.random()
            deg2=11600+deg2

            console.log(deg2);

            $(".choujian").css({transform: "rotate("+deg2+"deg)"})

            deg2=deg2+deg*Math.random()
            deg2=8600+deg2
            console.log(deg2);
            setTimeout(function(){

                $(".choujian").css({ transition:"all 8s  ease-out"})
                $(".choujian").css({transform: "rotate("+deg2+"deg)"})

            },2000)

            index2--
            $(".shuzi1").html(index2)
            setTimeout(function(){
                flas=true
                var vv=-(deg2%360)-7;
                console.log(deg2);
                if(-60<vv&&vv<0){
                        $("#money").html("一等奖")
                }else if(-120<vv&&vv<-60){
                    $("#money").html("三等奖")
                }else if(-180<vv&&vv<-120){
                    $("#money").html("优秀奖")
                }else if(-240<vv&&vv<-180){
                    $("#money").html("欢迎再来")
                }else if(-300<vv&&vv<-240){
                    $("#money").html("二等奖")
                }else if(-360<vv&&vv<-300){
                    $("#money").html("谢谢参与")
                }

                $(".getMoney").show();


            },10500)


        }


    $("#gobaicai").on("click",function(){
       $(".getMoney").hide();
    })

    })






})