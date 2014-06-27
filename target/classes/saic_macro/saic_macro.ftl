<#assign jquery_version ="1.8.3"/>
<#assign jquery_ui_version ="1.9.2"/>
<#assign highlight_version ="3.0.83"/>
<#assign timepicker_version ="1.1.1"/>
<#assign jqGrid_version ="4.4.1"/>
<#assign zTree_version ="3.5"/>
<#assign tinymce_version ="3.5.7"/>

<#-- 
苏宁freemarker框架
v0.2 陈琦
-->
<#-- 
统一设置jquery ui所在位置
-->
<#macro UISetJsCss >
<link type="text/css" rel="stylesheet" href="${resRoot}/js/jquery/jquery-ui/${jquery_ui_version}/css/smoothness/jquery-ui-${jquery_ui_version}.custom.min.css"/>
<script type="text/javascript" src="${resRoot}/js/jquery/jquery-${jquery_version}.min.js"></script>
<script type="text/javascript" src="${resRoot}/js/jquery/jquery-ui/${jquery_ui_version}/js/jquery-ui-${jquery_ui_version}.custom.min.js"></script>
</#macro>

<#macro highlight >
<script type="text/javascript" src="${resRoot}/js/highlight/${highlight_version}/shCore.js"></script>
<script type="text/javascript" src="${resRoot}/js/highlight/${highlight_version}/shBrushJava.js"></script>
<script type="text/javascript" src="${resRoot}/js/highlight/${highlight_version}/shBrushJScript.js"></script>
<script type="text/javascript" src="${resRoot}/js/highlight/${highlight_version}/shBrushXml.js"></script>
<script type="text/javascript" src="${resRoot}/js/highlight/${highlight_version}/shBrushCss.js"></script>
<link type="text/css" rel="stylesheet" href="${resRoot}/js/highlight/${highlight_version}/css/shThemeSN.min.css"/>
<script type="text/javascript">SyntaxHighlighter.all();</script>
</#macro>
<#--
jquery ui时间和日期控件
-->
<#--
设置时间或者日期控件需要的css和初始化JS
-->
<#macro dateTimeSetJsCss >
<script type="text/javascript" src="${resRoot}/js/jquery/jquery-ui/${jquery_ui_version}/datepicker-init.js"></script>
<link href="${resRoot}/js/jquery/jquery-ui/${jquery_ui_version}/timepicker/${jquery_ui_version}/timepicker.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${resRoot}/js/jquery/jquery-ui/timepicker/${timepicker_version}/timepicker.js"></script>
<script type="text/javascript" src="${resRoot}/js/jquery/jquery-ui/timepicker/${timepicker_version}/timepicker_init.js"></script>
</#macro>
<#--
 日期控件，可以通过其选择年月日
输入参数：input 输入jquery的选择表达式匹配input框
-->
<#macro datepicker  input="#datepicker">
<script>
	$(function() {
		$("${input}").datepicker();
	});
	</script>
</#macro>
<#--
 时间控件，可以通过其选择几点几分
输入参数：input 输入jquery的选择表达式匹配input框
-->
<#macro timepicker  input="#timepicker">
<script>
	$(function() {
		$( "${input}" ).timepicker();
	});
	</script>
</#macro>
<#--
根据开始时间结束时间选择，做了开始时间不得小于结束时间的判断
-->
<#macro startEndPicker  startId="start" endId="end">
<script>
$(function() {
	var dates = $("#${startId},#${endId}"); 
	dates.datepicker({
	    onSelect: function(selectedDate){
	       var option = this.id == "${startId}" ? "minDate" : "maxDate";
	       dates.not(this).datepicker("option", option, selectedDate);
	    }
	});
	});
	</script>
</#macro>
<#--
 日期时间控件，可以通过其选择年月日几点几分
