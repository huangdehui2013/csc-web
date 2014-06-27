/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   王景亮
 * Date:     2014-01-13
 * Description: 提交，提交后将按钮消失
 * History: //修改记录
 * <author>		<time>			<desc>   
 * o 按钮 ，settime 时间，回调  
 example:
	obj.bind('click',function(e){
		submitBefore($(this),3000,'kk');
		
	});

 */
var submitBefore=function(o,settime,callback){
	var _this = this;
	var $this = o;
	var _settime=settime;
	var _k;			
	_this.check=function(k){			
		if(!$this.data('flag')){
			$this.hide();  //这边是按钮隐藏
			if(callback){
				callback.apply(this);
			}			
			$this.data('flag','1');
			_k=true;
			_this.settime();					
		}else{					
			_k=false;				
		}				
		return _k;
	};
	_this.moment=function(){
		$this.removeData("flag");				
		$this.show();
		_k=true;
		return _k;				
	};
	_this.settime=function(){
		setTimeout(_this.moment,_settime);
	};
	_this.check();
	return _k;
};


