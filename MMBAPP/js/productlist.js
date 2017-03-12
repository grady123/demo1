/**
 * Created by xc on 2016/11/5.
 */

$(function () {
    function getData(url,data,callback) {
        $.ajax({
            type:"get",
            url:url,
            data:data,
            success:function (result) {
                callback && callback(result);
            }
        })
    }
    // 1.动态渲染product-list页面的列表项产品
    getData("http://mmb.ittun.com/api/getcategorybyid",itcast.getArgsObject(),function (result) {
        var titleHtml = template("pl-title-temp",result);
        $("#product-list-title>a").last().after(titleHtml);
    });

    // 2.动态渲染product-list-detail列表项li
    getData("http://mmb.ittun.com/api/getproductlist",itcast.getArgsObject(),function (result) {
        var detailHtml = template("pl-detail-temp",{"result":result["result"]});
        $(".product-list-detail>ul").html(detailHtml);
        //3.页面切换功能
        //3.1获得page总页数
        var totalPage = Math.floor(result.totalCount/result.pagesize);
        //3.2动态创建下拉列表选项
        for (var i = 1; i <= totalPage; i++) {
            var option = $('<option value="'+i+'">'+i+'/'+totalPage+'</option>');
            $(".product-list-detail #pl-page").append(option);

            //3.4 解决select的change事件默认项不能选中
            var pageid = parseInt(itcast.getArgsObject().pageid);
            if(pageid == i) {
                option.attr("selected","selected");
            }
        }
        //3.3 下拉菜单改变，请求数据传入新的pageid
        // 记录原始的categoryid
        var firstId = itcast.getArgsObject().categoryid;
        // select改变事件
        $("#pl-page").change(function () {
            var value = $(this).children("option:selected").val();
            window.location.search = "?categoryid="+firstId+"&pageid="+value;
        });
        // 3.6 点击上一页事件
        var pre_page = document.querySelector(".product-list-detail #pre-page");
        itcast.tap(pre_page,function () {
            var currentValue = parseInt($("#pl-page").children("option:selected").val());
            if(currentValue>1) {
                window.location.search = "?categoryid="+firstId+"&pageid="+(currentValue-1);
            }
            else {
                $(".layout .alert").css({display:"block"});
            }
        })
        // 3.7 点击下一页事件
        var next_page = document.querySelector(".product-list-detail #next-page");
        itcast.tap(next_page,function () {
            var currentValue = parseInt($("#pl-page").children("option:selected").val());
            if(currentValue < totalPage) {
                window.location.search = "?categoryid="+firstId+"&pageid="+(currentValue+1);
            }
            else {
                $(".alert>.tip>.con").text("亲，已经是最后一页啦!");
                $(".layout .alert").css({display:"block"});
            }
        })

        // 3.8动态生成评价星级
        var lis = document.querySelector(".product-list-detail>ul").children;
        for (var i = 0; i < lis.length; i++) {
            getStar(lis[i],"iconfont icon-xing");
        }

        //4.动态渲染choose列表项
        // 4.1筛选choose的数据，剔除相同项目
        var chooseRes = result['result'];
        console.log(chooseRes);
        var chooselist = [];
        for (var i = 0; i < chooseRes.length; i++) {
           chooselist.push(chooseRes[i].brandName);
        }
        chooselist = unique(chooselist);

        // 4.2动态渲染choose列表项
        var chooseHtml = template("chooseTemp",{"result":chooselist});
        $('#brand').on('click',function () {
            if($(".choose .choose-con").html()=='') {
                $(".choose .choose-con").html(chooseHtml);
            }else{
                $(".choose .choose-con").html('');
            }
        })

        //6.价格筛选菜单弹出和消失
        $('#price').on('click',function () {
            if($(".choose .price-info").html()=='') {
                $(".choose .price-info").html('<form action="" method="get"><input type="search" name="lowPrice" id="lowPrice" placeholder="0.00"/><span>-</span><input type="search" name="highPrice" id="highPrice" placeholder="0.00"/><br/><input type="submit" value="筛选"/></form>');
                console.log(123)
            }else{
                $(".choose .price-info").html('');
            }
        })
    });

    //5.筛选菜单弹出和消失
    var chooseShow = document.querySelector(".product-list-title>span");
    var chooseHide = document.querySelector(".choose>ul>li:last-of-type>span");
    itcast.tap(chooseShow,function () {
        $(".product-list .choose").show();
    })
    itcast.tap(chooseHide,function () {
        setTimeout(function () {
            $(".product-list .choose").hide();
        },50);
    })

    // 7.点击x取消第一页提示
    var close_one = document.querySelector(".alert>.tip>.title>span");
    itcast.tap(close_one,function () {
        setTimeout(function () {
            $(".layout .alert").css({display:"none"});
        },50);
    })
    $(function () {
        var windowWidth= $(window).width();
        $.ajax({
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
})


