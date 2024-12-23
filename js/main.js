/*  ---------------------------------------------------
    Theme Name: Staging
    Description: Staging bootstrap tamplate
    Author: Colorib
    Author URI: https://www.colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

"use strict";

(function ($) {
  /*------------------
        Preloader
    --------------------*/
  // $(window).on("load", function () {
  //   $(".loader").fadeOut();
  //   $("#preloder").fadeOut("slow");
  // });
  $(document).ready(function () {
    $(".loader").fadeOut(100);
    $("#preloder").fadeOut(200);
  });

  // LAZYLOAD IMAGES
  document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img");

    const lazyLoadFallback = (img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      }
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lazyLoadFallback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    images.forEach((img) => {
      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }
      if (img.dataset.src) {
        observer.observe(img);
      }
    });
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this)
      .attr("loading", "lazy")
      .css("background-image", "url(" + bg + ")");
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg-home").each(function () {
    var bg = $(this).data("setbg");
    $(this)
      .attr("loading", "lazy")
      .css("background-image", "url(" + bg + ")");
  });

  //Canvas Menu
  $(".canvas__open").on("click", function () {
    $(".offcanvas-menu-wrapper").addClass("active");
    $(".offcanvas-menu-overlay").addClass("active");
  });

  $(".offcanvas-menu-overlay").on("click", function () {
    $(".offcanvas-menu-wrapper").removeClass("active");
    $(".offcanvas-menu-overlay").removeClass("active");
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*-----------------------
        Hero Slider
    ------------------------*/
  $(".hero__slider")
    .owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: true,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'><i/>",
        "<i class='fa fa-angle-right'><i/>",
      ],
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 800,
      autoHeight: false,
      autoplay: true,
      mouseDrag: false,
      onInitialized: function (e) {
        var a = this.items().length;
        $("#snh-1").html("<span>01</span><span>" + "0" + a + "</span>");
        var presentage = Math.round(100 / a);
        $(".slider__progress span").css("width", presentage + "%");
      },
    })
    .on("changed.owl.carousel", function (e) {
      var b = --e.item.index,
        a = e.item.count;
      $("#snh-1").html(
        "<span> " +
          "0" +
          (1 > b ? b + a : b > a ? b - a : b) +
          "</span><span>" +
          "0" +
          a +
          "</span>"
      );

      var current = e.page.index + 1;
      var presentage = Math.round((100 / e.page.count) * current);
      $(".slider__progress span").css("width", presentage + "%");
    });

  /*--------------------------
        Project Slider
    ----------------------------*/
  $(".project__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 4,
    dots: false,
    nav: true,
    navText: [
      "<span class='arrow_carrot-left'><span/>",
      "<span class='arrow_carrot-right'><span/>",
    ],
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: false,
    responsive: {
      320: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });

  /*-----------------------------
        Testimonial Slider
    -------------------------------*/
  $(".testimonial__carousel").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    // autoplay:true,
    asNavFor: ".testimonial__client",
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fa fa-angle-left"><i></i></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fa fa-angle-right"><i></i></i></button>',
  });
  $(".testimonial__client").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".testimonial__carousel",
    arrows: false,
    variableWidth: true,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
    ],
  });

  /*---------------------------------
        Logo Carousel
    ----------------------------------*/
  $(".logo__carousel").owlCarousel({
    loop: true,
    margin: 80,
    items: 5,
    dots: false,
    nav: false,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      320: {
        items: 2,
      },
      576: {
        items: 3,
      },
      992: {
        items: 5,
      },
    },
  });

  /*------------------
        Counter
    --------------------*/
  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  /*------------------
        Load More Projects
    --------------------*/
  $(document).ready(function () {
    let rowsToShow = 2; // Number of rows to show on each click
    let totalRows = $(".gallery-area-project .row").length; // Total rows available
    let currentVisibleRows = 6; // Rows visible on page load

    // Initially hide rows after the first 2
    $(".gallery-area-project .row").slice(currentVisibleRows).hide();

    $(".loadmore a").on("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      // Calculate the range of rows to show
      let nextVisibleRows = currentVisibleRows + rowsToShow;

      // Show the next set of rows
      $(".gallery-area-project .row")
        .slice(currentVisibleRows, nextVisibleRows)
        .fadeIn(600);

      // Update the currently visible rows count
      currentVisibleRows = nextVisibleRows;

      // If all rows are visible, hide the Load More button
      if (currentVisibleRows >= totalRows) {
        $(".loadmore").fadeOut();
      }
    });
  });
})(jQuery);
