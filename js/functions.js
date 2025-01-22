/* ----------------------------------
	Script
-------------------------------------
	01. mCustomScrollbar
	02. Dropdown
	03. NavbarCollapse onclick active menu
	04. MagnificPopup
	05. Date picker
	06. Fixed navbar
	07. Swiper silder
	08. Video audio
	09. Countdown
	10. Select2
	11. datepicker
	12. Rangeslider
	13. Group loop
	14. AOS animation
	15. AOS animation reveal effect
	16. Element fancy effect
	17. Slick slider
	18. Instafeed
	19. Fullpage
	20. Contact form
	21. Google map
	22. loader
	23. Isotope
	24. Before after 
	25. Counter
*/

(function ($) {
  "use strict"; // Start of use strict

  jQuery.fn.exists = function () {
    return this.length > 0;
  };

  /* ------------------------------------------------------------------------
   * On window resize
   * ------------------------------------------------------------------------ */
  $(window).on("load resize", function () {
    /* ------------------------------------------------------------------------
     * mCustomScrollbar
     * ------------------------------------------------------------------------ */
    var _navbar_collapse = $(".navbar-collapse");
    if (_navbar_collapse.length > 0) {
      var winWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (winWidth < 991) {
        _navbar_collapse.mCustomScrollbar({
          theme: "light",
        });
      } else {
        _navbar_collapse.mCustomScrollbar("destroy");
      }
    }
  });

  /* ------------------------------------------------------------------------
   * On Document ready
   * ------------------------------------------------------------------------ */
  $(document).ready(function ($) {
    var changeClass = function (name) {
      $("#search").removeAttr("class").addClass(name);
    };

    /* ------------------------------------------------------------------------
     * Dropdown
     * ------------------------------------------------------------------------ */

    $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
      if (!$(this).next().hasClass("show")) {
        $(this)
          .parents(".dropdown-menu")
          .first()
          .find(".show")
          .removeClass("show");
      }
      var _subMenu = $(this).next(".dropdown-menu");
      _subMenu.toggleClass("show");

      $(this)
        .parents("li.nav-item.dropdown.show")
        .on("hidden.bs.dropdown", function (e) {
          $(".dropdown-submenu .show").removeClass("show");
        });

      return false;
    });

    /* ------------------------------------------------------------------------
     * navbarCollapse onclick active menu
     * ------------------------------------------------------------------------ */
    var _navbar_link = $(
      "#navbarCollapse.one-page-classic ul.navbar-nav li.nav-item a.nav-link"
    );
    _navbar_link.on("click", function (e) {
      var _class = _navbar_link.parent("li.active").removeClass("active");
      var _this = jQuery(this);
      _this.parent("li").addClass("active");
      if ($(window).width() < 992) {
        $(".navbar-toggler").trigger("click");
      }
    });

    /* ------------------------------------------------------------------------
     * MagnificPopup
     * ------------------------------------------------------------------------ */
    var _popup_container = $(".popup-container");
    if (_popup_container.length > 0) {
      _popup_container.magnificPopup({
        type: "image",
        delegate: "a.portfolio-popup", // child items selector, by clicking on it popup will open
        mainClass: "mfp-with-zoom",
        gallery: {
          enabled: true,
        },
      });
    }

    if (
      $(".popup-youtube").length > 0 ||
      $(".popup-vimeo").length > 0 ||
      $(".popup-gmaps").length > 0
    ) {
      $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      });
    }

    /* ------------------------------------------------------------------------
     * Fixed navbar
     * ------------------------------------------------------------------------ */
    var _navbar_var = $(".navbar");
    if (_navbar_var.length > 0) {
      $(window).scroll(function () {
        if ($(window).scrollTop() >= 150) {
          _navbar_var.addClass("fixed-navbar");
        } else {
          _navbar_var.removeClass("fixed-navbar");
        }
      });
    }

    //Scroll event
    $(window).scroll(function () {
      var scrolled = $(window).scrollTop();
      if (scrolled > 200) jQuery(".go-top").fadeIn("slow");
      if (scrolled < 200) jQuery(".go-top").fadeOut("slow");
    });

    //Click event
    $(".go-top").on("click", function () {
      $("html, body").animate({ scrollTop: "0" }, 200);
    });

    /* ------------------------------------------------------------------------
     * Swiper silder
     * ------------------------------------------------------------------------ */
    var swipercount = 1;
    var _swiper_container = jQuery("div.swiper-container");
    if (_swiper_container.length > 0) {
      _swiper_container.each(function (index, value) {
        var _this = jQuery(this);
        var _div_id = "swiper-container-block-" + swipercount;
        _this.attr("id", _div_id);
        swipercount++;

        var _slider_per_view = _this.attr("data-slidesPerView")
          ? _this.attr("data-slidesPerView")
          : 1;
        var _slider_per_view_mobile = _this.attr("data-mobile-slidesPerView")
          ? _this.attr("data-mobile-slidesPerView")
          : 1;
        var _slider_per_view_tablet = _this.attr("data-tablet-slidesPerView")
          ? _this.attr("data-tablet-slidesPerView")
          : 1;
        var _slider_per_view_laptop = _this.attr("data-laptop-slidesPerView")
          ? _this.attr("data-laptop-slidesPerView")
          : 1;

        var _space_between = _this.attr("data-spaceBetween")
          ? _this.attr("data-spaceBetween")
          : 40;
        var _loop = _this.attr("data-loop") ? _this.attr("data-loop") : true;
        var _auto_height = _this.attr("data-auto-height")
          ? _this.data("auto-height")
          : false;
        var _autoplay = _this.attr("data-autoplay")
          ? _this.data("autoplay")
          : true;

        if (false === _autoplay) {
          var _autoplay_obj = false;
        } else {
          var _autoplay_obj = {
            delay: _this.attr("data-auto-speed")
              ? _this.attr("data-auto-speed")
              : 500,
            disableOnInteraction: _this.attr("data-disable-on-touch")
              ? _this.data("disable-on-touch")
              : false,
          };
        }

        var _pagination = _this.attr("data-pagination")
          ? _this.data("pagination")
          : true;
        if (false === _pagination) {
          var _pagination_obj = false;
          _this.find(".swiper-pagination").hide();
        } else {
          var _pagination_obj = {
            el: ".swiper-pagination",
            clickable: true,
          };
        }

        var _navigation = _this.attr("data-navigation")
          ? _this.data("navigation")
          : true;

        if (false === _navigation) {
          var _navigation_obj = false;

          _this.find(".swiper-button-next").hide();
          _this.find(".swiper-button-prev").hide();
        } else {
          var _navigation_obj = {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            hiddenClass: "swiper-button-hidden",
          };
        }

        var swiper = new Swiper("#" + _div_id, {
          slidesPerView: 1,
          spaceBetween: Number(_space_between),
          loop: _loop,
          autoplay: _autoplay_obj,
          autoHeight: _auto_height,
          pagination: _pagination_obj,
          navigation: _navigation_obj,
          breakpoints: {
            360: {
              slidesPerView: Number(_slider_per_view_mobile),
            },
            768: {
              slidesPerView: Number(_slider_per_view_tablet),
            },
            1024: {
              slidesPerView: Number(_slider_per_view_laptop),
            },
            1200: {
              slidesPerView: Number(_slider_per_view),
            },
          },
        });
      });
    }
    /* ------------------------------------------------------------------------
     * Video audio
     * ------------------------------------------------------------------------ */
    var _video = $("video");
    var _audio = $("audio");
    if (_video.length > 0 || _audio.length > 0) {
      $("video, audio").mediaelementplayer({
        // Configuration
        success: function (media) {
          var isNative = /html5|native/i.test(media.rendererName);
          var isYoutube = ~media.rendererName.indexOf("youtube");
        },
      });
    }

    /* ------------------------------------------------------------------------
     * Countdown
     * ------------------------------------------------------------------------ */
    var _countdown_item = $(".countdown-item");
    if (_countdown_item.length > 0) {
      _countdown_item.countdown({
        date: "12/24/2022 23:59:59",
      });
    }

    /* ------------------------------------------------------------------------
     * Select2
     * ------------------------------------------------------------------------ */
    var _select2_basic_single = $(".js-example-basic-single");
    if (_select2_basic_single.length > 0) {
      _select2_basic_single.select2();
    }

    var _select2_basic_multiple = $(".js-example-basic-multiple-limit");
    if (_select2_basic_multiple.length > 0) {
      _select2_basic_multiple.select2({
        maximumSelectionLength: 2,
      });
    }

    /* ------------------------------------------------------------------------
     * datepicker
     * ------------------------------------------------------------------------ */

    var _dates = $('input[name="dates"]');
    if (_dates.length > 0) {
      _dates.daterangepicker();
    }

    var _daterange = $('input[name="daterange"]');
    if (_daterange.exists()) {
      _daterange.daterangepicker(
        {
          opens: "left",
        },
        function (start, end, label) {
          console.log(
            "A new date selection was made: " +
              start.format("YYYY-MM-DD") +
              " to " +
              end.format("YYYY-MM-DD")
          );
        }
      );
    }

    var _datetimes = $('input[name="datetimes"]');
    if (_datetimes.exists()) {
      _datetimes.daterangepicker({
        timePicker: true,
        startDate: moment().startOf("hour"),
        endDate: moment().startOf("hour").add(32, "hour"),
        locale: {
          format: "M/DD hh:mm A",
        },
      });
    }

    var _birthday = $('input[name="birthday"]');
    if (_birthday.exists()) {
      _birthday.daterangepicker(
        {
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1901,
          maxYear: parseInt(moment().format("YYYY"), 10),
        },
        function (start, end, label) {
          var years = moment().diff(start, "years");
          alert("You are " + years + " years old!");
        }
      );
    }

    var _reportrange = $("#reportrange");
    function cb(start, end) {
      $("#reportrange span").html(
        start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
      );
    }
    if (_reportrange.exists()) {
      var start = moment().subtract(29, "days");
      var end = moment();

      _reportrange.daterangepicker(
        {
          startDate: start,
          endDate: end,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, "days"),
              moment().subtract(1, "days"),
            ],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [
              moment().subtract(1, "month").startOf("month"),
              moment().subtract(1, "month").endOf("month"),
            ],
          },
        },
        cb
      );
      cb(start, end);
    }

    var _datefilter = $('input[name="datefilter"]');
    if (_datefilter.exists()) {
      _datefilter.daterangepicker({
        autoUpdateInput: false,
        locale: {
          cancelLabel: "Clear",
        },
      });

      _datefilter.on("apply.daterangepicker", function (ev, picker) {
        $(this).val(
          picker.startDate.format("MM/DD/YYYY") +
            " - " +
            picker.endDate.format("MM/DD/YYYY")
        );
      });

      _datefilter.on("cancel.daterangepicker", function (ev, picker) {
        $(this).val("");
      });
    }

    var _timepicker1 = $("#timepicker1");
    if (_timepicker1.exists()) {
      _timepicker1.timepicker({
        defaultTime: "current",
        showInputs: true,
        icons: {
          up: "fa fa-angle-up",
          down: "fa fa-angle-down",
        },
      });
    }

    var _timepicker2 = $("#timepicker2");
    if (_timepicker2.exists()) {
      _timepicker2.timepicker({
        showSeconds: true,
        showInputs: true,
        icons: {
          up: "fa fa-angle-up",
          down: "fa fa-angle-down",
        },
      });
    }

    /* ------------------------------------------------------------------------
     * Rangeslider
     * ------------------------------------------------------------------------ */
    var _rangeslider_basic = $("#rangeslider-basic");
    if (_rangeslider_basic.exists()) {
      _rangeslider_basic.ionRangeSlider({
        min: 100,
        max: 1000,
        from: 550,
      });
    }

    var _rangeslider_double = $("#rangeslider-double");
    if (_rangeslider_double.exists()) {
      _rangeslider_double.ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 0,
        to: 500,
        prefix: "₹",
      });
    }

    var _rangeslider_range_step = $("#rangeslider-range-step");
    if (_rangeslider_range_step.exists()) {
      _rangeslider_range_step.ionRangeSlider({
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -500,
        to: 500,
      });
    }

    var _rangeslider_custom_values = $("#rangeslider-custom-values");
    if (_rangeslider_custom_values.exists()) {
      var custom_values = [0, 10, 100, 1000, 10000, 100000, 1000000];

      // be careful! FROM and TO should be index of values array
      var my_from = custom_values.indexOf(10);
      var my_to = custom_values.indexOf(10000);

      _rangeslider_custom_values.ionRangeSlider({
        type: "double",
        grid: true,
        from: my_from,
        to: my_to,
        values: custom_values,
      });
    }

    var _rangeslider_strings = $("#rangeslider-strings");
    if (_rangeslider_strings.exists()) {
      _rangeslider_strings.ionRangeSlider({
        grid: true,
        from: new Date().getMonth(),
        values: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      });
    }

    var _rangeslider_prettify = $("#rangeslider-prettify");
    if (_rangeslider_prettify.exists()) {
      function my_prettify(n) {
        var num = Math.log2(n);
        return n + " → " + +num.toFixed(3);
      }

      _rangeslider_prettify.ionRangeSlider({
        skin: "big",
        grid: true,
        min: 1,
        max: 1000,
        from: 100,
        prettify: my_prettify,
      });
    }

    // tooltip

    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // popover
    var popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });

    /* ------------------------------------------------------------------------
     * Group loop
     * ------------------------------------------------------------------------ */
    var _grouploop_1 = $("#grouploop-1");
    _grouploop_1;
    if (_grouploop_1.exists()) {
      _grouploop_1.grouploop({
        velocity: 2,
        forward: false,
        pauseOnHover: true,
        childNode: ".item",
        childWrapper: ".item-wrap",
      });
    }
    var _grouploop_2 = $("#grouploop-2");
    _grouploop_2;
    if (_grouploop_2.exists()) {
      $("#grouploop-2").grouploop({
        velocity: 5,
        forward: true,
        pauseOnHover: true,
        childNode: ".item",
        childWrapper: ".item-wrap",
      });
    }
    var _grouploop_3 = $("#grouploop-3");
    _grouploop_3;
    if (_grouploop_3.exists()) {
      $("#grouploop-3").grouploop({
        velocity: 1,
        forward: false,
        pauseOnHover: true,
        childNode: ".item",
        childWrapper: ".item-wrap",
      });
    }
    var _grouploop_4 = $("#grouploop-4");
    _grouploop_4;
    if (_grouploop_4.exists()) {
      $("#grouploop-4").grouploop({
        velocity: 3,
        forward: true,
        pauseOnHover: true,
        childNode: ".item",
        childWrapper: ".item-wrap",
      });
    }

    /* ------------------------------------------------------------------------
     * AOS animation
     * ------------------------------------------------------------------------ */
    var _data_aos = $("div").find(`[data-aos]`);
    if (0 < _data_aos.length) {
      AOS.init();
    }

    /* ------------------------------------------------------------------------
     * AOS animation reveal effect
     * ------------------------------------------------------------------------ */
    var _data_aos_reveal = $("slice-ptb.aos-animation").find(`[data-aos]`);
    if (0 < _data_aos_reveal.length) {
      AOS.init({
        duration: 500,
        easing: "ease-out-quart",
        once: true,
      });
    }

    /* ------------------------------------------------------------------------
     * Element fancy effect
     * ------------------------------------------------------------------------ */
    const delSections = document.querySelectorAll(".delayed-section");
    if (0 < delSections.length) {
      delSections.forEach((section) => {
        const containerAnim = gsap.to(
          section.querySelector(".innerContainer"),
          {
            y: "100vh",
            ease: "none",
          }
        );

        const imageAnim = gsap.to(section.querySelector("img"), {
          y: "-100vh",
          ease: "none",
          paused: true,
        });

        const scrub = gsap.to(imageAnim, {
          progress: 1,
          paused: true,
          ease: "power3",
          duration: parseFloat(section.dataset.scrub) || 0.1,
          overwrite: true,
        });

        ScrollTrigger.create({
          animation: containerAnim,
          scrub: true,
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            scrub.vars.progress = self.progress;
            scrub.invalidate().restart();
          },
        });
      });
    }
    $(document).on("change", ".BornHS__Input", function () {
      if ($(this).is(":checked")) {
        $(".BornHS__Wrapper").addClass("BornHS__Blur");
      } else {
        $(".BornHS__Wrapper").removeClass("BornHS__Blur");
      }
    });

    /* index-creative */
    if ($(".swiper-container-animation").length > 0) {
      let swiperAnimation = new SwiperAnimation();
      let swiper = new Swiper(".swiper-container-animation", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        effect: "slide",
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        on: {
          init: function () {
            swiperAnimation.init(this).animate();
          },
          slideChange: function () {
            swiperAnimation.init(this).animate();
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    /* index-creative NOT USED*/
    var _img_content = $(".img-content-hover");
    if (_img_content.length > 0) {
      var imgContent = document.querySelectorAll(".img-content-hover");
      function showImgContent(e) {
        for (var i = 0; i < imgContent.length; i++) {
          var x = e.pageX;
          var y = e.pageY;
          imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      }
      document.addEventListener("mousemove", showImgContent);
    }

    var _radial_progress = $("svg.radial-progress");

    if (_radial_progress.length > 0) {
      // Remove svg.radial-progress .complete inline styling
      _radial_progress.each(function (index, value) {
        $(this).find($("circle.complete")).removeAttr("style");
      });

      // Activate progress animation on scroll
      $(window)
        .scroll(function () {
          _radial_progress.each(function (index, value) {
            // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
            if (
              $(window).scrollTop() >
                $(this).offset().top - $(window).height() * 0.75 &&
              $(window).scrollTop() <
                $(this).offset().top +
                  $(this).height() -
                  $(window).height() * 0.25
            ) {
              // Get percentage of progress
              var percent = $(value).data("percentage");
              // Get radius of the svg's circle.complete
              var radius = $(this).find($("circle.complete")).attr("r");
              // Get circumference (2πr)
              var circumference = 2 * Math.PI * radius;
              // Get stroke-dashoffset value based on the percentage of the circumference
              var strokeDashOffset =
                circumference - (percent * circumference) / 100;
              // Transition progress for 1.25 seconds
              $(this).find($("circle.complete")).animate(
                {
                  "stroke-dashoffset": strokeDashOffset,
                },
                1250
              );
            }
          });
        })
        .trigger("scroll");
    }

    var _demo_3 = $("#demo_3");
    if (_demo_3.length > 0) {
      _demo_3.ionRangeSlider({
        type: "double",
        min: 0,
        max: 1000,
        from: 100,
        to: 500,
        drag_interval: true,
        min_interval: null,
        max_interval: null,
      });
    }

    var _demo_4 = $("#demo_4");
    if (_demo_4.length > 0) {
      _demo_4.ionRangeSlider({
        type: "double",
        min: 0,
        max: 1000,
        from: 200,
        to: 800,
        drag_interval: true,
        min_interval: null,
        max_interval: null,
      });
    }

    /* ------------------------------------------------------------------------
     * Slick slider
     * ------------------------------------------------------------------------ */

    var _slickforslider = $(".slider-for");
    if (_slickforslider.length > 0) {
      $(".slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        asNavFor: ".slider-nav",
      });
      var _slicknavslider = $(".slider-nav");
      if (_slicknavslider.length > 0) {
        $(".slider-nav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".slider-for",
          dots: true,
          centerMode: true,
          focusOnSelect: true,
        });
      }
    }
    /* ------------------------------------------------------------------------
     * Instafeed
     * ------------------------------------------------------------------------ */
    var _instafeed = $("#instafeed");
    if (_instafeed.length > 0) {
      var _token =
        "IGQVJYV2o1amJlaE5SZAVIyRVE3R01KMmg3TEs0bnZAPZAmRRSlI0SmtnTG1CT2JuSUxfanU0Y24wSE0yY2EyLWFsaEdTSjJ0M25jLW9VaXhtcGxmd3BPQ1VNNVRHVmc0SVBiUGlzTDBqczdUX3haZADdWdwZDZD";
      var _no_of_post = _instafeed.data("total-post");

      var _insta_url = "https://graph.instagram.com/me/media";
      var _response_fields =
        "?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&access_token=";

      $.ajax({
        url: _insta_url + _response_fields + _token,
        type: "GET",
        success: function (response) {
          var _html = "";
          var _posts = response.data;

          if (_posts.length > 0) {
            var _limit =
              _posts.length <= _no_of_post ? _posts.length : _no_of_post;
            var i = 0;
            var j = 1;
            while (j <= _limit) {
              var _post = _posts[i];
              if (_posts.length <= i) {
                break;
              }
              if ("IMAGE" === _post.media_type) {
                _html += '<div class="instafeed-item">';
                _html +=
                  '<a target="_blank" href="' + _post.permalink + '" class="">';
                _html +=
                  '<img src="' + _post.media_url + '" class="img-fluid" />';
                _html += "</a>";
                _html += "</div>";
                j++;
              }
              i++;
            }
          }
          _instafeed.html(_html);
        },
        error: function (data) {
          console.log(data);
        },
      });
    }

    /* ------------------------------------------------------------------------
     * Fullpage
     * ------------------------------------------------------------------------ */
    var _fullpage = $("#fullpage");
    if (_fullpage.length > 0) {
      var myFullpage = new fullpage("#fullpage", {
        verticalCentered: false,
      });
    }

    /* ------------------------------------------------------------------------
     * Contact form
     * ------------------------------------------------------------------------ */

    $("#infinity_contact").submit(function (e) {
      e.preventDefault();

      $(".contact-alert").remove();
      var _form = $("#infinity_contact");
      if (_form[0].checkValidity() === false) {
        _form.addClass("was-validated");
        e.stopPropagation();
      } else {
        $.ajax({
          url: "php/sendmail.php",
          type: "post",
          data: _form.serialize() + "&submit=contact",
          dataType: "json",
          beforeSend: function () {
            $("#btn-submit").button("loading");
          },
          complete: function () {
            $("#btn-submit").button("reset");
          },
          success: function (json) {
            if (true === json["success"]) {
              _form.before(
                '<div class="alert alert-success alert-dismissible contact-alert">' +
                  json["message"] +
                  "</div>"
              );
            } else {
              _form.before(
                '<div class="alert alert-danger alert-dismissible contact-alert">' +
                  json["message"] +
                  "</div>"
              );
            }
            _form[0].reset();
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(
              thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText
            );
          },
        });
      }
    });

    /* ------------------------------------------------------------------------
     * Google map
     * ------------------------------------------------------------------------ */

    var _google_map = $("#map");
    if (_google_map.length > 0) {
      // When the window has finished loading create our google map below

      google.maps.event.addDomListener(window, "load", init);

      function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
          // How zoomed in you want the map to start at (always required)
          zoom: 11,

          // The latitude and longitude to center the map (always required)
          center: new google.maps.LatLng(40.67, -73.94), // New York

          // How you would like to style the map.
          // This is where you would paste any style found on Snazzy Maps.
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [
                { saturation: 36 },
                { color: "#000000" },
                { lightness: 40 },
              ],
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [
                { visibility: "on" },
                { color: "#000000" },
                { lightness: 16 },
              ],
            },
            {
              featureType: "all",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [{ color: "#000000" }, { lightness: 20 }],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [
                { color: "#000000" },
                { lightness: 17 },
                { weight: 1.2 },
              ],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#000000" }, { lightness: 20 }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#000000" }, { lightness: 21 }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#000000" }, { lightness: 17 }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                { color: "#000000" },
                { lightness: 29 },
                { weight: 0.2 },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#000000" }, { lightness: 18 }],
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{ color: "#000000" }, { lightness: 16 }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#000000" }, { lightness: 19 }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#000000" }, { lightness: 17 }],
            },
          ],
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById("map");

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(40.67, -73.94),
          map: map,
          title: "Snazzy!",
        });
      }
    }
  }); /* End ready document */

  /* ------------------------------------------------------------------------
   * window on load
   * ------------------------------------------------------------------------ */
  $(window).on("load", function () {
    /* ------------------------------------------------------------------------
     * loader
     * ------------------------------------------------------------------------ */
    var _lorder = $(".template-loader");
    if (_lorder.length > 0) {
      _lorder.fadeOut("100");
    }

    /* ------------------------------------------------------------------------
     * Isotope
     * ------------------------------------------------------------------------ */

    var _gridisotope = $(".grid");
    if (_gridisotope.length > 0) {
      _gridisotope.isotope({
        itemSelector: ".grid-item",
        layoutMode: "fitRows",
      });
    }

    // filter items on button click
    $(".filter-button-group").on("click", "li", function () {
      var _filterValue = $(this).attr("data-filter");
      $(".grid, .grid-masonry").isotope({ filter: _filterValue });
      $(".filter-button-group li").removeClass("active");
      $(this).addClass("active");
    });

    var _masonryisotope = $(".grid-masonry");
    if (_masonryisotope.length > 0) {
      // masonry
      _masonryisotope.isotope({
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: ".grid-sizer",
        },
      });
    }

    /* ------------------------------------------------------------------------
     * Counter
     * ------------------------------------------------------------------------ */
    var _counter = $(".counter");
    if (_counter.length > 0) {
      _counter.appear(function () {
        (function ($) {
          $.fn.countTo = function (options) {
            options = options || {};
            return $(this).each(function () {
              // set options for current element
              var settings = $.extend(
                {},
                $.fn.countTo.defaults,
                {
                  from: $(this).data("from"),
                  to: $(this).data("to"),
                  speed: $(this).data("speed"),
                  refreshInterval: $(this).data("refresh-interval"),
                  decimals: $(this).data("decimals"),
                },
                options
              );
              // how many times to update the value, and how much to increment the value on each update
              var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
              // references & variables that will change with each update
              var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data("countTo") || {};
              $self.data("countTo", data);
              // if an existing interval can be found, clear it first
              if (data.interval) {
                clearInterval(data.interval);
              }
              data.interval = setInterval(
                updateTimer,
                settings.refreshInterval
              );
              // initialize the element with the starting value
              render(value);
              function updateTimer() {
                value += increment;
                loopCount++;
                render(value);
                if (typeof settings.onUpdate == "function") {
                  settings.onUpdate.call(self, value);
                }
                if (loopCount >= loops) {
                  // remove the interval
                  $self.removeData("countTo");
                  clearInterval(data.interval);
                  value = settings.to;

                  if (typeof settings.onComplete == "function") {
                    settings.onComplete.call(self, value);
                  }
                }
              }
              function render(value) {
                var formattedValue = settings.formatter.call(
                  self,
                  value,
                  settings
                );
                $self.html(formattedValue);
              }
            });
          };
          $.fn.countTo.defaults = {
            from: 0, // the number the element should start at
            to: 0, // the number the element should end at
            speed: 1000, // how long it should take to count between the target numbers
            refreshInterval: 100, // how often the element should be updated
            decimals: 0, // the number of decimal places to show
            formatter: formatter, // handler for formatting the value before rendering
            onUpdate: null, // callback method for every time the element is updated
            onComplete: null, // callback method for when the element finishes updating
          };
          function formatter(value, settings) {
            return value.toFixed(settings.decimals);
          }
        })(jQuery);

        jQuery(function ($) {
          // custom formatting example
          $(".count-number").data("countToOptions", {
            formatter: function (value, options) {
              return value
                .toFixed(options.decimals)
                .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
            },
          });
          // start all the timers
          $(".timer").each(count);

          function count(options) {
            var $this = $(this);
            options = $.extend(
              {},
              options || {},
              $this.data("countToOptions") || {}
            );
            $this.countTo(options);
          }
        });
      });
    }

    /* ------------------------------------------------------------------------
     * Before after
     * ------------------------------------------------------------------------ */
    var _comparison_slider = $("#comparison #slider");
    if (_comparison_slider.length > 0) {
      _comparison_slider.on("input", function (e) {
        var _handle = $("#comparison #handle");
        var _divisor = $("#comparison #divisor");
        _handle.css("left", _comparison_slider.val() + "%");
        _divisor.css("width", _comparison_slider.val() + "%");
      });
      _comparison_slider.trigger("input");
    }

    var _my_model = $("#myModal");
    if (_my_model.length > 0) {
      $("#myModal").modal("show");

      _my_model.on("shown.bs.modal", function () {
        $("#myInput").trigger("focus");
      });
    }
  }); /* end of on load */
})(jQuery); // End of use strict

