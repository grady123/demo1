/**
 * Created by Administrator on 2016/11/5 0005.
 */
var page;


var getData=function(callback){
    $.ajax({
        type:"get",
        data:itcast.getArgsObject(),
        url:"http://mmb.ittun.com/api/getmoneyctrl",
        success:function(result){
            callback&&callback(result);
            //console.log(result.totalCount);


        }

    })
}

getData(function(result){
    console.log(result.totalCount);
    //计算页数
    var page=Math.floor(result.totalCount/10);
    var section=document.querySelector(".sel");;
    //动态生成option
    for(var i=0;i<page;i++){
        var option=document.createElement("option");
        option.value=i+1;
        section.appendChild(option);
        option.innerHTML=i+1+"/"+page;
        if(i+1==Number(itcast.getArgsObject().pageid)){
            option.setAttribute("selected","selected");
        }
    }


})

var rander=function(){
    getData(function(result){
        var html=template("money",{items:result["result"]});
        $(".moneyCon").html(html);

    });
}
rander();



//点击下一页事件
var id;
if(!itcast.getArgsObject().pageid){
    id = 1;
}else {
    id=itcast.getArgsObject().pageid;
}
var last=document.querySelector(".last");
var after=last.children[0];
after.href = "moneyctrl.html?pageid=" + (++id>=14? 14 :id);

//上一页
var prev=document.querySelector(".prev");
var fist=prev.children[0];
id=itcast.getArgsObject().pageid;    //需要再次请求
fist.href = "moneyctrl.html?pageid=" + (--id>=1? id :1);

//setion 下拉选择
 var sel=document.querySelector(".sel");
sel.addEventListener("change",function(){
   var val= $(this).children("option:selected").val();
    location.search="?pageid="+val;

});
// 点击切换样式
 var j=1;
    $(".tab").on("click", function(){
        var arr=["main","list","pc"];
        for (var i = 0; i < arr.length; i++) {
             $(".moneyCon").parent().removeClass(arr[i]);
        };
        if(j==3){
            j=0;
        }
       
        $(".moneyCon").parent().addClass(arr[j]);
         j++;
    });



