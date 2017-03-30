/**
 *
 *	Plugin: Jquery.webox
 *	Developer: Blank
 *	Version: 1.0 Beta
 *	Update: 2012.07.08
 *
 **/
(function($){
	$.extend({
		webox:function(op){
			var _x,_y,m,allscreen=true;
			var defaults  = {
				// 按esc关闭弹层
				esc: true,
				// 按enter键触发确认按钮
				enter: true,
				// 弹层标题
				title: "",
				// 弹层内容html
				html: "",
				// 弹层iframe地址
				iframe: null,
				// 弹层宽度
				width: 400,
				// 弹层高度
				height: "auto",
				// 弹层是否遮罩
				bgvisibel: true,
				// 弹层open事件
				open: null,
				// 弹层close事件
				close: null,
				// 弹层resize事件
				resize: null,
				// 弹层提交事件
				submit: null,
				//弹窗打开后,背景是否可以滚动
				bgscrollable: true,
				//是否全屏
				allscreen : false
			};
			var option = $.extend({}, defaults, op);
			if(!option){
				alert('options can\'t be empty');
				return;
			}
			if(!option['html']&&!option['iframe']){
				alert('html attribute and iframe attribute can\'t be both empty');
				return;
			}

			allscreen = typeof option['allscreen'] == 'boolean'? option['allscreen'] : option['allscreen']==="true";
			var W = {
				init: function() {
					this.open();
					this.eventInit();
				},
				open: function() {
					$(".webox").remove();
					$('.background').remove();
					var
						width   = !option['allscreen'] ? option['width'] ? option['width'] : 400 : "100%",
						height  = !option['allscreen'] ? option['height'] ? option['height'] : "auto" : "100%",
						swidth  = /^[0-9]+$/.test(width)  ? width  + "px" : width,
						sheight = /^[0-9]+$/.test(height) ? height + "px" : height;


					$('body').append('<div class="background" style="display:none;"></div><div class="webox" style="display: none;"><div id="inside" style="width: 100%;height: 100%;">'+(option['iframe']?'<iframe class="w_iframe" src="'+option['iframe']+'" frameborder="0" width="100%" scrolling="yes" style="border:none;overflow-x:hidden;height:'+parseInt(height-30)+'px;"></iframe>':option['html']?option['html']:'')+'</div></div>');
					if(navigator.userAgent.indexOf('MSIE 7')>0||navigator.userAgent.indexOf('MSIE 8')>0){
						$(".webox").css({
							'filter':'progid:DXImageTransform.Microsoft.gradient(startColorstr=#55000000,endColorstr=#55000000)'
						});
					}
					if (option['bgvisibel']) $('.background').fadeTo('slow', 1);
					if (!option['bgscrollable']) $('body').css("overflow","hidden");
					$(".webox").css({
						width: swidth,
						height: sheight,
						display:'block',
						position:'fixed'
					});

					var weboxWidth=$(".webox").outerWidth();
					var weboxHeight=$(".webox").outerHeight();
					// 获取窗口高度宽度
					var winWidth, winHeight;
					if (window.innerWidth && window.innerHeight) {
						winWidth = window.innerWidth;
						winHeight = window.innerHeight;
					} else if ((document.body) &&
						(document.body.clientWidth) && (document.body.clientHeight)){
						winWidth = document.body.clientWidth;
						winHeight = document.body.clientHeight;
					}
					var top, left;
					left= winWidth	> weboxWidth  ? (winWidth-weboxWidth)  /2 : 0;
					top = 150;
					// top = winHeight	> weboxHeight ? (winHeight-weboxHeight)/1 : 150; //  5 : 35
					if (allscreen) {
						top = 0, left = 0;
					}
					$(".webox").css({
						left : left,
						top  : top
					});
					$(".webox").data("op",option);
					if(option['open'] && typeof(option['open'])=='function'){
						option['open']();
					}
				},
				submit: function() {
					var option = $(".webox").data("op");
					if(option['submit'] && typeof(option['submit'])=='function'){
						var result = option['submit']();
						if (result == false) {
							return;
						}
					}
					this.uninstall();
				},
				close: function() {
					var option = $(".webox").data("op");
					if(option['close'] && typeof(option['close'])=='function'){
						option['close']();
					}
					this.uninstall();
				},
				uninstall: function() {
					$(".webox").remove();
					$('.background').remove();
					$('body').css("overflow","auto");
				},
				eventInit: function() {
					var t = this;
					// 添加键盘事件
					$(document).keyup(function(event){
						var option = $(".webox").data("op");
						if (event.keyCode == 27 && option && option['esc']) {
							t.close();
						}
						// if (event.keyCode == 13 && option && option['enter']) {
						// 	t.submit();
						// }
					});

					// 确认按钮事件
					$('.webox .confirm,.webox .submit').click(function(){
						t.submit();
					});

					// 关闭按钮事件
					$('.webox .close,.webox .cancel').click(function(){
						t.close();
					});
					var titlediv = $('h2, .layer-title ', ".webox").eq(0);
					// 拖动
					var __ = titlediv.length==0 ? '' : titlediv.mousedown(function(e){
						$(this).css("cursor","-webkit-grabbing");
						if(e.which){
							m=true;
							_x=e.pageX-parseInt($(".webox").css('left'));
							_y=e.pageY-parseInt($(".webox").css('top'));
						}
					}).mousemove(function(e){
						if(m && !allscreen){
							$(this).css("cursor","-webkit-grabbing");
							var x=e.pageX-_x;
							var y=e.pageY-_y;
							$(".webox").css({
								left:x
							});
							$(".webox").css({
								top:y<0 ? 0 : y
							});
						}
					}).mouseup(function(){
						$(this).css("cursor","default");
						m=false;
					});

					$(window).resize(function(){
						var option = $(".webox").data("op");
						if(option && option.allscreen){
							var screenHeight = $(window).height();
							var screenWidth = $(window).width();
							$(".webox").css({
								'width':"100%",
								'height':"100%"
							});
						}
						//窗口重置大小时调用
						if(option && option['resize'] && typeof(option['resize'])=='function'){
							option['resize']();
						}
					});

					$(window).scroll(function() {
						//        	var weboxHeight = $(".webox").css("top");
						//        	var scrollTop = $(window).scrollTop()+weboxHeight;
						//        	$(".webox").css({"position":"fixed",top:scrollTop+"px"})
					});
				}
			};

			$(document).ready(function(e){
				W.init();
//            var
//            	width = option['width'] ? option['width'] : 400,
//            	height = option['height'],
//            	swidth = width + "px",
//            	height2 = /^[0-9]+$/.test(height) ? height + "px" : "auto";
//
//            $('body').append('<div class="background" style="display:none;"></div><div class="webox" style="width:'+swidth+';height:'+height2+';display:none;"><div id="inside" style="">'+(option['iframe']?'<iframe class="w_iframe" src="'+option['iframe']+'" frameborder="0" width="100%" scrolling="yes" style="border:none;overflow-x:hidden;height:'+parseInt(height-30)+'px;"></iframe>':option['html']?option['html']:'')+'</div></div>');
//            if(navigator.userAgent.indexOf('MSIE 7')>0||navigator.userAgent.indexOf('MSIE 8')>0){
//                $('.webox').css({
//                    'filter':'progid:DXImageTransform.Microsoft.gradient(startColorstr=#55000000,endColorstr=#55000000)'
//                });
//            }
//            if(option['bgvisibel']){
//                $('.background').fadeTo('slow',1);
//            };
////            if(option['validate']){
////            	$('#inside form').validate(option['rule']);
////            }
//            $('.webox').css({
//                display:'block',
//                position:'fixed'
//            });
//            $('.webox .close,.webox .cancel').click(function(){
//                $('.webox').remove();
//                $('.background').remove();
//            });
//            var marginLeft=parseInt(width/2);
////            var marginTop=height;
//            var marginTop=$(".webox").height();
//            var winWidth=parseInt($(window).width()/2);
////            var winHeight=parseInt($(window).height()/2.2);
//            var winHeight=$(window).height();
//            var left=winWidth-marginLeft;
//            var top=winHeight>marginTop ? (winHeight-marginTop)/2 : 35;
//            $('.webox').css({
//                left:left,
//                top:top
//            });
//            $('.webox h2').mousedown(function(e){
//                if(e.which){
//                    m=true;
//                    _x=e.pageX-parseInt($('.webox').css('left'));
//                    _y=e.pageY-parseInt($('.webox').css('top'));
//                }
//            });
//        }).mousemove(function(e){
//            if(m && !allscreen){
//                var x=e.pageX-_x;
//                var y=e.pageY-_y;
//                $('.webox').css({
//                    left:x
//                });
//                $('.webox').css({
//                    top:y<0 ? 0 : y
//                });
//            }
//        }).mouseup(function(){
//            m=false;
			});
			return W;
		}
	});
})(jQuery);
