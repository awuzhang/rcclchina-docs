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
		$('#page-checkin-payment .item-media').on("click",function(){
			if ($(this).children('i').hasClass('checkbox_on')){
				$(this).children('i').addClass('checkbox_off');
				$(this).children('i').removeClass('checkbox_on');
				$(this).parent().find('.item-subtitle').addClass('color_black');
				$(this).parent().find('.item-subtitle').removeClass('sel_color');
			} else {
				$(this).children('i').addClass('checkbox_on');
				$(this).children('i').removeClass('checkbox_off');
				$(this).parent().find('.item-subtitle').addClass('sel_color');
				$(this).parent().find('.item-subtitle').removeClass('color_black');
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