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

	$(document).on("pageInit", "#page-route-room", function(e, pageId, $page) {
		//选择房间
		var pickOfRoomsControl = new PickOfRoomsControl();
		pickOfRoomsControl.init(pageId);

		//下方导航条菜单
		$page.on('click', '.detail', function(){
			var $navBarDetail = $('.navBarDetail', $page);
			$navBarDetail.toggleClass('dn');
			$(this).toggleClass('r180')
		});
		//无大人时弹窗
		$page.on('click','.selectXBox', function(){
			if(!($(this).find('.selectX').attr('disabled') == 'disabled')) {return;}
			$.alert('每个房间须有至少1名成人，<br/> 请先选择成人');
		});

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

		//会员弹窗
		$page.on('click', '#nextBtn', function(){
			if( $(this).hasClass('disabled') ) return;

			var memberModal = $.modal({
		      extraClass: "room-memberModal",
			  title: '有会员号或优惠码享受优惠哦！',
			  text:  '<div>'+
		                '<div class="bb1"><label class="f12 db">会员号 <input type="text" value="94823728388"/></label></div>'+
		                '<div class="bb1"><label class="f12 db">优惠劵代码 <input type="text" value="847229381"/></label></div>'+
		              '</div>' +
		              '<div class="btns">'+
		                '<div><a href="javascript:$.closeModal();$.router.loadPage(\'/route/route_room_select\')" class="f16 external button button-fill button-success">提 交</a></div>'+
		                '<div class="tc mt10"><a href="javascript:$.closeModal();$.router.loadPage(\'/route/route_room_select\')" class="external f16 fyellow">跳 过</a></div>'+
		              '</div>'
			});
		})
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

	/*
	$(document).on("pageInit", "#page-index", function(e, pageId, $page) {
	  // 测试用 
	  $(".label").on('touchstart', function(){
	    var $span = $(this).find('span'), $inp = $(this).find('input');
	    $span.addClass('animated s50p').on('webkitTransitionEnd transitionend', function(){
	    });
	  });
	  $(".label2").on('touchstart', function(){
	    $(this).addClass('label3');
	  });
	  $("#picker").picker({
	      toolbarTemplate: '<header class="bar bar-nav">\
	      <button class="button button-link pull-right close-picker">确定</button>\
	      <h1 class="title">标题</h1>\
	      </header>',
	      cols: [
	        {
	          textAlign: 'center',
	          values: ['1','2','3','4']
	        }
	      ]
	    });
	});
	$(document).on("pageInit", "#page-booking", function(e) {

		$('.open-popup[data-popup=".popup-customer"]').on('click', function(){
		  $('.popup-customer').data('A', this);      //保存<A>
		  $(this).children('input').forEach(function(el){ //给表单赋值
		    $('.popup-customer [name="'+el.name+'"]').val( el.value );
		  });
		});

		$('.popup-customer .button-success').on('click', function(){
		  var $popup = $('.popup-customer') , $A = $popup.data('A');
		  $popup.find('input, select').forEach(function(el){  //修改链接信息
		    $('[name="'+el.name+'"]', $A).val( el.value );
		  });
		  var strname = $.trim($('input[name="cnfamilyname"]', $popup).val() + $('input[name="cnname"]', $popup).val());
		  if( strname.length > 0){ $('.name', $A).html(strname); }
		})
	});
	*/
});



// var pickOfRoom = new PickOfRoom();
// pickOfRoom.getRresult();
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
		// self.$room = $(self.pageId + ' .route-detail-card');
		// self.$navBar = $(self.pageId + ' .bar-tab');
		self.$navBarLink = $(self.pageId + ' .detail');
		self.$navBarDetail = $(self.pageId + ' .navBarDetailCon');
		self.$navBarNextBtn = $(self.pageId + ' #nextBtn');
		self.roomItemHtml = '<div class="item-content"> <div class="item-inner"> <div class="item-media">第 <span class="room_no">1</span> 间</div> <div class="item-media"> 成人<select class="selectD"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select> <i class="arr-down"></i> </div> <div class="item-media selectXBox"> 儿童 <select class="selectX" disabled="disabled"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select> <i class="arr-down"></i> </div> <div class="item-media"><a href="#" class="del"><img src="/assets/img/icon-del.png"></a></div> </div> </div>';

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

		self.$navBarLink.find('.roomCount').text(rCount);
		self.$navBarLink.find('.userCount').text(uCount);

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



