// ==========================================================================
// ЗАДАНИЕ 1. JSON + КОРЗИНА ИНТЕРНЕТ-МАГАЗИНА
// ==========================================================================
'use strict';

let catalogData = [];       // все товары из JSON
let filteredCatalog = [];   // отфильтрованные
let cart = [];              // корзина

// ---------- Загрузка JSON ----------
async function loadCatalog() {
    const gridEl = document.getElementById('catalogGrid');
    if (!gridEl) return;

    gridEl.innerHTML = '<p class="catalog-empty">⏳ Загрузка каталога...</p>';

    try {
        const response = await fetch('data/catalog.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        catalogData = data.catalog || [];
        filteredCatalog = [...catalogData];

        // Загружаем корзину из localStorage (если была)
        loadCartFromStorage();

        initCatalogFilters();
        renderCatalog();
        renderCart();

        console.log('📦 Каталог загружен:', catalogData.length, 'записей');
    } catch (err) {
        console.error('Ошибка загрузки каталога:', err);
        gridEl.innerHTML = `
            <p class="catalog-empty">
                ❌ Не удалось загрузить каталог.<br>
                <small>Запустите сайт через локальный сервер (например, Live Server), а не через file://</small>
            </p>`;
    }
}

// ---------- Фильтры ----------
function initCatalogFilters() {
    const search = document.getElementById('catalogSearch');
    const category = document.getElementById('catalogCategory');
    const sort = document.getElementById('catalogSort');

    // Заполняем селект категорий
    if (category) {
        const cats = [...new Set(catalogData.map(c => c.category))].sort();
        category.innerHTML = '<option value="">Все категории</option>' +
            cats.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    const applyFilters = () => {
        const q = (search?.value || '').trim().toLowerCase();
        const cat = category?.value || '';
        const sortBy = sort?.value || 'default';

        filteredCatalog = catalogData.filter(item => {
            const okQ = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
            const okC = !cat || item.category === cat;
            return okQ && okC;
        });

        if (sortBy === 'price-asc')  filteredCatalog.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') filteredCatalog.sort((a, b) => b.price - a.price);
        if (sortBy === 'name')       filteredCatalog.sort((a, b) => a.name.localeCompare(b.name));

        renderCatalog();
    };

    search?.addEventListener('input', applyFilters);
    category?.addEventListener('change', applyFilters);
    sort?.addEventListener('change', applyFilters);
}

// ---------- Рендер каталога ----------
function renderCatalog() {
    const gridEl = document.getElementById('catalogGrid');
    if (!gridEl) return;

    if (filteredCatalog.length === 0) {
        gridEl.innerHTML = '<p class="catalog-empty">🔍 Ничего не найдено. Попробуйте изменить фильтры.</p>';
        return;
    }

    gridEl.innerHTML = filteredCatalog.map(item => `
        <div class="catalog-card">
            <div class="catalog-card__img">
                <img src="${item.image}" alt="${escapeHtmlCatalog(item.name)}"
                     onerror="this.style.display='none'">
                <span class="catalog-card__badge">${escapeHtmlCatalog(item.category)}</span>
            </div>
            <div class="catalog-card__body">
                <h3 class="catalog-card__name">${escapeHtmlCatalog(item.name)}</h3>
                <p class="catalog-card__desc">${escapeHtmlCatalog(item.description)}</p>
                <div class="catalog-card__meta">
                    <span class="catalog-card__price">${item.price} BYN</span>
                    <span class="catalog-card__rating">${'★'.repeat(item.rating)}</span>
                </div>
                <button class="catalog-card__btn" onclick="addToCart(${item.id})">
                    🛒 Добавить в корзину
                </button>
            </div>
        </div>
    `).join('');
}

// ---------- Добавить в корзину ----------
function addToCart(id) {
    const product = catalogData.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            qty: 1
        });
    }

    saveCartToStorage();
    renderCart();
    flashCartPanel();
    console.log('🛒 Добавлено в корзину:', product.name);
}

// ---------- Изменить количество ----------
function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    saveCartToStorage();
    renderCart();
}