/* ----------------------* Menu Button	 * --------------------- */

// document.addEventListener("DOMContentLoaded", function () {
//   let cart = [];
//   let isLoggedIn = false; // Assume user is not logged in initially

//   // Toast element
//   const loginToast = new bootstrap.Toast(document.getElementById("loginToast"));

//   // Select elements
//   const offcanvasCartSection = document.getElementById("offcanvas-cart-items");
//   const offcanvasCartTotal = document.getElementById("offcanvas-cart-total");
//   const paymentSection = document.getElementById("payment-section");
//   const confirmOrderButton = document.getElementById("confirm-order");

//   // Add event listeners to all add-to-cart buttons
//   const addToCartButtons = document.querySelectorAll(".add-to-cart");
//   addToCartButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const item = button.getAttribute("data-item").trim();
//       const price = parseFloat(button.getAttribute("data-price"));
//       const quantityDisplay = button.parentElement.querySelector(".quantity");
//       let quantity = parseInt(quantityDisplay.textContent) || 0;

//       // Only add to cart if quantity is greater than 0
//       if (quantity > 0) {
//         // Check if the user is logged in
//         if (!isLoggedIn) {
//           loginToast.show(); // Show the login toast
//           return; // Stop the process if user is not logged in
//         }

//         const existingItem = cart.find((cartItem) => cartItem.item === item);

