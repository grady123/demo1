$(function () {
    var data = itheima.getArgsObject();
    if(!data.titleid){//没有参数就默认设置title为0
        data.titleid = 0;
        $(".goodluck").show();
    }
    var titleid = data.titleid;
    $.getJSON("http://mmb.ittun.com/api/getbaicaijiatitle",null, function (result) {
    //$.getJSON("http://mmb.ittun.com/api/getbaicaijiatitle",null, function (result) {
        result.id = titleid;
        var html = template("navTitle",result);
        //console.log(html);
        var $ul =  $(".nav_l ul");
        $ul.html(html)
        var $lis = $(".nav_l ul li");

        //动态设置大标题
        $(".header_con").text($(".nav_l ul li.active a").text()+" - 白菜价");

        //计算li的总宽度 并赋值给ul
        var totalWidth = 0;
        $lis.each(function (index,value) {
            totalWidth += $(value).outerWidth(true);
        })
        if(totalWidth <= 320) {
            totalWidth = 640;
        }
        $ul.width(totalWidth+1);
        //判断ul是否小于父盒子 小于才添加点击偏移
        var minLeft = $(".nav_l").width() -50 -  $ul.width();
        if(minLeft < 0){
            var left = -$(".nav_l ul li.active").position().left;
            if(left < minLeft){
                left = minLeft;
            }
            $ul.css({
                transform:"translateX("+left+"px)",
                webkitTransform:"translateX("+left+"px)",
                MozTransform:"translateX("+left+"px)",
                msbkitTransform:"translateX("+left+"px)"
            })
            //x轴的滑动效果
            itheima.touchMoveX($(".nav_l")[0],50);
        }


        /*itcast.iScroll({
         swipeDom:$(".nav_l")[0],
         swipeType:"x",
         swipeDistance:50
         })*/

        //给li添加点击换页事件
        $lis.on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            location.search = "?titleid=" + $(this).attr("data-target");
        })

        //获取对应的内容数据
        $.getJSON("http://mmb.ittun.com/api/getbaicaijiaproduct",data, function (result) {
        //$.getJSON("http://mmb.ittun.com/api/getbaicaijiaproduct",data, function (result) {
            var html = template("listContent",result);
            //console.log(html);
            $(".list_con ul").html(html);
        })
    })

    /*滚动时重新获取数据*/
    var scrollCount = 12;//设置最多获取12
    var isWait = false;
    window.onscroll = function () {
        //console.log($(window).height());
        var offset = $(".layout").height() - $(window).height() - $(window).scrollTop();
        //设置滚动底线
        if(offset <100 && scrollCount >= 0 && !isWait) {
            isWait = true;
            $(".loading").addClass("show");
           setTimeout(function () {
               $.getJSON("http://mmb.ittun.com/api/getbaicaijiaproduct?titleid="+scrollCount,null, function (result) {
                   var html = template("listContent",result);
                   //console.log(html);
                   $(".list_con ul").append(html);
                   scrollCount--;
                   isWait = false;
                   $(".loading").removeClass("show");
               })
           },1000);
        }
    }


    /*实现老虎机功能*/
    laohuji();
    function laohuji() {
        /*点击按钮效果*/
        //console.log(liH);
        $("#press").on("click", function () {
            /*添加节流阀*/
            if($(".goodluck").hasClass("ing")){
                return;
            }
            $(".goodluck").addClass("ing");
            /*先把动画清掉*/
            setNone($("#ul3"),"none");
            setNone($("#ul2"),"none");
            setNone($("#ul1"),"none");

            var $button =  $("#goodbutton");
            $button.stop().animate({bottom:"11%"},300,"swing", function () {
                $button.animate({bottom:"13%"},400,"swing");
            })

            setAnimate($("#ul3"),"moveUl 1s linear 2");
            setTimeout(function () {
                ranNumber($("#ul3"));
            },2040);
            setAnimate($("#ul2"),"moveUl 1s linear 4");
            setTimeout(function () {
                ranNumber($("#ul2"));
            },4040);
            setAnimate($("#ul1"),"moveUl 1s linear 6");
            setTimeout(function () {
                ranNumber($("#ul1"));
                setTimeout(function () {
                    $(".getMoney").show();
                    $(".goodluck").removeClass("ing");
                },2400)
            },6040);
        })

        /*给指定对象设置动画*/
        function setAnimate($jq,str){
            $jq.css({
                animation:str,
                webkitAnimation:str
            })
        }
        /*给指定对象把偏移和动画都去掉*/
        function setNone($jq){
            $jq.css({
                animation:"none",
                webkitAnimation:"none",
                MozAnimation:"none",
                msAnimation:"none",
                transform:"none",
                webkitTransform:"none",
                MozTransform:"none",
                msTransform:"none"
            })
        }
        /*每个位置上的随机数字*/
        var total = "";
        function ranNumber($jq) {
            var num = Math.floor(Math.random()*10);
            //$("#money").prepend(num+"");
            total = num + total;
            if(total.length == 3){
                $("#money").html("￥0."+total.slice(0,2));
            }
            $jq.css({
                transform:"translateY("+-num*9.091+"%)",
                webkitTransform:"translateY("+-num*9.091+"%)",
                MozTransform:"translateY("+-num*9.091+"%)",
                msTransform:"translateY("+-num*9.091+"%)"
            })
            /*$jq.animate({
                transform:"translateY(-90.91%)",
                webkitTransform:"translateY(-90.91%)"
            },3000,"linear", function () {
               $jq.animate({
                   transform:"none",
                   webkitTransform:"none"
               },0, function () {
                   $jq.animate({
                       transform: "translateY(" + -num * 9.091 + "%)",
                       webkitTransform: "translateY(" + -num * 9.091 + "%)"
                   },2000);
               })
            })*/
        }
    }

    //监听页面滚动事件,大于一个屏幕的宽度时显示"返回顶部"按钮
    $(window).on("scroll", function () {
        if($(this).scrollTop()>=$(window).height()){
            $(".backTop").show();
        }else{
            $(".backTop").hide();
        }
    });

})

