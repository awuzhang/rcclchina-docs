
$(function () {
  'use strict';

  $(document).on("pageAnimationStart", function(e) {
    if($.device.isWeixin) {
      $('header.bar').hide();
      $('.bar-nav ~ .content').css({'top' : '0'});
    }
  })
  $(document).on("pageInit", function(e) {
    if($.device.isWeixin) {
      $('header.bar').hide();
      $('.bar-nav ~ .content').css({'top' : '0'});
    }
  })

  $(document).on("pageInit", "#page-index", function(e, pageId, $page) {
    /* 测试用 */
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
  
  $(document).on("pageInit", "#page-route", function(e, pageId, $page) {
	$('.popup-ships .label-checkbox').not('.item-disabled').on('click', function(){
		$('.popup-ships .label-checkbox.label-checked').removeClass('label-checked');
		$('.popup-ships .label-checked').removeClass('label-checked');
		$(this).addClass('label-checked');
		var _text = $(this).find('.item-title').text();
		$('#open-ships-text').text(_text);
		$.closeModal('.popup-ships'); 
	});
	$('.popup-portSelect .label-checkbox').not('.item-disabled').on('click', function(){
		$('.popup-portSelect .label-checked').removeClass('label-checked');
		$(this).addClass('label-checked');
		var _text = $(this).find('.item-title').text();
		$('#open-portSelect-text').text(_text);
		$.closeModal('.popup-portSelect'); 
	});
	$('.popup-cportSelect .label-checkbox').not('.item-disabled').on('click', function(){
		$('.popup-cportSelect .label-checked').removeClass('label-checked');
		$(this).addClass('label-checked');
		var _text = $(this).find('.item-title').text();
		$('#open-cportSelect-text').text(_text);
		$.closeModal('.popup-cportSelect');
	});

	$('.popup-monthSelect .label-checkbox').not('.label-all').on('click', function(){
		$('.popup-monthSelect .label-all').removeClass('label-checked').find('input').prop("checked", false);
		if($(this).hasClass('label-checked')){
			$(this).removeClass('label-checked');
		}else{
			$(this).addClass('label-checked');
		}
	});
	//不限制时间
	$('.popup-monthSelect .label-all').on('click', function(){
		$('.popup-monthSelect .label-checked').find('input').prop("checked", false);
		$('.popup-monthSelect .label-checked').removeClass('label-checked');
		if($(this).hasClass('label-checked')){
			$(this).removeClass('label-checked');
		}else{
			$(this).addClass('label-checked');
		}
	});
  });

  $(document).on("pageInit", "#page-route-detail", function(e) {
    $(".swiper-container").swiper();
  });
  
  $(document).on("pageInit", "#page-route-room", function(e) {
    $("#range1").on('input', function(){
      $('#range1Val').html($(this).val());
    });
  });
  
  $(document).on("pageInit", "#page-booking", function(e) {
    
    $('.open-popup[data-popup=".popup-customer"]').on('click', function(){
      $('.popup-customer').data('A', this);      //保存<A>
      $(this).children('input').forEach(function(el){ //给表单赋值
        $('.popup-customer [name="'+el.name+'"]').val( el.value );
      });
    })
    
    $('.popup-customer .button-success').on('click', function(){
      var $popup = $('.popup-customer') , $A = $popup.data('A');
      $popup.find('input, select').forEach(function(el){  //修改链接信息
        $('[name="'+el.name+'"]', $A).val( el.value );
      });
      var strname = $.trim($('input[name="cnfamilyname"]', $popup).val() + $('input[name="cnname"]', $popup).val());
      if( strname.length > 0){ $('.name', $A).html(strname); }
    })
  });
  
});
