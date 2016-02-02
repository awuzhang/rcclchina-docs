/* 修复 sui.js 自定义Modal的BUG*/
$(function(){
	if($.modal){
		var _modalTemplateTempDiv = document.createElement('div');
		var defaults =  $.modal.prototype.defaults  = {
	        modalStack: true,
	        modalButtonOk: '确定',
	        modalButtonCancel: '取消',
	        modalPreloaderTitle: '加载中',
	        modalContainer : document.body
	    };
	    $.modal = function (params) {
	        params = params || {};
	        var modalHTML = '';
	        var buttonsHTML = '';
	        if (params.buttons && params.buttons.length > 0) {
	            for (var i = 0; i < params.buttons.length; i++) {
	                buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
	            }
	        }
	        var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
	        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
	        var afterTextHTML = params.afterText ? params.afterText : '';
	        var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
	        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical' : '';
	        modalHTML = '<div class="modal ' + noButtons + ' '+ (params.extraClass || '') +'"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML + '</div></div>';
	        _modalTemplateTempDiv.innerHTML = modalHTML;
	        var modal = $(_modalTemplateTempDiv).children();
	        $(defaults.modalContainer).append(modal[0]);
	        // Add events on buttons
	        modal.find('.modal-button').each(function (index, el) {
	            $(el).on('click', function (e) {
	                if (params.buttons[index].close !== false) $.closeModal(modal);
	                if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
	                if (params.onClick) params.onClick(modal, index);
	            });
	        });
	        $.openModal(modal);
	        return modal[0];
	    };
	}
})

/**/