/*主页组件js*/
$(function () {
    var windowWidth= $(window).width();
    $.ajax({
        //url:"http://mmb.ittun.com/api/getindexmenu",
        url:"http://mmb.ittun.com/api/getindexmenu",
        success: function (data) {
            $(".fixedNav .menu ul").html(template("coudanIndex",data));
        }
    });
    $.fn.YFLtap = function (callback) {
        var _this = $(this);
        var isMoved = false;
        var startTime = 0;
        var callback = typeof callback == "function" ? callback : function () {
        };
        _this.on("touchstart", function (e) {
            startTime = e.timeStamp;
        });
        _this.on("touchmove", function () {
            isMoved = true;
        });
        _this.on("touchend", function (e) {
            if (!isMoved && e.timeStamp - startTime <= 150) {
                callback(e);
            }
            isMoved = false;
        });
    }
    fixedNav();

    function fixedNav() {
        var fixedNav=$(".fixedNav");
        var menu=$(".fixedNav .menu");
        var isShow=false;
        var startX=0;
        var startY=0;
        var currentX=parseInt(fixedNav.css("left"));
        var currentY=parseInt(fixedNav.css("top"));
        var right= windowWidth-fixedNav.width();
        var left=0;
        var endX=0;
        var endY=0;

        var width= Math.ceil(windowWidth*0.6+8);
        var height=width/1.0276;

        fixedNav.YFLtap(function () {
            var menuX=0;
            var menuY=0;

            if(!isShow){
                if(currentX==left){
                    menu.css("left",left+50);
                }else{
                    menu.css("left",right-10-width);
                }
                menuY=currentY+50;
                if(currentY+40+height> $(window).height()){
                    menuY=$(window).height()-height;
                }
                menu.css("top",menuY);
                menu.fadeIn(150);
                isShow=true;
            }else{
                menu.fadeOut(150);
                isShow=false;
            }
        });
        fixedNav.on("touchstart", function (e) {
            startX=e.originalEvent.touches[0].clientX;
            startY=e.originalEvent.touches[0].clientY;
            endX=startX;
            endY=startY;
            $(window).on("touchmove",preventDefault);
        });
        fixedNav.on("touchmove", function (e) {
            $(this).css("transition","none");
            endX=e.originalEvent.touches[0].clientX;
            endY=e.originalEvent.touches[0].clientY;
            $(this).css({
                left:currentX+endX-startX,
                top:currentY+endY-startY
            });
        });
        fixedNav.on("touchend", function () {
            currentX+=endX-startX;
            currentY+=endY-startY;
            $(this).css("transition","all .3s");
            if(currentX< $(window).width()/2){
                currentX=left;
                $(this).css("left",currentX);
            }else{
                currentX=right;
                $(this).css("left",currentX);
            }
            $(window).off("touchmove",preventDefault);
        });

    }

    function preventDefault(e) {
        e.preventDefault();
    }

});

