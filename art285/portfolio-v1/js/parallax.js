$(document).ready(function () {
  
    //init scrolling parallax
    $(window).scroll(function(e){
        var scrolled = $(window).scrollTop();
        if(scrolled < 750){
            parallax()
        }
    });
  
    //define parallax function
    function parallax(){
      var scrolled = $(window).scrollTop();
      $('#parallax').css('background-positionY',(scrolled * -0.5)+'px');
    };
    
  });