(function($) {
		$(function() {
			
			$("#brand option").each(
					function() {
						var shamSeries = $("#shamSeries");
						var brandId = $(this);
						$("#shambrand option").each(function() {

							if (brandId.val() == $(this).val()) {

								brandId.text($(this).text());
								$(this).remove();
							}

						});

						var sdatashu = $(this).val();
						$.ajaxSettings.async = false;
						$.getJSON('findSeriesByBrandId.json?brandId=' + sdatashu,
								function(data) {

									$.each(data, function(index, item) {

										shamSeries.append("<option value='"
												+ item.velSeriesId + "' data='"
												+ sdatashu + "' >"
												+ item.velSeriesChsName
												+ "</option>");
									});

								});

					});

			$("#series option").each(
					function() {

						var shamModel = $("#shamModel");
						var seriesId = $(this);
						// alert(shamSeries.length);
						$("#shamSeries option").each(function() {

							if (seriesId.val() == $(this).val()) {

								seriesId.text($(this).text());
								seriesId.attr("data", $(this).attr("data"));
								$(this).remove();
							}

						});

						var seriesData = $(this).val();
						$.ajaxSettings.async = false;
						$.getJSON(
								'findModelBySeries.json?seriesId='+ $(this).val()+"&brandId="+$(this).attr("data"), function(data) {
									$.each(data, function(index, item) {
										var vs=0;
										$("#shamModel option").each(function(){
											
											if(item.velModelId==$(this).val()){
												
												vs=1;
												
												return false;
											}
											
										});
										
										if(vs==0){
											
											shamModel.append("<option value='"
													+ item.velModelId+ "' data='"+seriesData+"' title='"+item.velModelName+"' >"
														+ item.velModelName+ "</option>");
										}

									});

								});
					});
			
			$("#model option").each(function() {
						var shamstore = $("#shamstore");
						var modelId = $(this);
						
						$("#shamModel option").each(function() {

							if (modelId.val() == $(this).val()) {

								modelId.text($(this).text());
								modelId.attr("data", $(this).attr("data"));
								$(this).remove();
							}

						});
						
						$.ajaxSettings.async = false;
						$.getJSON('findSalesStoreList.json?modelId='+ modelId.val()+ "&provinceId=-1&cityId=-1&districtId=-1",function(data) {
									$.each(data, function(index, item) {
										var is=0;
										$("#shamstore option").each(function(){
											
											if(item.storeId==$(this).val()){
											
												$(this).attr("data",$(this).attr("data")+','+modelId.val());
												is=1;
												return false;
											}
										
									});
									
									if(is==0){
										
										shamstore.append("<option value='" + item.storeId + "' data="+modelId.val()+" title="+item.storeName+" >"+item.storeName+"</option>");
									}
									});
						});

					});
			
			$("#findMerchandiseList").attr("data", $("#store option").val());
				
			
			$("#store option").each(function() {

					var storeId = $(this);
					$("#shamstore option").each(function() {

							if (storeId.val() == $(this).val()) {

									storeId.text($(this).text());
									storeId.attr("data", $(this).attr("data"));

									$("tr[name^='promotionmerchandise']").each(function() {
											var storeValue = $(this).find("[name='storeId']").val();

											if (storeId.val() == storeValue) {

														$(this).find("[name='storeName']").val(storeId.text());
											}
									});
									
									$(this).remove();
							}

					});
					
					//判断是否有已经下架的车型 fixbug17920
					if(storeId.attr("data")==""){
						$("tr[name^='promotionmerchandise']").each(function() {
							var storeValue = $(this).find("[name='storeId']").val();
								if (storeId.val() == storeValue) {
									$(this).find("[name='storeName']").val(storeId.text())
																	.attr("title",storeId.text());
								}
						});
					}
					//fixend

			});

			$("tr[name^='promotionmerchandise']").each(function(i) {

					
					var modelId = $(this).find("[name='modelId']").val();

					var promotionmerchandise = $(this);
					
					
					$.ajaxSettings.async = false;
					$.ajax({url:'changeMerchandiseIdByColor.json?merchandiseId='+ modelId,success:function(data) {$.each(data,function(index,item) {

							
								promotionmerchandise.find("[name='shamcolor']").each(function() {
										
										if ($(this).attr("data") == item.velColorId) {
											$(this).parent().prev('label').html(item.velColorChsName);
											$(this).find(".labels").append(data);

										}
								});
								promotionmerchandise.find("div[name='colorstotal'] ul li").each(function() {
									if($(this).attr("data")==item.velColorId){
										$(this).find("label").append(item.velColorChsName);
										
									}
							});
								
						});
					},error:function(error){
						
						$.dopAlert("当前页面数据错误,不可修改,请重新刷新页面");
						$("#activityDyma *").attr("disabled",true);
						$(".btn-close").attr("disabled",false);  
						return false;
						
					},dataType:"json"});

			});


			
			$("tr[name^='promotionmerchandise']").each(function(){
				var value=$(this).find("[name^='total']:checked").val();
				var sv=$(this);
				if(value=='totalSum'){
					
					var values=$(this).find("[name='prmtMdseId']").val();
					
					$.ajaxSettings.async = false;	
					$.ajax({
						  url: '../activityDynamic/ajaxGetAvliabledPe.json?mId='+ values,
						 
						  success: function(data) {
								
								sv.find("div[name='totalkeyong']").append("<label name='totalkeyongpeie'>"+data+"</label>");
								
							},
							error:function(){
								
								$.dopAlert("数据已发生异常");
							},
						  dataType: "JSON"
					});
					
//					$.getJSON('../activityDynamic/ajaxGetAvliabledPe.json?mId='+ values,function(data) {
//						
//						sv.find("div[name='totalkeyong']").append("<label name='totalkeyongpeie'>"+data+"</label>");
//						
//					});
					
				}else{
					
					$(this).find("[id^='updateColor']").each(function(){
						
						var updatecolor=$(this);
						var color=$(this).parent().parent().find("[name='shamcolor']").attr("data");
						$.ajaxSettings.async = false;	
						//alert(color);
						$.getJSON('../activityDynamic/ajaxGetAvliabledPe.json?mId='+$(this).attr("data"), function(data) {
							
							sv.find("div[name='colorstotal'] ul li").each(function(){
								//alert($(this).html());
								if(color==$(this).attr("data")){
									
									//$(this).find(".labels").append(data);
									$(this).append(data);
								}
							});
							updatecolor.parent().parent().find("[name='shamskeyongpeie']").val(data);
							
						},function(error){
							
							$.dopAlert("数据发生错误");
							 $('#editDialog').html('');
							    $('#editDialog').modal('hide');
							
						});
						
					});
					
					
					
					
					
					
					
					
				}
				
				
			});
			
			
			var s=$("#salesMode").val();
			
			
			if(s=='1'){
				
				var values=0;
				
				$("tr[name^='promotionmerchandise']").each(function(){
					
					var value=$(this).find("[name^='total']:checked").val();
					
					
					if(value=='totalSum'){
						
						values=parseInt(values)+parseInt($(this).find("[name='totalpe']").val());
					}else{
						
					
						$(this).find("[name='colorTotalN']").each(function(){
							
							if($(this).val()!=''){
								
								values=parseInt(values)+parseInt($(this).val());
								
								
							}
							
						});
						
						
						
					}
				});
				
				$("#totalnumsums").val(values);
			}
			
		});
})(jQuery);




