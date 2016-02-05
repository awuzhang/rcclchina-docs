$(function () {
	'use strict';
	var stopPreventDefault = function(){
		event.preventDefault();
	}
	$('body').on('touchmove', stopPreventDefault);

	var handlePannelLeft = function(){
		$('#panel-left-demo .home_tlineb333').on('click', function(){
			var $old = $('#panel-left-demo .home_tlineb333.curr');
			var $next = $(this).next();
			if($old.html() === $(this).html()){
				$old.removeClass('curr');
				$old.next().toggleClass('hidden');
				$(".jia", $old).toggleClass('hidden');
				$(".jian", $old).toggleClass('hidden');
				return;
			}

			if($next.is('ul')){
				if($old.length > 0 ){
					$old.removeClass('curr');
					$old.next().toggleClass('hidden');
					$(".jia", $old).toggleClass('hidden');
					$(".jian", $old).toggleClass('hidden');
				}

				$(this).addClass('curr');
				$next.toggleClass('hidden');
				$(".jia", $(this)).toggleClass('hidden');
				$(".jian", $(this)).toggleClass('hidden');
			}
		})
	}

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

		$page.on('click', '.closePanelmark', function(){
			$(this).hide();
		})
		$page.on('click', '.open-panel', function(){
			$('.closePanelmark').show();
		})

		handlePannelLeft();
	});

	$.init();
});