输入参数：input 输入jquery的选择表达式匹配input框
-->
<#macro datetimepicker  input="#datetimepicker">
<script>
	$(function() {
		$( "${input}" ).datetimepicker();
	});
	</script>
</#macro>

<#--
展现提示框dialog的freemarker宏控件，可以使某个DIV作为弹出框输出
input：欲作为dialog的div
autoOpen:是否自动打开
height:dialog的高度
width:dialog的宽度
modal:是否背景有灰色遮罩
title:抬头标题
-->
<#macro dialog  input="#dialog"  autoOpen="true" height="auto"  width=300 modal="true" title="">
<script>
	$(function() {
	    $( "${input}" ).dialog({
	    			title:"${title}",
				    autoOpen:${autoOpen},
					width: "${width}",
				    height: "${height}",
					modal: ${modal},
					buttons: [{text: "OK",click: function() { $(this).dialog("close"); } }]
			     });
	});
	</script>
</#macro>

<#--
设置jqGrid路径
-->

<#macro jqGridSetJsCss>
<link rel="stylesheet" type="text/css" media="screen" href="${resRoot}/js/jquery/jqGrid/${jqGrid_version}/css/ui.jqgrid.css" />
<script src="${resRoot}/js/jquery/jqGrid/${jqGrid_version}/js/i18n/grid.locale-cn.js" type="text/javascript"></script>
<script src="${resRoot}/js/jquery/jqGrid/${jqGrid_version}/js/jquery.jqGrid.min.js" type="text/javascript"></script>
</#macro>

 <#--
 url :取得分页数据的url
 colModel:数据对象，name:显示的名字，index:在排序时后端需要的名字，例子：[{ name: 'orderId',index: 'order_Id'}, {name: 'orderName',index: 'order_Name'}, {name: 'orderPrice',index: 'order_Price'}, {name: 'orderDesc',index: 'order_desc'}]
 rowNum：每页行数
 caption:表格的抬头
 rowList:切换每页行数
 tableId：定义个表格的ID
 pagerId:分页页码
 root:json的对象数据
 page:当前页码
 total：总页数
 records：总记录数
 edit:是否允许编辑
 add:是否允许添加
del:是否允许删除
 -->
 
 <#macro jqGrid url colModel  tableId="gridTable" pagerId="gridPager"  rowNum=10  caption="表格"   rowList="[10, 20, 30]"    root="datas" page="pageNumber"  total="pageCount" records="totalDataCount"  edit="false" add="false" del="false">
 <table id="${tableId}"></table>
<div id="${pagerId}"></div>
<script>
    jQuery("#gridTable").jqGrid({
        jsonReader: {
            root: "${root}",
            page: "${page}",
            total: "${total}",
            records: "${records}",
            repeatitems: false
        },
        url: '${url}',
        datatype: "json",
		height:"auto",
        colModel: ${colModel},
        rowNum: ${rowNum},
        rowList: ${rowList},
        pager: '#${pagerId}',
        viewrecords: true,
        caption: "${caption}"
    });
    jQuery("#gridTable").jqGrid('navGrid', '#gridPager', {
        edit: ${edit},
        add: ${add},
        del: ${del}
    });
</script>
</#macro>

<#--
 分页（Pager对象、链接URL、参数Map、最大页码显示数） 
