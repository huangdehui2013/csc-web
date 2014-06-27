<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>无标题文档</title>
</head>

<body>
  <script src="../assets/plugins/ckeditorForNoPic/ckeditor.js" type="text/javascript"></script>
   <script src="../assets/plugins/ckeditorForNoPic/styles.js" type="text/javascript"></script>

  <!--   <label>内容简介</label>
<div>
  <textarea class="ckeditor form-control" id="ckeditor2" name="contentInfo" row="6"></textarea>
</div>
-->
<input type="hidden" name="fwb" id="fwb"/>
<div>
  <textarea class="ckeditor form-control" id="ckeditor2" name="zxgl" row="20"></textarea>
  <script type="text/javascript">  
                        
                    //添加ckeditor编辑器；  
                       var editor ;  
                        if(!CKEDITOR.instances.ckeditor2){  //判定content2是否存在  
                             editor= CKEDITOR.replace("ckeditor2", { 
                               	height:420 
                               });  
                        }else{  
                               addCkeditor("ckeditor2");  
                        }  
                           
                    function addCkeditor(id){  
                        var editor2 = CKEDITOR.instances[id];  
                        if(editor2) editor2.destroy(true);//销毁编辑器 content2,然后新增一个  
                            editor = CKEDITOR.replace(id, { 
                               	height:420 
                               });  
                    }  
                     </script>  
  

  <script>
function functionName(){
return 1;
}
</script>

  <script type="text/javascript">  
                             CKEDITOR.instances["ckeditor2"].on("instanceReady", function () {  
            //set keyup event  
            this.document.on("keyup", AutoSave);  
            //and click event  
            this.document.on("click", AutoSave);  
            //and select event  
            this.document.on("select", AutoSave);  
            this.document.on("mouseover", AutoSave);  
             
   			AutoSave();
         });  
                  CKEDITOR.instances["ckeditor2"].on("loaded", function () {     
                    setTimeout(function(){   
                      var thisId = window.parent.getFrameId(this);
                      var srcArray=this.parent.document.getElementById(thisId+"content").value;
                      //alert(srcArray);
                      
                      CKEDITOR.instances['ckeditor2'].document.$.body.innerHTML = srcArray;
                 AutoSave();
                }, 2000);　
                  });                

        function AutoSave() {//相应的操作过程，可以按下面写，也可以按一般javascript过程写。  
         CKEDITOR.tools.setTimeout(function () { 

            var thisId = window.parent.getFrameId(this);
            // alert(thisId);
// alert(thisId);//测试获取的编辑框Id
            // alert(document.getElementsByTagName("textarea")[0].getAttribute("name")); 
            // var ckCtx=CKEDITOR.instances.ckeditor2;
             this.parent.document.getElementById(thisId+"a").value =editor.getData();

            // alert(this.parent.document.getElementById("addframea").value);//测试值传递
         }, 100);  
      }      
                               
      
   </script></div>

</body>
</html>