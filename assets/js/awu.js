
$(function () {
  'use strict';

  $(document).on("pageInit", function(e) {
    if($.device.isWeixin) {
    }
  })

  $(document).on("pageInit", "#page-index", function(e) {
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
  
  $(document).on("pageInit", "#page-route", function(e) {
    $(".popup-ships .content").scroller({
    	type: 'js'
    });

	$('.popup-ships .label-checkbox').on('click', function(){
		$('.popup-ships .label-checkbox.label-checked').removeClass('label-checked');
		$(this).addClass('label-checked');
		$.closeModal('.popup-ships'); 
	});
	$('.popup-portSelect .label-checkbox').on('click', function(){
		$(this).addClass('label-checked');
		$.closeModal('.popup-portSelect');  
	});
	$('.popup-cportSelect .label-checkbox').on('click', function(){
		$(this).addClass('label-checked');
		$.closeModal('.popup-cportSelect');  
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