使用前需要先引用page.css样式表
使用示例：
<#assign pager = {"pageNumber": (orderList.pageNumber)!,"pageSize": (orderList.pageCount)!,"pageCount": (orderList.totalDataCount/orderList.pageCount)?ceiling} />
<@p.pager pager = pager baseUrl = "/order/queryOrdersForSQL.htm" parameterMap = {"orderName": (order.orderName)!} /> 
我们需要定义个pager对象，里面至少有pagerNumber,pageSize,pageCount这几个参数
pageNumber:当前的页数
pageSize:当前页面的记录条数
pageCount:总页数
property:其他属性
keyword:如果是搜索方式，输入搜索关键字
orderBy:输入按哪个字段进行排序
orderType:输入排序类型ASC升序,DESC降序
baseUrl：基础的页面分页url不带参数的
parameterMap:输入每次页面调整需要带入的参数
maxShowPageCount：最大显示的页面数量
-->
<#macro pager pager baseUrl parameterMap = {} maxShowPageCount = 6>

	<#local pageNumber = pager.pageNumber />
	<#local pageSize = pager.pageSize />
	<#local pageCount = pager.pageCount />
	<#local property = pager.property />
	<#local keyword = pager.keyword />
	<#local orderBy = pager.orderBy />
	<#local orderType = pager.orderType />
	
	<#local parameter = "" />
	<#if (pageSize != "")!>
		<#local parameter = parameter + "&pageSize=" + pageSize />
	</#if>
	<#if (property != "")!>
		<#local parameter = parameter + "&property=" + property />
	</#if>
	<#if (keyword != "")!>
		<#local parameter = parameter + "&keyword=" + keyword />
	</#if>
	<#if (orderBy != "")!>
		<#local parameter = parameter + "&orderBy=" + orderBy />
	</#if>
	<#if (orderType != "")!>
		<#local parameter = parameter + "&orderType=" + orderType />
	</#if>
	<#list parameterMap?keys as key>
		<#if parameterMap[key] != null && parameterMap[key] != "">
			<#local parameter = parameter + "&" + key + "=" + parameterMap[key] />
		</#if>
	</#list>
	
	<#if baseUrl?contains("?")>
		<#local baseUrl = baseUrl + "&" />
	<#else>
		<#local baseUrl = baseUrl + "?" />
	</#if>
	<#local firstPageUrl = baseUrl + "pageNumber=1" + parameter />
	<#local lastPageUrl = baseUrl + "pageNumber=" + pageCount + parameter />
	<#local prePageUrl = baseUrl + "pageNumber=" + (pageNumber - 1) + parameter />
	<#local nextPageUrl = baseUrl + "pageNumber=" + (pageNumber + 1) + parameter />

	<#if maxShowPageCount <= 0>
		<#local maxShowPageCount = 6>
	</#if>
	
	<#local segment = ((pageNumber - 1) / maxShowPageCount)?int + 1 />
	<#local startPageNumber = (segment - 1) * maxShowPageCount + 1 />
	<#local endPageNumber = segment * maxShowPageCount />
	<#if (startPageNumber < 1)>
		<#local startPageNumber = 1 />
	</#if>
	<#if (endPageNumber > pageCount)>
		<#local endPageNumber = pageCount />
	</#if>

	<#if (pageCount > 1)>
	<div class="pager_area">
		<ul class="pager">
			<li class="pageInfo">
				共 ${pageCount} 页
			</li>
			<#-- 首页 -->
			<#if (pageNumber > 1)>
				<li class="firstPage">
					<a href="${request.contextPath}${firstPageUrl}">首页</a>
				</li>
			<#else>
				<li class="firstPage">
					<span>首页</span>
				</li>
			</#if>
			
			<#-- 上一页 -->
			<#if (pageNumber > 1)>
				<li class="prePage">
					<a href="${request.contextPath}${prePageUrl}">上一页</a>
				</li>
			<#else>
				<li class="prePage">
					<span>上一页</span>
				</li>
			</#if>
			
			<#if (startPageNumber > 1)>
				<li>
					<a href="${request.contextPath}${baseUrl + "pageNumber=" + (pageNumber - 2) + parameter}">...</a>
				</li>
			</#if>
			
			<#list startPageNumber .. endPageNumber as index>
				<#if pageNumber != index>
					<li>
						<a href="${request.contextPath}${baseUrl + "pageNumber=" + index + parameter}">${index}</a>
					</li>
				<#else>
					<li class="currentPage">
						<span>${index}</span>
					</li>
				</#if>
			</#list>
			
			<#if (endPageNumber < pageCount)>
				<li>
					<a href="${request.contextPath}${baseUrl + "pageNumber=" + (pageNumber + 2) + parameter}">...</a>
				</li>
			</#if>
		    
			<#-- 下一页 -->
			<#if (pageNumber < pageCount)>
				<li class="nextPage">
					<a href="${request.contextPath}${nextPageUrl}">下一页</a>
				</li>
			<#else>
				<li class="nextPage">
					<span>下一页</span>
				</li>
			</#if>
			
			<#-- 末页 -->
			<#if (pageNumber < pageCount)>
				<li class="lastPage">
					<a href="${request.contextPath}${lastPageUrl}">末页</a>
				</li>
			<#else>
				<li class="lastPage">
					<span>末页</span>
				</li>
			</#if>
		</ul>
		</div>
	</#if>
