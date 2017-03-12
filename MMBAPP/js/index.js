/**
 * Created by lcw on 2016/11/5.
 */
window.onload= function () {
    nav_hs();
    bannerLoop();
    text_con();
}

function nav_hs(){
    $.ajax({
        // url:'http://mmb.ittun.com/api/getindexmenu',
        url:'./js/index.json',
        type:'get',
        data:{},
        success: function (result) {
            var a=JSON.parse(result)
          
            console.log(a);
            var html=template("nav_temp",a);

            $(".nav_ul").html(html);
            nav();
            //$('.nav_ul').children().eq(0).children().attr({'href':'category.html'});
            //$('.nav_ul').children().eq(1).children().attr({'href':'category.html'});
            //$('.nav_ul').children().eq(2).children().attr({'href':'category.html'});
            $('.nav_ul li').eq(3).children("a").attr('href','baicaijia.html?titleid=0');
            //$('.nav_ul').children().eq(5).children().attr({'href':'category.html'});
            //$('.nav_ul').children().eq(6).children().attr({'href':'category.html'});
            //$('.nav_ul').children().eq(8).children().attr({'href':'category.html'});
            //$('.nav_ul').children().eq(9).children().attr({'href':'category.html'});
            //$('.nav_ul').children().eq(10).children().attr({'href':'category.html'});
            //$('.nav_ul').children().eq(11).children().attr({'href':'category.html'});
        }
    });
}
function nav(){
    var nav=document.querySelector(".nav");
    var ulBox=nav.querySelector(".nav_ul");
    //console.log(ulBox);
    var liba=ulBox.children[7];
    var sili=document.querySelectorAll(".nav_ul li:nth-of-type(n+9)");
    //console.log(sili);
    for(var i=0;i<sili.length;i++){

        $(sili[i]).hide();
    }
    liba.addEventListener("click", function () {
        for(var i=0;i<sili.length;i++){

            $(sili[i]).slideToggle(500);
        }
    });
}

function bannerLoop() {
    var banner = document.querySelector(".banner");
    var bannerW = banner.offsetWidth;
    var imgBox = banner.querySelector(".ulBox");
    var index = 1;
    var timerId = null;
    var timerId = setInterval(function () {
        index++;
        imgBox.style.transition = "all 0.5s";
        imgBox.style.webkitTransition = "all 0.5s";
        imgBox.style.transform = "translateX(" + (-index * bannerW) + "px)";
        imgBox.style.webkitTransform = "translateX(" + (-index * bannerW) + "px)";
        if (index == 2) {
            index = 0;
            setTimeout(function () {
                imgBox.style.transition = "none";
                imgBox.style.webkitTransition = "none";
                imgBox.style.transform = "translateX(" + (-index * bannerW) + "px)";
                imgBox.style.webkitTransform = "translateX(" + (-index * bannerW) + "px)";
            }, 1000);
        }
    }, 2000);
}
function text_con(){
    $.ajax({
        url:'http://mmb.ittun.com/api/getmoneyctrl',
        type:'get',
        data:{},
        success: function (result) {
            console.log(result);
            var html=template("text",result);
            $(".text_ul").html(html);
        }
    })
}