$(function () {
	'use strict';

	$(document).on("pageAnimationStart", function(e) {
		if($.device.isWeixin) {
			$('header.bar').remove();
			$('.bar-nav ~ .content').css({'top' : '0'});
		}
	})
	$(document).on("pageInit", function(e) {
		//微信打开不用header
		if($.device.isWeixin) {
			$('header.bar').remove();
			$('.bar-nav ~ .content').css({'top' : '0'});
		}
		//点击遮罩关闭弹窗
		$(document).on('click', '.modal-overlay', function(){
			$.closeModal();
		});
	});

	$(document).on('pageReinit', function(){
		$.closeModal();
	})

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



	$(document).on("pageInit", "#page-route", function(e, pageId, $page) {
		$('.popup-ships .select-all').on('click', function(){
		    $('#open-ships-text').text('游轮不限');
		    $('.popup-ships .label-checked').removeClass('label-checked').find('input').prop("checked", false);
		})
		$('.popup-ships .label-checkbox').not('.item-disabled').on('click', function(){
			$('.popup-ships .label-checkbox.label-checked').removeClass('label-checked');
			$('.popup-ships .label-checked').removeClass('label-checked');
			$(this).addClass('label-checked');
			var _text = $(this).find('.item-title').text();
			$('#open-ships-text').text(_text);
			$.closeModal('.popup-ships'); 
		});
		$('.popup-portSelect .select-all').on('click', function(){
		    $('#open-portSelect-text').text('不限');
		    $('.popup-portSelect .label-checked').removeClass('label-checked').find('input').prop("checked", false);
		})
		$('.popup-portSelect .label-checkbox').not('.item-disabled').on('click', function(){
			$('.popup-portSelect .label-checked').removeClass('label-checked');
			$(this).addClass('label-checked');
			var _text = $(this).find('.item-title').text();
			$('#open-portSelect-text').text(_text);
			$.closeModal('.popup-portSelect'); 
		});
		$('.popup-cportSelect .select-all').on('click', function(){
		    $('#open-cportSelect-text').text('不限');
		    $('.popup-cportSelect .label-checked').removeClass('label-checked').find('input').prop("checked", false);
		})
		$('.popup-cportSelect .label-checkbox').not('.item-disabled').on('click', function(){
			$('.popup-cportSelect .label-checked').removeClass('label-checked');
			$(this).addClass('label-checked');
			var _text = $(this).find('.item-title').text();
			$('#open-cportSelect-text').text(_text);
			$.closeModal('.popup-cportSelect');
		});

		$('.popup-monthSelect .label-checkbox').on('click', function(){
			$('.popup-monthSelect .label-all').removeClass('label-checked').find('input').prop("checked", false);
			if($(this).hasClass('label-checked')){
				$(this).removeClass('label-checked');
			}else{
				$(this).addClass('label-checked');
			}
		});
		//不限制时间
		$('.popup-monthSelect .select-all').on('click', function(){
			$('.popup-monthSelect .label-checked').removeClass('label-checked').find('input').prop("checked", false);
		    $('#open-monthSelect-text').text('不限');
		});
	});
	$(document).on("pageInit", "#page-route-detail", function(e, pageId, $page) {
		$page.on('click', '.route-detail-info-more', function(e){
			$('.route-detail-info', $page).css({'overflow':'inherit','height':'inherit'});
			$(e.target).hide();
		})
	})

	$(document).on("pageInit", "#page-route-room", function(e, pageId, $page) {
		//图片swiper
		$('#page-route-room .photos').on('click', function () {
	    var modal = $.modal({
	      text:  '<div class="swiper-container" style="width: auto;">'+
                    '<div class="swiper-pagination"></div>'+
                    '<div class="swiper-wrapper">'+
                      '<div class="swiper-slide"><img src="/assets/img/room.jpg" width="100%"></div>' +
                      '<div class="swiper-slide"><img src="/assets/img/room.jpg" width="100%"></div>'+
                      '<div class="swiper-slide"><img src="/assets/img/room.jpg" width="100%"></div>'+
                      '<div class="swiper-slide"><img src="/assets/img/room.jpg" width="100%"></div>'+
                    '</div>'+
                  '</div>',
            extraClass : 'room-photoModal'
	    })
	    $.swiper($(modal).find('.swiper-container'), {pagination: '.swiper-pagination'});});
	});
	$(document).on("pageInit", "#page-route-room-select", function(e, pageId, $page) {

	});

	$(document).on("pageInit", "#page-order-booking", function(e, pageId, $page) {
		//低版本android打开时间控件
		if($.device.android && $.compareVersion('4.6', $.device.osVersion)){
			$('.popup.popup-customer input[name="birthdate"]').calendar({value: ['1980-01-01']});
		}

		window.localStorage.setItem('contact', JSON.stringify({}));
		$page.on('click', '.open-popup[data-popup=".popup-customer"]', function(e){
		  $('.popup-customer').data('param', this);
		  $(this).children('input').forEach(function(el){ //给表单赋值
		    $('.popup-customer [name="'+el.name+'"]').val( el.value );
		  });
		  //特殊控件 联系人 checkbox
		  if ($(this).find('input[name="isContacts"]').val() == 'true') {
		  	$('.popup-customer input[name="isContacts"]').prop( 'checked', true ); 
		  }else{
		  	$('.popup-customer input[name="isContacts"]').prop( 'checked', false ); 
		  }
		  //popup 头部信息修改
		  var defaultName = $(this).find('input[name="defaultName"]').val(),
		  	  room = $(this).find('input[name="room"]').val();
		  $('.popup-customer .defaultName').html(defaultName);
		  $('.popup-customer .room').html(room);
		});

		$('.popup-customer .button-success').on('click', function(){
		  var $popup = $('.popup-customer') , $item = $popup.data('param'), param = {};
		  $popup.find('input, select').forEach(function(el){
		    $('[name="'+el.name+'"]', $item).val( el.value );
		    param[el.name] = el.value;
		  });

		  var strname = $.trim($('input[name="cnfamilyname"]', $popup).val() + $('input[name="cnname"]', $popup).val());
		  if( strname.length > 0){ $('.name', $item).html(strname); }

		  var isContacts = $('input[name="isContacts"]', $popup).is(':checked') ;
		  if(isContacts) {
		  	//排他
		  	$('input[name="isContacts"][value="true"]', $page).val('false');
		  	//保存 思路获取form的值
		  	window.localStorage.setItem('contact', JSON.stringify(param));
		  }
		  $('input[name="isContacts"]', $item).val(isContacts);

		})
	});

	$(document).on('open', '.popup.popup-customer', function(e){
		$(e.target).find('.content').scrollTop(0);
	});


	$(document).on('pageInit', '#page-order-contact', function(e, pageId, $page){
		//低版本android打开时间控件
		if($.device.android && $.compareVersion('4.6', $.device.osVersion)){
			$('input[name="birthdate"]', $page).calendar({value: ['1980-01-01']});
		}

		var contact = JSON.parse( window.localStorage.getItem('contact') );
		var name = contact['cnfamilyname'] || '';
		if(name != ''){
			$page.find('input, select').forEach(function(el){
				$(el).val( contact[el.name] || '');
		  	});
		}

		$page.one('click', '#nextBtn', function(){
			$.ajax({
		        url: '/assets/json/err.json',
		        success:function(data){
		        	if(data.err.length > 0){
		        		for(var index in data.err){
							var ele = $page.find('[name="'+ data.err[index].name +'"]'),
								eleParent = ele.parents('.item-inner'),
								errbox = eleParent.children('.item-err'),
								errmsg = data.err[index].errmsg;
							eleParent.addClass('err');

							if(!errbox.hasClass('item-err')) { 
								errbox = $('<div class="item-err"></div>'); 
								eleParent.append(errbox); 
							}
							errbox.html(errmsg);
							//跳转链接
							$page.find('#nextBtn').attr('href', '/order/order_confirmation')
						}
		        	}
		        }
		    });

		})
	    
	});

	$(document).on("pageInit", "#page-order-confirmation", function(e, pageId, $page) {
		$page.on('click', '.item-link > .item-inner', function(e){
			$(this).toggleClass('open');
			$(this).find('.inside-ul').toggleClass('dn');
		});
	});
	$(document).on("pageInit", "#page-order-pay", function(e, pageId, $page) {
		$page.on('click', '.button-pay', function(e){
			$('.paybox', $page).hide();
			$('.bar-tab', $page).show();
			$('.passenger-ticket-contract', $page).show();
		})
		$page.on('click', '#disagree', function(e){
			$.confirm('不同意《乘客票据合同》 <br /> 将使您无法购票',
		        function () {
					bookingTimerControl.getInstance().stop();
		        }
		    );
		});
		$page.on('click', '#agree', function(e){
			$('.bar-tab', $page).hide();
			$('.passenger-ticket-contract', $page).hide();
			$('.paybox', $page).show();
			$('#booking-timerbox').hide();
			$('#reminderPayment').show();
			bookingTimerControl.getInstance().stop();
		});
	});
	
	//booking时间控制    （由于页面允许通过链接直接访问step2,3,4 所以每个页面都需尝试初始化时间函数）
	$(document).on("pageAnimationStart", "#page-order-booking", function(e, pageId, $page) {
		$page.find('#booking-timer').html( bookingTimerControl.getInstance().endTimeString() );
	});
	$(document).on("pageAnimationStart", "#page-order-contact", function(e, pageId, $page) {
 		$page.find('#booking-timer').html( bookingTimerControl.getInstance().endTimeString() );
	});
	$(document).on("pageAnimationStart", "#page-order-confirmation", function(e, pageId, $page) {
 		$page.find('#booking-timer').html( bookingTimerControl.getInstance().endTimeString() );
	});
	$(document).on("pageAnimationStart", "#page-order-pay", function(e, pageId, $page) {
		$page.find('#booking-timer').html( bookingTimerControl.getInstance().endTimeString() );
	});

	$(document).on("pageInit", "#page-order-booking", function(e, pageId, $page) {
		bookingTimerControl.getInstance().run();
		bookingTimerControl.getInstance().addEvent(function(){
			$page.find('#booking-timer').html( bookingTimerControl.getInstance().endTimeString() );
		});
	});
	$(document).on("pageInit", "#page-order-contact", function(e, pageId, $page) {
		bookingTimerControl.getInstance().run();
		bookingTimerControl.getInstance().addEvent(function(){
			$page.find('#booking-timer').html( bookingTimerControl.getInstance().endTimeString() );
		});
	});
	$(document).on("pageInit", "#page-order-confirmation", function(e, pageId, $page) {
		bookingTimerControl.getInstance().run();
		bookingTimerControl.getInstance().addEvent(function(){
			$page.find('#booking-timer').html( bookingTimerControl.getInstance().endTimeString() );
		});
	});
	$(document).on("pageInit", "#page-order-pay", function(e, pageId, $page) {
		bookingTimerControl.getInstance().run();
		bookingTimerControl.getInstance().addEvent(function(){
			$page.find('#booking-timer').html( bookingTimerControl.getInstance().endTimeString() );
		});
	});
 	$(document).on("pageReinit", "#page-order-booking", function(e, pageId, $page) {
		bookingTimerControl.getInstance().removeEvent();
	});
	$(document).on("pageReinit", "#page-order-contact", function(e, pageId, $page) {
		bookingTimerControl.getInstance().removeEvent();
	});
	$(document).on("pageReinit", "#page-order-confirmation", function(e, pageId, $page) {
		bookingTimerControl.getInstance().removeEvent();
	});
	$(document).on("pageReinit", "#page-order-pay", function(e, pageId, $page) {
		bookingTimerControl.getInstance().removeEvent();
	});
	//时间控制结束

	$(document).on("pageInit", "#page-shorex-citydetail", function(e, pageId, $page) {
		$page.on('click', '.tipsBtn', function(){
			var memberModal = $.modal({
		      extraClass: "room-memberModal",
			  title: '旅行贴士',
			  text:  '<div>'+
		                '<div class="f16 tc">天气与穿衣</div>' +
		                '<div class="f14 mt10">冲绳位于亚热带，全年平均气温有23度，春季多雨，夏季晴朗炎热，夏秋偶尔会有台风。一般而言，春末和秋天是最佳的旅行季节。需要着冬装的日子只有12-3月这段时间，并且不用穿得很厚。只要长袖短外套和羊毛衫即可。除此之外的季节，穿T恤衫和短裤等等夏装即可舒爽度过。不过，冲绳的紫外线很强，所以太阳镜、帽子和防晒霜等是必备之一。</div>' +
		                '<div class="f16 mt20 tc">旅行必备</div>' +
		                '<div class="f14 mt10">冲绳大部分商家不支持银联卡、VSIA、万事达卡，所以需要准备足量现金。</div>' +
		              '</div>'
			});
		})
	});

	$(document).on("pageInit", "#page-onboard-list", function(e, pageId, $page) {
		setTimeout(function(){
			$('.onboard-1').addClass('onboard-1down');
		},1000)
		
	})

	$(document).on("pageInit", "#page-onboard-detail", function(e, pageId, $page) {
		$page.on('click', '.openMemberBtn', function(){
			var memberModal = $.modal({
		      extraClass: "onboard-detail-Modal",
			  title: '<img src="/assets/img/onboardModal.jpg">',
			  text:  '<div>'+
		                '<div class="f16">奥利弗餐厅</div>' +
		                '<div class="f14 mt10">最具人期待明星主厨詹姆斯奥利弗，以崇尚有机健康的饮食理念，成为风靡于欧洲、美国和澳大利亚的风云人物。需要着冬装的日子只有12-3月这段时间，并且不用穿得很厚。只要长袖短外套和羊毛衫即可。除此之外的季节，穿T恤衫和短裤等等夏装即可舒爽度过。不过，冲绳的紫外线很强，所以太阳镜、帽子和防晒霜等是必备之一。</div>' +
		                '<div class="f14 mt20">该餐厅已入驻以下游轮</div>' +
		                '<div class="f14"><span class="fblue">海洋量子号</span><span class="fblue ml20">海洋航行者号</span></div>' +
		              '</div>'
			});
		})
	});


	$(document).on("pageInit", "#page-wifi-confirm", function(e, pageId, $page) {

		$page.on('click', 'span.agree', function(){
			if ($(this).children('i').hasClass('checkbox_on')){
				$(this).children('i').addClass('checkbox_off');
				$(this).children('i').removeClass('checkbox_on');
			} else {
				$(this).children('i').addClass('checkbox_on');
				$(this).children('i').removeClass('checkbox_off');
			}
		});
	});

	$(document).on("pageInit", "#page-myorder-ship", function(e, pageId, $page) {
		$page.on('click', '.importBtn', function(){
			var memberModal = $.modal({
		      extraClass: "import-Modal",
			  title: '<div class="lh15p pt30">是否将以下订单导入到我的订单？<div class="f12 o4">导入后可获得此订单与航线的最新动态</div></div>',
			  text:  '<div class="f14">'+
		                '<div><label>订单号</label>2678365</div>' +
		                '<div><label>所乘游轮</label>海洋量子号</div>' +
		                '<div><label>出发日期</label>2015/12/12</div>' +
		                '<div><label>航线</label>上海 - 冲绳 - 香港</div>' +
		                '<div class="mt20"><a href="#" class="button button-big button-fill button-success button-round">导入到我的订单</a></div>' +
		                '<div class="tc"><a href="#" class="f16 fyellow">暂不导入</a></div>' +
		              '</div>'
			});
		})
	});

	$(document).on("pageInit", "#page-member-login", function(e, pageId, $page) {
		$page.on('click', 'span.agree', function(){
			if ($(this).children('i').hasClass('checkbox_on')){
				$(this).children('i').addClass('checkbox_off');
				$(this).children('i').removeClass('checkbox_on');
			} else {
				$(this).children('i').addClass('checkbox_on');
				$(this).children('i').removeClass('checkbox_off');
			}
		});
	});

	$(document).on("pageInit", "#page-survey-qs2", function(e, pageId, $page) {
		$("#city-picker").cityPicker({
		    toolbarTemplate: '<header class="bar bar-nav">\
		    <button class="button button-link pull-right close-picker">确定</button>\
		    <h1 class="title">请选择常驻地址</h1>\
		    </header>'
		  });
	});
	$(document).on("pageInit", "#page-survey-q10", function(e, pageId, $page) {
		$page.on('change', 'input[type=radio]', function(){
			if($('#plans').prop('checked')){
				$('.subradio').css({'visibility':'visible'});
			}else{
				$('.subradio .curr').removeClass('curr');
				$('.subradio').css({'visibility':'hidden'});
			}
		});
		$page.on('click', '.subradio .button', function(){
			$('.subradio .curr').removeClass('curr');
			$(this).addClass('curr');
		})
	});
	$(document).on("pageInit", "#page-wx-member-profile", function(e, pageId, $page) {
		$.toast("绑定成功");
	});
	$(document).on("pageInit", "#page-import-member-profile", function(e, pageId, $page) {
		$.toast("同步成功");
	});

	$(document).on("pageInit", "#page-checkin-ticket", function(e, pageId, $page) {
		checkinTimerControl.getInstance().stop();

		$page.on('click', '#finishBtn', function(){
			var memberModal = $.modal({
		      extraClass: "room-memberModal",
			  title: '完善信息可以接受定制化推送信息',
			  text:  '<div>'+
		                '<div class="f14 tc o4">系统检测到您可能是？</div>' +
							'<div class="card-content list-block mb0">' +
								'<ul>' +
									'<li class="item-content">' +
										'<label class="label-checkbox item-content">' +
											'<input type="radio" name="my-radio">' +
											'<div class="item-media"><i class="icon icon-form-checkbox"></i></div>' +
											'<div class="item-inner"> 洪莉丝 ALICE HONG </div>' +
										'</label>' +
									'</li>' +
									'<li class="item-content">' +
										'<label class="label-checkbox item-content">' +
											'<input type="radio" name="my-radio">' +
											'<div class="item-media"><i class="icon icon-form-checkbox"></i></div>' +
											'<div class="item-inner"> 王悦威 WANG YUEWEI </div>' +
										'</label>' +
									'</li>' +
								'</ul>' +
								'<div class="content-block list-block clear_margin">' +
									'<a href="/member/import_member_profile" onClick="$.closeModal();" class="button button-big button-fill button-success button-round external">同步到我的账户</a>' +
									'<div class="goback text-center ">' +
										'<a href="#" onClick="$.closeModal()">都不是我，跳过</a>' +
									'</div>' +
								'</div>' +
							'</div>' +
		              '</div>'
			});
		})
	});

	$(document).on("pageInit", "#page-Premierroom", function(e, pageId, $page) {
		$page.on('click', '.photos', function () {
	    var modal = $.modal({
	      text:  '<div class="swiper-container" style="width: auto;">'+
                    '<div class="swiper-pagination"></div>'+
                    '<div class="swiper-wrapper">'+
                      '<div class="swiper-slide"><img src="/assets/img/room.jpg" width="100%"></div>' +
                      '<div class="swiper-slide"><img src="/assets/img/room.jpg" width="100%"></div>'+
                      '<div class="swiper-slide"><img src="/assets/img/room.jpg" width="100%"></div>'+
                      '<div class="swiper-slide"><img src="/assets/img/room.jpg" width="100%"></div>'+
                    '</div>'+
                  '</div>',
            extraClass : 'room-photoModal'
	    })
	    $.swiper($(modal).find('.swiper-container'), {pagination: '.swiper-pagination'});});
	})
  
	$.init();
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
var bookingModal = {
	'nextConfirm' : function(){
		$.confirm('时间已到，您还没有完成预订，<br/>是否继续预订？',
			function () {
				//点确定时 替换结束时的提醒 ，重置时间，开始
				bookingTimerControl.getInstance().setEndEvent(bookingModal.endConfirm);
				bookingTimerControl.getInstance().setTime(13); //再次计时 13分钟
				bookingTimerControl.getInstance().run();
			},
			function() {
				window.location = "/route/route_room_select";
			}
		);
	},
	'endConfirm' : function(){
		$.alert('时间已到，您还没有完成预订，<br/>请重新预约',
			function () {
				window.location = "/route/route_room_select";
			}
		);
	}
}

//订单时间控制 (单例)；
var bookingTimerControl = (function () {
    var instantiated;
    function init() {
    	this.isRun = false; 
    	this.interval = 1000; //每秒触发一次；
    	this.timer;
    	this.minute = 13; //默认13分钟
    	this.endTime = new Date().getTime() + (minute * 60 * 1000) ;
    	this.events = [];
    	this.endEvents = bookingModal.nextConfirm;   //倒计时时结束触发 （ps:约定 未运行时才允许设置, 避免了加载其他页面时初始化该事件)；

    	endTimeString = function(){
    		var t = (endTime - new Date()) > 0 ? endTime - new Date() : 0;
    		var m=Math.floor(t/1000/60%60), m = m.toString().length == 1 ? "0"+m : m; 
            var s=Math.floor(t/1000%60), s = s.toString().length == 1 ? "0"+s : s; 
            return ( m + ':' + s);
    	}
    	dispatchEvent = function(){
    		for(var index in events){
				events[index]();
			}
			if((endTime - new Date().getTime()) < 0) {
				clearInterval(timer);
				isRun = false;
				endEvents();
			}
    	}
    	setTime =  function (n) {
    		if(isRun) return;
        	endTime = new Date().getTime() + (n * 60 * 1000);
        }
        run = function(){
        	if(isRun) {return;}
        	isRun = true;
        	endTime = new Date().getTime() + (minute * 60 * 1000);
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
