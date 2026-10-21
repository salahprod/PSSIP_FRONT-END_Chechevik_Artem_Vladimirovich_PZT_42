// --- ДАННЫЕ САЙТА ---
const categoriesData = [
    { img: "Image/ved.png", name: "Ведущие" },
    { img: "Image/zvezd.png", name: "Звезды" },
    { img: "Image/artist.png", name: "Артисты на праздник" },
    { img: "Image/caver.png", name: "Кавер-группы" },
    { img: "Image/baraban.png", name: "DJ / Музыканты" },
    { img: "Image/music.png", name: "Саксофонисты" },
    { img: "Image/foto.png", name: "Фото" },
    { img: "Image/camera.png", name: "Видео" },
    { img: "Image/svaz.png", name: "Техническое обеспечение" },
    { img: "Image/arca.png", name: "Декорирование" },
    { img: "Image/desert.png", name: "Кондитеры" },
    { img: "Image/salut.png", name: "Салют" },
    { img: "Image/park.png", name: "Шоу-программы" },
    { img: "Image/crasota.png", name: "Локации" },
    { img: "Image/arend.png", name: "Аренда" },
    { img: "Image/vertolet.png", name: "Транспорт" }
];

const offersData = [
    { img: "Image/chel.png", title: "Ансамбль Цыганские звёзды", price: 1200, rating: 5, date: "С 2.02 по 30.04" },
    { img: "Image/ludi.png", title: "Шоу Барабанов", price: 1500, rating: 5, date: "Весь март" },
    { img: "Image/concert.png", title: "Саксофонист на велком", price: 800, rating: 4, date: "Пн-Чт" },
    { img: "Image/stadion.png", title: "Ведущий + DJ", price: 2500, rating: 5, date: "Сб-Вс" }
];

const artistsData = [
    { img: "Image/ansambl.png", name: "Роман Коржов", price: 1200, rating: 5 },
    { img: "Image/dva.png", name: "Михаил Иванов", price: 1300, rating: 5 },
    { img: "Image/tri.png", name: "Группа Драйв", price: 2000, rating: 5 },
    { img: "Image/cetiri.png", name: "DJ Star", price: 900, rating: 5 },
    { img: "Image/pat.png", name: "Шоу Огня", price: 1800, rating: 4 },
    { img: "Image/shest.png", name: "Дуэт Магия", price: 1100, rating: 5 },
    { img: "Image/sem.png", name: "Ведущая Елена", price: 1500, rating: 5 },
    { img: "Image/vosem.png", name: "Кавер Бэнд", price: 2200, rating: 5 }
];

const faqData = [
    { question: "Как забронировать артиста?", answer: "Оставьте заявку, и мы свяжемся с вами за 15 минут." },
    { question: "Есть ли комиссия?", answer: "Размещение бесплатно. Комиссия только с заказа." },
    { question: "Как стать артистом?", answer: "Заполните форму внизу страницы." }
];

const reviewsData = [
    { name: "Mr Jone Dose", role: "Директор", text: "Отличный сервис, нашли ведущего за час!", avatar: "Image/celic.png" },
    { name: "Alex Smith", role: "Организатор", text: "Лучшая база артистов в стране.", avatar: "Image/celic.png" },
    { name: "Elena Volkova", role: "Менеджер", text: "Удобно и быстро, рекомендую.", avatar: "Image/celic.png" }
];

const stepsData = [
    { side: "up", text: "Выберите артистов", icon: "Image/telefon.png", number: 1 },
    { side: "down", text: "Бронируйте сервис", icon: "Image/sema.png", number: 2 },
    { side: "up", text: "Расскажите пожелания", icon: "Image/podar.png", number: 3 },
    { side: "down", text: "Выберите координатора", icon: "Image/lection.png", number: 4 },
    { side: "up", text: "Получите предложение", icon: "Image/nout.png", number: 5 },
    { side: "down", text: "Наслаждайтесь праздником", icon: "Image/wow.png", number: 6 }
];

// ==================== ЗАГРУЗКА КОНТЕНТА ====================

document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadOffers();
    loadArtists();
    loadFaq();
    loadReviews();
    loadSteps();
    loadFooter();
    initHamburgerMenu();
    initFormHandler();
    initScrollAnimation();
    
    // Инициализация BOM
    initBOMAnalysis();
    initPageTimer();
    initHistoryAndParams();
});

// ==================== BOM: ИНИЦИАЛИЗАЦИЯ ====================

// Храним интервал таймера, чтобы не создавать дубликаты
let pageTimerInterval = null;

