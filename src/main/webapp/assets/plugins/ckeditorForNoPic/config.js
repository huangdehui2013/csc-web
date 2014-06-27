/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights
 *          reserved. For licensing, see LICENSE.html or
 *          http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
// config.filebrowserImageUploadUrl = '/saic-cms-web-in/manage/upload.htm';
	config.width = '100%'; // 宽度,
   
    
    config.resize_maxHeight = 3000;

    //改变大小的最大宽度
    config.resize_maxWidth =3000;

    //改变大小的最小高度
    config.resize_minHeight =450;

    //改变大小的最小宽度
    config.resize_minWidth =750;
    // 当提交包含有此编辑器的表单时，是否自动更新元素内的数据
    config.autoUpdateElement =true;
    
    config.extraPlugins += (config.extraPlugins ? ',lineheight' : 'lineheight');
    
	config.toolbar ='Basic';
	config.toolbar=

		[

		['Source','-','Templates'],

		['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print','SpellChecker','Scayt'],

		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],

		['Form','Checkbox','Radio','TextField','Textarea','Select','Button',

		'ImageButton','HiddenField'],

		

		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],

		['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],

		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],

		['Link','Unlink','Anchor'],

		['Table','HorizontalRule','Smiley','SpecialChar',

		'PageBreak'],

		
		['Styles','Format','Font','FontSize','lineheight'],

		['TextColor','BGColor'],

		['Maximize','ShowBlocks','-','About']

		];
	
	config.font_names = '宋体;楷体_GB2312;新宋体;黑体;微软雅黑;Arial;Courier New';
	config.allowedContent = true;
};
