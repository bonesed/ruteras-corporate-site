// ホームページ専用のJavaScriptファイル

$(document).ready(function() {
    // お客様の声スライダー初期化
    $('.testimonial-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'linear',
        prevArrow: $('.testimonial-nav .prev'),
        nextArrow: $('.testimonial-nav .next'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    // サービスセクションのアニメーション
    $('.service-item').each(function(index) {
        $(this).attr('data-aos-delay', 200 * index);
    });

    // ヒーローセクションのタイピングアニメーション
    if ($('.typed-text').length) {
        new Typed('.typed-text', {
            strings: ["健康と自信を", "革新と成長を", "未来と可能性を"],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 1000,
            loop: true
        });
    }

    // セクション間のパララックス効果
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop();
        
        // ヒーローセクションのパララックス
        $('.hero-shape').css({
            'transform': 'translateY(' + (scrollPos * 0.2) + 'px)'
        });
        
        // 各セクションの背景パララックス
        $('.parallax-bg').each(function() {
            const offsetTop = $(this).offset().top;
            const parallaxOffset = (scrollPos - offsetTop) * 0.4;
            if (parallaxOffset > -500 && parallaxOffset < 500) {
                $(this).css('background-position-y', 'calc(50% + ' + parallaxOffset + 'px)');
            }
        });
    });

    // 数字カウントアップアニメーション
    function startCounter() {
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');
            
            $({ countNum: 0 }).animate(
                { countNum: countTo },
                {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                }
            );
        });
    }
    
    // カウンターセクションが表示されたときに実行
    if ($('.counter').length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        $('.counter').each(function() {
            counterObserver.observe(this);
        });
    }
    
    // ニュース項目のホバーエフェクト
    $('.news-item').hover(
        function() {
            $(this).find('h3 a').css('color', 'var(--primary-color)');
        },
        function() {
            $(this).find('h3 a').css('color', 'var(--bg-dark)');
        }
    );
    
    // CTAセクションの背景アニメーション
    function animateCTABackground() {
        const colors = [
            'rgba(160, 216, 239, 0.8)',
            'rgba(199, 185, 224, 0.8)',
            'rgba(75, 138, 194, 0.8)'
        ];
        let currentIndex = 0;
        
        setInterval(function() {
            currentIndex = (currentIndex + 1) % colors.length;
            $('.cta').css('background', `linear-gradient(135deg, ${colors[currentIndex]} 0%, ${colors[(currentIndex + 1) % colors.length]} 100%)`);
        }, 5000);
    }
    
    animateCTABackground();
});
