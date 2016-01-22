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
		if($.device.isWeixin) {
			$('header.bar').remove();
			$('.bar-nav ~ .content').css({'top' : '0'});
		}

		$(document).on('click', '.modal-overlay', function(){
			$.closeModal();
		})
	});

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
		$page.on('click', '.delRoom', function(e){
			$.confirm('确定删除该房间?', function () {
				$(e.target).parents('.route-room-select-card').remove();
			});
		});
		$page.on('click', '.card-tab-bar a', function(e){

			var $_prev = $(e.target).parents('.route-room-select-card').prev();
			if(!$_prev.hasClass('route-room-select-card') || $_prev.find('input').not(function(){ return !this.checked }).length > 0){

				var $_currbox = $(e.target).parents('.card-tab-bar'),
				$_detailbox = $_currbox.next(),
				$_allCard = $('#page-route-room-select .route-room-select-card');
				$('.media-list', $_allCard).hide();
				$('.card-tab-bar', $_allCard).show();
				$_currbox.hide();
				$_detailbox.show('slow');
			}
			
		});

		$page.on('change', '.route-room-select-card input[type="radio"]', function(e){
			var $lab = $(this).parent(),
				tit = $lab.find('.item-title').text(),
				price = $lab.find('.item-after').text(),
				temp = tit + '<span class="ml20">'+ price +'</span>',
				$titbox = $lab.parents('.route-room-select-card').find('.bar-tit'),
				sum = 0, count = 0;
			
			$titbox.html(temp).removeClass('ccc');

			var sum = 0;
			$('input[type="radio"]:checked', $page).forEach(function(item, index){
				count += 1;
				sum += $(item).parents('.item-content').find('.price').text().replace(/,/g,"") - 0;
			});

			$page.find('.navBarDetail .navBarDetailCon').text( 
				'已选'+ count +'间  票价合计：¥' + sum.toString().replace(/\d+?(?=(?:\d{3})+$)/img, "$&,")
			);

		});

	});

	$(document).on("pageInit", "#page-order-booking", function(e, pageId, $page) {
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


	$(document).on("pageInit", "#page-index", function(e, pageId, $page) {
		var device = $.param($.device);
		device = device.replace(/&/g,'<br>')
		$page.find('#device').html(device);

		check_webp_feature('lossy',function(feature, result){
			$('#webP').html('webP:'+ result);
		})
		function check_webp_feature(feature, callback) {
		    var kTestImages = {
		        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
		        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
		        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
		        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
		    };
		    var img = new Image();
		    img.onload = function () {
		        var result = (img.width > 0) && (img.height > 0);
		        callback(feature, result);
		    };
		    img.onerror = function () {
		        callback(feature, false);
		    };
		    img.src = "data:image/webp;base64," + kTestImages[feature];
		}
	  // 测试用 
	//   $(".label").on('touchstart', function(){
	//     var $span = $(this).find('span'), $inp = $(this).find('input');
	//     $span.addClass('animated s50p').on('webkitTransitionEnd transitionend', function(){
	//     });
	//   });
	//   $(".label2").on('touchstart', function(){
	//     $(this).addClass('label3');
	//   });
	//   $("#picker").picker({
	//       toolbarTemplate: '<header class="bar bar-nav">\
	//       <button class="button button-link pull-right close-picker">确定</button>\
	//       <h1 class="title">标题</h1>\
	//       </header>',
	//       cols: [
	//         {
	//           textAlign: 'center',
	//           values: ['1','2','3','4']
	//         }
	//       ]
	//     });
	});

});



// var pickOfRoom = new PickOfRoom();
// pickOfRoom.getRresult();
// 返回
// [ 
// 	{ 'type':'内舱房' ,
// 	  'room' : [
// 		{‘d’:’3’, ’x’:’0’},
// 		{‘d’:’1’, ’x’:’1’},
// 		{‘d’:’2’, ’x’:’0’}
// 	  ]
// 	},
// 	{ 'type':'海景房' ,
// 	  'room' : [
// 		{‘d’:’3’, ’x’:’0’},
// 		{‘d’:’1’, ’x’:’1’},
// 		{‘d’:’2’, ’x’:’0’}
// 	  ]
// 	},
// ]


