$(function () {
	'use strict';
	var stopPreventDefault = function(){
		event.preventDefault();
	}
	$('body').on('touchmove', stopPreventDefault);

	$(document).on("pageInit", "#page-home", function(e, pageId, $page) {

		function orientationHandler(event){
	        var m = Math.floor(event.gamma) > 80 ? 80 : Math.floor(event.gamma);
	        	m = m < -70 ? -70 : m;
	        piceMove(-m/2,'orientationHandler');
	    }
	    function motionHandler(event){
	        var acc = event.acceleration, accGravity = event.accelerationIncludingGravity;  
			var x = accGravity.x * 10 , m = Math.floor(x) > 80 ? 80 : Math.floor(x);
	        	m = m < -70 ? -70 : m;
			piceMove(m/2,'motionHandler');
	    }
	    function piceMove(x, type){
	        $page.find('.home_pg0').css({'-webkit-transform': 'translate3d('+ x +'px,0,0)' });
	    }
		function testMotionHandler(event){
			window.removeEventListener("devicemotion", testMotionHandler, false);
			window.addEventListener("devicemotion", motionHandler, false); 
		}
		function testOrientationHandler(event){
			window.removeEventListener("deviceorientation", testOrientationHandler, false);
			window.removeEventListener("devicemotion", motionHandler, false);
			window.addEventListener("deviceorientation", orientationHandler, false);  
		}

	    //测试是否允许 部分安卓只有 devicemotion， 部分安卓 和 ios 两个值都有 
	    //测试发现 deviceorientation 在低版本卡顿较小；
	    //具体实现 先绑定 devicemotion；如果有 deviceorientation 移除 devicemotion 绑定 deviceorientation；
	    if (window.DeviceMotionEvent){
	    	window.addEventListener("devicemotion", testMotionHandler, false);  
	    } ;
	    if (window.DeviceOrientationEvent){  
	    	window.setTimeout(function(){
	    		window.addEventListener("deviceorientation", testOrientationHandler, false);
	    	}, 500);
	    } ;

     	$page.find('.home_pg0').css({'width':'120%','margin-left':'-10%'});

		$page.on('swipeUp', '.home_pg0', function(){
			$page.find('.page1').addClass('hide');
			$page.find('.home-bar-nav').css({'background-color':'#000'});
		});

		$page.on('webkitTransitionEnd', '.page1', function(){
			if($(this).hasClass('hide')){
				$('body').off('touchmove', stopPreventDefault);
				$('nav.bar-tab').show();
				$('.content').css({'bottom':'3rem'});
			}else{
				$('body').on('touchmove', stopPreventDefault);
			}
		});

		$page.on('swipeDown', '.home_bgc', function(){
			if($('.content').scrollTop() <= 0 ) {
				$page.find('.page1').removeClass('hide');
				$page.find('.home-bar-nav').css({'background-color':'transparent'});
				$('.content').css({'bottom':'0'});
				$('nav.bar-tab').hide();
			}
		});

		$('.home_jhlx').click(function(){
			if($('.jhlx').hasClass('hidden')){
				$(".jhlx").removeClass('hidden');
				$(".jia0").addClass('hidden');
				$(".jian0").removeClass('hidden');
			}else{
				$(".jhlx").addClass('hidden');
				$(".jian0").addClass('hidden');
				$(".jia0").removeClass('hidden');
			}
		});
		$('.home_hjcd').click(function(){
			if($('.hjcd').hasClass('hidden')){
				$(".hjcd").removeClass('hidden');
				$(".jia1").addClass('hidden');
				$(".jian1").removeClass('hidden');
			}else{
				$(".hjcd").addClass('hidden');
				$(".jian1").addClass('hidden');
				$(".jia1").removeClass('hidden');
			}
		});
		$('.home_zbdc').click(function(){
			if($('.zbdc').hasClass('hidden')){
				$(".zbdc").removeClass('hidden');
				$(".jia2").addClass('hidden');
				$(".jian2").removeClass('hidden');
			}else{
				$(".zbdc").addClass('hidden');
				$(".jian2").addClass('hidden');
				$(".jia2").removeClass('hidden');
			}
		});
		$('.home_gezx').click(function(){
			if($('.grzx').hasClass('hidden')){
				$(".grzx").removeClass('hidden');
				$(".jia3").addClass('hidden');
				$(".jian3").removeClass('hidden');
			}else{
				$(".grzx").addClass('hidden');
				$(".jian3").addClass('hidden');
				$(".jia3").removeClass('hidden');
			}
		});

		$('.home_arrowd img').click(function(){
			$('.home_pg0').addClass('hidden');
			$('.home_lbnav2').removeClass('hidden');
			$('.home_pg1').removeClass('hidden');
			$('.home_bthxcx').removeClass('nodisplay');
		});
		$('.home_arrowdup img').click(function(){
			$('.home_pg0').removeClass('hidden');
			$('.home_lbnav2').addClass('hidden');
			$('.home_pg1').addClass('hidden');
			$('.home_bthxcx').addClass('nodisplay');
		})

	});

	// $(document).on("pageInit", "#page-home", function(e, pageId, $page) {

	// 	function orientationHandler(event){
	//         var m = Math.floor(event.gamma) > 80 ? 80 : Math.floor(event.gamma);
	//         	m = m < -70 ? -70 : m;
	//         piceMove(-m/2,'orientationHandler');
	//     }
	//     function motionHandler(event){
	//         var acc = event.acceleration, accGravity = event.accelerationIncludingGravity;  
	// 		var x = accGravity.x * 10 , m = Math.floor(x) > 80 ? 80 : Math.floor(x);
	//         	m = m < -70 ? -70 : m;
	// 		piceMove(m/2,'motionHandler');
	//     }
	//     function piceMove(x, type){
	//         $page.find('.home_pg0').css({'-webkit-transform': 'translate3d('+ x +'px,0,0)' });
	//     }
	// 	function testMotionHandler(event){
	// 		window.removeEventListener("devicemotion", testMotionHandler, false);
	// 		window.addEventListener("devicemotion", motionHandler, false); 
	// 	}
	// 	function testOrientationHandler(event){
	// 		window.removeEventListener("deviceorientation", testOrientationHandler, false);
	// 		window.removeEventListener("devicemotion", motionHandler, false);
	// 		window.addEventListener("deviceorientation", orientationHandler, false);  
	// 	}

	//     //测试是否允许 部分安卓只有 devicemotion， 部分安卓 和 ios 两个值都有 
	//     //测试发现 deviceorientation 在低版本卡顿较小；
	//     //具体实现 先绑定 devicemotion；如果有 deviceorientation 移除 devicemotion 绑定 deviceorientation；
	//     if (window.DeviceMotionEvent){
	//     	window.addEventListener("devicemotion", testMotionHandler, false);  
	//     } ;
	//     if (window.DeviceOrientationEvent){  
	//     	window.setTimeout(function(){
	//     		window.addEventListener("deviceorientation", testOrientationHandler, false);
	//     	}, 500);
	//     } ;

 //     	$page.find('.home_pg0').css({'width':'120%','margin-left':'-10%'});

	// 	$('.home_cddj').click(function(){
	// 		if($('.panel-left').hasClass('active')){
	// 		 	$(this).removeClass('open-panel');
	// 		 	$(this).addClass('close-panel');
	// 		}else{
	// 			$(this).addClass('open-panel');
	// 		 	$(this).removeClass('close-panel');
	// 		}
	// 	});

	// 	$('.home_jhlx').click(function(){
	// 		if($('.jhlx').hasClass('hidden')){
	// 			$(".jhlx").removeClass('hidden');
	// 			$(".jia0").addClass('hidden');
	// 			$(".jian0").removeClass('hidden');
	// 		}else{
	// 			$(".jhlx").addClass('hidden');
	// 			$(".jian0").addClass('hidden');
	// 			$(".jia0").removeClass('hidden');
	// 		}
	// 	});
	// 	$('.home_hjcd').click(function(){
	// 		if($('.hjcd').hasClass('hidden')){
	// 			$(".hjcd").removeClass('hidden');
	// 			$(".jia1").addClass('hidden');
	// 			$(".jian1").removeClass('hidden');
	// 		}else{
	// 			$(".hjcd").addClass('hidden');
	// 			$(".jian1").addClass('hidden');
	// 			$(".jia1").removeClass('hidden');
	// 		}
	// 	});
	// 	$('.home_zbdc').click(function(){
	// 		if($('.zbdc').hasClass('hidden')){
	// 			$(".zbdc").removeClass('hidden');
	// 			$(".jia2").addClass('hidden');
	// 			$(".jian2").removeClass('hidden');
	// 		}else{
	// 			$(".zbdc").addClass('hidden');
	// 			$(".jian2").addClass('hidden');
	// 			$(".jia2").removeClass('hidden');
	// 		}
	// 	});
	// 	$('.home_gezx').click(function(){
	// 		if($('.grzx').hasClass('hidden')){
	// 			$(".grzx").removeClass('hidden');
	// 			$(".jia3").addClass('hidden');
	// 			$(".jian3").removeClass('hidden');
	// 		}else{
	// 			$(".grzx").addClass('hidden');
	// 			$(".jian3").addClass('hidden');
	// 			$(".jia3").removeClass('hidden');
	// 		}
	// 	});

	// 	$('.home_arrowd img').click(function(){
	// 		$('.home_pg0').addClass('hidden');
	// 		$('.home_lbnav2').removeClass('hidden');
	// 		$('.home_pg1').removeClass('hidden');
	// 		$('.home_bthxcx').removeClass('nodisplay');
	// 	});
	// 	$('.home_arrowdup img').click(function(){
	// 		$('.home_pg0').removeClass('hidden');
	// 		$('.home_lbnav2').addClass('hidden');
	// 		$('.home_pg1').addClass('hidden');
	// 		$('.home_bthxcx').addClass('nodisplay');
	// 	})

	//     $(document).on('click','.confirm-title-ok', function () {
	// 	  	$.confirm( '拨打客服：400-123-456', function () {
	// 	      	$.alert('确认拨打');
	// 	  	});
	// 	});
 // 		//全局变量，触摸开始位置
 //        var startX = 0, startY = 0;
 //        //touchstart事件
 //        function touchStartFunc(evt) {
 //            try
 //            {
 //                var touch = evt.touches[0]; //获取第一个触点
 //                var y = touch.pageY; //页面触点Y坐标
 //                //记录触点初始位置
 //                startY = y;
 //            }
 //            catch (e) {
 //            }
 //        }
 //        //touchmove事件，这个事件无法获取坐标
 //        function touchMoveFunc(evt) {
 //            try
 //            {
 //                var touch = evt.touches[0]; //获取第一个触点
 //                var y = touch.pageY; //页面触点Y坐标

 //                if (y - startY < 0) {
 //                    $('.home_btbg').addClass('hidden');
 //                } else {
 //                	$('.home_btbg').removeClass('hidden');
 //                }
 //                startY = y;
 //            }
 //            catch (e) {
 //            }
 //        }

 //        //touchend事件
 //        function touchEndFunc(evt) {
 //            try {
 //            }
 //            catch (e) {
 //            }
 //        }
 //        //绑定事件
 //        function bindEvent(f) {
 //            if(f==1){
 //            }else{
 //                document.addEventListener('touchstart', touchStartFunc, false);
 //                document.addEventListener('touchmove', touchMoveFunc, false);
 //                document.addEventListener('touchend', touchEndFunc, false);
 //            }
 //        }
 //        //判断是否支持触摸事件
 //        function isTouchDevice() {
 //            try {
 //                document.createEvent("TouchEvent");
 //                bindEvent(); //绑定事件
 //            }
 //            catch (e) {
 //            }
 //        }
 //    	window.onload = isTouchDevice;
	// });

	$.init();
});
