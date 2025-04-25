document.addEventListener('DOMContentLoaded', function() {
    // ヘッダー スクロール効果
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // モバイルメニュートグル
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButton = document.querySelector('.btn-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
            
            if (navButton) {
                navButton.classList.toggle('active');
            }
        });
    }

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューが開いていたら閉じる
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });

    // ストーリースライダー
    const storySlides = document.querySelectorAll('.story-slide');
    const storyDots = document.querySelectorAll('.story-dot');
    const storyPrevBtn = document.querySelector('.story-nav-btn.prev');
    const storyNextBtn = document.querySelector('.story-nav-btn.next');
    let currentSlideIndex = 0;

    function showSlide(index) {
        // すべてのスライドとドットからactiveクラスを削除
        storySlides.forEach(slide => slide.classList.remove('active'));
        storyDots.forEach(dot => dot.classList.remove('active'));
        
        // 現在のスライドとドットにactiveクラスを追加
        storySlides[index].classList.add('active');
        storyDots[index].classList.add('active');
        
        currentSlideIndex = index;
    }

    // 前へボタンのクリックイベント
    if (storyPrevBtn) {
        storyPrevBtn.addEventListener('click', function() {
            let newIndex = currentSlideIndex - 1;
            if (newIndex < 0) {
                newIndex = storySlides.length - 1;
            }
            showSlide(newIndex);
        });
    }

    // 次へボタンのクリックイベント
    if (storyNextBtn) {
        storyNextBtn.addEventListener('click', function() {
            let newIndex = currentSlideIndex + 1;
            if (newIndex >= storySlides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });
    }

    // ドットのクリックイベント
    storyDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });

    // 自動スライドショー（オプション）
    let slideInterval = setInterval(function() {
        if (storyNextBtn) {
            storyNextBtn.click();
        }
    }, 5000);

    // マウスオーバーで自動スライドを一時停止
    document.querySelector('.story-slider').addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });

    // マウスアウトで自動スライドを再開
    document.querySelector('.story-slider').addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            if (storyNextBtn) {
                storyNextBtn.click();
            }
        }, 5000);
    });

    // FAQアコーディオン
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            // 現在のアコーディオンの状態を切り替え
            this.classList.toggle('active');
            answer.classList.toggle('active');
            icon.classList.toggle('active');
            
            // アイコンの変更
            if (icon.classList.contains('active')) {
                icon.innerHTML = '<i class="fas fa-minus"></i>';
            } else {
                icon.innerHTML = '<i class="fas fa-plus"></i>';
            }
        });
    });

    // マップピンのホバーエフェクト（タッチデバイス対応）
    const mapPins = document.querySelectorAll('.map-pin');
    
    mapPins.forEach(pin => {
        // タッチデバイス対応
        pin.addEventListener('touchstart', function() {
            this.classList.toggle('active');
            
            // 他のピンのアクティブ状態を解除
            mapPins.forEach(otherPin => {
                if (otherPin !== this) {
                    otherPin.classList.remove('active');
                }
            });
        });
    });

    // 数字カウントアップアニメーション（必要な場合）
    function animateCountUp(element, target, duration) {
        let start = 0;
        const startTime = performance.now();
        
        function updateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime > duration) {
                element.textContent = target;
                return;
            }
            
            const value = Math.floor(target * (elapsedTime / duration));
            element.textContent = value;
            requestAnimationFrame(updateCount);
        }
        
        requestAnimationFrame(updateCount);
    }

    // スクロールアニメーション
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    const animElements = document.querySelectorAll('.feature-card, .story-card, .chat-feature, .community-feature, .shop-feature');
    animElements.forEach(element => {
        observer.observe(element);
    });

    // 初期状態の設定
    // 最初のストーリースライドを表示
    showSlide(0);

    // FAQの最初の項目を開いておく（オプション）
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
    }
});

// スクロールアニメーションのCSS用クラス
document.addEventListener('DOMContentLoaded', function() {
    const animElements = document.querySelectorAll('.feature-card, .story-card, .chat-feature, .community-feature, .shop-feature');
    animElements.forEach(element => {
        element.classList.add('anim-ready');
    });
});