</#macro>

<#macro jsurl  url=[] resConcat='false'>
<#if resConcat == 'true'><script type="text/javascript" src="${resRoot}/??<#list url as js>${js}${minSuffix}.js<#if js_has_next>,</#if></#list>?t=${buildNo}.js"></script>
<#else><#list url as js><script type="text/javascript" src="${resRoot}/${js}${minSuffix}.js" ></script></#list>
</#if>
</#macro>
<#--
cssurl 格式化css的url加入版本号，用list形式可一次可以传入多个
-->
<#macro cssurl url=[] resConcat='false'>
<#if resConcat =='true'><link rel="stylesheet" type="text/css"  href="${resRoot}/??<#list url as css>${css}${minSuffix}.css<#if css_has_next>,</#if></#list>?t=${buildNo}.css" />
<#else><#list url as css><link rel="stylesheet" type="text/css" href="${resRoot}/${css}${minSuffix}.css" /></#list>
</#if>
</#macro>
<#--
标准tab形式
tabId:输入生成的tab的Id
titles:输入的tab的抬头，示例<#assign titles = ["抬头1","抬头2","抬头3"] />
pages:插入的每个页面的ftl路径<#assign pages = ["ui/tabs/page1.ftl","ui/tabs/page2.ftl","ui/tabs/page3.ftl"] />
-->
<#macro tab  tabId titles pages>
<div id="${tabId}">
	<ul>
	<#list titles as title>
		<li><a href="#${tabId}_${title_index}">${title}</a></li>
	</#list>	
	</ul>
	<#list pages as page>
	<div id="${tabId}_${page_index}">
	<#include page>
	</div>
	</#list>
</div>
<script>
	$(function() {
		$( "#${tabId}" ).tabs();
	});
	</script>
</#macro>
<#--
iframe tab形式
tabId:输入生成的tab的Id
titles:输入的tab的抬头，示例<#assign titles = ["抬头1","抬头2","抬头3"] />
pages:插入的每个iframe页面的路径:<#assign pages = [base+"/ui/zTree.htm",base+"/ui/pager.htm",base+"/ui/timepicker.htm"] />
-->
<#macro tabIframe  tabId titles pages height="200px">
<div id="${tabId}">
	<ul>
	<#list titles as title>
		<li><a href="#mainDiv">${title}</a></li>
	</#list>	
	</ul>
<div id="mainDiv">
	<iframe id="tabIfame"  src="${pages[0]}" frameborder="0" style="width: 100%;height:${height}"> </iframe>
	</div>
</div>
<script>
	$(function() {
		$( "#${tabId}" ).tabs({
   			select: function(event, ui) { 
   			switch(ui.index) {
   			<#list pages as page>
			case ${page_index}:
		    $("#mainDiv").html('<iframe id="${titles[page_index]}"  src="${page}" frameborder="0" style="width: 100%;height:${height}"> </iframe>');
			break;
			</#list>
			}
   			}
		});
	});
	</script>
</#macro>

