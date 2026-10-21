// ==========================================================================
// ДАННЫЕ САЙТА
// ==========================================================================
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

// ==========================================================================
// ЗАГРУЗКА КОНТЕНТА
// ==========================================================================
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
    
    // BOM
    initBOMAnalysis();
    initPageTimer();
    initHistoryAndParams();
    
    // DOM-лаборатория
    initDOMEvents();
    initGlobalPromoTimer();
    
    // Интерфейсные события (Задание 2)
    initMouseEvents();
    initKeyboardEvents();
    initDragDropEvents();
    initPointerEvents();
    initScrollEvents();
    initTouchEvents();
    initTimerEvents();
    
    // ЛР16: Пользовательские объекты
    initObjectsLab();
    
    console.log('StarEvents сайт загружен');
});

// ==========================================================================
// DOM LAB: 0. СВОЙСТВА ОБЪЕКТА DOCUMENT
// ==========================================================================
function domLog(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = message;
        el.style.borderLeft = '4px solid #7026ED';
    }
    console.log('[DOM Demo]', message);
}

function demoDocumentTitle() {
    const oldTitle = document.title;
    domLog('documentResult',
        `<b>document.title</b> → "${oldTitle}"<br>` +
        `Свойство доступно для чтения и записи.<br>` +
        `Попробуйте: <code>document.title = 'Новый заголовок'</code>`);
}

function demoDocumentURL() {
    domLog('documentResult',
        `<b>document.URL</b> → ${document.URL}<br>` +
        `<b>document.documentURI</b> → ${document.documentURI}`);
}

function demoDocumentInfo() {
    domLog('documentResult',
        `<b>document.domain</b> → ${document.domain || '(пусто для file://)'}<br>` +
        `<b>document.referrer</b> → ${document.referrer || '(нет)'}<br>` +
        `<b>document.characterSet</b> → ${document.characterSet}`);
}

function demoDocumentReady() {
    domLog('documentResult',
        `<b>document.readyState</b> → "${document.readyState}"<br>` +
        `<b>document.lastModified</b> → ${document.lastModified}<br>` +
        `readyState может быть: "loading", "interactive", "complete"`);
}

function demoDocumentCharset() {
    domLog('documentResult',
        `<b>document.characterSet</b> → ${document.characterSet}<br>` +
        `<b>document.contentType</b> → ${document.contentType}<br>` +
        `<b>document.compatMode</b> → ${document.compatMode}`);
}

function demoDocumentAll() {
    const info = {
        title: document.title,
        URL: document.URL,
        domain: document.domain || '(пусто)',
        referrer: document.referrer || '(нет)',
        readyState: document.readyState,
        lastModified: document.lastModified,
        characterSet: document.characterSet,
        contentType: document.contentType,
        compatMode: document.compatMode,
        activeElement: document.activeElement ? document.activeElement.tagName : '—'
    };
    
    let html = '<b>Все свойства document:</b><br>';
    for (const key in info) {
        html += `• <b>document.${key}</b> → ${info[key]}<br>`;
    }
    const titleDisplay = document.getElementById('docTitleDisplay');
    if (titleDisplay) titleDisplay.textContent = document.title;
    
    domLog('documentResult', html);
}

// ==========================================================================
// DOM LAB: 1. ПОИСК ЭЛЕМЕНТОВ
// ==========================================================================
function demoGetElementById() {
    const el = document.getElementById('demoText');
    if (el) {
        el.style.color = '#FF2E93';
        el.textContent = '✅ Текст изменён через getElementById!';
        domLog('searchResult', 
            `getElementById('demoText') → найден элемент <br>` +
            `tagName: <b>${el.tagName}</b>, id: <b>${el.id}</b>, textContent: "${el.textContent}"`);
    }
}

function demoQuerySelector() {
    const el = document.querySelector('.demo-item');
    if (el) {
        el.style.background = '#FFF1EC';
        domLog('searchResult',
            `querySelector('.demo-item') → <b>первый</b> найденный элемент <br>` +
            `textContent: "${el.textContent}"`);
    }
}

function demoQuerySelectorAll() {
    const els = document.querySelectorAll('.demo-item');
    els.forEach((el, i) => {
        el.style.borderLeft = `4px solid hsl(${i * 60}, 80%, 60%)`;
    });
    domLog('searchResult',
        `querySelectorAll('.demo-item') → найдено <b>${els.length}</b> элементов (NodeList)<br>` +
        els.length + ' элементов подсвечены разными цветами.');
}

function demoGetElementsByClassName() {
    const els = document.getElementsByClassName('demo-item');
    domLog('searchResult',
        `getElementsByClassName('demo-item') → <b>${els.length}</b> элементов (HTMLCollection)<br>` +
        `Тип коллекции: ${els.constructor.name} — живая!`);
}

function demoQueryByDataAttr() {
    const el = document.querySelector('[data-role="badge"]');
    if (el) {
        domLog('searchResult',
            `querySelector('[data-role="badge"]') → найден <br>` +
            `dataset: <b>${JSON.stringify(el.dataset)}</b>`);
    }
}

// ==========================================================================
// DOM LAB: 2. НАВИГАЦИЯ ПО DOM
// ==========================================================================
function demoParent() {
    const child = document.getElementById('navChild2');
    const parent = child.parentNode;
    parent.style.outline = '3px dashed #FF2E93';
    domLog('navResult',
        `child.parentNode → <b>${parent.tagName}</b> (id="${parent.id}")<br>` +
        `У родителя детей: ${parent.children.length}`);
}

function demoChildren() {
    const parent = document.getElementById('navParent');
    const children = parent.children;
    [...children].forEach((c, i) => {
        c.style.background = `hsl(${i * 80}, 80%, 92%)`;
    });
    domLog('navResult',
        `parent.children → <b>${children.length}</b> элемента<br>` +
        `Типы: ${[...children].map(c => c.tagName).join(', ')}`);
}

function demoFirstLast() {
    const parent = document.getElementById('navParent');
    const first = parent.firstElementChild;
    const last = parent.lastElementChild;
    first.style.fontWeight = 'bold';
    last.style.fontStyle = 'italic';
    domLog('navResult',
        `firstElementChild: <b>${first.textContent}</b><br>` +
        `lastElementChild: <b>${last.textContent}</b>`);
}

function demoSiblings() {
    const child2 = document.getElementById('navChild2');
    const prev = child2.previousElementSibling;
    const next = child2.nextElementSibling;
    if (prev) prev.style.color = '#FF6F43';
    if (next) next.style.color = '#7026ED';
    domLog('navResult',
        `previousElementSibling: <b>${prev ? prev.textContent : 'нет'}</b><br>` +
        `nextElementSibling: <b>${next ? next.textContent : 'нет'}</b>`);
}

function demoNodeType() {
    const el = document.getElementById('navParent');
    const types = {
        1: 'ELEMENT_NODE',
        2: 'ATTRIBUTE_NODE',
        3: 'TEXT_NODE',
        8: 'COMMENT_NODE',
        9: 'DOCUMENT_NODE'
    };
    domLog('navResult',
        `nodeType: <b>${el.nodeType}</b> (${types[el.nodeType] || 'unknown'})<br>` +
        `nodeName: <b>${el.nodeName}</b><br>` +
        `nodeValue: <b>${el.nodeValue}</b> (у элементов всегда null)`);
}