//         // Check if the item is "Boiled Rice"
//         if (item === "Boiled Rice") {
//           const otherItemsInCart = cart.some(
//             (cartItem) => cartItem.item !== "Boiled Rice"
//           );
//           if (!otherItemsInCart) {
//             const servingToast = new bootstrap.Toast(
//               document.getElementById("servingToast11")
//             );
//             servingToast.show(); // Show the toast for Boiled Rice
//             return; // Stop adding to cart
//           }
//         }

//         // Automatically add Bread Halwa when Biryani is added
//         if (
//           [
//             "Chicken Biryani Seeraga Samba",
//             "Chicken Briyani Basmati Rice",
//             "Mutton Seeraga Samba",
//             "Mutton Basmati Rice",
//           ].includes(item)
//         ) {
//           const halwaItem = "Extra Bread Halwa";
//           const halwaPrice = 15; // Set the price for Bread Halwa
//           const existingHalwaItem = cart.find(
//             (cartItem) => cartItem.item === halwaItem
//           );

//           if (!existingHalwaItem) {
//             cart.push({ item: halwaItem, quantity: 0, price: halwaPrice }); // Automatically add one Bread Halwa
//           }
//         }

//         // Update cart or add new item
//         if (existingItem) {
//           existingItem.quantity += quantity; // Update quantity if item exists
//         } else {
//           cart.push({ item, quantity, price }); // Add new item
//         }

