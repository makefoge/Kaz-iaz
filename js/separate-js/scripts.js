//'use strict';

$(function() {

    /*
    |--------------------------------------------------------------------------
    | Search Modal
    |--------------------------------------------------------------------------
    */

    var searchModal = $('.js-modal-search-toggle');

    // Show Search Modal
    searchModal.on('click', function(e) {

        // Toggle Open Class
        $(this).toggleClass('is-open');

        e.preventDefault();

        $('body').toggleClass('search-open');

    });

    // close search modal when click outside on mobile/table
    $(document).on('click touchstart', function(e){
        e.stopPropagation();

        // closing of search modal when clicking outside of it
        if (!$(e.target).closest(searchModal).length) {
            var sidebar = $(e.target).closest('.search-modal').length;
            var sidebarBody = $(e.target).closest('.search-modal__body').length;
            if (!sidebar && !sidebarBody) {
                if ($('body').hasClass('search-open')) {
                    $('body').removeClass('search-open');
                }
            }
        }
    });

    var searchModalClose = $('.js-search-close');

    // Sidebar toggle to sidebar-folded
    searchModalClose.on('click', function(e) {

        // Toggle Open Class
        searchModal.toggleClass('is-open');

        e.preventDefault();

        $('body').toggleClass('search-open');

    });

    /*
    |--------------------------------------------------------------------------
    | Navigation menu
    |--------------------------------------------------------------------------
    */

    var $navigation = $('.navigation');
    var $navigationBtn = $('.navigation button');
    var $vlinks = $('.navigation .navigation__list');
    var $hlinks = $('.navigation .navigation__dropdown-menu');

    var breaks = [];

    function updateNav() {

        var availableSpace = $navigationBtn.hasClass('hidden') ? document.body.clientWidth - 207 - 20 : document.body.clientWidth > 1200 ? document.body.clientWidth - 207 - 20 : document.body.clientWidth - 207 - 100;


        if($vlinks.width() < 1 || availableSpace < 1){
            return;
        }

        // The visible list is overflowing the nav
        if($vlinks.width() > availableSpace) {

            // Record the width of the list
            breaks.push($vlinks.width());

            // Move item to the hidden list
            $vlinks.children().last().prependTo($hlinks);

            // Show the dropdown btn
            if($navigationBtn.hasClass('hidden')) {
                $navigationBtn.removeClass('hidden');
            }

            // The visible list is not overflowing
        } else {

            while(breaks.length > 0){

                // There is space for another item in the nav
                if(availableSpace > breaks[breaks.length-1]) {

                    // Move the item to the visible list
                    $hlinks.children().first().appendTo($vlinks);
                    breaks.pop();

                }else{
                    break;
                }

                // Hide the dropdown btn if hidden list is empty
                if(breaks.length < 1) {
                    $navigationBtn.addClass('hidden');
                    $hlinks.addClass('hidden');
                }

            }

        }

        // Keep counter updated
        $navigationBtn.attr("count", breaks.length);

        // Recur if the visible list is still overflowing the nav
        if($vlinks.width() > availableSpace) {
            updateNav();
        }

    }

    // Window listeners
    $(window).resize(function() {
        updateNav();
    });



    $navigationBtn.on('click', function() {
        $hlinks.toggleClass('hidden');
    });

    updateNav();

    /*
    |--------------------------------------------------------------------------
    | Modals stuck
    |--------------------------------------------------------------------------
    */

    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (2 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    /*
    |--------------------------------------------------------------------------
    | Mobile Menu
    |--------------------------------------------------------------------------
    */

    var burger = document.querySelector('.js-menu-toggle');

    burger.addEventListener('click', function(e) {

        // Toggle Open Class
        //this.classList.toggle('--open');

        e.preventDefault();

        document.querySelector('body').classList.toggle('mob-menu-open');

    });

    var menuClose = document.querySelector('.js-menu-close');

    menuClose.addEventListener('click', function(e) {

        // Toggle Open Class
        //this.classList.toggle('--open');

        e.preventDefault();

        document.querySelector('body').classList.toggle('mob-menu-open');

    });

    // close menu when click outside on mobile/table
    var cb = function(e){
        e.stopPropagation();

        // closing of menu when clicking outside of it
        if (!e.target.closest('.js-menu-toggle')) {
            var sidebar = e.target.closest('.mob-menu');
            var sidebarBody = e.target.closest('.mob-menu__body');
            if (!sidebar && !sidebarBody) {
                if (document.querySelector('body').classList.contains('mob-menu-open')) {
                    document.querySelector('body').classList.remove('mob-menu-open');
                   //document.querySelector('.js-menu-toggle').classList.remove('--open');
                }
            }
        }
    };

    document.addEventListener('click', cb);
    document.addEventListener('touchstart', cb);

    /*
    |--------------------------------------------------------------------------
    | Responsive Iframe Inside Modal
    |--------------------------------------------------------------------------
    */

    function toggle_video_modal() {

        // Click on video thumbnail or link
        $(".js-video-modal").on("click", function(e){

            // prevent default behavior for a-tags, button tags, etc.
            e.preventDefault();

            // Grab the video ID from the element clicked
            var id = $(this).attr('data-youtube-id');

            // Autoplay when the modal appears
            // Note: this is intetnionally disabled on most mobile devices
            // If critical on mobile, then some alternate method is needed
            var autoplay = '?autoplay=1';

            // Don't show the 'Related Videos' view when the video ends
            var related_no = '&rel=0';

            // String the ID and param variables together
            var src = '//www.youtube.com/embed/'+id+autoplay+related_no;

            // Pass the YouTube video ID into the iframe template...
            // Set the source on the iframe to match the video ID
            $(".video-modal__iframe").attr('src', src);

            // Add class to the body to visually reveal the modal
            $("body").addClass("video-modal-show");

            $('body').css({"overflow": "hidden"});

        });

        // Close and Reset the Video Modal
        function close_video_modal() {

            event.preventDefault();

            // re-hide the video modal
            $("body").removeClass("video-modal-show");

            $('body').css({"overflow": ""});

            // reset the source attribute for the iframe template, kills the video
            $(".video-modal__iframe").attr('src', '');

        }
        // if the 'close' button/element, or the overlay are clicked
        $('body').on('click', '.video-modal__close, .video-modal__overlay', function(event) {

            // call the close and reset function
            close_video_modal();

        });
        // if the ESC key is tapped
        $('body').keyup(function(e) {
            // ESC key maps to keycode `27`
            if (e.keyCode == 27) {

                // call the close and reset function
                close_video_modal();

            }
        });
    }
    toggle_video_modal();

    /*
    |--------------------------------------------------------------------------
    | News Slider
    |--------------------------------------------------------------------------
    */

    const newsSlider = new Swiper('.js-news-slider', {
        speed: 800,
        mousewheel: false,
        loop: true,
        spaceBetween: 0,
        navigation: {
            nextEl: '.js-news-slider-next',
            prevEl: '.js-news-slider-prev',
        },
        pagination: {
            el: '.js-news-slider-pagination',
            clickable: true,
            bulletClass: 'news-slider__pagination-bullet',
            bulletActiveClass: '--active'
        },
        touchRatio: 1,
        slidesPerView: 1,
    });

    /*
    |--------------------------------------------------------------------------
    | Special Projects Slider
    |--------------------------------------------------------------------------
    */

	const specialProjectsSlider = new Swiper('.js-special-projects-slider', {
		speed: 600,
		mousewheel: false,
		loop: false,
		spaceBetween: 0,
		navigation: {
			nextEl: '.js-special-projects-next',
			prevEl: '.js-special-projects-prev',
		},
        pagination: {
            el: '.js-special-projects-pagination',
            clickable: true,
            bulletClass: 'special-projects__pagination-bullet',
            bulletActiveClass: '--active'
        },
		slidesPerView: 1,
	});

    /*
    |--------------------------------------------------------------------------
    | Info Slider
    |--------------------------------------------------------------------------
    */

    const infoSlider = new Swiper('.js-info-slider', {
        speed: 600,
        mousewheel: false,
        loop: false,
        spaceBetween: 0,
        navigation: {
            nextEl: '.js-info-slider-next',
            prevEl: '.js-info-slider-prev',
        },
        pagination: {
            el: '.js-info-slider-pagination',
            clickable: true,
            bulletClass: 'info-slider__pagination-bullet',
            bulletActiveClass: '--active'
        },
        slidesPerView: 1,
    });

    /*
    |--------------------------------------------------------------------------
    | Photo Reports Slider
    |--------------------------------------------------------------------------
    */

    /**
     * Multiple Swiper Slides
     * with same configuration and multiple navigation buttons
     *
     * @require Swiper v4.X
     * @author Pedro Britto
     */
    const multipleSwiperSlides = function () {
        let sliderMain = document.querySelectorAll('.js-photo-reports');
        let sliderNav = document.querySelectorAll('.js-photo-reports-thumbs');

        // Arrays to hold swiper instances
        let mainArray = [];
        let navArray = [];

        // Slider Main
        sliderMain.forEach(function (element, i) {
            // Push swiper instance to array
            mainArray.push(
                new Swiper(element, {
                    loop: false,
                    spaceBetween: 0,
                    //watchSlidesProgress: true,
                    //observer: true,
                   // observeParents: true,
                    slidesPerView: 1,
                    navigation: {
                        nextEl: ".js-photo-reports-next",
                        prevEl: ".js-photo-reports-prev",
                    },
                }));
        });

        // Slider Nav
        sliderNav.forEach(function (element, i) {
            var self = sliderNav;
            // Push swiper instance to array
            navArray.push(
                new Swiper(element, {
                    loop: false,
                    spaceBetween: 8,
                    slidesPerView: 'auto',
                    //freeMode: true,
                    //watchSlidesProgress: true,
                    slideToClickedSlide: true,
                    navigation: {
                        nextEl: self[i].parentNode.querySelector('.js-photo-reports-thumbs-next'),
                        prevEl: self[i].parentNode.querySelector('.js-photo-reports-thumbs-prev')
                    },
                }));
        });

        const checkOnPage = function () {
            if (sliderMain.length > 0 && sliderNav.length > 0) {
                let numberOfSlides = mainArray.length || navArray.length || 0;

                if (mainArray.length !== navArray.length) {
                    console.warn('multipleSwiperSlides: Number of main slides and nav slides is different. Expect incorrect behaviour.');
                }

                for (let i = 0; i < numberOfSlides; i++) {
                    mainArray[i].controller.control = navArray[i];
                    navArray[i].controller.control = mainArray[i];
                }

                console.log('multipleSwiperSlides: Things should be working fine. B)');
            }
        };

        checkOnPage();
    };

    multipleSwiperSlides();


    /*
    |--------------------------------------------------------------------------
    | Interview Slider
    |--------------------------------------------------------------------------
    */

    const interviewSlider = new Swiper('.js-interview-slider', {
        speed: 600,
        mousewheel: false,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: '.js-interview-slider-next',
            prevEl: '.js-interview-slider-prev',
        },
        pagination: {
            el: '.js-interview-slider-pagination',
            clickable: true,
        },
        slidesPerView: 3,
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            640: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            }
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Month Slider
    |--------------------------------------------------------------------------
    */

    const monthSlider = new Swiper('.js-month-slider', {
        speed: 600,
        mousewheel: true,
        loop: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        slideClass: 'month-slider__item',
        slideActiveClass: 'month-slider__item.--active'
    });

    /*
    |--------------------------------------------------------------------------
    | Light Gallery
    |--------------------------------------------------------------------------
    */

	$('.js-lg').lightGallery({
		selector: ".js-lg-item",
	});

    /*
    |--------------------------------------------------------------------------
    | Back to Top
    |--------------------------------------------------------------------------
    */

    $(window).on("scroll", function(e) {
        if ($(this).scrollTop() > 0) {
            $('.js-back-to-top').fadeIn('slow');
        } else {
            $('.js-back-to-top').fadeOut('slow');
        }
    });

    $(".js-back-to-top").on("click", function(e) {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});