// ==========================================================================
// DOM LAB: 3. СОЗДАНИЕ / ДОБАВЛЕНИЕ / УДАЛЕНИЕ
// ==========================================================================
let createCounter = 0;

function demoCreateAppend() {
    const area = document.getElementById('createDemoArea');
    const p = document.createElement('p');
    p.className = 'create-item';
    p.textContent = `Созданный элемент #${++createCounter} (append)`;
    p.style.color = '#1B9E4B';
    area.append(p);
    domLog('createResult',
        `createElement('p') + append() → добавлен в конец.<br>` +
        `Всего элементов: ${area.children.length}`);
}

function demoCreatePrepend() {
    const area = document.getElementById('createDemoArea');
    const p = document.createElement('p');
    p.className = 'create-item';
    p.textContent = `Созданный элемент #${++createCounter} (prepend)`;
    p.style.color = '#7026ED';
    area.prepend(p);
    domLog('createResult',
        `createElement('p') + prepend() → добавлен в начало.<br>` +
        `Всего элементов: ${area.children.length}`);
}

function demoInsertBefore() {
    const area = document.getElementById('createDemoArea');
    const first = area.firstElementChild;
    if (!first) return;
    const p = document.createElement('p');
    p.className = 'create-item';
    p.textContent = `Вставлен перед "${first.textContent.substring(0, 20)}..."`;
    p.style.color = '#FF6F43';
    area.insertBefore(p, first);
    domLog('createResult',
        `insertBefore(newNode, referenceNode) → вставлен перед первым.<br>` +
        `Всего элементов: ${area.children.length}`);
}

function demoReplaceElement() {
    const area = document.getElementById('createDemoArea');
    const first = area.firstElementChild;
    if (!first) return;
    const replacement = document.createElement('p');
    replacement.className = 'create-item';
    replacement.textContent = '🔁 ЗАМЕНЁННЫЙ элемент (replaceWith)';
    replacement.style.background = '#FFE8E0';
    replacement.style.padding = '8px';
    replacement.style.borderRadius = '6px';
    first.replaceWith(replacement);
    domLog('createResult',
        `element.replaceWith(newElement) → старый узел удалён из DOM.<br>` +
        `Всего элементов: ${area.children.length}`);
}

function demoRemoveLast() {
    const area = document.getElementById('createDemoArea');
    const last = area.lastElementChild;
    if (last) {
        const removedText = last.textContent;
        last.remove();
        domLog('createResult',
            `element.remove() → удалён: "${removedText.substring(0, 30)}..."<br>` +
            `Всего элементов: ${area.children.length}`);
    } else {
        domLog('createResult', 'Нечего удалять — список пуст.');
    }
}

function demoCloneElement() {
    const area = document.getElementById('createDemoArea');
    const first = area.firstElementChild;
    if (!first) return;
    const clone = first.cloneNode(true);
    clone.textContent = '📋 Клон: ' + first.textContent.substring(0, 25) + '...';
    clone.style.opacity = '0.7';
    clone.style.borderLeft = '4px solid #FF2E93';
    area.append(clone);
    domLog('createResult',
        `cloneNode(true) → создан глубокий клон.<br>` +
        `Всего элементов: ${area.children.length}`);
}

// ==========================================================================
// DOM LAB: 4. УПРАВЛЕНИЕ АТРИБУТАМИ
// ==========================================================================
function demoGetAttribute() {
    const link = document.getElementById('attrLink');
    const href = link.getAttribute('href');
    const target = link.getAttribute('target');
    const priority = link.getAttribute('data-priority');
    domLog('attrResult',
        `getAttribute('href') → <b>${href}</b><br>` +
        `getAttribute('target') → <b>${target}</b><br>` +
        `getAttribute('data-priority') → <b>${priority}</b>`);
}

function demoSetAttribute() {
    const link = document.getElementById('attrLink');
    link.setAttribute('href', 'https://starevents.example.com');
    link.setAttribute('data-updated', new Date().toLocaleTimeString());
    domLog('attrResult',
        `setAttribute('href', 'https://starevents.example.com')<br>` +
        `setAttribute('data-updated', '...')<br>` +
        `Новый href: <b>${link.getAttribute('href')}</b>`);
}

function demoHasAttribute() {
    const link = document.getElementById('attrLink');
    const has = link.hasAttribute('target');
    const hasData = link.hasAttribute('data-category');
    domLog('attrResult',
        `hasAttribute('target') → <b>${has}</b><br>` +
        `hasAttribute('data-category') → <b>${hasData}</b>`);
}

function demoRemoveAttribute() {
    const link = document.getElementById('attrLink');
    link.removeAttribute('target');
    domLog('attrResult',
        `removeAttribute('target') → атрибут удалён.<br>` +
        `hasAttribute('target') → <b>${link.hasAttribute('target')}</b>`);
}

function demoDataset() {
    const link = document.getElementById('attrLink');
    const data = { ...link.dataset };
    domLog('attrResult',
        `element.dataset → <b>${JSON.stringify(data)}</b><br>` +
        `dataset.category = "${link.dataset.category}"<br>` +
        `dataset.priority = "${link.dataset.priority}"`);
}

function demoClassList() {
    const box = document.getElementById('attrBox');
    const has = box.classList.contains('active');
    box.classList.toggle('active');
    domLog('attrResult',
        `classList.toggle('active')<br>` +
        `Было активно: <b>${has}</b> → стало: <b>${box.classList.contains('active')}</b><br>` +
        `Все классы: <b>${box.className}</b>`);
}

// ==========================================================================
// DOM LAB: 5. ИЗМЕНЕНИЕ СТИЛЕЙ
// ==========================================================================
function demoStyleDirect() {
    const box = document.getElementById('styleBox');
    box.style.backgroundColor = '#FF6F43';
    box.style.color = '#FFFFFF';
    box.style.borderRadius = '20px';
    box.style.transform = 'scale(1.05)';
    domLog('styleResult',
        `style.backgroundColor = '#FF6F43'<br>` +
        `style.color = '#FFFFFF'<br>` +
        `style.borderRadius = '20px'<br>` +
        `style.transform = 'scale(1.05)'`);
}

function demoStyleCssText() {
    const box = document.getElementById('styleBox');
    box.style.cssText = 'background: linear-gradient(135deg,#7026ED,#FF2E93); color:white; padding:30px; border-radius:16px; box-shadow:0 10px 30px rgba(112,38,237,0.3);';
    domLog('styleResult',
        `style.cssText = '...' — массовая установка стилей.<br>` +
        `CSS текст: <b>${box.style.cssText.substring(0, 80)}...</b>`);
}

function demoAddClass() {
    const box = document.getElementById('styleBox');
    box.classList.add('highlight');
    domLog('styleResult',
        `classList.add('highlight') → класс добавлен.<br>` +
        `Текущие классы: <b>${box.className}</b>`);
}