function initBOMAnalysis() {
    // 1. WINDOW — размеры окна и прокрутка
    updateWindowStats();
    window.addEventListener('resize', updateWindowStats);
    window.addEventListener('scroll', updateWindowScroll);

    // 2. NAVIGATOR
    const navAgentEl = document.getElementById('nav-agent');
    const navLangEl = document.getElementById('nav-lang');
    if (navAgentEl) {
        // Определяем "человеческое" имя браузера
        navAgentEl.innerText = detectBrowserName();
    }
    if (navLangEl) {
        navLangEl.innerText = navigator.language || 'не определён';
    }

    // 3. LOCATION
    const locHrefEl = document.getElementById('loc-href');
    const locHashEl = document.getElementById('loc-hash');
    const urlParamsEl = document.getElementById('url-params');
    if (locHrefEl) locHrefEl.innerText = location.href;
    if (locHashEl) locHashEl.innerText = location.hash || 'нет';
    if (urlParamsEl) {
        const params = new URLSearchParams(location.search);
        const entries = [...params.entries()];
        urlParamsEl.innerText = entries.length 
            ? entries.map(([k, v]) => `${k}=${v}`).join(', ') 
            : 'нет';
    }

    // 4. HISTORY
    const histLenEl = document.getElementById('hist-length');
    if (histLenEl) histLenEl.innerText = history.length;

    // 5. SCREEN
    const scrResEl = document.getElementById('scr-res');
    const scrAvailEl = document.getElementById('scr-avail');
    const scrDepthEl = document.getElementById('scr-depth');
    const deviceTypeEl = document.getElementById('device-type');
    if (scrResEl) scrResEl.innerText = `${screen.width}x${screen.height}`;
    if (scrAvailEl) scrAvailEl.innerText = `${screen.availWidth}x${screen.availHeight}`;
    if (scrDepthEl) scrDepthEl.innerText = `${screen.colorDepth} бит`;
    if (deviceTypeEl) {
        deviceTypeEl.innerText = 'Тип: ' + detectDeviceType();
    }
}

// ==================== ТАЙМЕР ВРЕМЕНИ НА СТРАНИЦЕ ====================

function initPageTimer() {
    const timerEl = document.getElementById('page-timer');
    if (!timerEl) return;
    
    let seconds = 0;
    // Очищаем предыдущий интервал, если был (защита от дублирования)
    if (pageTimerInterval) clearInterval(pageTimerInterval);
    
    pageTimerInterval = setInterval(() => {
        seconds++;
        // Проверяем, что элемент ещё в DOM
        if (document.body.contains(timerEl)) {
            timerEl.innerText = seconds;
        } else {
            clearInterval(pageTimerInterval);
            pageTimerInterval = null;
        }
    }, 1000);
}

// ==================== ОБРАБОТКА URL-ПАРАМЕТРОВ ====================

function initHistoryAndParams() {
    // Если в URL есть hash — прокручиваем к нему
    if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== ФУНКЦИИ ДЛЯ КНОПОК BOM ====================

// --- WINDOW ---
function openPromoPopup() {
    const popup = window.open('', 'Promo', 'width=400,height=400');
    if (!popup) {
        alert('Всплывающее окно заблокировано браузером. Разрешите всплывающие окна.');
        return;
    }
    // Обмен данными: пишем контент в дочернее окно
    popup.document.write(`
        <!DOCTYPE html>
        <html><head><title>Промо</title></head>
        <body style="font-family: Arial; text-align:center; padding: 40px; background: linear-gradient(135deg,#FF6F43,#FF2E93); color: white;">
            <h2>🎉 Промо-акция!</h2>
            <p>Скидка 15% на первое бронирование</p>
            <p style="font-size: 12px; opacity: 0.8;">Окно открыто с помощью window.open()</p>
            <button onclick="window.close()" style="padding:10px 20px; border:none; border-radius:8px; cursor:pointer;">Закрыть</button>
        </body></html>
    `);
    popup.document.close();
}

function scrollToHero() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function printPage() {
    window.print();
}

function updateWindowStats() {
    const winSizeEl = document.getElementById('win-size');
    if (winSizeEl) {
        winSizeEl.innerText = `${window.innerWidth}x${window.innerHeight}`;
    }
    // Обновляем тип устройства при ресайзе
    const deviceTypeEl = document.getElementById('device-type');
    if (deviceTypeEl) {
        deviceTypeEl.innerText = 'Тип: ' + detectDeviceType();
    }
}

function updateWindowScroll() {
    const winScrollEl = document.getElementById('win-scroll');
    if (winScrollEl) {
        winScrollEl.innerText = Math.round(window.scrollY);
    }
}

// --- NAVIGATOR ---
function checkNetworkStatus() {
    const status = navigator.onLine ? 'Онлайн ✅' : 'Офлайн ❌';
    alert('Статус сети: ' + status);
}

function copyReferralLink() {
    const link = location.origin + location.pathname + '?ref=StarEvents';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link)
            .then(() => alert('Ссылка скопирована:\n' + link))
            .catch(() => fallbackCopy(link));
    } else {
        fallbackCopy(link);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        alert('Ссылка скопирована:\n' + text);
    } catch (e) {
        prompt('Скопируйте ссылку вручную:', text);
    }
    document.body.removeChild(ta);
}

