
window.itcast={};

//添加函数
itcast.addTransitionEnd=function(dom,callback){
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
itcast.tap=function(dom,callback){
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
itcast.getArgsObject = function() {
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
        value =  decodeURIComponent(item[1]);

        if(name.length){
            args[name] = value;
        }
    };
    return args;
}