function demoRemoveClass() {
    const box = document.getElementById('styleBox');
    box.classList.remove('highlight');
    domLog('styleResult',
        `classList.remove('highlight') → класс удалён.<br>` +
        `Текущие классы: <b>${box.className || '(нет)'}</b>`);
}

function demoToggleClass() {
    const box = document.getElementById('styleBox');
    box.classList.toggle('highlight');
    domLog('styleResult',
        `classList.toggle('highlight') → переключено.<br>` +
        `Текущие классы: <b>${box.className || '(нет)'}</b>`);
}

function demoGetComputed() {
    const box = document.getElementById('styleBox');
    const styles = getComputedStyle(box);
    domLog('styleResult',
        `getComputedStyle(element) — вычисленные стили:<br>` +
        `background-color: <b>${styles.backgroundColor}</b><br>` +
        `font-size: <b>${styles.fontSize}</b><br>` +
        `padding: <b>${styles.padding}</b>`);
}

function demoResetStyle() {
    const box = document.getElementById('styleBox');
    box.style.cssText = '';
    box.className = 'style-box';
    domLog('styleResult', 'Все inline-стили и классы сброшены.');
}

// ==========================================================================
// DOM LAB: 6. СОБЫТИЯ
// ==========================================================================
function initDOMEvents() {
    const btn = document.getElementById('eventBtn');
    if (btn) {
        btn.addEventListener('click', function(e) {
            domLog('eventResult',
                `Событие: <b>${e.type}</b><br>` +
                `Цель: <b>${e.target.tagName}#${e.target.id}</b><br>` +
                `Координаты: (${e.clientX}, ${e.clientY})`);
        });
    }
    
    const input = document.getElementById('eventInput');
    if (input) {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.value.trim()) {
                domLog('eventResult',
                    `Событие: <b>${e.type}</b>, клавиша: <b>${e.key}</b><br>` +
                    `Введено: <b>"${e.target.value}"</b>`);
                e.target.value = '';
            }
        });
    }
    
    const list = document.getElementById('eventList');
    if (list) {
        list.addEventListener('click', function(e) {
            if (e.target.classList.contains('event-item')) {
                e.target.style.background = '#FFE8E0';
                e.target.style.padding = '8px';
                e.target.style.borderRadius = '6px';
                domLog('eventResult',
                    `Делегирование: клик по <b>${e.target.tagName}</b><br>` +
                    `Текст: "${e.target.textContent}"<br>` +
                    `Обработчик висит на родителе #${list.id}, а не на элементе.`);
            }
        });
    }
}

// ==========================================================================
// DOM LAB: 7. КОМПЛЕКСНЫЙ ПРИМЕР — ДИНАМИЧЕСКИЙ СПИСОК
// ==========================================================================
function addArtistToList() {
    const nameInput = document.getElementById('newArtistName');
    const priceInput = document.getElementById('newArtistPrice');
    const list = document.getElementById('dynamicArtistList');
    
    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    
    if (!name) {
        alert('Введите имя артиста');
        nameInput.focus();
        return;
    }
    
    const li = document.createElement('li');
    li.className = 'dynamic-item';
    
    const textSpan = document.createElement('span');
    textSpan.textContent = `${name}${price ? ' — ' + price + ' ₽' : ''}`;
    li.appendChild(textSpan);
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'li-remove';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', function() {
        li.remove();
        updateComplexResult();
    });
    li.appendChild(removeBtn);
    
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    li.style.transition = 'all 0.3s ease';
    
    list.appendChild(li);
    
    requestAnimationFrame(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateX(0)';
    });
    
    nameInput.value = '';
    priceInput.value = '';
    nameInput.focus();
    
    updateComplexResult();
}

function removeListItem(btn) {
    const li = btn.closest('.dynamic-item');
    if (li) {
        li.style.opacity = '0';
        li.style.transform = 'translateX(20px)';
        setTimeout(() => {
            li.remove();
            updateComplexResult();
        }, 200);
    }
}

function clearArtistList() {
    const list = document.getElementById('dynamicArtistList');
    if (list.children.length === 0) {
        domLog('complexResult', 'Список уже пуст.');
        return;
    }
    if (confirm('Удалить все элементы списка?')) {
        list.innerHTML = '';
        updateComplexResult();
    }
}

function sortArtistList() {
    const list = document.getElementById('dynamicArtistList');
    const items = [...list.children];
    
    items.sort((a, b) => {
        const textA = a.textContent.toLowerCase();
        const textB = b.textContent.toLowerCase();
        return textA.localeCompare(textB);
    });
    
    items.forEach(item => list.appendChild(item));
    
    updateComplexResult('Список отсортирован по алфавиту');
}

function updateComplexResult(extraMessage) {
    const list = document.getElementById('dynamicArtistList');
    const el = document.getElementById('complexResult');
    if (el) {
        const count = list.children.length;
        el.innerHTML = `Элементов в списке: <b>${count}</b>` + 
                       (extraMessage ? `<br>${extraMessage}` : '');
    }
}

// ==========================================================================
// ГЛОБАЛЬНЫЙ ПРОМО-ТАЙМЕР (в правом нижнем углу)
// ==========================================================================
function initGlobalPromoTimer() {
    let seconds = 5;
    const timerElement = document.createElement('div');
    timerElement.id = 'globalTimer';
    timerElement.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#FF5A36; color:white; padding:10px 15px; border-radius:30px; font-size:14px; z-index:1000; cursor:pointer; box-shadow: 0 5px 20px rgba(255,90,54,0.4);';
    timerElement.innerHTML = '🎉 Акция заканчивается через: ' + seconds + ' сек';
    timerElement.onclick = () => showPromoInfo();
    document.body.appendChild(timerElement);
    
    let counter = seconds;
    const interval = setInterval(function() {
        counter--;
        if (counter > 0) {
            timerElement.innerHTML = '🎉 Акция заканчивается через: ' + counter + ' сек';
        } else {
            clearInterval(interval);
            timerElement.innerHTML = '🎉 Акция завершена!';
        }
    }, 1000);
}

function showPromoInfo() {
    const currentHour = new Date().getHours();
    let promoMessage = '';
    if (currentHour < 12) {
        promoMessage = '☀️ Утренняя акция: скидка 10% на ведущих!';
    } else if (currentHour < 18) {
        promoMessage = '🎸 Дневная акция: бесплатный DJ-сет при заказе шоу!';
    } else {
        promoMessage = '✨ Вечерняя акция: дополнительные 2 часа фотосессии в подарок!';
    }
    alert(promoMessage);
}

// ==========================================================================
// BOM: ИНИЦИАЛИЗАЦИЯ
// ==========================================================================
let pageTimerInterval = null;