//         displayOffcanvasCart(); // Refresh cart display
//         paymentSection.classList.remove("d-none"); // Show payment section

//         // Change button text to "Added"
//         button.textContent = "Added";
//         button.classList.add("btn-success");
//         button.setAttribute("disabled", true); // Disable the button after adding to cart

//         // Display serving message for "Curry Combo"
//         if (item === "Curry Combo") {
//           const servingToast = new bootstrap.Toast(
//             document.getElementById("servingToast1")
//           );
//           servingToast.show(); // Show the toast for Curry Combo
//         }
//       }
//     });
//   });

//   // Attach event listeners to quantity control buttons
//   const quantityControls = document.querySelectorAll(".quantity-control");
//   quantityControls.forEach((control) => {
//     const minusBtn = control.querySelector(".minus");
//     const plusBtn = control.querySelector(".plus");
//     const quantityDisplay = control.querySelector(".quantity");
//     const addButton = control.parentElement.querySelector(".add-to-cart"); // Reference to the add button

//     let quantity = 0; // Local variable for each item's quantity

//     // Increase quantity
//     plusBtn.addEventListener("click", () => {
//       quantity++;
//       quantityDisplay.textContent = quantity; // Update display in product card

//       // If "Added" was displayed, change it back to "Add"
//       if (addButton.textContent === "Added") {
//         addButton.textContent = "Add"; // Revert to "Add"
//         addButton.classList.remove("btn-success"); // Remove success class
//         addButton.removeAttribute("disabled"); // Enable the button again
//       }
//     });

