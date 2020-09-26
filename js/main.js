//================================== header settings ==================================
//scroll up show nav
let x = 0;
$(window).on('scroll',function(){
    $('nav').toggleClass('hide',$(window).scrollTop() > x)
        x = $(window).scrollTop();
        if ($(window).scrollTop()<$('header').height()/2) {
            $('nav').css({'background-color':'transparent'})
        }else{$('nav').css({'background-color':'#212121'})}       
 });

 // nav links scroll to section
$('nav ul li a').on('click',function(){
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    let target = $(this).attr('href');
    $('body').animate({scrollTop:$(target).offset().top},500);
    setSpanPosition();
})
$('header .mobile_list ul li a').on('click',function(){
    slideUpMobileList();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
});

let arr = Array.from(document.querySelectorAll('.in_nav'));
let arr2 = Array.from(document.querySelectorAll('nav ul li a'));
let arr3 = Array.from(document.querySelectorAll('header .mobile_list ul li a'));
$(window).on('scroll',function(){
    for (let  i= 0; i < arr.length; i++) {
        if ($(window).scrollTop()>=$(arr[i]).offset().top-500){
                $(arr2[i]).parent().addClass('active');
                $(arr2[i]).parent().siblings().removeClass('active');
                $(arr3[i]).parent().addClass('active');
                $(arr3[i]).parent().siblings().removeClass('active');    
                setSpanPosition()
        }
    }
})
//set span position in header
let ulBorder = Array.from(document.querySelectorAll('nav div ul li'));
setSpanPosition();
function setSpanPosition(){
    let x = 0;
    for (let i = 0; i < ulBorder.length; i++) {
        if ($('nav div ul .active').attr('id')>i) {
            x += $(ulBorder[i]).width();
        }
    }
    $('nav div ul span').css({'left':x+20})
}
$('nav div ul li a').hover(function(){
    let x = 0;
    for (let i = 0; i < ulBorder.length; i++) {
        if ($(this).parent().attr('id')>i) {
            x += $(ulBorder[i]).width();
        }
    }
    $('nav div ul span').css({'left':x+20})
})
$('nav div ul li a').mouseleave(()=>{
    setSpanPosition();
})

//make translate hover effect
setHoverEffect($('nav a img'));
function setHoverEffect(element){
    $(element).parent().on('mousemove',function(e){
        let z = $(element).parent().width() / 2,
        x = (z - e.offsetX) *-1,
        y = (z - e.offsetY) *-1;
        $(element).css({
            'transform': `translate(${x/5}px,${y/5}px)`,
            'transition' : 'none'
        })
    })
    $(element).parent().on('mouseleave',function(e){
        $(element).css({
            'transform': `translate(0)`,
            'transition':'all 0.3s'
        })

    })
}

//mobile_btn hover effect
let btnText = document.querySelector('.mobile_btn p');
$('.mobile_btn').hover(()=>{
    if ($('.mobile_list').css('display')=='none') {
        $('.mobile_btn p').css({'transform':'translateY(10%)'});
    }
    else{
        $('.mobile_btn p').css({'transform':'translateY(-190%)'});
    }
})
$('.mobile_btn').mouseleave(()=>{
    $('.mobile_btn p').css({'transform':'translateY(-90%)'});
})

