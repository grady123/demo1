
var data = itheima.getArgsObject();
var datas = [];
/*白菜价的商品*/
$.getJSON("http://mmb.ittun.com/api/getbaicaijiatitle",null, function (result) {
    var result = result.result;
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
        var o = {};
        o.target = "baicaijia.html?titleid=" + result[i].titleId;
        o.name = result[i].title;
        datas.push(o);
    }
    //console.log(datas);
})
/*省钱控的商品*/
for (var i = 1; i < 15; i++) {
    $.getJSON("http://mmb.ittun.com/api/getmoneyctrl?pageid="+i,null, function (result) {
        var result = result.result;
        //console.log(result);
        for (var j = 0; j < result.length; j++) {
            var o = {};
            o.target = "moneyproduct.html?productid=" +result[j].productId;
            o.name = result[j].productName;
            datas.push(o);
        }
        //console.log(datas);

    })
}

/*国内折扣的商品*/
$.getJSON("http://mmb.ittun.com/api/getinlanddiscount",null, function (result) {
    var result = result.result;
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
        var o = {};
        o.target = "moneyproduct.html?productid=" +result[i].productId;
        o.name = result[i].productName;
        datas.push(o);
    }
    //console.log(datas);
})

/*分类页面的分类列表*/
for (var i = 0; i < 8; i++) {
    $.getJSON("http://mmb.ittun.com/api/getcategory?titleid="+i,null, function (result) {
        var result = result.result;
        //console.log(result);
        for (var j = 0; j < result.length; j++) {
            var o = {};
            o.target = "productlist.html?categoryid="+result[j].categoryId+"&pageid=1";
            o.name = result[j].category;
            /*跳到分类列表的页面数据*/
            datas.push(o);
            /*分类页面的商品列表*/
            $.getJSON("http://mmb.ittun.com/api/getproductlist?categoryid="+result[j].categoryId+"&pageid=1",null, function (res) {
                var res = res.result;
                //console.log(res);
                for (var k = 0; k < res.length; k++) {
                    var o = {};
                    o.target = "bijia.html?productid="+res[k].productId;
                    o.name = res[k].productName;
                    datas.push(o);
                }
                //console.log(datas);
            })
        }
        //console.log(datas);
    })
}
setTimeout(function () {
    console.log(datas.length);
    $(".serach_t input").on("keyup", function (e) {
        var _this =$(this);
        var $ul = $("#ul");
        var value = $(this).val();
        console.log(value);
        if(value.length == 0){
            $ul.empty();
            $(".mySearch .box").hide();
            return;
        }
        var filter = [];
        for (var i = 0; i < datas.length; i++) {
            if(datas[i].name.indexOf(value)!=-1){
//                filter.push(datas[i].name);
                var str = '<li data-target="'+datas[i].target+'">'+datas[i].name+'</li>';
                filter.push(str);
            }
        }
        if(filter.length == 0){
            $(".mySearch .box").hide();
        }else {
            $(".mySearch .box").show();
        }
        $ul.html(filter.join(""));
        $("#ul li").on("click", function () {
            _this.val($(this).text());
            $("#goSearch").attr("href",$(this).attr("data-target"));
        })

    })
    $(".serach_t input").on("blur", function () {
        $(".mySearch .box").fadeOut();
    })
    $(".serach_t input").on("focus", function () {
        var val =  $(".serach_t input").val();
        if(val.length == 0){
            $(".mySearch .box").hide();
        }else {
            $(".mySearch .box").fadeIn();
        }
    })
},1000);