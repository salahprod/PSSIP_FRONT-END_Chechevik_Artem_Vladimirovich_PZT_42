
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
    { img: "Image/arca.png", name: "Декорирование / Флористика" },
    { img: "Image/desert.png", name: "Кондитеры" },
    { img: "Image/salut.png", name: "Салют" },
    { img: "Image/park.png", name: "Шоу-программы" },
    { img: "Image/crasota.png", name: "Локации" },
    { img: "Image/arend.png", name: "Аренда" },
    { img: "Image/vertolet.png", name: "Аренда транспорта" }
];

const offersData = [
    { img: "Image/chel.png", title: "Ансамбль \"Цыганские звёзды\"", price: 1200, rating: 5, date: "С 2.02 по 30.04" },
    { img: "Image/ludi.png", title: "Ансамбль \"Цыганские звёзды\"", price: 1200, rating: 5, date: "С 2.02 по 30.04" },
    { img: "Image/concert.png", title: "Ансамбль \"Цыганские звёзды\"", price: 1200, rating: 5, date: "С 2.02 по 30.04" },
    { img: "Image/stadion.png", title: "Ансамбль \"Цыганские звёзды\"", price: 1200, rating: 5, date: "С 2.02 по 30.04" }
];

const artistsData = [
    { img: "Image/ansambl.png", name: "Ансамбль \"Цыганские звёзды\" Романа Коржова", price: 1200, rating: 5 },
    { img: "Image/dva.png", name: "Ансамбль \"Цыганские звёзды\" Романа Коржова", price: 1200, rating: 5 },
    { img: "Image/tri.png", name: "Ансамбль \"Цыганские звёзды\" Романа Коржова", price: 1200, rating: 5 },
    { img: "Image/cetiri.png", name: "Ансамбль \"Цыганские звёзды\" Романа Коржова", price: 1200, rating: 5 },
    { img: "Image/pat.png", name: "Ансамбль \"Цыганские звёзды\" Романа Коржова", price: 1200, rating: 5 },
    { img: "Image/shest.png", name: "Ансамбль \"Цыганские звёзды\" Романа Коржова", price: 1200, rating: 5 },
    { img: "Image/sem.png", name: "Ансамбль \"Цыганские звёзды\" Романа Коржова", price: 1200, rating: 5 },
    { img: "Image/vosem.png", name: "Ансамбль \"Цыганские звёзды\" Романа Коржова", price: 1200, rating: 5 }
];

const faqData = [
    { question: "Как забронировать артиста или ведущего?", answer: "Оставьте заявку на сайте через форму обратной связи, и наш координатор свяжется с вами в течение 15 минут." },
    { question: "Есть ли комиссия для артистов?", answer: "Для артистов размещение на площадке абсолютно бесплатно. Комиссия взимается только с заказчика в размере 10% от суммы заказа." },
    { question: "Как происходит оплата и гарантии?", answer: "Оплата через защищенный сервис. Деньги замораживаются до подтверждения мероприятия и перечисляются артисту только после успешного выступления." },
    { question: "Могу ли я отменить заказ?", answer: "Да, вы можете отменить заказ не позднее чем за 14 дней до мероприятия. В этом случае комиссия не взимается." },
    { question: "Как стать артистом на вашей площадке?", answer: "Заполните заявку в разделе \"Как попасть в нашу базу\", и наш менеджер свяжется с вами для оформления портфолио." }
];

const reviewsData = [
    { name: "Mr Jone Dose", role: "Директор", text: "Quisque posuere mollis ipsum et molestie. Fusce cursus, risus vel scelerisque porttitor, leo quam vulputate nibh, sit amet blandit erat magna.", avatar: "Image/celic.png" },
    { name: "Alex Smith", role: "Организатор", text: "Отличный сервис! Быстро нашли ведущего на свадьбу. Огромное спасибо команде StarEvents!", avatar: "Image/celic.png" },
    { name: "Elena Volkova", role: "Менеджер", text: "Огромный выбор артистов. Удобный поиск и бронирование. Обязательно вернемся!", avatar: "Image/celic.png" }
];

const brandsData = ["Image/pay.svg", "Image/logo.svg", "Image/logo2.svg", "Image/logo3.svg", "Image/logo4.svg", "Image/logo2.svg", "Image/logo5.svg", "Image/pay.svg"];

const stepsData = [
    { side: "up", text: "Выберите артистов из списка и добавьте в запрос", icon: "Image/telefon.png", number: 1 },
    { side: "down", text: "Бронируйте через наш сервис, без комиссии, взамен гарантируем качество и сервис", icon: "Image/sema.png", number: 2 },
    { side: "up", text: "Расскажите Ваши пожелания, где, когда и что за праздник", icon: "Image/podar.png", number: 3 },
    { side: "down", text: "Выберите координатора, организуйте под ключ или проявите организаторские способности сами", icon: "Image/lection.png", number: 4 },
    { side: "up", text: "Обрабатываем запрос и предоставляем предложение", icon: "Image/nout.png", number: 5 },
    { side: "down", text: "Наслаждайтесь праздником, а наш онлайн помощник подскажет все тонкости", icon: "Image/wow.png", number: 6 }
];

