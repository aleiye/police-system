$(document).ready(function(){

	function myfunction(li,li_a,menu_tab){
		li.click(function(){
			var index=$(this).index();
			menu_tab.eq(index).addClass("active").siblings().removeClass("active");
			li.removeClass("selected");
			li.eq(index).addClass("selected").siblings().removeClass("selected");

		});
	}

	myfunction($(".menu .ulmenu3 li"),$(".ulmenu3 li a"),$(".content .menu3 .tab"));
	myfunction($(".menu .ulmenu2 li"),$(".ulmenu2 li a"),$(".content .menu2 .tab"));
	myfunction($(".menu .ulmenu1 li"),$(".ulmenu1 li a"),$(".content .menu1 .tab"));
	myfunction($(".menu .ulmenu4 li"),$(".ulmenu4 li a"),$(".content .menu4 .tab"));
	myfunction($(".menu .ulmenu5 li"),$(".ulmenu5 li a"),$(".content .menu5 .tab"));
	$(function(){            //ul/li的折叠效果
		$(".menu > ul").eq(0).show();
		$(".menu h3").click(function(){
			//找menu对应的tab
			$(".menu_tab > div").removeClass("active");

			var val=($(this).next().attr('class'));
			var menu_value=(val.substring(val.length-1));
			$(".content .menu"+menu_value+" .tab:first-child").addClass("active");
			$(".menu .ulmenu"+menu_value+" li").removeClass("selected");
			$(".menu .ulmenu"+menu_value+" li").eq(0).addClass("selected");//默认设置为被选中状态


			//这是ul收缩效果
			$(this).next().stop().slideToggle();
			$(this).siblings().next("ul").stop().slideUp();

		});

	});

	$(function(){   // 导航 >
		$(".menu > h3").click(function(){

			$(".content .A1").empty().text($(this).text());

		});
	});
});
$('.click').click(function(){
	$('.click_none').css({'display':'none'})
	$('.list').css({'display':'block'})
})
$('.menu ul li').click(function(){
	$('.list').css({'display':'none'})
	$('.click_none').css({'display':'inline-table'})
})
$(".xin").click(function(){
	if($('.bg_news').css('display')=='none'){
		$('.bg_news').show();
	}else{
		$('.bg_news').hide();
	}
})