// ---------- Удалить позицию ----------
function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCartToStorage();
    renderCart();
}

// ---------- Очистить корзину ----------
function clearCart() {
    if (cart.length === 0) return;
    if (!confirm('Удалить все товары из корзины?')) return;
    cart = [];
    saveCartToStorage();
    renderCart();
}

// ---------- Рендер корзины ----------
function renderCart() {
    const panel = document.getElementById('cartPanel');
    const details = document.getElementById('cartDetails');
    const itemsEl = document.getElementById('cartItems');
    const countEl = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');
    const totalFinalEl = document.getElementById('cartTotalFinal');

    const count = cart.reduce((s, i) => s + i.qty, 0);
    const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

    if (countEl) countEl.textContent = count;
    if (totalEl) totalEl.textContent = total;
    if (totalFinalEl) totalFinalEl.textContent = total;

    if (!details || !itemsEl) return;

    if (cart.length === 0) {
        details.style.display = 'none';
        return;
    }

    details.style.display = 'block';

    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img class="cart-item__img" src="${item.image}" alt=""
                 onerror="this.style.background='#f0f2f5';this.src=''">
            <div class="cart-item__info">
                <h4>${escapeHtmlCatalog(item.name)}</h4>
                <p>${escapeHtmlCatalog(item.category)} · ${item.price} BYN</p>
            </div>
            <span class="cart-item__price">${item.price * item.qty} BYN</span>
            <div class="cart-item__qty">
                <button onclick="changeQty(${item.id}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <button class="cart-item__remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');
}

// ---------- Визуальный отклик на «Добавить» ----------
function flashCartPanel() {
    const panel = document.getElementById('cartPanel');
    if (!panel) return;
    panel.style.transition = 'transform 0.2s';
    panel.style.transform = 'scale(1.02)';
    setTimeout(() => { panel.style.transform = 'scale(1)'; }, 200);
}

// ---------- Сохранение/загрузка корзины (localStorage) ----------
function saveCartToStorage() {
    try {
        localStorage.setItem('starevents_cart', JSON.stringify(cart));
    } catch (e) {
        console.warn('Не удалось сохранить корзину:', e);
    }
}

function loadCartFromStorage() {
    try {
        const raw = localStorage.getItem('starevents_cart');
        cart = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(cart)) cart = [];
    } catch (e) {
        cart = [];
    }
}