//     // Decrease quantity
//     minusBtn.addEventListener("click", () => {
//       if (quantity > 0) {
//         quantity--;
//         quantityDisplay.textContent = quantity; // Update display in product card
//       }

//       // Show "Add" button if quantity is 0
//       if ((quantity === 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)) {
//         addButton.textContent = "Add"; // Revert to "Add"
//         addButton.classList.remove("btn-success"); // Remove success class
//         addButton.removeAttribute("disabled"); // Enable the button again
//       }
//     });
//   });

//   // Update the cart dynamically based on the quantity change
//   function updateCart(item, quantity) {
//     const cartItem = cart.find((cartItem) => cartItem.item === item);

//     if (cartItem) {
//       if (quantity === 0) {
//         cart = cart.filter((cartItem) => cartItem.item !== item); // Remove if quantity is 0
//       } else {
//         cartItem.quantity = quantity; // Update quantity
//       }
//     } else {
//       if (quantity > 0) {
//         const price = parseFloat(
//           document
//             .querySelector(`[data-item="${item}"]`)
//             .getAttribute("data-price")
//         );
//         cart.push({ item, quantity, price });
//       }
//     }

//     displayOffcanvasCart(); // Refresh the offcanvas display
//   }

//   // Display cart items and grand total in offcanvas
//   function displayOffcanvasCart() {
//     offcanvasCartSection.innerHTML = "";
//     let total = 0;