function initBOMAnalysis() {
    updateWindowStats();
    window.addEventListener('resize', updateWindowStats);
    window.addEventListener('scroll', updateWindowScroll);

    const navAgentEl = document.getElementById('nav-agent');
    const navLangEl = document.getElementById('nav-lang');
    if (navAgentEl) navAgentEl.innerText = detectBrowserName();
    if (navLangEl) navLangEl.innerText = navigator.language || 'не определён';

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

    const histLenEl = document.getElementById('hist-length');
    if (histLenEl) histLenEl.innerText = history.length;

    const scrResEl = document.getElementById('scr-res');
    const scrAvailEl = document.getElementById('scr-avail');
    const scrDepthEl = document.getElementById('scr-depth');
    const deviceTypeEl = document.getElementById('device-type');
    if (scrResEl) scrResEl.innerText = `${screen.width}x${screen.height}`;
    if (scrAvailEl) scrAvailEl.innerText = `${screen.availWidth}x${screen.availHeight}`;
    if (scrDepthEl) scrDepthEl.innerText = `${screen.colorDepth} бит`;
    if (deviceTypeEl) deviceTypeEl.innerText = 'Тип: ' + detectDeviceType();
}

// ==========================================================================
// ТАЙМЕР ВРЕМЕНИ НА СТРАНИЦЕ
// ==========================================================================
function initPageTimer() {
    const timerEl = document.getElementById('page-timer');
    if (!timerEl) return;
    
    let seconds = 0;
    if (pageTimerInterval) clearInterval(pageTimerInterval);
    
    pageTimerInterval = setInterval(() => {
        seconds++;
        if (document.body.contains(timerEl)) {
            timerEl.innerText = seconds;
        } else {
            clearInterval(pageTimerInterval);
            pageTimerInterval = null;
        }
    }, 1000);
}

function initHistoryAndParams() {
    if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================================================
// ФУНКЦИИ BOM КНОПОК
// ==========================================================================
function openPromoPopup() {
    const popup = window.open('', 'Promo', 'width=400,height=400');
    if (!popup) {
        alert('Всплывающее окно заблокировано. Разрешите его в браузере.');
        return;
    }
    popup.document.write(`
        <!DOCTYPE html>
        <html><head><title>Промо</title></head>
        <body style="font-family:Arial;text-align:center;padding:40px;background:linear-gradient(135deg,#FF6F43,#FF2E93);color:white;">
            <h2>🎉 Промо-акция!</h2>
            <p>Скидка 15% на первое бронирование</p>
            <button onclick="window.close()" style="padding:10px 20px;border:none;border-radius:8px;cursor:pointer;">Закрыть</button>
        </body></html>
    `);
    popup.document.close();
}

function scrollToHero() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function printPage() { window.print(); }

function updateWindowStats() {
    const winSizeEl = document.getElementById('win-size');
    if (winSizeEl) winSizeEl.innerText = `${window.innerWidth}x${window.innerHeight}`;
    const deviceTypeEl = document.getElementById('device-type');
    if (deviceTypeEl) deviceTypeEl.innerText = 'Тип: ' + detectDeviceType();
}

function updateWindowScroll() {
    const el = document.getElementById('win-scroll');
    if (el) el.innerText = Math.round(window.scrollY);
}

function checkNetworkStatus() {
    alert('Статус сети: ' + (navigator.onLine ? 'Онлайн ✅' : 'Офлайн ❌'));
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
    alert(`Язык системы: ${navigator.language || '—'}\nВсе языки: ${(navigator.languages || []).join(', ') || '—'}`);
}

function refreshCurrentPage() { location.reload(); }

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

function goBackInHistory() { history.back(); }
function goForwardInHistory() { history.forward(); }
function historyGoStep() { history.go(-1); }

function showColorDepth() {
    alert('Глубина цвета: ' + screen.colorDepth + ' бит\nPixel depth: ' + screen.pixelDepth + ' бит');
}

function showAvailableScreen() {
    alert('Общий экран: ' + screen.width + 'x' + screen.height + 
          '\nДоступная область: ' + screen.availWidth + 'x' + screen.availHeight);
}

function checkOrientation() {
    let orientation = 'не определена';
    if (screen.orientation && screen.orientation.type) {
        orientation = screen.orientation.type;
    } else if (window.orientation !== undefined) {
        orientation = (window.orientation === 0 || window.orientation === 180) ? 'portrait' : 'landscape';
    }
    alert('Ориентация экрана: ' + orientation);
}

// ==========================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================================================================
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
    if (isTabletUA || (isMobileUA && width >= 600 && width < 1024)) return 'Планшет 📱';
    if (isMobileUA || width < 600) return 'Телефон 📞';
    return 'Десктоп 💻';
}

// ==========================================================================
// ФУНКЦИИ ИНТЕРФЕЙСА
// ==========================================================================
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
    observeNewFadeElements(container);
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
    observeNewFadeElements(container);
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
    observeNewFadeElements(container);
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

let currentReviewIndex = 0;

function loadReviews() {
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

// ==========================================================================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ (с поддержкой динамического контента)
// ==========================================================================
let scrollObserver = null;

function initScrollAnimation() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fade-animate').forEach(a => a.classList.add('visible'));
        return;
    }
    
    scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-animate').forEach(a => scrollObserver.observe(a));
}

function observeNewFadeElements(container) {
    if (!scrollObserver) return;
    container.querySelectorAll('.fade-animate').forEach(el => {
        if (!el.classList.contains('visible')) {
            scrollObserver.observe(el);
        }
    });
}

// ==========================================================================
// ДИАЛОГИ
// ==========================================================================
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

// ==========================================================================
// ==========================================================================
// ЗАДАНИЕ 2: ИНТЕРФЕЙСНЫЕ СОБЫТИЯ
// ==========================================================================
// ==========================================================================

// ---------- 1. СОБЫТИЯ МЫШИ ----------
function initMouseEvents() {
    const zone = document.getElementById('mouseZone');
    const coords = document.getElementById('mouseCoords');
    const log = document.getElementById('mouseLog');
    
    if (!zone || !coords || !log) return;

    let logMessages = [];
    const maxLogSize = 8;

    function addLog(message) {
        const time = new Date().toLocaleTimeString();
        logMessages.push(`<span class="log-time">[${time}]</span> ${message}`);
        if (logMessages.length > maxLogSize) {
            logMessages.shift();
        }
        log.innerHTML = logMessages.join('<br>');
        log.scrollTop = log.scrollHeight;
    }

    zone.addEventListener('click', function(e) {
        addLog(`<b>click</b> → координаты: (${e.clientX}, ${e.clientY})`);
        zone.style.borderColor = '#FF2E93';
        setTimeout(() => { zone.style.borderColor = '#FF6F43'; }, 200);
    });

    zone.addEventListener('dblclick', function(e) {
        addLog(`<b>dblclick</b> → двойной клик!`);
        zone.style.background = 'linear-gradient(135deg, #FFE8E0, #F0F2FF)';
        setTimeout(() => { zone.style.background = 'linear-gradient(135deg, #FAFBFF, #F0F2FF)'; }, 300);
    });

    zone.addEventListener('mouseover', function(e) {
        addLog(`<b>mouseover</b> → курсор вошёл в зону`);
    });

    zone.addEventListener('mouseout', function(e) {
        addLog(`<b>mouseout</b> → курсор покинул зону`);
    });

    zone.addEventListener('mousedown', function(e) {
        addLog(`<b>mousedown</b> → кнопка ${e.button === 0 ? 'левая' : e.button === 1 ? 'средняя' : 'правая'} нажата`);
        zone.style.transform = 'scale(0.98)';
    });

    zone.addEventListener('mouseup', function(e) {
        addLog(`<b>mouseup</b> → кнопка отпущена`);
        zone.style.transform = 'scale(1)';
    });

    zone.addEventListener('mousemove', function(e) {
        const rect = zone.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        coords.textContent = `x: ${x}, y: ${y}`;
    });
}

