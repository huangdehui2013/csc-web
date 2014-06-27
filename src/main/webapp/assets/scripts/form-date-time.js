/**
 * 活动时间校验
 * 
 * @author v_chenhaibing01
 * @since
 */
$('#sstartTime').on('change', function() {
	
	$(this).parent().find("span[for='sstartTime']").remove();

	
	var startTime=$("#sstartTime").val();
	if(startTime!='' && startTime!=undefined){
		
			var   dStart   =   new   Date();
			var   dEnd   =   new Date(startTime.replace("-", "/").replace("-", "/"));  
			
			
			var publish=$('#spublishTime').val();
			var end=$("#sendTime").val();	
			
			if(publish!='' && publish!= undefined){
				
				var   publishTime   =   new Date(publish.replace("-", "/").replace("-", "/"));  
				if(dEnd<publishTime){
					
					$('#spublishTime').val('');
				}
			}
			
			if(end!='' && end!= undefined){

				var   endTime   =   new Date(end.replace("-", "/").replace("-", "/"));  
				if(dEnd>endTime){
				
					$('#sendTime').val('');
					$('#soffshelfTime').val('');
				}
			}
			
			
			$("#sstartTime").parent().find("[name='startForTime']").remove();
			if(dEnd<dStart){
				
				$("#sstartTime").val('');
				$("#sstartTime").after('<span name="startForTime" style="display:block;color:red">活动生效时间必须大于当前时间</span>');
				return ;
			}
			
	}else{
		
		$("#sendTime").val('');
		$("#soffshelfTime").val('');
		$("#spublishTime").val('');
		
	}
	
});

$('#sendTime').on('change', function() {
	
	$(this).parent().find("span[for='sendTime']").remove();
	var offshelfTime=$('#soffshelfTime').val();
	$("#sstartTime").parent().find("[name='startForTime']").remove();
	var startTime=$("#sstartTime").val();
	var endTime=$("#sendTime").val();
	
	
	if(startTime=='' || startTime==undefined){
		
		$("#sendTime").val("");
		$("#sstartTime").after('<span name="startForTime" style="display:block;color:red">请输入活动生效开始时间</span>');
		
		return ;
	}
	
	
	
	var   startdate   =   new   Date(Date.parse(startTime.replace(/-/g,   "/")));
	var   endDate   =   new   Date(Date.parse(endTime.replace(/-/g,   "/")));
	
	
	if(offshelfTime!='' &&offshelfTime != undefined){
		
		var   offshelfDate=new Date(Date.parse(offshelfTime.replace(/-/g,   "/")));
		if(endDate>offshelfDate){
			
			$('#soffshelfTime').val('');
		}
		
	}
	
	$("#sendTime").parent().find("[name='endForTime']").remove();
	if(startdate>endDate){
		
		$("#sendTime").attr("value","");
		$("#sendTime").after('<span name="endForTime" style="display:block;color:red">活动结束时间必须大于活动生效时间</span>');
		
		return ;
	}
	
});

   
$('#spublishTime').on('change', function() {
	$(this).parent().find("span[for='spublishTime']").remove();
	$("#sstartTime").parent().find("[name='startForTime']").remove();
	var start=$("#sstartTime").val();
	var publish=$("#spublishTime").val();

	if(start== '' || start == undefined){
		
		$("#spublishTime").val('');		
		$("#sstartTime").after('<span name="startForTime" style="display:block;color:red">请输入活动生效开始时间</span>');
		
		return ;
	}
	
	var   startdate   =   new   Date(Date.parse(start.replace(/-/g,   "/")));
	var   endDate   =   new   Date(Date.parse(publish.replace(/-/g,   "/")));
	
	
	
	
	
	$("#spublishTime").parent().find("[name='publishForTime']").remove();
	if(endDate>startdate){
		
	
		$("#spublishTime").val('');
		$("#spublishTime").after('<span name="publishForTime" style="display:block;color:red">活动自动发布时间必须小于活动生效时间.</span>');
		
		return ;
	}
	
	var s=new Date();
	if(endDate<s){
		
		$("#spublishTime").val('');
		$("#spublishTime").after('<span name="publishForTime" style="display:block;color:red">活动自动发布时间必须大于当前时间.</span>');
	}
	
});

$('#soffshelfTime').on('change', function() {
	$(this).parent().find("span[for='soffshelfTime']").remove();
	$("#spublishTime").parent().find("[name='publishForTime']").remove();   
	var start=$("#soffshelfTime").val();
	var publish=$("#spublishTime").val();
	var endTime=$("#sendTime").val();
	
	if(publish == '' || publish == undefined){
		
		$("#soffshelfTime").val('');
		$("#spublishTime").after('<span name="publishForTime" style="display:block;color:red">请输入活动自动发布时间.</span>');
		
		return ;
	}
	
	var   startdate   =   new   Date(Date.parse(start.replace(/-/g,   "/")));
	var   endDate   =   new   Date(Date.parse(publish.replace(/-/g,   "/")));
	
	$("#soffshelfTime").parent().find("[name='offshelfForTime']").remove();
	if(startdate < endDate){
	
		$("#soffshelfTime").val('');
		$("#soffshelfTime").after('<span name="offshelfForTime" style="display:block;color:red">活动自动下线时间必须晚于自动上线时间.</span>');
		
	}
	
	var   endDaten   =   new   Date(Date.parse(endTime.replace(/-/g,   "/")));
	if(startdate<endDaten){
		
		$("#soffshelfTime").val('');
		$("#soffshelfTime").after('<span name="offshelfForTime" style="display:block;color:red">活动自动下线时间必须晚于活动结束时间.</span>');
	}
	
});


 