//     cart.forEach((cartItem) => {
//       total += cartItem.quantity * cartItem.price;
//       offcanvasCartSection.innerHTML += `
//                 <li class="d-flex justify-content-between align-items-center mb-2">
//                     <span class="food-item">${cartItem.item}</span>
//                     <div class="d-flex align-items-center">
//                         <div class="quantity-control me-3">
//                             <button class="btn btn-sm btn-outline-secondary minus" data-item="${
//                               cartItem.item
//                             }">-</button>
//                             <span class="mx-1 quantity">${
//                               cartItem.quantity
//                             }</span>
//                             <button class="btn btn-sm btn-outline-secondary plus" data-item="${
//                               cartItem.item
//                             }">+</button>
//                         </div>
//                         <span class="item-price">₹${(
//                           cartItem.price * cartItem.quantity
//                         ).toFixed(2)}</span>
//                     </div>
//                 </li>
//             `;
//     });

//     offcanvasCartTotal.textContent = `Grand Total: ₹${total.toFixed(2)}`;
//   }

//   // Confirm Order
//   confirmOrderButton.addEventListener("click", () => {
//     const address = document.getElementById("address-details").value;
//     if (address.trim()) {
//       alert("Order confirmed! Thank you for your purchase.");
//       cart = [];
//       displayOffcanvasCart();
//       paymentSection.classList.add("d-none");
//     } else {
//       alert("Please enter your address");
//     }
//   });