$("input[id^='updateColor']").on('click',function(){
	
	var  update=$(this).parent();
	
	var value=$(this).parent().parent().find("[name^='total']:checked").val();

	var totalNum=$("#totalNum").val();
	if(value=='totalSum'){
		
		var values=$(this).parent().parent().find("[name='prmtMdseId']").val();
		
		var totalNumSum=$(this).parent().parent().find("[name='totalNumSum']").val();
		
		
		
		if (!/^(\+|-)?\d+($|\d+$)/.test(totalNumSum)) {                    
           
			$.dopAlert('请输入一个正数或者负数');
			
            return false;
        }else{
        	
        	var salesMode=$("#salesMode option:selected").val();
        	var vs=$(this).parent().parent().find("[name='totalNumSum']").val();
    		var totalpe=$(this).parent().parent().find("[name='totalpe']").val();
    		
    		var totalkeyongpeie=$(this).parent().parent().parent().find("[name='totalkeyongpeie']").html();
    		
        	//零售
        	if(salesMode==1){
        		
        		if(vs==0){
        			
        			$.dopAlert("调整配额为0,不支持修改");
        			return false;
        			
        		}
        		
        		if((parseInt(totalkeyongpeie)+parseInt(vs))<0){
	        		
	        		$.dopAlert("零售模式:调整配额:"+vs+"可用配额:"+totalkeyongpeie);
	        		
	        		return false;
	        	}
        		
        		var totalnumsums=$("#totalnumsums").val();
        		
        		if((parseInt(totalnumsums)+parseInt(vs))>parseInt(totalNum)){
        			
        			var t=parseInt(totalNum)-parseInt(totalnumsums);
        			t=t>0?t:0;
        			
        			$.dopAlert("零售模式:调整配额:"+vs+",原有配额:"+totalnumsums+",最多可调整配额:"+t);
                	return false;
        		}
        		
        		adjustCommited12(values,vs,update,salesMode,'totalSum');
        	}else{
        		
        		
        		if(vs==0){
        			
        			$.dopAlert("调整配额为0,不支持修改");
        			return false;
        		}
        		
        		
	        	if((parseInt(totalkeyongpeie)+parseInt(vs))<0){
	        		
	        		$.dopAlert("包销模式:调整配额:"+vs+",可用配额:"+totalkeyongpeie);
	        		
	        	//	$.dopAlert("不支持修改,修改配额不能大于可用配额");
	        		
	        		return false;
	        	}	
        		
	        
                    if((parseInt(vs)+parseInt(totalpe))>parseInt(totalNum)){
                    	
                    	var t=(parseInt(totalNum)-parseInt(totalpe));
                    	
                    	t=t>0?t:0;
                      
                    	$.dopAlert("包销模式:调整配额:"+vs+",原有配额:"+totalpe+",最多可调整配额:"+t);
                    	return false;
                    }else{
                      
                         adjustCommited12(values,vs,update,salesMode,'totalSum');
                    }
        	
        	
        	
        	}
        }
	}else{
		
		var values=$(this).parent().parent().find("[name='shamskeyongpeie']").val();
		
		var totalNumSum=$(this).parent().parent().find("[name='shamcolor']").val();
		
		
		var colorId=$(this).parent().parent().find("[name='shamcolor']").attr("data");
		var zongpeie=0;
		//alert($(this).parent().parent().html());
		$(this).parent().parent().parent().find("li").each(function(){
			//alert();
			zongpeie+=parseInt($(this).find("[name='colorTotalN']").val());
			
			
		});
		
		//alert(totalNumSum);
		//
		
		if (!/^(\+|-)?\d+($|\d+$)/.test(totalNumSum)) {                    
           
			$.dopAlert('请输入一个正数或者负数');
			
            return false;
            
        }else{
        	
        	var salesMode=$("#salesMode option:selected").val();
        	
        	//零售
        	if(salesMode==1){
        		
        		if(totalNumSum==0){
        			
        			$.dopAlert("调整配额为0,不支持修改");
        			
        			return false;
        		}
        		
        		if((parseInt(values)+parseInt(totalNumSum))<0){
	        		
        			
        			
	        		$.dopAlert("零售模式:调整配额:"+totalNumSum+",可用配额:"+values);
	        		
	        		return false;
	        	}
        		
        		var totalnumsums=$("#totalnumsums").val();
        		
        		if((parseInt(totalnumsums)+parseInt(totalNumSum))>parseInt(totalNum)){
        			
        			var t=(parseInt(totalNum)-parseInt(totalnumsums));
        			t=t>0?t:0;
        			$.dopAlert("零售模式:调整配额:"+totalNumSum+",原有配额:"+totalnumsums+",最多可调整配额:"+t);
                	return false;
        		}
        		
        		adjustCommited12($(this).attr("data"),totalNumSum,update,salesMode,'totalColor',colorId);
        		
        		
        	}else{
        		
        		if(totalNumSum==0){
        			
        			$.dopAlert("调整配额为0,不支持修改");
        			return false;
        		}
        		
        		
        		if((parseInt(totalNumSum)+parseInt(values))<0){
        			
        			
        			$.dopAlert("包销模式:调整配额:"+totalNumSum+",可用配额:"+values);
        			
        			return false;
        		}
        		
        		if(parseInt(zongpeie)+parseInt(totalNumSum)>parseInt(totalNum)){
        			
        			var t=parseInt(totalNum)-parseInt(zongpeie);
        			t=t>0?t:0;
        			
        			$.dopAlert("包销模式:调整配额:"+totalNumSum+",原有配额:"+zongpeie+",最多可调整配额:"+t);
        			return false;
        		}
        		
        		adjustCommited12($(this).attr("data"),totalNumSum,update,salesMode,'totalColor',colorId);
        		
        	}
        }
		
	}
	
});

