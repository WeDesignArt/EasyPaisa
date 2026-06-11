(function ($) {
  'use strict';

  // ============================================================
  // Header Sticky & Transparent
  // ============================================================
  function initHeader() {
    var $header = $('.header');
    var heroHeight = $('.hero').outerHeight() || 400;

    function updateHeader() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop > 50) {
        $header.addClass('scrolled').removeClass('transparent');
      } else {
        $header.removeClass('scrolled').addClass('transparent');
      }
    }

    updateHeader();
    $(window).on('scroll', updateHeader);
  }

  // ============================================================
  // Mobile Offcanvas Navigation
  // ============================================================
  function initMobileNav() {
    var $hamburger = $('.hamburger-btn');
    var $offcanvas = $('.offcanvas-nav');
    var $overlay = $('.offcanvas-overlay');
    var $closeBtn = $('.offcanvas-close');
    var $body = $('body');

    function openNav() {
      $offcanvas.addClass('open');
      $overlay.addClass('show');
      $body.css('overflow', 'hidden');
    }

    function closeNav() {
      $offcanvas.removeClass('open');
      $overlay.removeClass('show');
      $body.css('overflow', '');
    }

    $hamburger.on('click', openNav);
    $closeBtn.on('click', closeNav);
    $overlay.on('click', closeNav);

    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }



  // ============================================================
  // Counter Animation
  // ============================================================
  function initCounters() {
    var counters = $('.stat-item-number, .stats-number');
    var animated = false;

    function animateCounter($el) {
      var target = parseFloat($el.data('target')) || parseFloat($el.text().replace(/[^0-9.]/g, '')) || 0;
      var suffix = $el.data('suffix') || '';
      var prefix = $el.data('prefix') || '';
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        $el.text(prefix + current.toLocaleString() + suffix);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          $el.text(prefix + target.toLocaleString() + suffix);
        }
      }

      requestAnimationFrame(step);
    }

    function checkCounters() {
      if (animated) return;
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      var triggerPoint = scrollTop + windowHeight * 0.85;

      counters.each(function () {
        var $this = $(this);
        var offset = $this.offset().top;
        if (offset < triggerPoint && !$this.data('counted')) {
          $this.data('counted', true);
          animateCounter($this);
        }
      });

      if (counters.length && counters.filter(function () { return !$(this).data('counted'); }).length === 0) {
        animated = true;
      }
    }

    $(window).on('scroll', checkCounters);
    $(window).on('resize', debounce(checkCounters, 200));
    checkCounters();
  }

  // ============================================================
  // AOS Initialization
  // ============================================================
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        disable: 'mobile',
      });
    }
  }

  // ============================================================
  // Lazy Loading Images
  // ============================================================
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      $('img[loading="lazy"]').each(function () {
        $(this).on('load', function () {
          $(this).addClass('loaded');
        });
        if (this.complete) {
          $(this).addClass('loaded');
        }
      });
    } else {
      // Fallback
      $('img[data-src]').each(function () {
        var $img = $(this);
        $img.attr('src', $img.data('src'));
        $img.on('load', function () {
          $img.addClass('loaded');
        });
      });
    }
  }

  // ============================================================
  // Smooth Scroll for Anchor Links
  // ============================================================
  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function (e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate(
          { scrollTop: target.offset().top - 80 },
          600,
          'swing'
        );
      }
    });
  }

  // ============================================================
  // Footer Accordion on Mobile
  // ============================================================
  function initFooterAccordion() {
    var $footerHeadings = $('.footer-col h4');

    $footerHeadings.on('click', function () {
      if ($(window).width() < 768) {
        $(this).toggleClass('open');
      }
    });
  }

  // ============================================================
  // Utility: Debounce
  // ============================================================
  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  // ============================================================
  // Resize Handler
  // ============================================================
  function initResizeHandler() {
    var resizeTimer;
    $(window).on('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // Re-init mobile nav behavior
        if ($(window).width() >= 992) {
          $('.offcanvas-nav').removeClass('open');
          $('.offcanvas-overlay').removeClass('show');
          $('body').css('overflow', '');
        }
      }, 250);
    });
  }

  // ============================================================
  // Init on DOM Ready
  // ============================================================
  $(document).ready(function () {
    initHeader();
    initMobileNav();
    initSliders();
    initCounters();
    initAOS();
    initLazyLoading();
    initSmoothScroll();
    initFooterAccordion();
    initResizeHandler();
  });
})(jQuery);