//   // Attach event listeners to the minus and plus buttons in the cart
//   offcanvasCartSection.addEventListener("click", (event) => {
//     if (
//       event.target.classList.contains("minus") ||
//       event.target.classList.contains("plus")
//     ) {
//       const item = event.target.getAttribute("data-item");
//       const cartItem = cart.find((cartItem) => cartItem.item === item);

//       if (event.target.classList.contains("minus")) {
//         if (cartItem.quantity > 0) {
//           cartItem.quantity--;
//         }
//         if (cartItem.quantity === 0) {
//           cart = cart.filter((cartItem) => cartItem.item !== item); // Remove item if quantity is 0
//         }
//       } else if (event.target.classList.contains("plus")) {
//         cartItem.quantity++;
//       }

//       displayOffcanvasCart(); // Refresh cart display

//       // Update the main product quantity display
//       const quantityDisplay = document
//         .querySelector(`[data-item="${item}"]`)
//         .parentElement.querySelector(".quantity");
//       quantityDisplay.textContent = cartItem.quantity; // Update quantity in main product display
//     }
//   });
//   // Payment method change event listener
//   document
//     .getElementById("payment-method")
//     .addEventListener("change", function () {
//       var paymentMethod = this.value;
//       var upiSection = document.getElementById("upi-section");

