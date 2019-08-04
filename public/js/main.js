// main.js
console.log('Client JavaScript loaded!')

$(function(){
  $(window).scroll(function(){
    var win_scroll = $('html, body').scrollTop();
    var header_height = $('#main-header').height(); 

    if(win_scroll >= header_height){
      $('#main-header').addClass('bg-b');
    } else{
      $('#main-header').removeClass('bg-b');
    }
  })

}) // end$()