function showUserLang() {
    const lang = navigator.language || 'не определён';
    const langs = (navigator.languages || []).join(', ') || 'нет данных';
    alert(`Язык системы: ${lang}\nВсе языки: ${langs}`);
}

// --- LOCATION ---
function refreshCurrentPage() {
    location.reload();
}

function goToSocial() {
    if (confirm('Перейти на наш Instagram?')) {
        location.href = 'https://instagram.com';
    }
}

function showPathname() {
    alert(
        'Полный URL: ' + location.href + '\n' +
        'Путь: ' + location.pathname + '\n' +
        'Протокол: ' + location.protocol + '\n' +
        'Хост: ' + location.host
    );
}

// --- HISTORY ---
function goBackInHistory() {
    history.back();
}

function goForwardInHistory() {
    history.forward();
}

function historyGoStep() {
    history.go(-1);
}

// --- SCREEN ---
function showColorDepth() {
    alert('Глубина цвета: ' + screen.colorDepth + ' бит\n' +
          'Pixel depth: ' + screen.pixelDepth + ' бит');
}

function showAvailableScreen() {
    alert(
        'Общий экран: ' + screen.width + 'x' + screen.height + '\n' +
        'Доступная область: ' + screen.availWidth + 'x' + screen.availHeight
    );
}

function checkOrientation() {
    let orientation = 'не определена';
    if (screen.orientation && screen.orientation.type) {
        orientation = screen.orientation.type;
    } else if (window.orientation !== undefined) {
        orientation = (window.orientation === 0 || window.orientation === 180) 
            ? 'portrait' : 'landscape';
    }
    alert('Ориентация экрана: ' + orientation);
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ BOM ====================

function detectBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('YaBrowser')) return 'Yandex Browser';
    if (ua.includes('Edg/')) return 'Microsoft Edge';
    if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    return ua.split(' ')[0];
}

function detectDeviceType() {
    const ua = navigator.userAgent;
    const width = window.innerWidth;
    
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTabletUA = /iPad|Android(?!.*Mobile)|Tablet/i.test(ua);
    
    if (isTabletUA || (isMobileUA && width >= 600 && width < 1024)) {
        return 'Планшет 📱';
    }
    if (isMobileUA || width < 600) {
        return 'Телефон 📞';
    }
    return 'Десктоп 💻';
}

// ==================== ФУНКЦИИ ИНТЕРФЕЙСА ====================

function loadCategories() {
    const container = document.getElementById('categoriesGrid');
    if (!container) return;
    let html = '';
    categoriesData.forEach(cat => {
        html += `
            <div class="category-card fade-animate" onclick="handleCategoryClick('${cat.name}')">
                <img src="${cat.img}" alt="${cat.name}">
                <div class="card-overlay"><span>${cat.name}</span></div>
            </div>`;
    });
    container.innerHTML = html;
}

function loadOffers() {
    const container = document.getElementById('offersGrid');
    if (!container) return;
    let html = '';
    offersData.forEach(offer => {
        html += `
            <div class="offer-card fade-animate">
                <div class="offer-img-box"><img src="${offer.img}" alt="${offer.title}"></div>
                <div class="offer-info-box">
                    <h4>${offer.title}</h4>
                    <p>от ${offer.price} ₽ | ${offer.date}</p>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

function loadArtists() {
    const container = document.getElementById('artistsGrid');
    if (!container) return;
    let html = '';
    artistsData.forEach(artist => {
        html += `
            <div class="artist-card fade-animate">
                <img src="${artist.img}" alt="${artist.name}">
                <div class="artist-overlay">
                    <h3 class="artist-name">${artist.name}</h3>
                    <p>от ${artist.price} ₽</p>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

function loadFaq() {
    const container = document.getElementById('faqContainer');
    if (!container) return;
    let html = '';
    faqData.forEach((faq, i) => {
        html += `
            <div class="faq-item">
                <input type="checkbox" id="faq-${i}" class="faq-input">
                <label for="faq-${i}" class="faq-trigger">${faq.question}</label>
                <div class="faq-content"><p>${faq.answer}</p></div>
            </div>`;
    });
    container.innerHTML = html;
}

// --- Слайдер отзывов ---
let currentReviewIndex = 0;

function loadReviews() {
    const container = document.getElementById('reviewsGrid');
    if (!container) return;
    // Показываем текущий отзыв (для слайдера — 1 отзыв)
    renderCurrentReview();
}

function renderCurrentReview() {
    const container = document.getElementById('reviewsGrid');
    if (!container) return;
    const review = reviewsData[currentReviewIndex];
    container.innerHTML = `
        <div class="review-card fade-animate visible">
            <div class="reviewer-profile">
                <img src="${review.avatar}" style="width:50px;border-radius:50%" alt="${review.name}">
                <div><h4>${review.name}</h4><p>${review.role}</p></div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>`;
}

function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + reviewsData.length) % reviewsData.length;
    renderCurrentReview();
}

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviewsData.length;
    renderCurrentReview();
}