//open mobile_list
$('.mobile_btn').on('click',()=>{
    if ($('.mobile_list').css('display')=='none') {
        slideDownMobileList();
    }
    else{
        slideUpMobileList();
    }    
});
function slideDownMobileList(){
    $('body').css({'overflow':'hidden'})
    $('.mobile_list').slideDown(500,()=>{
            $('.mobile_btn div span').eq(0).css({'display':'none'})
            $('.mobile_btn div span').eq(1).css({'transform':'rotate(45deg) translateY(1px)'})
            $('.mobile_btn div span').eq(2).css({'width':'100%','transform':'rotate(-45deg) translate(0,-2px)'})
            $('.mobile_btn div').css({'transform':'translateY(50%)'})
            $('.mobile_list li').eq(0).fadeIn(200,function() {
                $('.mobile_list li').eq(1).fadeIn(200,function() {
                    $('.mobile_list li').eq(2).fadeIn(200,function() {
                        $('.mobile_list li').eq(3).fadeIn(200,function() {
                            $('.mobile_list li').eq(4).fadeIn(200,function() {
                                $('.mobile_list li').eq(5).fadeIn(200)
                            });
                        });
                    });
                });
            });
    }).css({'display':'flex'});

}
function slideUpMobileList(){
    $('.mobile_list li').eq(5).fadeOut(200,function() {
        $('.mobile_list li').eq(4).fadeOut(200,function() {
            $('.mobile_list li').eq(3).fadeOut(200,function() {
                $('.mobile_list li').eq(2).fadeOut(200,function() {
                    $('.mobile_list li').eq(1).fadeOut(200,()=>{
                        $('.mobile_list li').eq(0).fadeOut(200,()=>{
                            $('.mobile_list').slideUp(500,()=>{
                                $('.mobile_btn div span').eq(0).css({'display':'inline-block'})
                                $('.mobile_btn div span').eq(1).css({'transform':'rotate(0) translateY(0)'})
                                $('.mobile_btn div span').eq(2).css({'width':'100%','transform':'rotate(0) translate(0)'})
                                $('.mobile_btn div').css({'transform':'translateY(-20%)'})
                                $('body').css({'overflow':'auto'})

                            })
                        })    
                    })
                });
            });
        });
    });
}

// slider settings
//set slider bar width and counters
let swipers = Array.from(document.querySelectorAll('.swiper-slide'));
function setSliderBarSettings(){
    let x = 0,
    activSlideIndex  = $('.main-slider .swiper-wrapper .swiper-slide-active').attr('data-swiper-slide-index'),
    z = $('.slider_bar .main_bar').width()/(swipers.length/3);
    x = activSlideIndex  * z;
    $('.slider_bar .main_bar div').css({
        'width':`${x+z}px`
    })
    $('.slider_bar span').eq(0).text(`0${+(activSlideIndex) + 1}`);
    $('.slider_bar span').eq(1).text(`0${swipers.length/3}`);
    $('.slider_counter h3').text(`0${+(activSlideIndex) + 1}`);
    if (+(activSlideIndex) + 1 == swipers.length/3) {
        $('.slider_bar span').eq(1).css({
            'color':'rgba(255, 255,255,1)'
        });
    }
    else{$('.slider_bar span').eq(1).css({
        'color':'rgba(255, 255,255,0.5)'
    });
}
}
setInterval(setSliderBarSettings,0);

let icons = Array.from(document.querySelectorAll('.social_icons a'));
$('.social_icons').hover(function(){
    $('.social_icons span').css({'width':'40px'})
    $('.social_icons a').eq(0).fadeIn(100,function() {
         $('.social_icons a').eq(1).fadeIn(100,function() {
             $('.social_icons a').eq(2).fadeIn(100,function() {
                 $('.social_icons a').eq(3).fadeIn(100)
             })
         })
    })

})
$('.social_icons').mouseleave(function(){
    $('.social_icons a').eq(3).fadeOut(100,function() {
        $('.social_icons a').eq(2).fadeOut(100,function() {
            $('.social_icons a').eq(1).fadeOut(100,function() {
                $('.social_icons a').eq(0).fadeOut(100,function(){
                    $('.social_icons span').css({'width':'0'});
                })
            })
        })
   })
})
// for fade out slider contents on scroll
let sliderBtns = document.querySelector('.sliders_btns');
window.addEventListener('scroll',function(){
    sliderBtns.style.opacity = 1-+ window.pageYOffset/550 + ' ';
    $('.social_icons').css({'opacity':`${1-+ window.pageYOffset/550}`})
    $('.slider_counter').css({'opacity':`${1-+ window.pageYOffset/550}`})
})