function adjustCommited12(mId,peNum,update,salesMode,total,colorId){
	//alert(update.parent().parent().find("[name='totalkeyong']").html());
	//alert(update.parent().find("[name='totalpe']").attr("value",parseInt(update.parent().find("[name='totalpe']").attr("value"))+parseInt(peNum)).val());
	//alert(update.parent().parent().parent().parent().html());
	//return false;
	
	$.ajaxSettings.async = false;	
	$.ajax({url:'../activityDynamic/ajaxCommitUpPe.json?mId='+ mId+'&peNum='+peNum,success: function(data) {
		
			
	           if(data==true){
	        	   
	        	   $.dopAlert("更新配额成功!",null);   
	            	if(total=='totalSum'){
	            		
	            		$.ajaxSettings.async = false;	
		            	$.getJSON('../activityDynamic/ajaxGetAvliabledPe.json?mId='+ mId, function(data) {
		            		
		            		if(salesMode==2){
		            			
		            			update.parent().parent().find("[name='totalkeyong']").html('').append("该商品可用配额:<label name='totalkeyongpeie'>"+data+"</label>");
		            			
		            			update.parent().find("[name='totalpe']").attr("value",parseInt(update.parent().find("[name='totalpe']").attr("value"))+parseInt(peNum));
		            		}else{
		            			
		            			update.parent().parent().find("[name='totalkeyong']").html('').append("该商品可用配额:<label name='totalkeyongpeie'>"+data+"</label>");
		            			
		            			
		            			update.parent().find("[name='totalpe']").attr("value",parseInt(update.parent().find("[name='totalpe']").attr("value"))+parseInt(peNum));
		            			$("#totalnumsums").attr("value",parseInt($("#totalnumsums").val())+parseInt(peNum));
		            		}
		            	});
		            	
		            	
	            	}else{
	            		
	            		$.ajaxSettings.async = false;	
		            	$.getJSON('../activityDynamic/ajaxGetAvliabledPe.json?mId='+ mId, function(data) {
		            		
		            		if(salesMode==2){
			            		update.parent().parent().parent().parent().find("div[name='colorstotal'] ul li").each(function() {
			            			
									if($(this).attr("data")==colorId){
									
										var colorname=$(this).find("label").html();
										$(this).html('').append("<div class='col-md-4'></div><label class='col-md-4' name='colorstotalvalue'>"+colorname+"</label>"+data); 
										
										
									}
			            		});
			            		update.parent().find("[name='colorTotalN']").attr("value",parseInt(update.parent().find("[name='colorTotalN']").val())+parseInt(peNum));
			            		update.parent().find("[name='shamskeyongpeie']").attr("value",parseInt(update.parent().find("[name='shamskeyongpeie']").val())+parseInt(peNum));
		            		}else{
		            			
		            			update.parent().parent().parent().parent().find("div[name='colorstotal'] ul li").each(function() {
			            			
									if($(this).attr("data")==colorId){
									
										var colorname=$(this).find("label").html();
										//$(this).html('').append("<label name='colorstotalvalue'>"+colorname+"</label>"+data); 
										$(this).html('').append("<div class='col-md-4'></div><label class='col-md-4' name='colorstotalvalue'>"+colorname+"</label>"+data); 
										
										
									}
			            		});
		            			update.parent().find("[name='colorTotalN']").attr("value",parseInt(update.parent().find("[name='colorTotalN']").val())+parseInt(peNum));
		            			update.parent().find("[name='shamskeyongpeie']").attr("value",parseInt(update.parent().find("[name='shamskeyongpeie']").val())+parseInt(peNum));
		            			$("#totalnumsums").attr("value",parseInt($("#totalnumsums").val())+parseInt(peNum));
		            		}
		            	});
	            	}
	            	
	        	   
	           }else{
	        	   
	        	   $.dopAlert("更新配额失败,当前页面不可再进行更新,请刷新页面!",null);
	        	   
	        	   $("tr *").attr("disabled",true);
		        	$(".btn-close").attr("disabled",false);   
	        	   return false;
	           }
            //提交成功
            	
		
	},error:function(error){
		
		$.dopAlert("更新配额失败,当前页面不可再进行更新,请刷新页面!",null);
 	   
		 $("tr *").attr("disabled",true);
		 $(".btn-close").attr("disabled",false);   
		 return false;
		 
	},dataType:"json"});
	
   
                                
           
            //提交成功
    //        	$.dopAlert("更新配额成功!",null);   
            	
//            	$.getJSON('../activityDynamic/ajaxGetAvliabledPe.json?mId='+ mId, function(data) {
//					
//            		update.find("[name='totalkeyong']").html('').append("该商品可配额:<label name='totalkeyongpeie'>"+data+"</label>");
//					
//				});
           
//       });
}








