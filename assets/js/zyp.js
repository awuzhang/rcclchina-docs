$(function () {
	'use strict';

	$(document).on("pageInit", "#page-checkin-payment", function(e) {
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

		$('#page-checkin-payment .div_agreement span.agree').on("click",function(){
			if ($(this).children('i').hasClass('checkbox_on')){
				$(this).children('i').addClass('checkbox_off');
				$(this).children('i').removeClass('checkbox_on');
			} else {
				$(this).children('i').addClass('checkbox_on');
				$(this).children('i').removeClass('checkbox_off');
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

	$(document).on("pageInit", "#page-checkin-index", function(e) {
		var totheight = $("#page-checkin-index").height();
		var divheight = $(".checkin_dh").height();
		var mgt = ((totheight-divheight-divheight-56)/3);
		$('.checkin_gmt').css("marginTop",mgt);
	});

	$(document).on("pageInit", "#page-checkin-orderno", function(e) {
		//低版本android打开时间控件
		if($.device.android && $.compareVersion('5.0', $.device.osVersion)){
			$('input[name="sailingdate"]', $page).calendar();
		}
	});
	$(document).on("pageInit", "#page-checkin-carbinno", function(e) {
		//低版本android打开时间控件
		if($.device.android && $.compareVersion('5.0', $.device.osVersion)){
			$('input[name="sailingdate"]', $page).calendar();
		}

		if($.device.android && $.compareVersion('5.0', $.device.osVersion)){
			$('input[name="birthdate"]', $page).calendar({value: ['1980-01-01']});
		}
	});
	$(document).on("pageInit", "#page-searchmyorder-input", function(e) {
		//低版本android打开时间控件
		if($.device.android && $.compareVersion('5.0', $.device.osVersion)){
			$('input[name="sailingdate"]', $page).calendar();
		}
	});

	//checkin时间控制    （由于页面允许通过链接直接访问step2,3,4 所以每个页面都需尝试初始化时间函数）
	$(document).on("pageAnimationStart", "#page-checkin-selectpassenger", function(e, pageId, $page) {
		$page.find('#remainTime').html(checkinTimerControl.getInstance().endTimeString() );
	});
	$(document).on("pageAnimationStart", "#page-checkin-supplementary", function(e, pageId, $page) {
 		$page.find('#remainTime').html(checkinTimerControl.getInstance().endTimeString() );
	});
	$(document).on("pageAnimationStart", "#page-checkin-payment", function(e, pageId, $page) {
 		$page.find('#remainTime').html(checkinTimerControl.getInstance().endTimeString() );
	});
	$(document).on("pageInit", "#page-checkin-selectpassenger", function(e, pageId, $page) {
		checkinTimerControl.getInstance().run();
		checkinTimerControl.getInstance().addEvent(function(){
			$page.find('#remainTime').html(checkinTimerControl.getInstance().endTimeString() );
		});
	});
	$(document).on("pageInit", "#page-checkin-supplementary", function(e, pageId, $page) {
		checkinTimerControl.getInstance().run();
		checkinTimerControl.getInstance().addEvent(function(){
			$page.find('#remainTime').html(checkinTimerControl.getInstance().endTimeString() );
		});
	});
	$(document).on("pageInit", "#page-checkin-payment", function(e, pageId, $page) {
		checkinTimerControl.getInstance().run();
		checkinTimerControl.getInstance().addEvent(function(){
			$page.find('#remainTime').html(checkinTimerControl.getInstance().endTimeString() );
		});
	});
	$(document).on("pageReinit", "#page-checkin-selectpassenger", function(e, pageId, $page) {
		checkinTimerControl.getInstance().removeEvent();
	});
	$(document).on("pageReinit", "#page-checkin-supplementary", function(e, pageId, $page) {
		checkinTimerControl.getInstance().removeEvent();
	});
	$(document).on("pageReinit", "#page-checkin-payment", function(e, pageId, $page) {
		checkinTimerControl.getInstance().removeEvent();
	});
	//时间控制结束

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
			$('.home_bthxcx').removeClass('nodisplay');
		});
		$('.home_arrowdup img').click(function(){
			$('.home_pg0').removeClass('hidden');
			$('.home_lbnav2').addClass('hidden');
			$('.home_pg1').addClass('hidden');
			$('.home_bthxcx').addClass('nodisplay');
		})

	    $(document).on('click','.confirm-title-ok', function () {
		  	$.confirm( '拨打客服：400-123-456', function () {
		      	$.alert('确认拨打');
		  	});
		});
 		//全局变量，触摸开始位置
        var startX = 0, startY = 0;
        //touchstart事件
        function touchStartFunc(evt) {
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
                document.addEventListener('touchstart', touchStartFunc, false);
                document.addEventListener('touchmove', touchMoveFunc, false);
                document.addEventListener('touchend', touchEndFunc, false);
            }
        }
        //判断是否支持触摸事件
        function isTouchDevice() {
            try {
                document.createEvent("TouchEvent");
                bindEvent(); //绑定事件
            }
            catch (e) {
            }
        }
    	window.onload = isTouchDevice;
	});
});

