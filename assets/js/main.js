(function ($) {
  "use strict";

  // ============================================================
  // Header Sticky & Transparent
  // ============================================================
  function initHeader() {
    var $header = $(".header");
    var heroHeight = $(".hero").outerHeight() || 400;

    function updateHeader() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop > 50) {
        $header.addClass("scrolled").removeClass("transparent");
      } else {
        $header.removeClass("scrolled").addClass("transparent");
      }
    }

    updateHeader();
    $(window).on("scroll", updateHeader);
  }

  // ============================================================
  // Mobile Offcanvas Navigation
  // ============================================================
  function initMobileNav() {
    var $hamburger = $(".hamburger-btn");
    var $offcanvas = $(".offcanvas-nav");
    var $overlay = $(".offcanvas-overlay");
    var $closeBtn = $(".offcanvas-close");
    var $body = $("body");

    function openNav() {
      $offcanvas.addClass("open");
      $overlay.addClass("show");
      $body.css("overflow", "hidden");
    }

    function closeNav() {
      $offcanvas.removeClass("open");
      $overlay.removeClass("show");
      $body.css("overflow", "");
    }

    $hamburger.on("click", openNav);
    $closeBtn.on("click", closeNav);
    $overlay.on("click", closeNav);

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  // ============================================================
  // Swiper Sliders
  // ============================================================
  function initSliders() {
    // Security Slider
    if ($(".security-slider").length && typeof Swiper !== "undefined") {
      var securitySwiper = new Swiper(".security-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".security-pagination",
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        },
        speed: 600,
      });

      $(".security-pagination").on(
        "click",
        ".swiper-pagination-bullet",
        function () {
          var bulletIndex = $(this).index();
          securitySwiper.slideToLoop(bulletIndex);
        },
      );
    }

    // Save & Earn Slider
    if ($(".save-earn-slider").length && typeof Swiper !== "undefined") {
      new Swiper(".save-earn-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".save-earn-next",
          prevEl: ".save-earn-prev",
        },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 24 },
          992: { slidesPerView: 3, spaceBetween: 24 },
        },
        speed: 600,
      });
    }

    // Save & Earn Swiper
    // Save & Earn Swiper
if ($(".sae-swiper").length && typeof Swiper !== "undefined") {
  new Swiper(".sae-swiper", {
    loop: true,
    spaceBetween: 24,

    navigation: {
      nextEl: ".sae-nav-next",
      prevEl: ".sae-nav-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },

    speed: 600,
  });
}

    // Services Mobile Slider — init on window load so dimensions are fully computed
    $(window).on("load", function () {
      if ($(".services-slider-mobile").length && typeof Swiper !== "undefined") {
        new Swiper(".services-slider-mobile", {
          slidesPerView: "auto",
          spaceBetween: 16,
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          grabCursor: true,
          speed: 500,
          observer: true,
          observeParents: true,
        });
      }
    });

    // Product Slider
    if ($(".product-slider").length && typeof Swiper !== "undefined") {
      new Swiper(".product-slider", {
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
  // Counter Animation
  // ============================================================
  function initCounters() {
    var counters = $(".stat-item-number, .stats-number");
    var animated = false;

    function animateCounter($el) {
      var target =
        parseFloat($el.data("target")) ||
        parseFloat($el.text().replace(/[^0-9.]/g, "")) ||
        0;
      var suffix = $el.data("suffix") || "";
      var prefix = $el.data("prefix") || "";
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
        if (offset < triggerPoint && !$this.data("counted")) {
          $this.data("counted", true);
          animateCounter($this);
        }
      });

      if (
        counters.length &&
        counters.filter(function () {
          return !$(this).data("counted");
        }).length === 0
      ) {
        animated = true;
      }
    }

    $(window).on("scroll", checkCounters);
    $(window).on("resize", debounce(checkCounters, 200));
    checkCounters();
  }

  // ============================================================
  // AOS Initialization
  // ============================================================
  function initAOS() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1100,
        easing: "ease-out-cubic",
        once: true,
        offset: 100,
      });
    }
  }

  // ============================================================
  // Lazy Loading Images
  // ============================================================
  function initLazyLoading() {
    if ("loading" in HTMLImageElement.prototype) {
      $('img[loading="lazy"]').each(function () {
        $(this).on("load", function () {
          $(this).addClass("loaded");
        });
        if (this.complete) {
          $(this).addClass("loaded");
        }
      });
    } else {
      // Fallback
      $("img[data-src]").each(function () {
        var $img = $(this);
        $img.attr("src", $img.data("src"));
        $img.on("load", function () {
          $img.addClass("loaded");
        });
      });
    }
  }

  // ============================================================
  // Smooth Scroll for Anchor Links
  // ============================================================
  function initSmoothScroll() {
    $('a[href^="#"]').on("click", function (e) {
      var target = $(this.getAttribute("href"));
      if (target.length) {
        e.preventDefault();
        $("html, body").animate(
          { scrollTop: target.offset().top - 80 },
          600,
          "swing",
        );
      }
    });
  }

  // ============================================================
  // Footer Accordion on Mobile
  // ============================================================
  function initFooterAccordion() {
    var $footerHeadings = $(".footer-col h4");

    $footerHeadings.on("click", function () {
      if ($(window).width() < 768) {
        $(this).toggleClass("open");
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
    $(window).on("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // Re-init mobile nav behavior
        if ($(window).width() >= 992) {
          $(".offcanvas-nav").removeClass("open");
          $(".offcanvas-overlay").removeClass("show");
          $("body").css("overflow", "");
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

    var $barCounters = $(".st-bar-num[data-target]");
    if (!$barCounters.length) return;

    var barDone = false;

    function animateBarCounter($el) {
      var target = parseFloat($el.data("target")) || 0;
      var suffix =
        $el.data("suffix") !== undefined ? String($el.data("suffix")) : "";
      var prefix = $el.data("prefix") || "";
      var decimals = parseInt($el.data("decimals")) || 0;
      var noFmt =
        $el.data("noformat") === true || $el.data("noformat") === "true";
      var duration = 2000;
      var startTime = null;

      function fmt(val) {
        if (decimals > 0) return val.toFixed(decimals);
        return noFmt ? Math.floor(val) : Math.floor(val).toLocaleString();
      }

      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        $el.text(prefix + fmt(eased * target) + suffix);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          var final =
            decimals > 0
              ? target.toFixed(decimals)
              : noFmt
                ? target
                : target.toLocaleString();
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
        if (!$el.data("counted") && $el.offset().top < triggerPoint) {
          $el.data("counted", true);
          animateBarCounter($el);
        }
      });

      if (
        $barCounters.filter(function () {
          return !$(this).data("counted");
        }).length === 0
      ) {
        barDone = true;
      }
    }

    $(window).on("scroll", checkBarCounters);
    checkBarCounters();
  });
})(jQuery);


// Search Drawer
// ============================================================
(function () {
  var overlay   = document.getElementById("searchOverlay");
  var input     = document.getElementById("searchInput");
  var searchBtn = document.querySelector(".search-btn");
  var closeBtn  = document.getElementById("searchClose");
  var backdrop  = document.querySelector(".srch-backdrop");

  if (!overlay || !searchBtn) return;

  function openSearch() {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(function () { if (input) input.focus(); }, 440);
  }

  function closeSearch() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (input) input.value = "";
  }

  searchBtn.addEventListener("click", openSearch);
  if (closeBtn)  closeBtn.addEventListener("click", closeSearch);
  if (backdrop)  backdrop.addEventListener("click", closeSearch);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeSearch();
  });
})();


