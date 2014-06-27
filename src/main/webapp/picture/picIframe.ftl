<form id="uploadImgForm" method="post"  action="${cmsPath}/manage/upload.htm" enctype="multipart/form-data">
	<input type="hidden" id="imageId"  class="form-control" name="imgId" />
				<input type="hidden" name="userId" value="${userid}" />
				<input type="hidden" name="application" value="ms" />
				<div class="form-group col-md-6">
					<img id="imageUrl" name="imgUrl" class="imgshow" src="${imageUrl}" imgHost="${imgHost}"/>
					<embed id="flashEmbed"  width="50" src="${imgHost}${imageUrl}" allowfullscreen="true" quality="high" type="application/x-shockwave-flash" play="true" loop="true" menu="true" wmode="transparent">
				</div>
				
				<div class="col-md-6">
					<div class="col-md-4 form-group"></div>
					<div class="form-group col-md-8">
						<div class="fileupload fileupload-new input-group pull-right" data-provides="fileupload">
                        	<span class="btn default btn-file blue example" data-toggle="tooltip" data-original-title="建议上传图片大小：555*370">
                               <span class="fileupload-new" id="btn-choose-file"><i class="icon-paper-clip"></i>选择图片</span>
                               <span class="fileupload-exists" id="btn-update-file"><i class="icon-paper-clip"></i>更改图片</span>
                               <input type="file" class="default" name="uploadImg" id="uploadImgFile" />
                         	</span>
                        </div>
					</div>
				
				</div>
			</form>
			<script type="text/javascript" src="${request.contextPath}/assets/plugins/jquery-bootpag/jquery.bootpag.min.js"></script>
<script src="${request.contextPath}/assets/scripts/imageForNode.js"></script> 
<script>
				(function($) {
					$(function() {
					
        			load.init("uploadImgFile","uploadImgForm","imageUrl","imageId",2);
					});

				})(jQuery);

			</script>