function regDate(str) {
    str = str.replace(/\//, '').substring(0,4);
    if(isNaN(str)) return '';
    var reg = /(\d{2})(\d{1,2})/;
    return(str.replace 
        (reg, 
            function($0,$1,$2) { 
                return  ($1 +"/" + $2);
            } 
        )
    ); 
} 

var checkinModal = {
	'nextConfirm' : function(){
		$.confirm('时间已到，您还未完成办理，<br/>是否继续办理？',
			function () {
				//点确定时 替换结束时的提醒 ，重置时间，开始
				checkinTimerControl.getInstance().setEndEvent(checkinModal.endConfirm);
				checkinTimerControl.getInstance().setTime(15);
				checkinTimerControl.getInstance().run();
			},
			function() {
				window.location = "../../index.html";
			}
		);
	},
	'endConfirm' : function(){
		$.alert('时间已到，您还办理完成办理，<br/>请重新验证办理',
			function () {
				window.location = "/checkin/checkin_carbinno.html";
			}
		);
	}
}
    
//订单时间控制 (单例)；
var checkinTimerControl = (function () {
    var instantiated;
    function init() {
    	this.isRun = false; 
    	this.count = 60 * 15 ; //默认15分钟 60 = 秒；
    	this.interval = 1000; //每秒触发一次；
    	this.timer;
    	this.endTime = new Date().getTime() + (1000 * this.count);
    	this.events = [];
    	this.endEvents = checkinModal.nextConfirm;   //倒计时时结束触发 （ps:约定 未运行时才允许设置, 避免了加载其他页面时初始化该事件)；

    	endTimeString = function(){
    		var t = endTime - new Date();
    		var m=Math.floor(t/1000/60%60), m = m.toString().length == 1 ? "0"+m : m; 
            var s=Math.floor(t/1000%60), s = s.toString().length == 1 ? "0"+s : s; 
            return (m + ':' + s);
    	}
    	dispatchEvent = function(){
    		for(var index in events){
				events[index]();
			}
			count -= 1;
			if(count === 1) { //等于1时结束了
				clearInterval(timer);
				isRun = false;
				endEvents();
			}
    	}
    	setTime =  function (n) {
    		if(isRun) return;
        	count = 60 * n;
        	endTime = new Date().getTime() + (1000 * count);
        }
        run = function(){
        	if(isRun) {return;}
        	isRun = true;
        	timer = setInterval(function(){
        		dispatchEvent();
        	}, interval)
        }
		addEvent = function(event){
        	events.push(event);
        }
        removeEvent = function() {
        	events.pop();
        }
        setEndEvent = function(event){
        	if(isRun) return;
        	endEvents = event;
        }
        stop = function(){
        	isRun = false;
        	clearInterval(timer);
        }
        return {
            setTime : setTime,
            run : run,
            addEvent: addEvent,
            removeEvent : removeEvent,
            endTimeString : endTimeString,
            setEndEvent : setEndEvent,
            stop: stop
        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();