// ---------- 2. СОБЫТИЯ КЛАВИАТУРЫ ----------
function initKeyboardEvents() {
    const input = document.getElementById('keyboardInput');
    const visual = document.getElementById('keyVisual');
    const log = document.getElementById('keyboardLog');
    
    if (!input || !visual || !log) return;

    let logMessages = [];
    const maxLogSize = 6;

    function addLog(message) {
        const time = new Date().toLocaleTimeString();
        logMessages.push(`<span class="log-time">[${time}]</span> ${message}`);
        if (logMessages.length > maxLogSize) {
            logMessages.shift();
        }
        log.innerHTML = logMessages.join('<br>');
        log.scrollTop = log.scrollHeight;
    }

    input.addEventListener('keydown', function(e) {
        const keyDisplay = e.key === ' ' ? 'Space' : e.key;
        visual.textContent = keyDisplay.length > 1 ? keyDisplay : keyDisplay.toUpperCase();
        visual.classList.add('active');
        
        addLog(`<b>keydown</b> → клавиша: <b>${keyDisplay}</b>, код: ${e.code}`);

        if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
            const mods = [];
            if (e.ctrlKey) mods.push('Ctrl');
            if (e.altKey) mods.push('Alt');
            if (e.shiftKey) mods.push('Shift');
            if (e.metaKey) mods.push('Meta');
            addLog(`&nbsp;&nbsp;Модификаторы: <b>${mods.join(' + ')}</b>`);
        }

        if (e.key === 'Escape') {
            addLog(`&nbsp;&nbsp;⚠️ Нажата клавиша Escape`);
        }
    });

    input.addEventListener('keyup', function(e) {
        visual.classList.remove('active');
        addLog(`<b>keyup</b> → клавиша отпущена: <b>${e.key === ' ' ? 'Space' : e.key}</b>`);
    });

    input.addEventListener('keypress', function(e) {
        addLog(`<b>keypress</b> → введён символ: "${e.key}"`);
    });
}

// ---------- 3. DRAG & DROP ----------
function initDragDropEvents() {
    const cards = document.querySelectorAll('.drag-card');
    const dropZone = document.getElementById('dropZone');
    const dropList = document.getElementById('dropList');
    const log = document.getElementById('dragLog');
    
    if (!dropZone || !log || !dropList) return;

    let logMessages = [];
    const maxLogSize = 6;

    function addLog(message) {
        const time = new Date().toLocaleTimeString();
        logMessages.push(`<span class="log-time">[${time}]</span> ${message}`);
        if (logMessages.length > maxLogSize) {
            logMessages.shift();
        }
        log.innerHTML = logMessages.join('<br>');
        log.scrollTop = log.scrollHeight;
    }

    cards.forEach(card => {
        card.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                artist: card.dataset.artist,
                price: card.dataset.price
            }));
            e.dataTransfer.effectAllowed = 'copy';
            card.classList.add('dragging');
            addLog(`<b>dragstart</b> → начато перетаскивание: <b>${card.dataset.artist}</b>`);
        });

        card.addEventListener('dragend', function(e) {
            card.classList.remove('dragging');
            addLog(`<b>dragend</b> → перетаскивание завершено: <b>${card.dataset.artist}</b>`);
        });
    });

    dropZone.addEventListener('dragenter', function(e) {
        e.preventDefault();
        addLog(`<b>dragenter</b> → элемент над зоной`);
    });

    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        dropZone.classList.add('drag-over');
        addLog(`<b>dragover</b> → перемещение над зоной`);
    });

    dropZone.addEventListener('dragleave', function(e) {
        dropZone.classList.remove('drag-over');
        addLog(`<b>dragleave</b> → элемент покинул зону`);
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const li = document.createElement('li');
            li.textContent = `🎤 ${data.artist} — ${data.price} ₽`;
            dropList.appendChild(li);
            addLog(`<b>drop</b> → добавлен артист: <b>${data.artist}</b> (${data.price} ₽)`);
        } catch (err) {
            addLog(`<b>drop</b> → ошибка при получении данных`);
        }
    });
}

// ---------- 4. СОБЫТИЯ УКАЗАТЕЛЯ ----------
function initPointerEvents() {
    const zone = document.getElementById('pointerZone');
    const dot = document.getElementById('pointerDot');
    const log = document.getElementById('pointerLog');
    
    if (!zone || !dot || !log) return;

    let logMessages = [];
    const maxLogSize = 6;

    function addLog(message) {
        const time = new Date().toLocaleTimeString();
        logMessages.push(`<span class="log-time">[${time}]</span> ${message}`);
        if (logMessages.length > maxLogSize) {
            logMessages.shift();
        }
        log.innerHTML = logMessages.join('<br>');
        log.scrollTop = log.scrollHeight;
    }

    zone.addEventListener('pointerdown', function(e) {
        addLog(`<b>pointerdown</b> → тип: ${e.pointerType}, id: ${e.pointerId}`);
        zone.style.background = 'linear-gradient(135deg, #E8E0FF, #F0F2FF)';
        dot.style.opacity = '1';
    });

    zone.addEventListener('pointermove', function(e) {
        const rect = zone.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.opacity = '1';

        addLog(`<b>pointermove</b> → (${Math.round(x)}, ${Math.round(y)})`);
    });

    zone.addEventListener('pointerup', function(e) {
        addLog(`<b>pointerup</b> → тип: ${e.pointerType}, кнопка: ${e.button}`);
        zone.style.background = 'linear-gradient(135deg, #F0F2FF, #FAFBFF)';
        dot.style.opacity = '0';
    });

    zone.addEventListener('pointerover', function(e) {
        addLog(`<b>pointerover</b> → указатель вошёл в зону`);
        dot.style.opacity = '1';
    });

    zone.addEventListener('pointerout', function(e) {
        addLog(`<b>pointerout</b> → указатель покинул зону`);
        dot.style.opacity = '0';
    });
}

// ---------- 5. СОБЫТИЯ ПРОКРУТКИ ----------
function initScrollEvents() {
    const scrollDemo = document.getElementById('scrollDemo');
    const scrollBar = document.getElementById('scrollBar');
    const log = document.getElementById('scrollLog');
    
    if (!scrollDemo || !scrollBar || !log) return;

    let logMessages = [];
    const maxLogSize = 4;

    function addLog(message) {
        const time = new Date().toLocaleTimeString();
        logMessages.push(`<span class="log-time">[${time}]</span> ${message}`);
        if (logMessages.length > maxLogSize) {
            logMessages.shift();
        }
        log.innerHTML = logMessages.join('<br>');
        log.scrollTop = log.scrollHeight;
    }

    scrollDemo.addEventListener('scroll', function() {
        const scrollTop = scrollDemo.scrollTop;
        const scrollHeight = scrollDemo.scrollHeight - scrollDemo.clientHeight;
        const percent = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;

        scrollBar.style.width = percent + '%';
        log.innerHTML = `Прокрутка: <b>${Math.round(scrollTop)}</b> px (${percent}%)`;

        if (percent > 0 && percent < 100) {
            addLog(`<b>scroll</b> → позиция: ${Math.round(scrollTop)} px (${percent}%)`);
        } else if (percent === 100) {
            addLog(`<b>scroll</b> → достигнут конец!`);
        }
    });
}

