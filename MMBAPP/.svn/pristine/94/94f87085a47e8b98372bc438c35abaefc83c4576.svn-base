
window.itheima={};

//添加函数
itheima.addTransitionEnd=function(dom,callback){
    //传入的对象不为null
    if (dom && typeof dom==="object"){
        dom.addEventListener("webkitTransitionEnd",function(){
            callback && callback();
        });
        dom.addEventListener("transitionEnd",function(){
            callback && callback();
        });
    }
};

//封装tap事件
itheima.tap=function(dom,callback){
    //判断当前dom是否是一个对象
    if(dom && typeof  dom =='object'){
        var ismove=false;
        var st=0; //开始响应的时间
        dom.addEventListener("touchstart",function(e){
            st=Date.now();
        });
        dom.addEventListener("touchmove",function(e){
            ismove=true;
        });
        dom.addEventListener("touchend",function(e){
            //满足两个条件：1.不能滑动过  2.必须比click的响应时间要小，一般是150
            if(ismove ==false && Date.now()-st < 150){
                //如果传入的回调函数非空，则进行调用
                callback && callback(e);
            }
            ismove=false;
        });
    }
};

/*尽管location.search返回从问号到URL末尾的所有内容,但却没有办法逐个访问其中
的每个查询字符串参数.为此,可以像下面这样创建一个函数,用以解释查询字符串.
然后返回包含所有参数的一个对象*/
itheima.getArgsObject = function() {
    //取得查询字符串并去掉开头的问号
    
    var qs = (location.search.length > 0 ? location.search.substring(1):""),

    //保存数据的对象
    args = {},

    //取得每一项
    items = qs.length ? qs.split("&"):[],
    item = null,
    name = null,
    value = null,
    //在for循环中使用
    len = items.length;
    // console.log(len);
    //逐个将每一项添加args对象中
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length){
            args[name] = value;
        }
    };
    return args;
}

/*封装通用的x轴滑动偏移效果*/
itheima.touchMoveX = function (eleBox,stretch){
    if(!eleBox || typeof eleBox != "object"){
        return;
    }
    var ele = eleBox.children[0];
    var eleHeight = ele.offsetWidth;
    var eleBoxHeight = eleBox.offsetWidth;
    var minX = eleBoxHeight- 50 - eleHeight;
    console.log(eleHeight+"=="+eleBoxHeight+"=="+minX);
    var stretch = stretch || 50;

    var startX = 0;
    var isMove = false;
    var distanceX = 0;

    var lastX = 0;
    /*通过正则拿到偏移距离*/
    var reg = /[-]?\d+/;
    var match = reg.exec(ele.style.transform);
    if(match){
        lastX = parseInt(match[0]) ;
    }



    var setTranslate = function  (distance) {
        ele.style.transform = "translateX("+distance+"px)";
        ele.style.transform = "webkitTranslateX("+distance+"px)";
    }
    var closeTransition = function  () {
        ele.style.transition = "none";
        ele.style.webkitTransition = "none";
    }
    var openTransition = function  () {
        ele.style.transition = "all .3s";
        ele.style.webkitTransition = "all .3s";
    }

    /*把转换重置和过渡关闭*/
    /*closeTransition();
     ele.style.transform = "none";
     ele.style.webkitTransform = "none";*/

    ele.addEventListener("touchstart",function  (e) {
        startX=  e.touches[0].clientX;
        closeTransition();
         console.log(startX);
    })
    eleBox.addEventListener("touchmove",function  (e) {
        isMove = true;
        distanceX =  e.touches[0].clientX - startX;
         console.log(distanceX);
        var temp = lastX+distanceX;
        if( temp >= stretch){
            temp = stretch;
        }else if(temp <= minX-stretch){
            temp = minX-stretch;
        }
        setTranslate(temp);

    })
    ele.addEventListener("touchend",function  (e) {
        if(isMove){
            lastX+= distanceX;
            if(lastX > 0){
                lastX = 0;
                openTransition();
                setTranslate(lastX);
            }else if(lastX < minX){
                lastX = minX;
                openTransition();
                setTranslate(lastX);
            }
        }
        console.log(lastX);
        isMove = false;
    })
}