function ac() {
    //dataTable.fnDraw();

    $('#editDialog').html('');
    $('#editDialog').modal('hide');
    $("body").css({
        "overflow" : "auto"
    });
}












function lingshou(){
	var svid=0;
	
	
	$("tr[name^='promotionmerchandise']").each(function(){
		
		var value=$(this).find("[name^='total']:checked").val();
		
		if(value=='totalSum'){
			
			var totalnum1=$(this).find("[name='totalNumSum']");
			
			if(totalnum1.val()==''){
				
				svid=1;
				return false;
			}
			
			value=parseInt(totalnum1)+parseInt(totalnum1.val());
	
			
			if(salemodel==2){
				
				if(parseInt(totalnum1.val())>parseInt(totalNum)){
					
					sv=1;
				}
			}
		}else{
			
			var shamvalue2=0;
			$(this).find("[name='shamcolor']").each(function(){
				
				if($(this).val()!=''){
					
					shamvalue2=parseInt(shamvalue2)+parseInt($(this).val());
					
					shamvalue=parseInt(shamvalue)+parseInt($(this).val());
				}
				
			});
			
			if(shamvalue2==0){
				
				svid=1;
				return false;
			}
			
			if(salemodel==2){
					
				if(parseInt(shamvalue2)>parseInt(totalNum)){
					
					sv=1;
				}
			}
			
		}
		
		if(svid==1){
			
			$.dopAlert("");
		}
		
		
	});
}