// ---------- 6. СОБЫТИЯ СЕНСОРНЫХ ЭКРАНОВ ----------
function initTouchEvents() {
    const zone = document.getElementById('touchZone');
    const ripple = document.getElementById('touchRipple');
    const log = document.getElementById('touchLog');
    
    if (!zone || !ripple || !log) return;

    let logMessages = [];
    const maxLogSize = 6;

    function addLog(message) {
        const time = new Date().toLocaleTimeString();
        logMessages.push(`<span class="log-time">[${time}]</span> ${message}`);
        if (logMessages.length > maxLogSize) {
            logMessages.shift();
        }
        log.innerHTML = logMessages.join('<br>');
        log.scrollTop = log.scrollHeight;
    }

    zone.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = zone.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.remove('ripple-active');
        void ripple.offsetWidth;
        ripple.classList.add('ripple-active');

        addLog(`<b>touchstart</b> → касание: (${Math.round(x)}, ${Math.round(y)}), количество: ${e.touches.length}`);
    }, { passive: false });

    zone.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = zone.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        addLog(`<b>touchmove</b> → движение: (${Math.round(x)}, ${Math.round(y)})`);
    }, { passive: false });

    zone.addEventListener('touchend', function(e) {
        e.preventDefault();
        addLog(`<b>touchend</b> → касание завершено, осталось касаний: ${e.touches.length}`);
    }, { passive: false });

    zone.addEventListener('touchcancel', function(e) {
        e.preventDefault();
        addLog(`<b>touchcancel</b> → касание отменено`);
    }, { passive: false });

    zone.addEventListener('mousedown', function(e) {
        if (!('ontouchstart' in window)) {
            addLog(`ℹ️ Сенсорные события не поддерживаются. Откройте на мобильном или эмулируйте в DevTools.`);
        }
    });
}

// ---------- 7. СОБЫТИЯ, СВЯЗАННЫЕ С ТАЙМЕРОМ ----------
let countdownInterval = null;
let stopwatchInterval = null;
let stopwatchSeconds = 0;
let stopwatchRunning = false;
let progressInterval = null;
let progressValue = 0;
let progressRunning = false;

function startCountdown() {
    const display = document.getElementById('countdownDisplay');
    if (!display) return;

    if (countdownInterval) clearInterval(countdownInterval);

    let seconds = 10;
    display.textContent = seconds;
    display.style.color = '#7026ED';

    countdownInterval = setInterval(function() {
        seconds--;
        display.textContent = seconds;

        if (seconds <= 3) {
            display.style.color = '#FF2E93';
        }
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            display.textContent = '🎉';
            display.style.color = '#FF6F43';
        }
    }, 1000);
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    const display = document.getElementById('countdownDisplay');
    if (display) {
        display.textContent = '⏹';
        display.style.color = '#8A8D9F';
    }
}

function startStopwatch() {
    if (stopwatchRunning) return;
    stopwatchRunning = true;

    const display = document.getElementById('stopwatchDisplay');
    if (!display) return;

    stopwatchInterval = setInterval(function() {
        stopwatchSeconds++;
        const mins = String(Math.floor(stopwatchSeconds / 60)).padStart(2, '0');
        const secs = String(stopwatchSeconds % 60).padStart(2, '0');
        display.textContent = `${mins}:${secs}`;
    }, 1000);
}

function stopStopwatch() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
    stopwatchRunning = false;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchSeconds = 0;
    const display = document.getElementById('stopwatchDisplay');
    if (display) display.textContent = '00:00';
}

function startProgress() {
    if (progressRunning) return;
    progressRunning = true;
    progressValue = 0;

    const fill = document.getElementById('progressFill');
    const percent = document.getElementById('progressPercent');
    if (!fill || !percent) return;

    fill.style.width = '0%';
    percent.textContent = '0%';

    progressInterval = setInterval(function() {
        progressValue += 2;
        if (progressValue > 100) progressValue = 100;

        fill.style.width = progressValue + '%';
        percent.textContent = progressValue + '%';

        if (progressValue >= 100) {
            clearInterval(progressInterval);
            progressInterval = null;
            progressRunning = false;
            percent.textContent = '✅ 100%';
        }
    }, 50);
}

// ==========================================================================
// ==========================================================================
// ЛАБОРАТОРНАЯ РАБОТА №16: ПОЛЬЗОВАТЕЛЬСКИЕ ОБЪЕКТЫ В JAVASCRIPT
// ==========================================================================
// ==========================================================================

// ---------- ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ЛОГИРОВАНИЯ ----------
function objectsLog(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = message;
    }
    console.log('[Objects Lab]', message);
}

// ---------- ЗАДАНИЕ 1. СОЗДАНИЕ И ДОСТУП К ОБЪЕКТУ ----------
let book = null;

function demoBookObject() {
    book = {
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        year: 1967,
        genre: "Роман"
    };

    const info = document.getElementById('bookInfo');
    if (info) {
        info.textContent = `"${book.title}" — ${book.author} (${book.year}), жанр: ${book.genre}`;
    }

    objectsLog('bookResult',
        `<b>Объект book создан литеральной нотацией:</b><br>` +
        `{ title: "${book.title}", author: "${book.author}", year: ${book.year}, genre: "${book.genre}" }`);
}

function demoBookDot() {
    if (!book) { objectsLog('bookResult', 'Сначала создайте объект book (кнопка выше).'); return; }

    console.log('book.title =', book.title);
    console.log('book.author =', book.author);
    console.log('book.year =', book.year);
    console.log('book.genre =', book.genre);

    objectsLog('bookResult',
        `<b>Точечная нотация:</b><br>` +
        `book.title → <b>${book.title}</b><br>` +
        `book.author → <b>${book.author}</b><br>` +
        `book.year → <b>${book.year}</b><br>` +
        `book.genre → <b>${book.genre}</b><br>` +
        `<i>(также выведено в консоль)</i>`);
}

function demoBookBracket() {
    if (!book) { objectsLog('bookResult', 'Сначала создайте объект book (кнопка выше).'); return; }

    console.log('book["title"] =', book["title"]);
    console.log('book["author"] =', book["author"]);
    console.log('book["year"] =', book["year"]);
    console.log('book["genre"] =', book["genre"]);

    objectsLog('bookResult',
        `<b>Скобочная нотация:</b><br>` +
        `book["title"] → <b>${book["title"]}</b><br>` +
        `book["author"] → <b>${book["author"]}</b><br>` +
        `book["year"] → <b>${book["year"]}</b><br>` +
        `book["genre"] → <b>${book["genre"]}</b><br>` +
        `<i>(также выведено в консоль)</i>`);
}

