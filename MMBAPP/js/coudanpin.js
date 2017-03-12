$(function () {
    var windowWidth= $(window).width();
    initDataAndBindEvents();
    backToTop();
    fixedNav();

    function initDataAndBindEvents() {
        var productsData=null;
        var pageIndex=0;
        var itemsNum=8;
        //全局变量,用来存储ajax获取的json数组,有页码和每页条数

        var tabs=$(".coudan-box .filter>ul>li");
        var popbox=$(".coudan-box .popbox");
        var boxesUL=popbox.find("ul");
        var len=tabs.length;
        //获取tab栏和点击显示的popbox

        if(!localStorage.getItem("coudanIsNotFirst")){
            $(".update").show();
        }else{
            $(".update").hide();
        }
        $(".update button").YFLtap(function (e) {
            e.preventDefault();
            $(".update").hide();
            localStorage.setItem("coudanIsNotFirst","notNull");
        });

        $.ajax({
            url:"http://mmb.ittun.com/api/getgsshop",
            success: function (data) {
                $(".coudan-box .popsort>ul").html(template("shopName",data));
                tabs.eq(0).find("span").text(popbox.eq(0).find("a").eq(0).text());
            }
        });
        $.ajax({
            url:"http://mmb.ittun.com/api/getgsshoparea",
            success: function (data) {
                $(".coudan-box .popcat>ul").html(template("shopArea",data));
                var text=popbox.eq(1).find("a").eq(0).text();
                if(text.indexOf("（")!=-1){
                    text=text.slice(0,text.indexOf("（"));
                }
                tabs.eq(1).find("span").text(text);
            }
        });
        $.ajax({
            url:"http://mmb.ittun.com/api/getgsproduct",
            data:{
                shopid:0,
                areaid:0
            },
            success: function (data) {
                productsData=data;
                pageIndex=0;
                $(".coudan-box .container").html(template("shopProduct",{"result":data.result.slice(pageIndex, itemsNum)}));
                $(".coudan-box .container .btn").addClass("jd");
                var imgWidth=$(".coudan-box .container img").width();
                $(".coudan-box .container img").height(imgWidth);
            }
        });
        $.ajax({
            url:"http://mmb.ittun.com/api/getindexmenu",
            success: function (data) {
                $(".fixedNav .menu ul").html(template("coudanIndex",data));
            }
        });
        //使用ajax初始化电商名,区域名和商品信息,首页信息

        $(window).on("resize", function () {
            var imgWidth=$(".coudan-box .container img").width();
            $(".coudan-box .container img").height(imgWidth);
            windowWidth= $(window).width();
        });
        //resize重新设置图片高度
        $(window).on("scroll", function () {
            if($(this).scrollTop()>=$(window).height()){
                $(".backToTop").show();
            }else{
                $(".backToTop").hide();
            }
            if((pageIndex+1)*itemsNum>=productsData.result.length){
                $(".Page_loading").hide();
            }
            if($(this).scrollTop()+$(window).height()>=$(".header-bar").height()+$(".coudan-box").height()){
                if((pageIndex+1)*itemsNum>=productsData.result.length){
                    return;
                }
                $(".Page_loading").show();
                pageIndex++;
                $(".coudan-box .container").append(template("shopProduct",{"result":productsData.result.slice(pageIndex*itemsNum, pageIndex*itemsNum+itemsNum)}));
                if(productsData.result[0].shopId==0){
                    $(".coudan-box .container .btn").addClass("jd");
                }else if(productsData.result[0].shopId==1){
                    $(".coudan-box .container .btn").addClass("yhd");
                }else if(productsData.result[0].shopId==2){
                    $(".coudan-box .container .btn").addClass("tmall");
                }
                var imgWidth=$(".coudan-box .container img").width();
                $(".coudan-box .container img").height(imgWidth);
            }
        });
        //滚动时通过全局变量渲染更多数据,显示或隐藏loading和返回顶部

        tabs.each(function (index,ele) {
            $(ele).YFLtap(function (e) {
                var li=$(ele);
                var index=li.index();
                var i=li.find("i");
                if(index<len-1){
                    if(parseFloat(popbox.eq(index).css("opacity"))<1){
                        return;
                    }
                    i.toggleClass("on");
                    li.siblings().find("i").removeClass("on");
                    popbox.eq(index).siblings(".popbox").fadeOut(200);
                    setTimeout(function () {
                        popbox.eq(index).fadeToggle(300);
                    },150);
                }
            });
        })
        //点击tab时显示popbox

        boxesUL.YFLtap(function (e) {
            var li=$(e.target).parent();
            var index=li.index();
            var now=li.parent().find(".on").index();

            if(index==now){
                tabs.find("i").removeClass("on");
                li.parent().parent().fadeOut(200);
                return;
            }

            li.addClass("on").siblings(".on").removeClass("on");
            var id=li.parent().parent()[0].dataset['boxid'];
            var text=$(e.target).text();
            if(text.indexOf("（")!=-1){
                text=text.slice(0,text.indexOf("（"));
            }
            tabs.eq(id).find("span").html(text);
            tabs.eq(id).find("i").removeClass("on");

            setTimeout(function () {
                li.parent().parent().fadeOut(200);
            },150);

            var ids=[];
            boxesUL.each(function (index,ele) {
                ids.push($(ele).find(".on").index());
            });
            $.ajax({
                url:"http://mmb.ittun.com/api/getgsproduct",
                data:{
                    shopid:ids[0],
                    areaid:ids[1]
                },
                success: function (data) {
                    productsData=data;
                    pageIndex=0;
                    $(".coudan-box .container").html(template("shopProduct",{"result":data.result.slice(pageIndex, itemsNum)}));
                    if(productsData.result[0].shopId==0){
                        $(".coudan-box .container .btn").addClass("jd");
                    }else if(productsData.result[0].shopId==1){
                        $(".coudan-box .container .btn").addClass("yhd");
                    }else if(productsData.result[0].shopId==2){
                        $(".coudan-box .container .btn").addClass("tmall");
                    }
                    var imgWidth=$(".coudan-box .container img").width();
                    $(".coudan-box .container img").height(imgWidth);
                }
            });
        });
        //点击popbox里的选项时重新请求数据
    }

    function backToTop() {
        $(".backToTop").YFLtap(function (e) {
            e.preventDefault();
            $(window).scrollTop(0);
        });
        $(".backToTop").on("touchstart", function () {
            $(this).css("background-color","#E0E0E0");
        });
        $(".backToTop").on("touchend", function () {
            $(this).css("background-color","#fff");
        });
        //点击返回顶部
    }

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
    //固定的主页图标

    function preventDefault(e) {
        e.preventDefault();
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