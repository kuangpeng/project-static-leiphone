var loader = new resLoader({
    resources: [
        'images/p_1.jpg',
        'images/btn-start.png',
        'images/p_2.jpg',
        'images/p_tip_1.png',
        'images/icon-wen.png',
        'images/icon-wen-shadow.png',
        'images/bg_p3.jpg',
        'images/choice/1.png',
        'images/choice/2.png',
        'images/choice/3.png',
        'images/choice/4.png',
        'images/btn-confirm.png',
        'images/btn-next.png',
        'images/icon-z.png',
        'images/icon-yuan.png',
        'images/bg_p4.jpg',
        'images/p_5_titlebar.png',
        'images/fenxi/text-1.png',
        'images/fenxi/text-2.png',
        'images/fenxi/text-3.png',
        'images/fenxi/text-4.png',
        'images/fenxi/1.png',
        'images/fenxi/2.png',
        'images/fenxi/3.png',
        'images/fenxi/4.png',
        'images/btn-fenxi.png',
        'images/bg_p5.jpg',
        'images/jiedu/1.png',
        'images/jiedu/2.png',
        'images/jiedu/3.png',
        'images/jiedu/4.png',
        'images/btn-share.png',
        'images/btn-again.png',
        'images/btn-kaihei.png'
    ],
    onStart: function(total) {
        console.log('start:' + total);
    },
    onProgress: function(current, total) {
        console.log(current + '/' + total);
        var percent = current / total * 100;
        $("#loading").find(".loading-progress").text(Math.floor(percent) + "%");
    },
    onComplete: function(total) {
        console.log("loading complete");
        //return false;
        //$("#loading").fadeOut();

        /* switchPage('loading', 'page-5', function() {
            init4();
        }); */

        switchPage('loading', 'page-1', function() {
            init1();
        });
    }
});

loader.start();

var hostUrl = '';
var selectIndex = 1;

$(function() {
    var music = document.getElementById("music");
    $('html').one('touchstart', function() {
        music.play();
    });
    $("#bg").on("click", function() {
        if ($(this).hasClass("stop")) {
            music.play();
            $(this).removeClass("stop");
        } else {
            music.pause();
            $(this).addClass("stop");
        }
    });

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isAndroid && !isiOS) {
        $("#down-link").attr("href", '');
    } else if (!isAndroid && isiOS) {
        $("#down-link").attr("href", '');
    }
})


function switchPage(fromId, toId, ck, bk) {
    fromId && $("#" + fromId).fadeOut(500);
    //$("#waiting").show();
    toId && $("#" + toId).fadeIn(function() {
        bk && bk();
        ck && ck();
        setTimeout(function() {
            //$("#waiting").hide();
        }, 300);
    });
}

function init1() {
    $(".btn-start").on("click", function() {
        switchPage('page-1', 'page-2', function() {
            init2();
        });
    });
}

function init2() {
    setTimeout(function() {
        $("#page-2").find(".mask").fadeIn(100);
    }, 2000);
    $("#page-2").find(".mask").on("click", function() {
        switchPage('page-2', 'page-3', function() {
            init3();
        }, function() {
            $("#page-2").find(".mask").fadeOut();
        });
    });
}

function init3() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        onlyExternal: true,
        coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 20,
            modifier: 10,
            slideShadows: false
        }
    });

    $(".btn-next").on("click", function() {
        if (swiper.isEnd) {
            swiper.slideTo(0);
        } else {
            swiper.slideNext();
        }
    });

    $(".btn-confirm").on("click", function() {
        selectIndex = parseInt(swiper.realIndex) + 1;
        switchPage('page-3', 'page-4', function() {
            init4();
        }, function() {
            swiper.slideTo(0);
        });
    });
}

function init4() {
    $("#page-4").find(".title img").attr("src", hostUrl + "images/fenxi/text-" + selectIndex + ".png");
    $("#page-4").find(".detail img").attr("src", hostUrl + "images/fenxi/" + selectIndex + ".png");

    $(".btn-fenxi").on("click", function() {
        switchPage('page-4', 'page-5', function() {
            init5();
        }, function() {
            $("#page-4").find(".title img").attr("src", '');
            $("#page-4").find(".detail img").attr("src", '');

        });
    });
}

function init5() {
    $("#page-5").find(".fenxi>img").attr("src", hostUrl + "images/jiedu/" + selectIndex + ".png");

    $(".btn-again").on("click", function() {
        switchPage('page-5', 'page-1', function() {
            init1();
        }, function() {
            $("#page-5").find(".fenxi>img").attr("src", '');
            selectIndex = 1;
            $(".shareTip").hide();
        });
    });
    $(".btn-share").on("click", function() {
        $(".shareTip").show();
    });
    /* $(".btn-kaihei").on("click", function() {

    }); */
}