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
    //����ҳ��
    var page=Math.floor(result.totalCount/10);
    var section=document.querySelector(".sel");;
    //��̬����option
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



//�����һҳ�¼�
var id;
if(!itcast.getArgsObject().pageid){
    id = 1;
}else {
    id=itcast.getArgsObject().pageid;
}
var last=document.querySelector(".last");
var after=last.children[0];
after.href = "moneyctrl.html?pageid=" + (++id>=14? 14 :id);

//��һҳ
var prev=document.querySelector(".prev");
var fist=prev.children[0];
id=itcast.getArgsObject().pageid;    //��Ҫ�ٴ�����
fist.href = "moneyctrl.html?pageid=" + (--id>=1? id :1);

//setion ����ѡ��
 var sel=document.querySelector(".sel");
sel.addEventListener("change",function(){
   var val= $(this).children("option:selected").val();
    location.search="?pageid="+val;

});
// ����л���ʽ
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



