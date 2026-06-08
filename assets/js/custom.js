  // ============================================================
  // Swiper Sliders
  // ============================================================
  function initSliders() {
    // Security Section Slider
    if ($('.sec-swiper').length && typeof Swiper !== 'undefined') {
      new Swiper('.sec-swiper', {
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.sec-pagination',
          clickable: true,
        },
        speed: 700,
      });
    }

    // Security Slider (legacy)
    if ($('.security-slider').length && typeof Swiper !== 'undefined') {
      new Swiper('.security-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.security-pagination',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        speed: 600,
      });
    }

    // Save & Earn Slider
    if ($('.save-earn-slider').length && typeof Swiper !== 'undefined') {
      new Swiper('.save-earn-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.save-earn-next',
          prevEl: '.save-earn-prev',
        },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 24 },
          992: { slidesPerView: 3, spaceBetween: 24 },
        },
        speed: 600,
      });
    }

    // Services Mobile Slider
    if ($('.services-slider-mobile').length && typeof Swiper !== 'undefined') {
      new Swiper('.services-slider-mobile', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        speed: 400,
      });
    }

    // Save & Earn Swiper
    if ($('.sae-swiper').length && typeof Swiper !== 'undefined') {
      new Swiper('.sae-swiper', {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        navigation: {
          nextEl: '.sae-nav-next',
          prevEl: '.sae-nav-prev',
        },
        speed: 600,
      });
    }

    // Product Slider
    if ($('.product-slider').length && typeof Swiper !== 'undefined') {
      new Swiper('.product-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 24 },
        },
        speed: 600,
      });
    }
  }

// ============================================================
// Stats Bar Counters
// ============================================================
$(document).ready(function () {
  var $barCounters = $('.st-bar-num[data-target]');
  if (!$barCounters.length) return;

  var barDone = false;

  function animateBarCounter($el) {
    var target   = parseFloat($el.data('target')) || 0;
    var suffix   = $el.data('suffix') !== undefined ? String($el.data('suffix')) : '';
    var prefix   = $el.data('prefix') || '';
    var decimals = parseInt($el.data('decimals')) || 0;
    var noFmt    = $el.data('noformat') === true || $el.data('noformat') === 'true';
    var duration = 2000;
    var startTime = null;

    function fmt(val) {
      if (decimals > 0) return val.toFixed(decimals);
      return noFmt ? Math.floor(val) : Math.floor(val).toLocaleString();
    }

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      $el.text(prefix + fmt(eased * target) + suffix);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        var final = decimals > 0 ? target.toFixed(decimals) : (noFmt ? target : target.toLocaleString());
        $el.text(prefix + final + suffix);
      }
    }

    requestAnimationFrame(step);
  }

  function checkBarCounters() {
    if (barDone) return;
    var triggerPoint = $(window).scrollTop() + $(window).height() * 0.85;

    $barCounters.each(function () {
      var $el = $(this);
      if (!$el.data('counted') && $el.offset().top < triggerPoint) {
        $el.data('counted', true);
        animateBarCounter($el);
      }
    });

    if ($barCounters.filter(function () { return !$(this).data('counted'); }).length === 0) {
      barDone = true;
    }
  }

  $(window).on('scroll', checkBarCounters);
  checkBarCounters();
});