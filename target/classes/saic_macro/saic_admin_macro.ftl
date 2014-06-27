<#macro page_header breadcrumb >
        <!-- BEGIN PAGE HEADER-->
         <div class="row">
            <div class="col-md-12">
               <!-- BEGIN PAGE TITLE & BREADCRUMB-->
               <ul class="page-breadcrumb breadcrumb">
                  <li>
                     <i class="icon-home"></i>
                     <a href="${request.contextPath}/index.htm">首页</a> 
                     <i class="icon-angle-right"></i>
                  </li>
                  <#list breadcrumb?keys as b>
                  <#if b_has_next>
                  <li>
                     <a href="${breadcrumb[b]}">${b}</a>
                     <i class="icon-angle-right"></i>
                  </li>
                  <#else>
                  <li><a href="${breadcrumb[b]}">${b}</a></li>
                  </#if>
                  </#list>
               </ul>
               <!-- END PAGE TITLE & BREADCRUMB-->
            </div>
         </div>
         <!-- END PAGE HEADER-->
</#macro>