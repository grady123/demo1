/**
 * Created by CrazyBoy on 2016/11/5.
 */
$(function () {
    function brand(dom,id) {
        $.ajax({
            type:"get",
            url:"http://mmb.ittun.com/api/getbrand",
            data:itcast.getArgsObject(),
            success: function (result) {
                var str = decodeURI(itcast.getArgsObject()["brandtitle"]);
                var str1 = str.split('十');
                $(".category-title span:last-of-type").text(str);
                $(".brand-list").text(str1[0]+"那个牌子好");
                $(".product-list").text(str1[0]+"产品销量排行");
                $(".sales-list").text(str1[0]+"最新评论");
                var html = template("brand",{items:result["result"]});
                dom.append(html);
                Product($(".product-content ul"), result.result[0].brandTitleId);
            }
        })
    }
    function Product(dom,id) {
        $.ajax({
            type:"get",
            url: "http://mmb.ittun.com/api/getbrandproductlist",
            data: {brandtitleid: id, pagesize: 4},
            success: function (result) {
                var html = template("product", {items:result["result"]});
                dom.append(html);
                console.log(result.result);
                Sale($(".sales-content ul"),result.result);
            }
        })
    }

    function Sale(dom,proArr) {
        var arr=[];
        for (var i = 0; i < proArr.length; i++) {
            arr.push(proArr[i].productId)
        }
        $.ajax({
            url: "http://mmb.ittun.com/api/getproduct",
            data: {productid: arr[0]},
            success: function (result) {
                result = result.result;
                for (var i = 0; i < result.length; i++)
                {
                    $.ajax({
                        url: "http://mmb.ittun.com/api/getproductcom",
                        data: {productid: arr[0]},
                        success: function (data) {
                            data = data.result;
                            for (var arr2 = [], j = 0; j < data.length; j++){
                                arr2.push({
                                    productName: result[0].productName,
                                    productImg: result[0].productImg,
                                    comContent: data[j].comContent,
                                    comTime: data[j].comTime,
                                    comName: data[j].comName,
                                    productId:data[j].productId
                                });
                            }
                            console.log(data);
                            console.log(data[1].productId);
                            data = {"items": arr2};
                            var html = template("sales", data);
                            dom.append(html);
                        }
                    })
                }
            }
        })
    }
    var ul = document.querySelector(".hot-category-content ul");

    brand($(".category .brand-content ul"));
});