// ==================== ЗАГРУЗКА КОНТЕНТА ====================

document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadOffers();
    loadArtists();
    loadFaq();
    loadReviews();
    loadBrands();
    loadSteps();
    loadFooter();
    initHamburgerMenu();
    initFormHandler();
    initScrollAnimation();
});

// ==================== ФУНКЦИИ ЗАГРУЗКИ (с демонстрацией циклов) ====================

// Демонстрация цикла for для загрузки категорий
function loadCategories() {
    const container = document.getElementById('categoriesGrid');
    if(!container) return;
    let html = '';
    for(let i = 0; i < categoriesData.length; i++) {
        const cat = categoriesData[i];
        html += `
            <div class="category-card fade-animate" onclick="handleCategoryClick('${cat.name}')">
                <img src="${cat.img}" alt="${cat.name}">
                <div class="card-overlay">
                    <span>${cat.name}</span>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

// Демонстрация цикла for...of для загрузки спецпредложений
function loadOffers() {
    const container = document.getElementById('offersGrid');
    if(!container) return;
    let html = '';
    for(const offer of offersData) {
        html += `
            <div class="offer-card fade-animate" onclick="showOfferDetails('${offer.title}', ${offer.price})">
                <div class="offer-img-box">
                    <img src="${offer.img}" alt="${offer.title}">
                    <div class="offer-img-overlay">
                        <h3>${offer.title}</h3>
                    </div>
                </div>
                <div class="offer-info-box">
                    <div class="offer-meta-row">
                        <div class="offer-stars">${'★'.repeat(offer.rating)}</div>
                        <div class="offer-price">от <span>${offer.price}</span> ₽</div>
                    </div>
                    <div class="offer-date">${offer.date}</div>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

// Демонстрация цикла forEach для загрузки артистов
function loadArtists() {
    const container = document.getElementById('artistsGrid');
    if(!container) return;
    let html = '';
    artistsData.forEach(artist => {
        html += `
            <div class="artist-card fade-animate" onclick="showArtistInfo('${artist.name}', ${artist.price})">
                <img src="${artist.img}" alt="${artist.name}">
                <div class="artist-overlay">
                    <h3 class="artist-name">${artist.name}</h3>
                    <div class="artist-meta">
                        <div class="rating-stars">${'★'.repeat(artist.rating)}</div>
                        <div class="artist-price">от <span>${artist.price}</span> ₽</div>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Демонстрация цикла while для загрузки FAQ
function loadFaq() {
    const container = document.getElementById('faqContainer');
    if(!container) return;
    let html = '';
    let i = 0;
    while(i < faqData.length) {
        const faq = faqData[i];
        html += `
            <div class="faq-item">
                <input type="checkbox" id="faq-${i+1}" class="faq-input">
                <label for="faq-${i+1}" class="faq-trigger">${faq.question}</label>
                <div class="faq-content">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `;
        i++;
    }
    container.innerHTML = html;
}

// Демонстрация do..while для загрузки отзывов (с break условием)
function loadReviews() {
    const container = document.getElementById('reviewsGrid');
    if(!container) return;
    let html = '';
    let idx = 0;
    do {
        const review = reviewsData[idx];
        html += `
            <div class="review-card fade-animate">
                <div class="reviewer-profile">
                    <div class="avatar-wrapper">
                        <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                    </div>
                    <div>
                        <h3 class="reviewer-name">${review.name}</h3>
                        <p class="reviewer-role">${review.role}</p>
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
            </div>
        `;
        idx++;
        if(idx >= reviewsData.length) break; // демонстрация оператора break
    } while(true);
    container.innerHTML = html;
}

function loadBrands() {
    const container = document.getElementById('brandsRow');
    if(!container) return;
    let html = '';
    for(let i = 0; i < brandsData.length; i++) {
        if(i === 2) continue; // демонстрация continue (пропускаем третий элемент)
        html += `<img src="${brandsData[i]}" alt="Partner ${i+1}">`;
    }
    container.innerHTML = html;
}

// Демонстрация цикла с вложенным условием if
function loadSteps() {
    const container = document.getElementById('stepsContainer');
    if(!container) return;
    let html = '';
    for(let i = 0; i < stepsData.length; i++) {
        const step = stepsData[i];
        if(step.side === 'up') {
            html += `
                <div class="step-node step-up">
                    <h3>${step.text}</h3>
                    <div class="step-circle-wrapper">
                        <span class="step-number">${step.number}</span>
                        <div class="step-circle">
                            <img src="${step.icon}" alt="Step ${step.number}">
                        </div>
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="step-node step-down">
                    <div class="step-circle-wrapper">
                        <span class="step-number">${step.number}</span>
                        <div class="step-circle">
                            <img src="${step.icon}" alt="Step ${step.number}">
                        </div>
                    </div>
                    <h3>${step.text}</h3>
                </div>
            `;
        }
    }
    container.innerHTML = html;
}

function loadFooter() {
    const footerGrid = document.getElementById('footerGrid');
    const footerSocials = document.getElementById('footerSocials');
    
    if(footerGrid) {
        footerGrid.innerHTML = `
            <div class="footer-column"><h4>Навигация</h4><ul><li><a href="#">About</a></li><li><a href="#">Team</a></li><li><a href="#">Work</a></li></ul></div>
            <div class="footer-column"><h4>Разделы</h4><ul><li><a href="#">About</a></li><li><a href="#">Team</a></li><li><a href="#">Work</a></li></ul></div>
            <div class="footer-column"><h4>Теги</h4><ul><li><a href="#">#tagtag</a></li><li><a href="#">#team</a></li><li><a href="#">#work</a></li></ul></div>
            <div class="footer-column"><h4>Популярное</h4><ul><li><a href="#">#trip</a></li><li><a href="#">#team</a></li><li><a href="#">#work</a></li></ul></div>
            <div class="footer-column"><h4>Для клиентов</h4><p class="footer-contact">+099 94 42 999</p><p class="footer-contact">example@mail.com</p></div>
            <div class="footer-column"><h4>Для сотрудничества</h4><p class="footer-contact">+097 20 89 728</p><p class="footer-contact">work@gmail.com</p></div>
        `;
    }
    
    if(footerSocials) {
        footerSocials.innerHTML = `
            <a href="#" class="social-link-icon" aria-label="Facebook"><img src="Image/facebook.svg" alt="Facebook"></a>
            <a href="#" class="social-link-icon" aria-label="Telegram"><img src="Image/Telegram.svg" alt="Telegram"></a>
            <a href="#" class="social-link-icon" aria-label="Viber"><img src="Image/viber.svg" alt="Viber"></a>
            <a href="#" class="social-link-icon" aria-label="WhatsApp"><img src="Image/fa.svg" alt="WhatsApp"></a>
            <a href="#" class="social-link-icon" aria-label="Instagram"><img src="Image/insta.svg" alt="Instagram"></a>
        `;
    }
}

// ==================== ДИАЛОГОВЫЕ ОКНА (alert, confirm, prompt) ====================

// 1. alert - простое уведомление
function handleCategoryClick(categoryName) {
    alert(`Вы выбрали категорию: ${categoryName}\nСкоро мы покажем вам лучших исполнителей!`);
}

// 2. confirm - подтверждение действия
function showLoginDialog() {
    const result = confirm('Вы хотите войти в личный кабинет?');
    if(result) {
        const email = prompt('Пожалуйста, введите ваш email для входа:');
        if(email && email.trim() !== '') {
            alert(`Добро пожаловать! Мы отправили код подтверждения на ${email}`);
        } else {
            alert('Вход отменён - email не указан');
        }
    } else {
        alert('Окно входа закрыто');
    }
}

// 3. prompt - ввод данных
function showRegisterDialog() {
    const name = prompt('Регистрация нового пользователя\nВведите ваше имя:', 'Гость');
    if(name && name.trim() !== '') {
        const phone = prompt(`Отлично, ${name}!\nВведите ваш номер телефона для регистрации:`);
        if(phone && phone.trim() !== '') {
            alert(`Регистрация успешна!\nИмя: ${name}\nТелефон: ${phone}\nДобро пожаловать в StarEvents!`);
        } else {
            alert('Регистрация отменена - телефон не указан');
        }
    } else {
        alert('Регистрация отменена');
    }
}

function showApplicationForm() {
    const eventType = prompt('Какой тип мероприятия вы планируете?\n(Свадьба, Корпоратив, День рождения, Другое)');
    if(eventType && eventType.trim() !== '') {
        const date = prompt('Укажите желаемую дату мероприятия (например, 25.12.2024):');
        if(date && date.trim() !== '') {
            alert(`Заявка принята!\nМероприятие: ${eventType}\nДата: ${date}\nНаш менеджер свяжется с вами в ближайшее время.`);
        } else {
            alert('Заявка отменена - дата не указана');
        }
    } else {
        alert('Заявка отменена');
    }
}

// Демонстрация switch в функции
function showOfferDetails(title, price) {
    let discountMessage = '';
    switch(true) {
        case price < 1000:
            discountMessage = '🎁 Специальное предложение: при заказе сегодня - бесплатный десерт!';
            break;
        case price < 2000:
            discountMessage = '🎉 Скидка 5% при бронировании через сайт!';
            break;
        default:
            discountMessage = '⭐ Премиум пакет: фотограф в подарок!';
            break;
    }
    alert(`🎭 ${title}\n💰 Цена от ${price} ₽\n${discountMessage}`);
}

function showArtistInfo(name, price) {
    const confirmBooking = confirm(`Вы хотите забронировать:\n${name}\nЦена: от ${price} ₽\n\nНажмите OK для продолжения`);
    if(confirmBooking) {
        const days = prompt('На сколько дней вам нужен артист? (введите число):', '1');
        if(days && !isNaN(days) && parseInt(days) > 0) {
            const total = parseInt(days) * price;
            alert(`✅ Предварительная стоимость: ${total} ₽\nНаш менеджер свяжется с вами для уточнения деталей.`);
        } else {
            alert('Бронирование отменено - некорректное количество дней');
        }
    } else {
        alert('Бронирование отменено');
    }
}

// ==================== ФУНКЦИИ ПОИСКА И НАВИГАЦИИ ====================

function performSearch() {
    const country = document.getElementById('countrySelect')?.value || '';
    const city = document.getElementById('citySelect')?.value || '';
    const category = document.getElementById('categorySelect')?.value || '';
    
    // Демонстрация if-else
    if(!country && !city && !category) {
        alert('Пожалуйста, заполните хотя бы одно поле для поиска');
        return;
    }
    
    let searchMessage = '🔍 Поиск мероприятий:\n';
    if(country) searchMessage += `Страна: ${country}\n`;
    if(city) searchMessage += `Город: ${city}\n`;
    if(category) searchMessage += `Категория: ${category}\n`;
    searchMessage += '\nМы подбираем лучшие варианты для вас...';
    
    alert(searchMessage);
}

function showAllOffers() {
    alert('🎉 Все специальные предложения\nСвяжитесь с нами для получения полного списка акций!');
}

let currentReviewIndex = 0;

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviewsData.length;
    showCurrentReview();
}

function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + reviewsData.length) % reviewsData.length;
    showCurrentReview();
}

function showCurrentReview() {
    const review = reviewsData[currentReviewIndex];
    alert(`✨ Отзыв #${currentReviewIndex + 1}\n👤 ${review.name} (${review.role})\n📝 ${review.text}`);
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function initFormHandler() {
    const form = document.getElementById('feedbackForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            const consent = document.getElementById('consent')?.checked;
            
            if(!name) {
                alert('Пожалуйста, введите ваше имя');
                return;
            }
            if(!email) {
                alert('Пожалуйста, введите ваш email');
                return;
            }
            if(!message) {
                alert('Пожалуйста, введите сообщение');
                return;
            }
            if(!consent) {
                alert('Пожалуйста, подтвердите согласие на обработку персональных данных');
                return;
            }
            
            alert(`Спасибо, ${name}! Ваше сообщение отправлено.\nМы ответим на ${email} в ближайшее время.`);
            form.reset();
        });
    }
}

function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.fade-animate');
    
    function checkScroll() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if(rect.top < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
}

// Дополнительная демонстрация return и операторов
function getPopularityLevel(price, rating) {
    if(rating >= 4.5 && price < 1000) {
        return '🔥 Супер хит!';
    } else if(rating >= 4) {
        return '⭐ Популярный';
    } else {
        return '👍 Хороший выбор';
    }
}

// Демонстрация операторов if, else if, else
function calculateDiscount(price, isRegularCustomer, eventType) {
    let discount = 0;
    
    if(isRegularCustomer) {
        discount = 0.1;
        if(price > 10000) {
            discount = 0.15;
        }
    } else if(eventType === 'Свадьба') {
        discount = 0.05;
    } else if(eventType === 'Корпоратив') {
        discount = 0.07;
    } else {
        discount = 0;
    }
    
    return price * (1 - discount);
}

// Демонстрация for с break и continue
function filterArtistsByPrice(minPrice, maxPrice) {
    const allPrices = [800, 1200, 1500, 950, 2000, 1100, 1800, 500, 3000];
    let filteredPrices = [];
    
    for(let i = 0; i < allPrices.length; i++) {
        if(allPrices[i] < minPrice) continue;
        if(allPrices[i] > maxPrice) continue;
        filteredPrices.push(allPrices[i]);
        if(filteredPrices.length >= 3) break;
    }
    
    return filteredPrices;
}

console.log('Популярность артиста:', getPopularityLevel(800, 5));
console.log('Цены после фильтрации:', filterArtistsByPrice(900, 2000));
console.log('Скидка для постоянного клиента:', calculateDiscount(10000, true, 'Свадьба'));