function demoBookDynamic() {
    if (!book) { objectsLog('bookResult', 'Сначала создайте объект book (кнопка выше).'); return; }

    const key = 'title';
    objectsLog('bookResult',
        `<b>Динамический ключ:</b><br>` +
        `const key = '${key}';<br>` +
        `book[key] → <b>${book[key]}</b><br>` +
        `Скобочная нотация позволяет обращаться к свойству по переменной.`);
}

// ---------- ЗАДАНИЕ 2. МЕТОДЫ ОБЪЕКТА ----------
const artist = {
    name: "Роман Коржов",
    price: 1200,
    genre: "Ведущий",

    getInfo: function() {
        return `${this.name} — ${this.genre}, гонорар: ${this.price} ₽`;
    },

    raisePrice: function(percent) {
        this.price = Math.round(this.price * (1 + percent / 100));
        return this.price;
    }
};

function demoArtistMethod() {
    const info = document.getElementById('artistInfo');
    const result = artist.getInfo();
    if (info) info.textContent = result;

    objectsLog('artistResult',
        `<b>Метод getInfo():</b><br>` +
        `artist.getInfo() → <b>${result}</b><br>` +
        `Внутри метода используется <code>this.name</code>, <code>this.genre</code>, <code>this.price</code>.`);
}

function demoArtistRaise() {
    const oldPrice = artist.price;
    const newPrice = artist.raisePrice(10);

    const info = document.getElementById('artistInfo');
    if (info) info.textContent = artist.getInfo();

    objectsLog('artistResult',
        `<b>Метод raisePrice(10):</b><br>` +
        `Старая цена: <b>${oldPrice} ₽</b><br>` +
        `Новая цена: <b>${newPrice} ₽</b><br>` +
        `Метод изменил свойство <code>this.price</code> самого объекта.`);
}

function demoArtistThis() {
    objectsLog('artistResult',
        `<b>Ключевое слово this:</b><br>` +
        `В методе объекта <code>this</code> указывает на сам объект.<br>` +
        `this.name = "${artist.name}", this.price = ${artist.price}`);
}

// ---------- ЗАДАНИЕ 3. УДАЛЕНИЕ И ПРОВЕРКА СВОЙСТВ ----------
let testObject = {
    name: "StarEvents",
    city: "Москва",
    founded: 2020,
    rating: 4.9
};

function updatePropInfo() {
    const info = document.getElementById('propInfo');
    if (info) {
        info.textContent = JSON.stringify(testObject);
    }
}

function demoCheckIn() {
    const hasName = 'name' in testObject;
    const hasPhone = 'phone' in testObject;

    objectsLog('propResult',
        `<b>Оператор in:</b><br>` +
        `'name' in testObject → <b>${hasName}</b><br>` +
        `'phone' in testObject → <b>${hasPhone}</b><br>` +
        `Оператор in проверяет наличие свойства (включая унаследованные).`);
}

function demoCheckHasOwn() {
    const hasName = testObject.hasOwnProperty('name');
    const hasToString = testObject.hasOwnProperty('toString');

    objectsLog('propResult',
        `<b>Метод hasOwnProperty():</b><br>` +
        `testObject.hasOwnProperty('name') → <b>${hasName}</b><br>` +
        `testObject.hasOwnProperty('toString') → <b>${hasToString}</b><br>` +
        `hasOwnProperty проверяет только собственные свойства объекта.`);
}

function demoDeleteProp() {
    const existed = 'rating' in testObject;
    delete testObject.rating;

    updatePropInfo();

    objectsLog('propResult',
        `<b>Оператор delete:</b><br>` +
        `delete testObject.rating<br>` +
        `Свойство существовало: <b>${existed}</b><br>` +
        `После удаления 'rating' in testObject → <b>${'rating' in testObject}</b><br>` +
        `Текущий объект: <code>${JSON.stringify(testObject)}</code>`);
}

function demoResetProps() {
    testObject = {
        name: "StarEvents",
        city: "Москва",
        founded: 2020,
        rating: 4.9
    };
    updatePropInfo();
    objectsLog('propResult', `Объект восстановлен:<br><code>${JSON.stringify(testObject)}</code>`);
}

// ---------- ЗАДАНИЕ 4. ПЕРЕБОР СВОЙСТВ ----------
const iterObject = {
    name: "StarEvents",
    city: "Москва",
    founded: 2020,
    rating: 4.9
};

function showIterInfo() {
    const info = document.getElementById('iterInfo');
    if (info) info.textContent = JSON.stringify(iterObject);
}

function demoForIn() {
    let html = '<b>for...in:</b><br>';
    for (const key in iterObject) {
        html += `• ${key} = <b>${iterObject[key]}</b><br>`;
    }
    objectsLog('iterResult', html);
}

function demoObjectKeys() {
    const keys = Object.keys(iterObject);
    objectsLog('iterResult',
        `<b>Object.keys():</b><br>` +
        `Возвращает массив ключей:<br>` +
        `<code>[${keys.map(k => `'${k}'`).join(', ')}]</code><br>` +
        `Длина: <b>${keys.length}</b>`);
}

function demoObjectValues() {
    const values = Object.values(iterObject);
    objectsLog('iterResult',
        `<b>Object.values():</b><br>` +
        `Возвращает массив значений:<br>` +
        `<code>[${values.map(v => `'${v}'`).join(', ')}]</code><br>` +
        `Длина: <b>${values.length}</b>`);
}

function demoObjectEntries() {
    const entries = Object.entries(iterObject);
    let html = '<b>Object.entries():</b><br>Возвращает массив пар [ключ, значение]:<br>';
    entries.forEach(([key, value]) => {
        html += `• [<b>${key}</b>, ${value}]<br>`;
    });
    objectsLog('iterResult', html);
}

function demoObjectAll() {
    let html = '<b>Все способы перебора:</b><br><br>';

    html += '<b>1. for...in:</b><br>';
    for (const key in iterObject) {
        html += `&nbsp;&nbsp;${key}: ${iterObject[key]}<br>`;
    }

    html += '<br><b>2. Object.keys():</b><br>';
    html += `&nbsp;&nbsp;${Object.keys(iterObject).join(', ')}<br>`;

    html += '<br><b>3. Object.values():</b><br>';
    html += `&nbsp;&nbsp;${Object.values(iterObject).join(', ')}<br>`;

    html += '<br><b>4. Object.entries():</b><br>';
    Object.entries(iterObject).forEach(([k, v]) => {
        html += `&nbsp;&nbsp;[${k}, ${v}]<br>`;
    });

    objectsLog('iterResult', html);
}

// ---------- ЗАДАНИЕ 5. ВЛОЖЕННЫЕ ОБЪЕКТЫ ----------
const organizer = {
    name: "StarEvents",
    contacts: {
        phone: "+7 999 000-00-00",
        email: "info@starevents.ru",
        address: {
            city: "Москва",
            street: "Тверская",
            building: 15
        }
    },
    services: ["Ведущие", "Музыканты", "Шоу"],
    stats: {
        artists: 123000,
        events: 5400,
        rating: 4.9
    }
};

function showNestedInfo() {
    const info = document.getElementById('nestedInfo');
    if (info) {
        info.textContent = `${organizer.name}, тел: ${organizer.contacts.phone}, город: ${organizer.contacts.address.city}`;
    }
}