// ---------- Утилита ----------
function escapeHtmlCatalog(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ==========================================================================
// ЗАДАНИЕ 2. РАБОТА С COOKIE
// ==========================================================================

const COOKIE_NAME = 'starevents_user';

/**
 * Сохраняет объект с данными пользователя в Cookie.
 * Срок жизни — 7 дней.
 */
function saveUserToCookies() {
    const resultEl = document.getElementById('cookieResult');
    if (!resultEl) return;

    const data = readCookieForm();

    if (!data.fio || !data.email) {
        showStorageResult(resultEl, 'error', '⚠️ ФИО и Email — обязательные поля');
        return;
    }

    // Сериализуем объект в строку и кодируем для Cookie
    const json = JSON.stringify(data);
    const encoded = encodeURIComponent(json);

    // Устанавливаем Cookie на 7 дней
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `${COOKIE_NAME}=${encoded}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    showStorageResult(resultEl, 'success',
        `<b>✅ Данные сохранены в Cookie</b><br><br>` +
        `<b>Имя Cookie:</b> <code>${COOKIE_NAME}</code><br>` +
        `<b>Срок жизни:</b> 7 дней<br>` +
        `<b>Размер:</b> ${encoded.length} байт<br><br>` +
        `<b>Содержимое:</b><br>` +
        formatDataAsHtml(data)
    );

    console.log('[Cookie] Сохранено:', data);
    console.log('[Cookie] document.cookie =', document.cookie);
}

/**
 * Читает данные из Cookie и выводит их на страницу + заполняет форму.
 */
function readUserFromCookies() {
    const resultEl = document.getElementById('cookieResult');
    if (!resultEl) return;

    const raw = getCookie(COOKIE_NAME);

    if (!raw) {
        showStorageResult(resultEl, 'error',
            `❌ Cookie с именем <code>${COOKIE_NAME}</code> не найдена.<br>` +
            `Сначала сохраните данные.`
        );
        return;
    }

    let data;
    try {
        data = JSON.parse(decodeURIComponent(raw));
    } catch (e) {
        showStorageResult(resultEl, 'error', '❌ Не удалось разобрать данные из Cookie');
        return;
    }

    // Заполняем форму
    fillStorageForm(data, 'cookie');

    showStorageResult(resultEl, 'success',
        `<b>📖 Данные из Cookie</b><br><br>` +
        `<b>Имя Cookie:</b> <code>${COOKIE_NAME}</code><br>` +
        `<b>Длина значения:</b> ${raw.length} байт<br><br>` +
        `<b>Содержимое:</b><br>` +
        formatDataAsHtml(data)
    );

    console.log('[Cookie] Прочитано:', data);
}

/**
 * Удаляет Cookie с данными пользователя.
 */
function clearUserCookies() {
    const resultEl = document.getElementById('cookieResult');
    if (!resultEl) return;

    // Удаление: устанавливаем expires в прошлом
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

    clearStorageForm('cookie');

    showStorageResult(resultEl, 'success',
        `<b>🗑 Cookie удалена</b><br><br>` +
        `<b>Имя:</b> <code>${COOKIE_NAME}</code><br>` +
        `<b>Проверка:</b> ${getCookie(COOKIE_NAME) ? '⚠️ всё ещё существует' : '✅ действительно удалена'}`
    );

    console.log('[Cookie] Удалено');
}

/**
 * Получает значение Cookie по имени.
 */
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
        const [key, ...rest] = c.trim().split('=');
        if (key === name) return rest.join('=');
    }
    return null;
}

// ==========================================================================
// ЗАДАНИЕ 3. РАБОТА С LOCAL STORAGE
// ==========================================================================

const LS_KEY = 'starevents_user';

function saveUserToLocalStorage() {
    const resultEl = document.getElementById('storageResult');
    if (!resultEl) return;

    const data = readStorageForm();

    if (!data.fio || !data.email) {
        showStorageResult(resultEl, 'error', '⚠️ ФИО и Email — обязательные поля');
        return;
    }

    try {
        const json = JSON.stringify(data);
        localStorage.setItem(LS_KEY, json);

        showStorageResult(resultEl, 'success',
            `<b>✅ Данные сохранены в Local Storage</b><br><br>` +
            `<b>Ключ:</b> <code>${LS_KEY}</code><br>` +
            `<b>Размер:</b> ${json.length} байт<br>` +
            `<b>Всего ключей в LS:</b> ${localStorage.length}<br><br>` +
            `<b>Содержимое:</b><br>` +
            formatDataAsHtml(data)
        );

        console.log('[LocalStorage] Сохранено:', data);
    } catch (e) {
        showStorageResult(resultEl, 'error', `❌ Ошибка: ${e.message}`);
    }
}

function readUserFromLocalStorage() {
    const resultEl = document.getElementById('storageResult');
    if (!resultEl) return;

    const raw = localStorage.getItem(LS_KEY);

    if (!raw) {
        showStorageResult(resultEl, 'error',
            `❌ В Local Storage нет записи с ключом <code>${LS_KEY}</code><br>` +
            `Сначала сохраните данные.`
        );
        return;
    }

    let data;
    try {
        data = JSON.parse(raw);
    } catch (e) {
        showStorageResult(resultEl, 'error', '❌ Не удалось разобрать JSON из Local Storage');
        return;
    }

    fillStorageForm(data, 'storage');

    showStorageResult(resultEl, 'success',
        `<b>📖 Данные из Local Storage</b><br><br>` +
        `<b>Ключ:</b> <code>${LS_KEY}</code><br>` +
        `<b>Размер:</b> ${raw.length} байт<br><br>` +
        `<b>Содержимое:</b><br>` +
        formatDataAsHtml(data)
    );

    console.log('[LocalStorage] Прочитано:', data);
}

function clearUserLocalStorage() {
    const resultEl = document.getElementById('storageResult');
    if (!resultEl) return;

    localStorage.removeItem(LS_KEY);
    clearStorageForm('storage');

    showStorageResult(resultEl, 'success',
        `<b>🗑 Запись удалена из Local Storage</b><br><br>` +
        `<b>Ключ:</b> <code>${LS_KEY}</code><br>` +
        `<b>Проверка:</b> ${localStorage.getItem(LS_KEY) === null ? '✅ удалено' : '⚠️ всё ещё есть'}`
    );

    console.log('[LocalStorage] Удалено');
}

/**
 * Полная очистка Local Storage (все ключи).
 */
function clearAllLocalStorage() {
    const resultEl = document.getElementById('storageResult');
    if (!resultEl) return;

    if (!confirm('Полностью очистить Local Storage (включая корзину)?')) return;

    localStorage.clear();
    clearStorageForm('storage');

    showStorageResult(resultEl, 'success',
        `<b>🗑 Local Storage полностью очищен</b><br>` +
        `Все ключи удалены.`
    );

    console.log('[LocalStorage] Полная очистка');
}

// ==========================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ФОРМ
// ==========================================================================

function readCookieForm() {
    return {
        fio: document.getElementById('c_fio')?.value.trim() || '',
        email: document.getElementById('c_email')?.value.trim() || '',
        birthDate: document.getElementById('c_birth')?.value || '',
        birthPlace: document.getElementById('c_place')?.value.trim() || '',
        phone: document.getElementById('c_phone')?.value.trim() || '',
        hobbies: document.getElementById('c_hobbies')?.value.trim() || '',
        savedAt: new Date().toISOString()
    };
}

function readStorageForm() {
    return {
        fio: document.getElementById('s_fio')?.value.trim() || '',
        email: document.getElementById('s_email')?.value.trim() || '',
        birthDate: document.getElementById('s_birth')?.value || '',
        birthPlace: document.getElementById('s_place')?.value.trim() || '',
        phone: document.getElementById('s_phone')?.value.trim() || '',
        hobbies: document.getElementById('s_hobbies')?.value.trim() || '',
        savedAt: new Date().toISOString()
    };
}

function fillStorageForm(data, prefix) {
    const p = prefix === 'cookie' ? 'c_' : 's_';
    setValue(p + 'fio', data.fio);
    setValue(p + 'email', data.email);
    setValue(p + 'birth', data.birthDate);
    setValue(p + 'place', data.birthPlace);
    setValue(p + 'phone', data.phone);
    setValue(p + 'hobbies', data.hobbies);
}

function clearStorageForm(prefix) {
    const p = prefix === 'cookie' ? 'c_' : 's_';
    ['fio', 'email', 'birth', 'place', 'phone', 'hobbies'].forEach(k => setValue(p + k, ''));
}

function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
}

function showStorageResult(el, type, html) {
    el.innerHTML = html;
    el.classList.remove('storage-result--success', 'storage-result--error');
    el.classList.add(type === 'success' ? 'storage-result--success' : 'storage-result--error');
}

function formatDataAsHtml(data) {
    const fields = [
        ['ФИО', data.fio],
        ['Email', data.email],
        ['Дата рождения', data.birthDate],
        ['Место рождения', data.birthPlace],
        ['Телефон', data.phone],
        ['Увлечения', data.hobbies],
        ['Сохранено', data.savedAt ? new Date(data.savedAt).toLocaleString('ru-RU') : '—']
    ];

    return fields.map(([label, value]) => 
        `<div class="storage-result__item">
            <span class="storage-result__key">${label}:</span>
            <span>${escapeHtmlCatalog(value || '—')}</span>
        </div>`
    ).join('');
}

// ==========================================================================
// ИНИЦИАЛИЗАЦИЯ
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    loadCatalog();
    console.log('📦 Модуль корзины, Cookie и LocalStorage загружен');
});