var PickOfRoomsControl = function() {
	var self = this;
	self.dataRooms = [];

	this.init = function(pageId){
		self.pageId = '#'+pageId;
		self.$navBarLink = $(self.pageId + ' .detail');
		self.$navBarDetail = $(self.pageId + ' .navBarDetailCon');
		self.$navBarNextBtn = $(self.pageId + ' #nextBtn');
		self.roomItemHtml = '<div class="item-content"> <div class="item-inner"> <div class="item-media">第 <span class="room_no">1</span> 间</div> <div class="item-media"> 成人<select class="selectD"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select> <i class="arr-down"></i> </div> <div class="item-media selectXBox"> 儿童 <select class="selectX" disabled="disabled"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select> <i class="arr-down"></i> </div> <div class="item-media"><a href="#" class="del"><img src="/assets/img/icon-del.png"></a></div> </div> </div>';

		//根据当前HTML设置默认dataRooms数据；
		$(self.pageId + ' .card-header .tit').forEach(function(item, index){
			self.dataRooms.push( { 'type': $(item).text() , 'room' : [] } );
		});

		self._handleFun(pageId);
	};
	this._handleFun = function(){
		$(self.pageId).on('click', self.pageId +' .addRoom', function(e){ self._addRoom(e); });
		$(self.pageId).on('click', self.pageId + ' .del', function(e){ self._removeRoom(e); });
		$(self.pageId).on('change', self.pageId + ' select', function(e) { 
			if(e.target.className == 'selectD') { self._setD(e); } else { self._setX(e) ;}
		});
		$(self.pageId).on('dataChange', function(e){ 
			self._updateDetailView();
		});
	};
	this._addRoom = function(e){
		var cardIndex = $(e.target).parents('.route-detail-card').index() ;
		var _item = {'d':'0','x':'0'};
		self.dataRooms[cardIndex].room.push( _item );
 		$(self.pageId).trigger('dataChange');

		self._addRoomHTML(e);
	};
	this._addRoomHTML = function(e){
		var $listBlock = $(e.target).parents('.addRoomBox').prev(),
			num = $listBlock.children().length + 1,
			$ele = $(self.roomItemHtml),
			$num = $ele.find('.room_no');
		$num.html(num);
		$listBlock.append($ele);
	};
	//设置大人
	this._setD = function(e){
		var $slt = $(e.target), $xSlt = $slt.parent().next().find('select'),
			itemIndex = $slt.parents('.item-content').index(),
			cardIndex = $slt.parents('.route-detail-card').index() ;

		if ($slt.val() != 0) { 
			$xSlt.removeAttr('disabled');
		}else{
			self.dataRooms[cardIndex].room[itemIndex]['x'] = 0;
			$xSlt.val(0).attr('disabled', 'disabled');
		}

		self.dataRooms[cardIndex].room[itemIndex]['d'] = $slt.val();
 		$(self.pageId).trigger('dataChange');
	};
	//设置小孩
	this._setX = function(e){
		var $xSlt = $(e.target),
			itemIndex = $xSlt.parents('.item-content').index(),
			cardIndex = $xSlt.parents('.route-detail-card').index();

		self.dataRooms[cardIndex].room[itemIndex]['x'] = $xSlt.val();
 		$(self.pageId).trigger('dataChange');
	};
	this._removeRoom = function(e){
		var $target = $(e.target),
			$item = $target.parents('.item-content'),
			itemIndex = $target.parents('.item-content').index(),
			cardIndex = $target.parents('.route-detail-card').index();

		self.dataRooms[cardIndex].room.splice(itemIndex, 1);
		this._removeRoomHTML($item);
		this._updateRoomNo(e);
 		$(self.pageId).trigger('dataChange');
	};
	this._removeRoomHTML = function($item){
		$item.remove();
	};
	this._updateRoomNo = function(e){
		//修改房间序号 1，2，3 
		$.each($(e.target).children(), function(index, item){
		  $(item).find('.room_no').html(index+1);
		})
	};

	this._updateDetailView = function(){
		var rCount = self._getRoomCount(),
			uCount = self._getuserCount(),
			_temp = '';

		//更新底部左下角菜单
		self.$navBarLink.find('.roomCount').text(rCount);
		self.$navBarLink.find('.userCount').text(uCount);

		//更新左下角展开的内容
		for (var roomsIndex in self.dataRooms){
			var type = self.dataRooms[roomsIndex].type,
				n = 0;
			for(var roomItemIndex in self.dataRooms[roomsIndex].room){
				var d = self.dataRooms[roomsIndex].room[roomItemIndex].d,
					x = self.dataRooms[roomsIndex].room[roomItemIndex].x;
					
				if (self.dataRooms[roomsIndex].room[roomItemIndex].d > 0 ){
					n += 1;
					_temp += '<div><span>'+ type + ' ' + n +'</span><span class="ml10">成人 '+ d +'</span><span class="ml10">儿童 '+ x +'</span></div>';
				}
			}
		}
		self.$navBarDetail.html(_temp);
		
		//设置是否允许下一步
		if (rCount > 0 && self.$navBarNextBtn.hasClass('disabled')) {
			self.$navBarNextBtn.removeClass('disabled');
		}else if(rCount == 0 && !self.$navBarNextBtn.hasClass('disabled')) {
			self.$navBarNextBtn.addClass('disabled');
		}
	};

	this._getRoomCount = function(){
		var roomCount = 0;
		for (var roomsIndex in self.dataRooms){
			for(var roomItemIndex in self.dataRooms[roomsIndex].room){
				if (self.dataRooms[roomsIndex].room[roomItemIndex].d > 0 ){
					roomCount +=1;
				}
			}
		}
		return roomCount;
	};
	this._getuserCount = function(){
		var userCount = 0;
		for (var roomsIndex in self.dataRooms){
			for(var roomItemIndex in self.dataRooms[roomsIndex].room){
				if (self.dataRooms[roomsIndex].room[roomItemIndex].d > 0 ){
					userCount += self.dataRooms[roomsIndex].room[roomItemIndex].d - 0;
					userCount += self.dataRooms[roomsIndex].room[roomItemIndex].x - 0;
				}
			}
		}
		return userCount;
	};
	this.getRresult = function(){
		return self.dataRooms;
	}
}

//
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