<#--
在使用的页面中必须import这个ftl文件
示例：<#import "/common/ui/zTree.ftl" as zTree />
-->
<#--
zTree js & css setup 
you must already load jquery-${jquery_version}.min.js
设置zTree所需要的路径宏，在页面中直接写
<@zTree.zTreeSetJsCss />调用即可
-->
<#macro zTreeSetJsCss >
<link href="${resRoot}/js/jquery/zTree/${zTree_version}/css/zTreeStyle.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${resRoot}/js/jquery/zTree/${zTree_version}/js/jquery.ztree.all-${zTree_version}${minSuffix}.js"></script>
</#macro>
<#-- 
 simpleTree
 id:the tree ui's id 设置这个生成的tree所在ul元素的id
 rootPId:the tree's root id设置根id默认可以不输入
 url: the json format data url 输入zTree的url,该URL必须返回JSON形式，树的示例格式如下：
 [{"id":"2","pId":"1","name":"机票管理","url":"menu/menu_2.htm","target":"mainFrame","isParent":true},
 {"id":"3","pId":"1","name":"团购","url":"menu/menu_3.htm","target":"mainFrame","isParent":true},
 {"id":"4","pId":"1","name":"酒店","url":"menu/menu_4.htm","target":"mainFrame","isParent":true},
 {"id":"900","pId":"1","name":"系统管理","url":"../menu/menu_900.htm","target":"mainFrame","isParent":true},
 {"id":"800","pId":"1","name":"demo展示","url":"menu/menu_800.htm","target":"mainFrame","isParent":true}]
 isCheck: if set "true",we can see the checkbox before all tree leaf 如果设置为true 则每个树节点上都有一个checkbox
 isEdit:if set "true" we can see edit button after the leaf 如果我们设置为true则我们可以看见编辑按钮在树的节点后面
-->
<#macro zTree id url  rootPId=1  isCheck="false" chkStyle="checkbox" radioType="level" isEdit="false"  async="false" callback="false" onClick="zTreeOnClick">
 <script>
 <!--
 <#if async == "false">
 var zNodes;
$.ajax({
    url: "${url}",
    dataType: 'json',
    async: false,
	cache: false,
    success: function(data){
        zNodes = data;
    }
});
</#if>
var setting = {
<#if callback == "true">
callback: {
		onClick: ${onClick}
			},
</#if>
<#if async == "true">
async: {
				enable: true,
				url:"${url}",
				dataType: "json",
				autoParam:["id"],
				type:"post"
			},
</#if>
		edit:{
			enable : ${isEdit}
		},
		check:{
		    enable : ${isCheck},
		    chkStyle : "${chkStyle}",
		    radioType : "${radioType}"
		},	
      data:{
        simpleData: {
            enable: true,
            idKey: "id",
			pIdKey: "pId",
            rootPId: ${rootPId}
        }
    }
}
$(document).ready(function(){
    $.fn.zTree.init($("#${id}"), setting<#if async == "false">,zNodes</#if>);
});
//-->
</script>
<ul id="${id}" class="ztree"></ul>
</#macro>
<#macro tinymce class="tinymce">
<script>
	$(document).ready(function() {
		$('textarea.${class}').tinymce({
			// Location of TinyMCE script
			script_url : '${resRoot}/js/jquery/tinymce/${tinymce_version}/tiny_mce.js',

			// General options
			theme : "advanced",
			plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

			// Theme options
			theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
			theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
			theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : true,

			// Example content CSS (should be your site CSS)
			content_css : "${resRoot}/js/jquery/tinymce/jscripts/tiny_mce/content.css",

			// Drop lists for link/image/media/template dialogs
			template_external_list_url : "lists/template_list.js",
			external_link_list_url : "lists/link_list.js",
			external_image_list_url : "lists/image_list.js",
			media_external_list_url : "lists/media_list.js",

			// Replace values for the template plugin
			template_replace_values : {
				username : "Some User",
				staffid : "991234"
			}
		});
	});
</script>
</#macro>