function demoNestedAccess() {
    objectsLog('nestedResult',
        `<b>Доступ к вложенным свойствам:</b><br>` +
        `organizer.contacts.phone → <b>${organizer.contacts.phone}</b><br>` +
        `organizer.contacts.email → <b>${organizer.contacts.email}</b><br>` +
        `organizer.contacts.address.city → <b>${organizer.contacts.address.city}</b><br>` +
        `organizer.contacts.address.street → <b>${organizer.contacts.address.street}</b><br>` +
        `organizer.contacts.address.building → <b>${organizer.contacts.address.building}</b><br>` +
        `organizer.stats.artists → <b>${organizer.stats.artists}</b>`);
}

function demoNestedChange() {
    const oldCity = organizer.contacts.address.city;
    organizer.contacts.address.city = "Санкт-Петербург";
    organizer.stats.artists += 1000;

    showNestedInfo();

    objectsLog('nestedResult',
        `<b>Изменение вложенных свойств:</b><br>` +
        `Было: city = "${oldCity}"<br>` +
        `Стало: city = "<b>${organizer.contacts.address.city}</b>"<br>` +
        `organizer.stats.artists увеличено на 1000 → <b>${organizer.stats.artists}</b>`);
}

function demoNestedArray() {
    let html = `<b>Вложенный массив services:</b><br>`;
    organizer.services.forEach((s, i) => {
        html += `• services[${i}] = <b>${s}</b><br>`;
    });
    html += `<br>Всего услуг: <b>${organizer.services.length}</b><br>`;
    html += `Первый элемент: <b>${organizer.services[0]}</b>`;

    objectsLog('nestedResult', html);
}

function demoNestedOptional() {
    const phone = organizer?.contacts?.phone;
    const fax = organizer?.contacts?.fax;
    const manager = organizer?.manager?.name;

    objectsLog('nestedResult',
        `<b>Опциональная цепочка ?.</b><br>` +
        `organizer?.contacts?.phone → <b>${phone}</b><br>` +
        `organizer?.contacts?.fax → <b>${fax ?? '(undefined)'}</b><br>` +
        `organizer?.manager?.name → <b>${manager ?? '(undefined)'}</b><br>` +
        `Опциональная цепочка безопасно возвращает undefined вместо ошибки.`);
}

// ---------- ЗАДАНИЕ 6. ТЕЛЕФОННЫЙ СПРАВОЧНИК ----------
const phoneBook = {
    "Иван Петров": "+7 900 111-22-33",
    "Мария Сидорова": "+7 900 444-55-66",
    "Алексей Смирнов": "+7 900 777-88-99"
};

function renderContacts() {
    const list = document.getElementById('contactsList');
    const result = document.getElementById('contactsResult');
    if (!list) return;

    list.innerHTML = '';

    const entries = Object.entries(phoneBook);

    if (entries.length === 0) {
        list.innerHTML = '<li style="border-left-color:#ccc;color:#999;">Справочник пуст</li>';
    } else {
        entries.forEach(([name, phone]) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>📞 <b>${name}</b> — ${phone}</span>`;

            const btn = document.createElement('button');
            btn.className = 'contact-remove';
            btn.textContent = '✕';
            btn.addEventListener('click', () => {
                delete phoneBook[name];
                renderContacts();
                objectsLog('contactsResult', `Удалён контакт: <b>${name}</b>`);
            });

            li.appendChild(btn);
            list.appendChild(li);
        });
    }

    if (result) {
        result.innerHTML = `Контактов в справочнике: <b>${entries.length}</b>`;
    }
}

function addContact() {
    const nameInput = document.getElementById('contactName');
    const phoneInput = document.getElementById('contactPhone');

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) {
        objectsLog('contactsResult', '⚠️ Введите имя и телефон.');
        return;
    }

    phoneBook[name] = phone;
    nameInput.value = '';
    phoneInput.value = '';
    nameInput.focus();

    renderContacts();
    objectsLog('contactsResult', `Добавлен контакт: <b>${name}</b> → ${phone}`);
}

function showAllContacts() {
    const entries = Object.entries(phoneBook);
    if (entries.length === 0) {
        objectsLog('contactsResult', 'Справочник пуст.');
        return;
    }

    let html = '<b>Все контакты (перебор Object.entries):</b><br>';
    entries.forEach(([name, phone], i) => {
        html += `${i + 1}. <b>${name}</b> — ${phone}<br>`;
    });
    html += `<br>Всего: <b>${entries.length}</b>`;

    objectsLog('contactsResult', html);
}

function clearContacts() {
    if (confirm('Очистить весь справочник?')) {
        for (const key in phoneBook) {
            delete phoneBook[key];
        }
        renderContacts();
        objectsLog('contactsResult', 'Справочник очищен.');
    }
}

function searchContact() {
    const query = document.getElementById('searchContact').value.trim().toLowerCase();
    if (!query) {
        objectsLog('contactsResult', '⚠️ Введите имя для поиска.');
        return;
    }

    const found = [];
    for (const name in phoneBook) {
        if (name.toLowerCase().includes(query)) {
            found.push(`${name} — ${phoneBook[name]}`);
        }
    }

    if (found.length === 0) {
        objectsLog('contactsResult', `По запросу "<b>${query}</b>" ничего не найдено.`);
    } else {
        let html = `<b>Найдено (${found.length}):</b><br>`;
        found.forEach(f => html += `• ${f}<br>`);
        objectsLog('contactsResult', html);
    }
}

function deleteContact() {
    const name = document.getElementById('searchContact').value.trim();
    if (!name) {
        objectsLog('contactsResult', '⚠️ Введите имя контакта для удаления.');
        return;
    }

    if (name in phoneBook) {
        delete phoneBook[name];
        renderContacts();
        objectsLog('contactsResult',
            `<b>delete phoneBook["${name}"]</b><br>` +
            `Контакт удалён. Осталось: <b>${Object.keys(phoneBook).length}</b>`);
    } else {
        objectsLog('contactsResult', `Контакт "<b>${name}</b>" не найден.`);
    }
}

function checkContact() {
    const name = document.getElementById('searchContact').value.trim();
    if (!name) {
        objectsLog('contactsResult', '⚠️ Введите имя для проверки.');
        return;
    }

    const inOperator = name in phoneBook;
    const hasOwn = phoneBook.hasOwnProperty(name);

    objectsLog('contactsResult',
        `<b>Проверка контакта "${name}":</b><br>` +
        `'${name}' in phoneBook → <b>${inOperator}</b><br>` +
        `phoneBook.hasOwnProperty('${name}') → <b>${hasOwn}</b>`);
}

// ---------- ИНИЦИАЛИЗАЦИЯ СЕКЦИИ ОБЪЕКТОВ ----------
function initObjectsLab() {
    updatePropInfo();
    showIterInfo();
    showNestedInfo();
    renderContacts();

    console.log('=== ЛР16: Пользовательские объекты ===');
    console.log('Объект artist:', artist);
    console.log('Объект organizer:', organizer);
    console.log('Телефонный справочник:', phoneBook);
}