function loadSteps() {
    const container = document.getElementById('stepsContainer');
    if (!container) return;
    let html = '';
    stepsData.forEach(step => {
        html += `
            <div class="step-node">
                <div class="step-circle"><img src="${step.icon}" alt="${step.text}"></div>
                <p>${step.number}. ${step.text}</p>
            </div>`;
    });
    container.innerHTML = html;
}

function loadFooter() {
    const footerGrid = document.getElementById('footerGrid');
    if (footerGrid) {
        footerGrid.innerHTML = `
            <div class="footer-column"><h4>Навигация</h4><ul><li>About</li><li>Team</li><li>Work</li></ul></div>
            <div class="footer-column"><h4>Разделы</h4><ul><li>About</li><li>Team</li><li>Work</li></ul></div>
            <div class="footer-column"><h4>Теги</h4><ul><li>#event</li><li>#show</li></ul></div>
            <div class="footer-column"><h4>Популярное</h4><ul><li>#magic</li><li>#party</li></ul></div>
            <div class="footer-column"><h4>Контакты</h4><p>+7 999 000 00 00</p></div>
            <div class="footer-column"><h4>Сотрудничество</h4><p>work@star.ru</p></div>
        `;
    }
    
    const footerSocials = document.getElementById('footerSocials');
    if (footerSocials) {
        footerSocials.innerHTML = `
            <a href="#" class="social-link-icon" onclick="event.preventDefault(); alert('Наш Instagram: @starevents');">📷</a>
            <a href="#" class="social-link-icon" onclick="event.preventDefault(); alert('Наш Facebook: /starevents');">📘</a>
            <a href="#" class="social-link-icon" onclick="event.preventDefault(); alert('Наш VK: @starevents');">💬</a>
        `;
    }
}

function initHamburgerMenu() {
    const h = document.querySelector('.hamburger');
    const n = document.querySelector('.nav-links');
    if (h && n) {
        h.addEventListener('click', () => {
            n.classList.toggle('active');
            h.classList.toggle('active');
        });
        // Закрываем меню при клике по ссылке
        n.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                n.classList.remove('active');
                h.classList.remove('active');
            });
        });
    }
}

function initFormHandler() {
    const f = document.getElementById('feedbackForm');
    if (f) {
        f.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо! Сообщение отправлено.');
            f.reset();
        });
    }
}

function initScrollAnimation() {
    const anims = document.querySelectorAll('.fade-animate');
    if (!('IntersectionObserver' in window)) {
        // Fallback: просто показываем все
        anims.forEach(a => a.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // не дёргаем повторно
            }
        });
    }, { threshold: 0.1 });
    anims.forEach(a => observer.observe(a));
}

// ==================== ДИАЛОГИ ====================

function showLoginDialog() {
    if (confirm("Вы хотите войти в аккаунт?")) {
        let login = prompt("Введите логин:");
        if (login) alert("Добро пожаловать, " + login);
    }
}

function showRegisterDialog() {
    alert("Регистрация временно доступна только через менеджера.");
}

function handleCategoryClick(name) {
    alert("Категория: " + name);
}

function showApplicationForm() {
    let type = prompt("Какое мероприятие вы планируете?");
    if (type) alert("Заявка на '" + type + "' принята!");
}

function performSearch() {
    const country = document.getElementById('countrySelect')?.value || '—';
    const city = document.getElementById('citySelect')?.value || '—';
    const category = document.getElementById('categorySelect')?.value || '—';
    alert(`Поиск:\nСтрана: ${country}\nГород: ${city}\nКатегория: ${category}`);
}

function showAllOffers() {
    alert('Загружаем все спецпредложения...');
}