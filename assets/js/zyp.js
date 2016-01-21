var t; //倒计时时间
var minute; //显示时间分
var second; //显示时间秒
var timer; //计时器
var timeoutcnt; //超时次数
$(function () {
	'use strict';
	$(document).on("pageInit", "#page-checkin-selectpassenger", function(e) {
		if (timer == null || (typeof(timer) == undefined)) {
		} else {
			clearInterval(timer);
		}
		timeoutcnt = 0;
		t = 900; //倒计时时间15分钟
		timer = setInterval("refer()", 1000); //启动1秒定时
	});
	$(document).on("pageInit", "#page-checkin-supplementary", function(e) {
		if (timer == null || (typeof(timer) == undefined)) {
		} else {
			clearInterval(timer);
		}
		timer = setInterval("refer()", 1000); //启动1秒定时
	});
	$(document).on("pageInit", "#page-checkin-payment", function(e) {
		if (timer == null || (typeof(timer) == undefined)) {
		} else {
			clearInterval(timer);
		}
		timer = setInterval("refer()", 1000); //启动1秒定时
		$('#page-checkin-payment .label-checkbox').on("click",function(){
			if ($(this).find('i').hasClass('checkbox_on')){
				$(this).find('i').addClass('checkbox_off');
				$(this).find('i').removeClass('checkbox_on');
				$(this).find('.item-subtitle').addClass('color_black');
				$(this).find('.item-subtitle').removeClass('sel_color');
			} else {
				$(this).find('i').addClass('checkbox_on');
				$(this).find('i').removeClass('checkbox_off');
				$(this).find('.item-subtitle').addClass('sel_color');
				$(this).find('.item-subtitle').removeClass('color_black');
			}
		});

		$('#page-checkin-payment .div_agreement i').on("click",function(){
			if ($(this).hasClass('checkbox_on')){
				$(this).addClass('checkbox_off');
				$(this).removeClass('checkbox_on');
			} else {
				$(this).addClass('checkbox_on');
				$(this).removeClass('checkbox_off');
			}
		});

		$('#page-checkin-payment .a_btn0').on("click",function(){
			$('.checkin .buttons-tab').addClass('buttons_tab_creditcard');
			$('.checkin .buttons-tab').removeClass('buttons_tab_depositcard');
		});
		$('#page-checkin-payment .a_btn1').on("click",function(){
			$('.checkin .buttons-tab').addClass('buttons_tab_depositcard');
			$('.checkin .buttons-tab').removeClass('buttons_tab_creditcard');
		});

		$('#cardno').on("blur",function(){
			$('#cardno').val($('#cardno').val().replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 "));
		});

		$('#validDate').on("keyup",function(){
			var month = $('#validDate').val();
			if (month == "01" || month == "02" || month == "03" || month == "04" || month == "05" || month == "06"
			|| month == "07" || month == "08" || month == "09" || month == "10" || month == "11" || month == "12") {
				$('#validDate').val($('#validDate').val() + "/");
			}
		});
	});
	$(document).on("pageRemoved", "#page-checkin-payment", function(e) {
		if (timer == null || (typeof(timer) == undefined)) {
		} else {
			clearInterval(timer);
			t = 900;
		}
	});

	$(document).on("pageInit", "#page-orderactlist", function(e) {
		$('.bt1').click(function(){
			$('.bt1').addClass('bt_sty_act');
			$('.bt2').removeClass('bt_sty_act');
			$('.nondod').addClass('hidden');
			$('.ndod').removeClass('hidden');
		});
		$('.bt2').click(function(){
			$('.bt2').addClass('bt_sty_act');
			$('.bt1').removeClass('bt_sty_act');
			$('.ndod').addClass('hidden');
			$('.nondod').removeClass('hidden');

		});
	});
	$(document).on("pageInit", "#page-knowship", function(e) {
		$('.ks_ck').click(function(){
			$('.ks_t1').addClass('hidden');
			$('.ks_t2').removeClass('hidden');
		});
		$('.ks_ck2').click(function(){
			$('.ks_t2').addClass('hidden');
			$('.ks_t1').removeClass('hidden');
		});
	});

	$(document).on("pageInit", "#page-home", function(e) {
		$('.home_cddj').click(function(){
			if($('.panel-left').hasClass('active')){
			 	$(this).removeClass('open-panel');
			 	$(this).addClass('close-panel');
			}
			if(!$('.panel-left').hasClass('active')){
				$(this).addClass('open-panel');
			 	$(this).removeClass('close-panel');
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
		});
		$('.home_arrowdup img').click(function(){
			$('.home_pg0').removeClass('hidden');
			$('.home_lbnav2').addClass('hidden');
			$('.home_pg1').addClass('hidden');
		})

	    $(document).on('click','.confirm-title-ok', function () {
		  	$.confirm( '拨打客服：400-123-456', function () {
		      	$.alert('确认拨打');
		  	});
		});
 		//全局变量，触摸开始位置
        var startX = 0, startY = 0;
        //touchstart事件
        function touchSatrtFunc(evt) {
            try
            {
                var touch = evt.touches[0]; //获取第一个触点
                var y = touch.pageY; //页面触点Y坐标
                //记录触点初始位置
                startY = y;
            }
            catch (e) {
            }
        }
        //touchmove事件，这个事件无法获取坐标
        function touchMoveFunc(evt) {
            try
            {
                var touch = evt.touches[0]; //获取第一个触点
                var y = touch.pageY; //页面触点Y坐标

                if (y - startY < 0) {
                    $('.home_btbg').addClass('hidden');
                } else {
                	$('.home_btbg').removeClass('hidden');
                }
                startY = y;
            }
            catch (e) {
            }
        }

        //touchend事件
        function touchEndFunc(evt) {
            try {
            }
            catch (e) {
            }
        }
        //绑定事件
        function bindEvent(f) {
            if(f==1){
            }else{
                document.addEventListener('touchstart', touchSatrtFunc, false);
                document.addEventListener('touchmove', touchMoveFunc, false);
                document.addEventListener('touchend', touchEndFunc, false);
            }
        }
        //判断是否支持触摸事件
        function isTouchDevice() {
            try {
                document.createEvent("TouchEvent");
                //alert("支持TouchEvent事件！");
                bindEvent(); //绑定事件
            }
            catch (e) {
            }
        }
    	window.onload = isTouchDevice;
	});
});
function refer() {
	t--; // 计数器递减
	minute = Math.floor(t/60);
    second = t - minute*60;
    if (typeof(document.getElementById('remainTime')) == undefined || document.getElementById('remainTime') == null) {
    } else {
    	document.getElementById('remainTime').innerHTML = foo(minute) + ":" + foo(second);
    }
    if (t == 0) {
    	timeoutcnt++;
    	if (timer == null || (typeof(timer) == undefined)) {
	    } else {
			clearInterval(timer);
		}
		if (timeoutcnt == 1) {
	        $.confirm('时间已到，您还没有完成办理，<br/>是否继续办理？',
				function () {
					t = 900;
					timer = setInterval("refer()", 1000); //启动1秒定时
				},
				function() {
					window.location = "../../index.html";
				}
			);
		} else {
			$.confirm('时间已到，您还没有完成办理，<br/>请重新验证办理',
				function () {
					window.location = "../../checkin/checkin_carbinno.html";
				},
				function() {
					window.location = "../../index.html";
				}
			);
		}
		exit;
    }
}
function foo(str){
    str ='00'+str;
    return str.substring(str.length-2,str.length);
}