//       if (paymentMethod === "credit-card") {
//         upiSection.classList.remove("d-none"); // Show UPI ID box and payment method options
//       } else {
//         upiSection.classList.add("d-none"); // Hide UPI ID box and payment method options
//       }
//     });
// });

// custom js codes ======================================================================================================================================================================================================

// signup
document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phonenumber").value;

    const signupData = {
      username: username,
      email: email,
      password: password,
      phonenumber: parseInt(phone),
      role: ["CUSTOMER"],
    };

    try {
      const response = await fetch(
        "https://84ee-2405-201-e025-f011-c92e-9fc2-c6b8-2af1.ngrok-free.app/api/auth/customersignup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      alert("Signup successful! You can now log in.");

      // Redirect to login page
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  });

// Function to toggle password visibility
function togglePasswordVisibility(passwordFieldId) {
  const passwordField = document.getElementById(passwordFieldId);
  const eyeIcon = document.getElementById("eyeIcon");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

// login

// Declare locations array first to avoid any reference errors
const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

// Function to filter locations based on user input
function filterLocations() {
  const input = document.querySelector(".input-location").value.toLowerCase(); // Use class to select input fields
  const dropdown = document.getElementById("location-dropdown");
  dropdown.innerHTML = ""; // Clear previous dropdown items

  // Static "Your current location" item
  const currentLocation = document.createElement("div");
  currentLocation.classList.add("dropdown-item", "current-location");
  currentLocation.textContent = "Your current location";
  dropdown.appendChild(currentLocation);

  // Only show dropdown if there's input
  if (input) {
    const filteredLocations = locations.filter((location) =>
      location.toLowerCase().includes(input)
    );

    if (filteredLocations.length) {
      dropdown.style.display = "block";
      filteredLocations.forEach((location) => {
        const div = document.createElement("div");
        div.classList.add("dropdown-item");
        div.textContent = location;
        div.onclick = () => selectLocation(location);
        dropdown.appendChild(div);
      });
    } else {
      dropdown.style.display = "none";
    }
  } else {
    dropdown.style.display = "none";
  }
}

// Function to select a location
function selectLocation(location) {
  document.querySelector(".input-location").value = location; // Select using class
  document.getElementById("location-dropdown").style.display = "none";
}

// Function to toggle the dropdown visibility when the button is clicked
function toggleDropdown() {
  const dropdown = document.getElementById("location-dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

function checkOtherEvent() {
  const eventType = document.getElementById("eventType");
  const otherEventInput = document.getElementById("other-event-input");

  if (eventType.value === "other") {
    otherEventInput.style.display = "block";
  } else {
    otherEventInput.style.display = "none";
  }
}

function toggleCustomSpecialization() {
  const chefSpecialization = document.getElementById("chefSpecialization");
  const customSpecializationInput = document.getElementById(
    "customSpecializationInput"
  );

  if (chefSpecialization.value === "custom") {
    customSpecializationInput.style.display = "block"; // Show input field for custom chef specialization
  } else {
    customSpecializationInput.style.display = "none"; // Hide input field when not selected as "Other"
  }
}

// Function to handle the selection of service duration
function toggleCustomDays() {
  const duration = document.getElementById("duration");
  const customDaysInput = document.getElementById("customDaysInput");

  if (duration.value === "custom") {
    customDaysInput.style.display = "block"; // Show input field for custom days
  } else {
    customDaysInput.style.display = "none"; // Hide input field when 1 Day is selected
  }
}

// Adding event listeners to trigger the functions
document
  .getElementById("chefSpecialization")
  .addEventListener("change", toggleCustomSpecialization);
document
  .getElementById("duration")
  .addEventListener("change", toggleCustomDays);

// Ensure that custom fields are hidden when the page loads
window.onload = function () {
  toggleCustomSpecialization(); // Check if "Other" is selected on page load
  toggleCustomDays(); // Check if "Custom Days" is selected on page load
};

// Function to show/hide custom drinks input field when "Custom" is selected
function toggleCustomDrinks() {
  const customDrinks = document.getElementById("customDrinks");
  const customDrinksInput = document.getElementById("customDrinksInput");

  if (customDrinks.checked) {
    customDrinksInput.style.display = "block";
  } else {
    customDrinksInput.style.display = "none";
  }
}

// Function to show/hide custom duration input field when "Custom Duration" is selected
function toggleCustomDuration() {
  const duration = document.getElementById("duration");
  const customDurationInput = document.getElementById("customDurationInput");

  if (duration.value === "custom") {
    customDurationInput.style.display = "block";
  } else {
    customDurationInput.style.display = "none";
  }
}

// Add event listeners for the checkboxes and dropdowns
document
  .getElementById("customDrinks")
  .addEventListener("change", toggleCustomDrinks);
document
  .getElementById("duration")
  .addEventListener("change", toggleCustomDuration);

// Ensure custom fields are hidden initially on page load
window.onload = function () {
  toggleCustomDrinks();
  toggleCustomDuration();
};

// Function to toggle the visibility of the "Other Event" input field
function toggleOtherEventInput() {
  const eventType = document.getElementById("eventType");
  const otherEventInput = document.getElementById("otherEventInput");

  // Show the input field if "Other" is selected, otherwise hide it
  if (eventType.value === "other") {
    otherEventInput.style.display = "block";
  } else {
    otherEventInput.style.display = "none";
  }
}