//================================== about us settings ==================================
// window.addEventListener('scroll',()=>{
//     test($('.about_us'),$('.about_us .section_title'));
//     test($('.portfolio'),$('.portfolio .section_title'));
//     test($('.services'),$('.services .section_title'));
//     test($('.cases'),$('.cases .section_title'));
//     test($('.news'),$('.news .section_title'));
//     test($('.clients'),$('.clients .section_title'));
//     test($('.contact'),$('.contact .section_title'));
// })
// function test(dad,child){
//     if (window.pageYOffset>$(dad).offset().top-testLoop(dad)){
//         $(child).css({'transform':`translateY(${(window.pageYOffset-testLoop(dad))/10}%)`});
//     }
// }
// function testLoop(dad){
//     let prevsHeight = 0;
//     for (let i =0; i <= $(dad).prevAll().length-1; i++) {
//         prevsHeight=prevsHeight+$('section,header').eq(i).outerHeight();
//     }
//     return prevsHeight;
// }
let aboutUsCounter = document.querySelector('.about_us .about_us_counter'),
    aboutUsCounterStarter = +aboutUsCounter.innerHTML,
    aboutUsCounterTarget = +aboutUsCounter.getAttribute('data-count'),
    aboutUsCounterSpeed = 1,
    aboutUsCounterFunc = ()=>{
        if (aboutUsCounterStarter!=aboutUsCounterTarget){
            aboutUsCounterStarter = aboutUsCounterStarter + aboutUsCounterSpeed;
            aboutUsCounter.innerHTML = aboutUsCounterStarter;
            setTimeout(aboutUsCounterFunc,350);

        }
    };
window.addEventListener('scroll',()=>{
    if (window.pageYOffset>=$('.about_us').offset().top-500){
        aboutUsCounterFunc();
    }
})

//================================== portfolio settings ==================================

$(".portfolio_carousel").owlCarousel({
    nav:true,
    responsive:{
        0:{items:1},
        577:{items:2},
        769:{items:3}
    }
});

//================================== cases settings ==================================
$(window).on('scroll',function(){
    $('.cases .cases_img img').css({'transform':`translateY(${-50+window.pageYOffset/100}%)`})
    $('.img_box div img').css({'transform':`translateY(${-15+window.pageYOffset/100}%)`})
})
//================================== feedback settings ==================================
$('.feedback_carousel').owlCarousel({
    responsive:{
        0:{items:1}
    },
    dots:false,
    loop:true,
    autoplay:true,
    nav:true
});
//================================== footer ==================================
$('footer .navigation a').click(function(){
    let target = $(this).attr('href');
    $('body').animate({scrollTop:$(target).offset().top},500)
})
let copyRight = document.querySelector('footer .copy_right span'),
    d = new Date();
    copyRight.innerHTML = d.getFullYear();

//================================== to top ==================================
let scrollCounter = document.querySelector(".to_top span")
window.addEventListener('scroll',()=>{
    $('.to_top i').css({'transform':`rotate(${Math.round(window.pageYOffset)}deg)`})
    if(window.pageYOffset>$('.about_us').offset().top-500){
        $('.to_top').css({'right':'50px'})
    }else{$('.to_top').css({'right':'-20%'})}
    let bodyHeight = function(){
        let bodyHeight=0;
        if (window.pageYOffset+$('header').outerHeight()>$('body').height()){
            bodyHeight = Math.ceil($('body').height())
        }else{bodyHeight = Math.floor($('body').height())}
        
        return bodyHeight;
    }
    let x = bodyHeight();
    let y =window.pageYOffset+$('header').outerHeight();
    scrollCounter.innerHTML = `${Math.round(y/x*100)}%`
})
$('.to_top').click(function(){
    $('body').animate({scrollTop:0},1000)
})

//================================== loading ==================================
$(document).ready(function(){
   $('.loading .line').animate({'width':'100%'},1000)
   $('.loading h3 span').animate({'width':'100%'},1000,()=>{
        $('.loading').fadeOut(500,()=>{
            $('body').css({'overflow':'auto'})
        })
   })

    let countLoading = document.querySelector('.loading .counter'),
        target = +countLoading.getAttribute('data-count'),
        starter = +countLoading.innerHTML,
        speed = 100,
        inc = target/speed;

    let counter = ()=>{
        if (starter!=target){
            starter = starter + inc;
            countLoading.innerHTML = starter;
            setTimeout(counter,2);
        }
    }
    counter();
});