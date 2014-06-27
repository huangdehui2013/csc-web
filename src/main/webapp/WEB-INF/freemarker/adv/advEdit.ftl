<div class="modal-dialog modal-wide">
	<div class="modal-content well node">
		<div class="modal-header mbt20">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">更新广告</h4>
		</div>
		<div class="row">
			<form id="uploadImgForm" method="post" action="${cmsPath}/manage/upload.htm" enctype="multipart/form-data">
				<input type="hidden" name="userId" value="${userid}" />
				<input type="hidden" name="application" value="ms" />
				<div class="col-md-6 form-group">
	                <img id="imageUrl" class="imgshow"  name="imgUrl" src="${imgHost}${imageUrl}" imgHost="${imgHost}"/>
	                <embed id="flashEmbed" width="50" src="${imgHost}${imageUrl}" allowfullscreen="true" quality="high" type="application/x-shockwave-flash" play="true" loop="true" menu="true" wmode="transparent">
	            </div>
	            <div class="form-group col-md-6">
	                <label class="col-md-4 control-label"></label>
	                <div class="col-md-8">
		                <div class="fileupload fileupload-new input-group pull-right" data-provides="fileupload">
		                   <span data-toggle="tooltip" data-original-title="建议上传图片大小，通栏广告：1030*90" class="btn example default btn-file blue">
		                   <span class="fileupload-new" id="btn-choose-file"><i class="icon-paper-clip"></i>选择图片</span>
		                   <span class="fileupload-exists" id="btn-update-file"><i class="icon-undo"></i>更改</span>
		                   <input type="file" class="default" name="uploadImg" id="uploadImgFile"/>
		                   </span>
		                 
		                </div>
	                </div>
	            </div>
			</form>
		</div>
		<hr class="line mbt20" />
		<form id="editForm">
			<input type="hidden" value="${block.blockId}" name="blockId" />
			<input type="hidden" value="${node.nodeId}" name="nodeId" />
			<input type="hidden" value="${blockNodeId}" name="blockNodeId" />
			<input type="hidden" value="${territory.territoryId}" name="territoryId" />
			<input id="imageId"  type="hidden" value="${node.imgId}" name="imgId">
			<div class="row">
				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">广告位名称</label>
					<div class="col-md-8">
						<input class="form-control" type="text" value="${block.blockName}" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">城市站</label>
					<div class="col-md-8">
						<input class="form-control" type="text" value="${territory.territoryName}" disabled="disabled">
					</div>
				</div>
				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">图片URL<span class="required" style="color:red;">*</span></label>
					<div class="col-md-8">
						<input class="form-control" placeholder="" type="text" name="nodeImgLink" value="${node.nodeImgLink}">
					</div>
				</div>

				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">标题<span class="required" style="color:red;">*</span></label>
					<div class="col-md-8">
						<input class="form-control" placeholder="" type="text" name="nodeTitle" value="${node.nodeTitle}">
					</div>
				</div>
				<div class="col-md-6 form-group">
					<label class="col-md-4 control-label">标题URL</label>
					<div class="col-md-8">
						<input class="form-control" placeholder="" type="text" name="nodeLink" value="${node.nodeLink}">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn default" data-dismiss="modal">
					关闭
				</button>
				<button type="submit" class="btn blue" id="btn-update-model">
					更新
				</button>
			</div>
		</form>
	</div>
</div>
<script type="text/javascript" src="${request.contextPath}/assets/plugins/jquery-validation/dist/jquery.validate.min.js"></script>
<script type="text/javascript" src="${request.contextPath}/assets/plugins/jquery-validation/dist/additional-methods.min.js"></script>
<script src="${request.contextPath}/assets/scripts/upload-img.js"></script>
<script src="${request.contextPath}/assets/scripts/form-validation-advedit.js"></script> 
<script src="${request.contextPath}/assets/scripts/app.js"></script>
<script type="text/javascript">
(function($) {
					$(function() {
						App.init();
						
						FormValidation.init();
						var imgPath=$('#imageUrl').attr('src');
						var imgLast=imgPath.substring(imgPath.length-3,imgPath.length);
						
						if(imgLast!="swf"){
						$('#imageUrl').attr('style','display:block');
						$('#flashEmbed').attr('style','display:none');
						}
						var flashPath=$('#flashEmbed').attr('src');
						var flashLast=flashPath.substring(flashPath.length-3,flashPath.length);
						if(flashLast=="swf"){
						$('#imageUrl').attr('style','display:none');
						$('#flashEmbed').attr('style','display:block');
						}
					});

				})(jQuery);
					$('#uploadImgFile').on('change', function() {
					var path=$(this).attr('value');
					var convertedPath=path.substring(path.length-3,path.length);
					if(convertedPath=="swf"){
					 $('#flashEmbed').attr('style','display:block');
					 $('#imageUrl').attr('style','display:none');
					}else{
					 $('#flashEmbed').attr('style','display:none');
					 $('#imageUrl').attr('style','display:block');
					}
					});
	$(function() {

		UploadImg.init("uploadImgFile", "uploadImgForm", "imageUrl", "imageId", 2);
	}); 
	 // 上传图片提示大小
			     $(function () {
			            $('.example').tooltip()
			        })
</script>
 <script type="text/javascript" src="${request.contextPath}/assets/plugins/jquery-bootpag/jquery.bootpag.min.js"></script>