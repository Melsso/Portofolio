jQuery(document).ready(function($) {
  'use strict';
  var owl = $("#owl-testimonials");
    owl.owlCarousel({ 
      pagination : true,
      paginationNumbers: false,
      autoPlay: 6000,
      items : 1,
      itemsDesktop : [1000,1],
      itemsDesktopSmall : [900,1],
      itemsTablet: [600,1],
      itemsMobile : false    
    });
    var top_header = $('.parallax-content');
    top_header.css({'background-position':'center center'});
    $(window).scroll(function () {
      var st = $(this).scrollTop();
      top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
    });
    $('.counter').each(function() {
        var $this = $(this),
        countTo = $this.attr('data-count');  
        $({ countNum: $this.text()}).animate({
          countNum: countTo
        },

        {
          duration: 8000,
          easing:'linear',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
          }
        });  
      });
      $(".pop-button").click(function () {
          $(".pop").fadeIn(300);
      });
      $(".pop > span").click(function () {
          $(".pop").fadeOut(300);
      });
      $(window).on("scroll", function() {
        if($(window).scrollTop() > 100) {
          $(".header").addClass("active");
          } else {
            $(".header").removeClass("active");
          }
      });
      $('.projects-holder').mixitup({
        effects: ['fade','grayscale'],
          easing: 'snap',
          transitionSpeed: 400,
  });
});

jQuery(document).ready(function($) {
  'use strict';
$('.project-filter .filter').click(function() {
      var filterValue = $(this).data('filter');
      console.log('Filter clicked:', filterValue);
      $('#tmneyik').fadeIn(2000);
      $('.projects-holder').mixitup('filter', '.' + filterValue);
  });
});
