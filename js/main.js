// メインのJavaScriptファイル

// DOM準備完了時に実行
document.addEventListener('DOMContentLoaded', function() {
    // AOS（Animate On Scroll）初期化
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });

    // ヘッダースクロール制御
    const header = document.querySelector('.header');
    const pageTop = document.getElementById('pageTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            pageTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            pageTop.classList.remove('show');
        }
    });

    // ページトップへ戻るボタン
    pageTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // モバイルメニュー制御
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        
        // ハンバーガーメニューのアニメーション
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (mainNav.classList.contains('show')) {
            spans[0].style.transform = 'translateY(9px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // ウィンドウサイズ変更時にモバイルメニューをリセット
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const headerHeight = header.offsetHeight;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
                
                // モバイルメニューが開いていれば閉じる
                if (mainNav.classList.contains('show')) {
                    menuToggle.click();
                }
            }
        });
    });

    // Cookie通知
    const cookieNotice = document.getElementById('cookie-notice');
    const cookieAccept = document.getElementById('cookie-accept');
    
    // Cookieが設定されていなければ通知を表示
    if (!getCookie('cookie-notice-accepted')) {
        cookieNotice.style.display = 'block';
    }
    
    cookieAccept.addEventListener('click', function() {
        // 1年間有効なCookieを設定
        setCookie('cookie-notice-accepted', 'true', 365);
        cookieNotice.style.display = 'none';
    });
    
    // Cookie取得関数
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return '';
    }
    
    // Cookie設定関数
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/;SameSite=Lax';
    }
    
    // 画像遅延読み込み
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // IntersectionObserverが使えない場合の代替処理
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});
