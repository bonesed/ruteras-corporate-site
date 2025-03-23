// 企業情報ページ専用のJavaScriptファイル

$(document).ready(function() {
    // タイムラインアニメーション
    function animateTimeline() {
        $('.timeline-item').each(function(index) {
            $(this).attr('data-aos', 'fade-up');
            $(this).attr('data-aos-delay', 100 * index);
        });
    }
    
    animateTimeline();
    
    // 会社概要テーブルのアニメーション
    $('.info-table tr').hover(
        function() {
            $(this).find('th, td').addClass('hover');
        },
        function() {
            $(this).find('th, td').removeClass('hover');
        }
    );
    
    // 代表挨拶の画像エフェクト
    $('.message-image').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.05)');
            $(this).find('img').css('box-shadow', '0 15px 30px rgba(0, 0, 0, 0.2)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
            $(this).find('img').css('box-shadow', 'var(--box-shadow)');
        }
    );
    
    // ページスクロール時のパララックス効果
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop();
        
        // ビジョン・ミッション・バリューのパララックス
        $('.vmv-item').each(function(index) {
            const offsetTop = $(this).offset().top;
            const delay = index * 0.1;
            if (scrollPos > offsetTop - 600) {
                $(this).css('transform', 'translateY(' + ((scrollPos - offsetTop + 600) * -0.05 - delay) + 'px)');
            }
        });
        
        // 企業理念のテキストエフェクト
        const philosophyOffset = $('.philosophy-text').offset().top;
        if (scrollPos > philosophyOffset - 500) {
            $('.philosophy-text p').css('transform', 'scale(' + (1 + (scrollPos - philosophyOffset + 500) * 0.0005) + ')');
            $('.philosophy-text p').css('opacity', 1 - (scrollPos - philosophyOffset + 500) * 0.001);
        }
    });
    
    // タイムラインのインタラクションエフェクト
    $('.timeline-item').mouseenter(function() {
        $(this).find('.timeline-dot').css('transform', 'translateX(-50%) scale(1.5)');
        $(this).find('.timeline-content h3').css('color', 'var(--primary-color)');
    }).mouseleave(function() {
        $(this).find('.timeline-dot').css('transform', 'translateX(-50%) scale(1)');
        $(this).find('.timeline-content h3').css('color', 'var(--blue-color)');
    });
    
    // VMVセクションのホバーエフェクト
    $('.vmv-item').hover(
        function() {
            $(this).find('.vmv-icon').css('transform', 'rotateY(180deg)');
        },
        function() {
            $(this).find('.vmv-icon').css('transform', 'rotateY(0)');
        }
    );
    
    // アクセスセクションの地図アニメーション
    $('.access-map iframe').css('opacity', '0');
    $(window).scroll(function() {
        const mapOffset = $('.access-map').offset().top;
        const scrollPos = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        if (scrollPos > mapOffset - windowHeight + 200) {
            $('.access-map iframe').css('opacity', '1');
            $('.access-map iframe').css('transform', 'translateY(0)');
        }
    });
    
    // 会社概要テーブルの行ごとに表示アニメーション
    $('.info-table tr').each(function(index) {
        $(this).attr('data-aos', 'fade-up');
        $(this).attr('data-aos-delay', 100 * index);
    });
    
    // 画面サイズ変更時の対応
    $(window).resize(function() {
        if ($(window).width() <= 992) {
            // モバイル表示時の調整
            $('.timeline-item').attr('data-aos', 'fade-left');
            $('.access-map iframe').css('height', '300px');
        } else {
            // デスクトップ表示時の調整
            $('.timeline-item').attr('data-aos', 'fade-up');
            $('.access-map iframe').css('height', '450px');
        }
    }).resize(); // 初期読み込み時にも実行
    
    // VMVアイコンのアニメーション
    $('.vmv-icon').css('transition', 'transform 0.5s ease');
});
