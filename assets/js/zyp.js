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

		var countup1 = new CountUp("countup1", 0, 45, 0, 2.5, {});
		var countup2 = new CountUp("countup2", 0, 6, 0, 2.5, {});
		var countup3 = new CountUp("countup3", 0, 41, 0, 2.5, {});
		var countup4 = new CountUp("countup4", 0, 460, 0, 2.5, {});
		countup1.start();
		countup2.start();
		countup3.start();
		countup4.start();
	});

	$(document).on("pageInit", "#page-checkin-index", function(e) {
		var totheight = $("#page-checkin-index").height();
		var divheight = $(".checkin_dh").height();
		var mgt = ((totheight-divheight-divheight-56)/3);
		$('.checkin_gmt').css("padding-top",mgt);
		$('.checkin_gmt').css("height", divheight + mgt);
		$('#page-checkin-index .content').removeClass('novisible');

		$("#btncarbinno").on("touchstart", function() {
			$(this).addClass('sc8');
        });
        $("#btncarbinno").on("touchend", function() {
        	$(this).removeClass('sc8');
        });
		$("#btnorderno").on("touchstart", function() {
			$(this).addClass('sc8');
		});
		$("#btnorderno").on("touchend", function() {
        	$(this).removeClass('sc8');
        });
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
	$(document).on("pageInit", "#page-faq-index", function(e, pageId, $page) {
		$page.on('click', '.item-link > .item-inner', function(e){
			$(this).toggleClass('open');
			$(this).find('.inside-div').toggleClass('hidden');
		});

		$("#page-faq-index #searchcond").on('keyup', function(event) {
			var keyword = $("#page-faq-index #searchcond").val();
			if (keyword) {
				$("#page-faq-index #faqlist").addClass('hidden');
				$("#page-faq-index #searchresult").removeClass('hidden');
				SearchHighlight("searchresult", keyword);
			} else {
				$("#page-faq-index #faqlist").removeClass('hidden');
				$("#page-faq-index #searchresult").addClass('hidden');
			}
		});
	});
	$(document).on("pageInit", "#page-faq-payment", function(e, pageId, $page) {
		$page.on('click', '.item-link > .item-inner', function(e){
			$(this).toggleClass('open');
			$(this).find('.inside-div').toggleClass('hidden');
		});
	});
	$(document).on("pageInit", "#page-travelnotes-checkin", function(e, pageId, $page) {
		var top = $('.firstli').offset().top;
		var bottom = $('.lastli').offset().top;
		var height = bottom - top;
		$('#page-travelnotes-checkin .verticalline').attr("style", "height:" + height + "px");
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

function SearchHighlight(idVal,keyword) {
	var pucl = document.getElementById(idVal);
	if("" == keyword) return;
	//关键字匹配不上的问题列表不显示
	$('#searchresult div ul li').each(function(index, el) {
		var title = $(this).find('.item-title').html();
		if (title.indexOf(keyword) == -1) {
			$(this).attr({
				style: 'display:none'
			});
		} else {
			$(this).attr({
				style: 'display:block'
			});
		}
	});
	var temp = pucl.innerHTML;
	var r1 = '<b class="highlight">';
	var r2 = '</b>';
	var htmlReg = new RegExp("\<.*?\>","i");
	var arrA = new Array();
	//替换HTML标签
	for (var i = 0 ; true; i++) {
		var m = htmlReg.exec(temp);
		if (m) {
			if (m.indexOf(r1) == -1 && m.indexOf(r2)) {
				arrA[i] = m;
			} else {
				arrA[i] = "";
			}
		} else {
			break;
		}
		temp = temp.replace(m, "{[("+i+")]}");
	}
	//替换关键字
	words = unescape(keyword.replace(/\+/g,' ')).split(/\s+/);
	for (var w = 0;w < words.length; w++) {
		var r = new RegExp("("+words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&")+")","ig");
		temp = temp.replace(r,"<b class='highlight'>$1</b>");
	}
	//恢复HTML标签
	for(var i = 0; i<arrA.length; i++) {
		temp = temp.replace("{[("+i+")]}", arrA[i]);
	}
	pucl.innerHTML = temp;
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
				window.location = "/index.html";
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