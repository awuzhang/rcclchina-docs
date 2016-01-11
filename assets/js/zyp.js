
$(function () {
  'use strict';
  
  $(document).on("pageInit", "#page-checkin-carbinno", function(e) {
    $('.date-input').calendar({
      dateFormat: 'yyyy/mm/dd'
    });
  });
  $(document).on("pageInit", "#page-checkin-supplementary", function(e) {
    $('.date-input').calendar({
      dateFormat: 'yyyy/mm/dd'
    });
  });
  $(document).on("pageInit", "#page-checkin-payment", function(e) {
    $('.date-input').calendar({
      dateFormat: 'mm/yy'
    });

    $('.item-media').on("click",function(){
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
    
    $('.div_agreement i').on("click",function(){
      if ($(this).hasClass('checkbox_on')){
        $(this).addClass('checkbox_off');
        $(this).removeClass('checkbox_on');
      } else {
        $(this).addClass('checkbox_on');
        $(this).removeClass('checkbox_off');
      }
    });
    
    $('.a_btn0').on("click",function(){
    	$('.checkin .buttons-tab').addClass('buttons_tab_creditcard');
    	$('.checkin .buttons-tab').removeClass('buttons_tab_depositcard');
    });
    $('.a_btn1').on("click",function(){
    	$('.checkin .buttons-tab').addClass('buttons_tab_depositcard');
    	$('.checkin .buttons-tab').removeClass('buttons_tab_creditcard');
    });
  });
});
