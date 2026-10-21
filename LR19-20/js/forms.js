// ==========================================================================
// ЗАДАНИЯ 1-3: ФОРМЫ, ВАЛИДАЦИЯ И РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ
// ==========================================================================
'use strict';

// ==========================================================================
// ЗАДАНИЕ 1. ПОЛУЧЕНИЕ ДАННЫХ ИЗ ПОЛЕЙ ПОЛЬЗОВАТЕЛЬСКИХ ФОРМ
// ==========================================================================

/**
 * Собирает все значения из формы заявки и выводит их в диалоговое окно
 * и в блок результата под формой.
 */
function collectFormData() {
    const resultEl = document.getElementById('form1Result');
    if (!resultEl) return;

    // --- Получаем элементы формы ---
    const nameInput    = document.getElementById('f1_name');
    const emailInput   = document.getElementById('f1_email');
    const phoneInput   = document.getElementById('f1_phone');
    const eventSelect  = document.getElementById('f1_event');
    const citySelect   = document.getElementById('f1_city');
    const messageArea  = document.getElementById('f1_message');

    // --- Флажки (checkbox) ---
    const checkboxEls = document.querySelectorAll('input[name="f1_services"]:checked');
    const services = [...checkboxEls].map(cb => cb.value);

    // --- Переключатели (radio) ---
    const radioEl = document.querySelector('input[name="f1_budget"]:checked');
    const budget = radioEl ? radioEl.value : '(не выбран)';

    // --- Списки с множественным выбором (multi-select) ---
    const multiSelect = document.getElementById('f1_extras');
    const extras = multiSelect ? [...multiSelect.selectedOptions].map(o => o.value) : [];

    // --- Формируем объект данных ---
    const data = {
        Имя:        nameInput ? nameInput.value.trim() || '(пусто)' : '(нет поля)',
        Email:      emailInput ? emailInput.value.trim() || '(пусто)' : '(нет поля)',
        Телефон:    phoneInput ? phoneInput.value.trim() || '(пусто)' : '(нет поля)',
        Мероприятие: eventSelect ? eventSelect.value : '(не выбрано)',
        Город:      citySelect ? citySelect.value : '(не выбрано)',
        Сообщение:  messageArea ? messageArea.value.trim() || '(пусто)' : '(нет поля)',
        Услуги:     services.length ? services.join(', ') : '(ничего не выбрано)',
        Бюджет:     budget,
        ДопУслуги:  extras.length ? extras.join(', ') : '(ничего не выбрано)'
    };

    // --- Вывод в HTML ---
    let html = '<b>📋 Данные из формы:</b><br><br>';
    for (const [key, value] of Object.entries(data)) {
        html += `<b>${key}</b>: ${escapeHtml(value)}<br>`;
    }
    resultEl.innerHTML = html;
    resultEl.classList.add('form-result--success');
    resultEl.classList.remove('form-result--error');

    // --- Вывод в диалоговое окно ---
    let alertText = 'Вы ввели:\n\n';
    for (const [key, value] of Object.entries(data)) {
        alertText += `${key}: ${value}\n`;
    }
    alert(alertText);

    console.log('[Задание 1] Данные формы:', data);
    return data;
}

/**
 * Очищает форму заявки и блок результата.
 */
function resetFormData() {
    const form = document.getElementById('demoForm1');
    if (form) form.reset();

    const resultEl = document.getElementById('form1Result');
    if (resultEl) {
        resultEl.innerHTML = 'Результат появится здесь...';
        resultEl.classList.remove('form-result--success', 'form-result--error');
    }
}

/**
 * Экранирует HTML-спецсимволы, чтобы пользовательский ввод не ломал верстку.
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ==========================================================================
// ЗАДАНИЕ 2. ВАЛИДАЦИЯ ФОРМ ТРЕМЯ СПОСОБАМИ
// ==========================================================================

// --------------------------------------------------------------------------
// Способ 1: HTML5-валидация через атрибуты (required, type, pattern, minlength...)
// --------------------------------------------------------------------------
function submitHtml5Form(event) {
    event.preventDefault();

    const form = event.target;
    const resultEl = document.getElementById('form2Html5Result');

    if (!form.checkValidity()) {
        form.reportValidity();
        resultEl.innerHTML = '<span class="no-match">❌ Форма не прошла HTML5-валидацию</span>';
        resultEl.classList.add('form-result--error');
        resultEl.classList.remove('form-result--success');
        return;
    }

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    let html = '<b>✅ HTML5-валидация пройдена</b><br><br>';
    for (const [k, v] of Object.entries(data)) {
        html += `<b>${k}</b>: ${escapeHtml(v)}<br>`;
    }
    html += '<br><i>Проверено браузером через атрибуты required, type, pattern, minlength.</i>';
    resultEl.innerHTML = html;
    resultEl.classList.add('form-result--success');
    resultEl.classList.remove('form-result--error');
}

// --------------------------------------------------------------------------
// Способ 2: JS-валидация вручную
// --------------------------------------------------------------------------
function submitJsForm(event) {
    event.preventDefault();

    const form = event.target;
    const resultEl = document.getElementById('form2JsResult');

    const name = form.elements['name'].value.trim();
    const age = form.elements['age'].value.trim();
    const password = form.elements['password'].value;

    const errors = [];

    // --- Проверка имени ---
    if (name.length === 0) {
        errors.push('Имя не может быть пустым');
        markInvalid(form.elements['name'], 'Введите имя');
    } else if (name.length < 2) {
        errors.push('Имя слишком короткое (минимум 2 символа)');
        markInvalid(form.elements['name'], 'Минимум 2 символа');
    } else {
        markValid(form.elements['name']);
    }

    // --- Проверка возраста ---
    if (age.length === 0) {
        errors.push('Возраст не может быть пустым');
        markInvalid(form.elements['age'], 'Введите возраст');
    } else if (!/^\d+$/.test(age)) {
        errors.push('Возраст должен содержать только цифры');
        markInvalid(form.elements['age'], 'Только цифры');
    } else {
        const ageNum = Number(age);
        if (ageNum < 14 || ageNum > 120) {
            errors.push('Возраст должен быть от 14 до 120');
            markInvalid(form.elements['age'], 'От 14 до 120');
        } else {
            markValid(form.elements['age']);
        }
    }

    // --- Проверка пароля ---
    if (password.length < 6) {
        errors.push('Пароль слишком короткий (минимум 6 символов)');
        markInvalid(form.elements['password'], 'Минимум 6 символов');
    } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        errors.push('Пароль должен содержать хотя бы одну букву и одну цифру');
        markInvalid(form.elements['password'], 'Буква + цифра');
    } else {
        markValid(form.elements['password']);
    }

    // --- Вывод результата ---
    if (errors.length > 0) {
        let html = '<b>❌ Найдены ошибки JS-валидации:</b><br><br>';
        errors.forEach(e => html += `• ${escapeHtml(e)}<br>`);
        resultEl.innerHTML = html;
        resultEl.classList.add('form-result--error');
        resultEl.classList.remove('form-result--success');
    } else {
        resultEl.innerHTML =
            `<b>✅ JS-валидация пройдена</b><br><br>` +
            `Имя: <b>${escapeHtml(name)}</b><br>` +
            `Возраст: <b>${escapeHtml(age)}</b><br>` +
            `Пароль: <b>${'*'.repeat(password.length)}</b><br><br>` +
            `<i>Все проверки пройдены вручную в JavaScript.</i>`;
        resultEl.classList.add('form-result--success');
        resultEl.classList.remove('form-result--error');
    }
}

/**
 * Помечает поле как невалидное и выводит сообщение об ошибке.
 */
function markInvalid(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const errorEl = input.parentElement.querySelector('.field-error');
    if (errorEl) errorEl.textContent = message;
}

function markValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const errorEl = input.parentElement.querySelector('.field-error');
    if (errorEl) errorEl.textContent = '';
}

// --------------------------------------------------------------------------
// Способ 3: Валидация через регулярные выражения (БЕЛОРУССКИЙ ФОРМАТ)
// --------------------------------------------------------------------------
function submitRegexForm(event) {
    event.preventDefault();

    const form = event.target;
    const resultEl = document.getElementById('form2RegexResult');

    const email = form.elements['email'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const birth = form.elements['birth'].value.trim();
    const zip = form.elements['zip'].value.trim();

    // --- Регулярные выражения ---
    const emailRegex  = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // Белорусский формат: +375 (XX) XXX-XX-XX
    const phoneRegex  = /^\+375\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    const birthRegex  = /^\d{2}\.\d{2}\.\d{4}$/;
    const zipRegex    = /^\d{6}$/;

    const errors = [];

    // --- Проверка email ---
    if (!emailRegex.test(email)) {
        errors.push(`Email "${email}" не соответствует формату`);
        markInvalid(form.elements['email'], 'Формат: name@domain.by');
    } else {
        markValid(form.elements['email']);
    }

    // --- Проверка телефона (BY) ---
    if (!phoneRegex.test(phone)) {
        errors.push(`Телефон "${phone}" не соответствует формату +375 (XX) XXX-XX-XX`);
        markInvalid(form.elements['phone'], 'Формат: +375 (29) 123-45-67');
    } else {
        markValid(form.elements['phone']);
    }

    // --- Проверка даты рождения ---
    if (!birthRegex.test(birth)) {
        errors.push(`Дата рождения "${birth}" не соответствует формату ДД.ММ.ГГГГ`);
        markInvalid(form.elements['birth'], 'Формат: ДД.ММ.ГГГГ');
    } else {
        const [d, m, y] = birth.split('.').map(Number);
        const testDate = new Date(y, m - 1, d);
        if (testDate.getDate() !== d || testDate.getMonth() !== m - 1 || testDate.getFullYear() !== y) {
            errors.push(`Дата "${birth}" не существует в календаре`);
            markInvalid(form.elements['birth'], 'Такой даты нет');
        } else {
            markValid(form.elements['birth']);
        }
    }

    // --- Проверка индекса ---
    if (!zipRegex.test(zip)) {
        errors.push(`Индекс "${zip}" должен состоять из 6 цифр`);
        markInvalid(form.elements['zip'], '6 цифр');
    } else {
        markValid(form.elements['zip']);
    }

    // --- Вывод ---
    if (errors.length > 0) {
        let html = '<b>❌ Ошибки валидации через RegExp:</b><br><br>';
        errors.forEach(e => html += `• ${escapeHtml(e)}<br>`);
        resultEl.innerHTML = html;
        resultEl.classList.add('form-result--error');
        resultEl.classList.remove('form-result--success');
    } else {
        resultEl.innerHTML =
            `<b>✅ Валидация через RegExp пройдена</b><br><br>` +
            `Email: <b>${escapeHtml(email)}</b><br>` +
            `Телефон: <b>${escapeHtml(phone)}</b><br>` +
            `Дата рождения: <b>${escapeHtml(birth)}</b><br>` +
            `Индекс: <b>${escapeHtml(zip)}</b><br><br>` +
            `<i>Все проверки выполнены через регулярные выражения.</i>`;
        resultEl.classList.add('form-result--success');
        resultEl.classList.remove('form-result--error');
    }
}

// ==========================================================================
// ЗАДАНИЕ 3. РАБОТА С ОБЪЕКТОМ RegExp И РЕГУЛЯРНЫМИ ВЫРАЖЕНИЯМИ
// ==========================================================================

// ---------- 3.1. МЕТОД test() ----------
function regexTest() {
    const input = document.getElementById('regexTestInput').value;
    const resultEl = document.getElementById('regexTestResult');

    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const ok = re.test(input);
    resultEl.innerHTML =
        `<b>RegExp.test()</b> — проверка, является ли строка email:<br>` +
        `Строка: <code>${escapeHtml(input)}</code><br>` +
        `Регулярка: <code>/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/</code><br>` +
        `Результат: <b class="${ok ? '' : 'no-match'}">${ok ? '✅ соответствует' : '❌ не соответствует'}</b>`;
}

// ---------- 3.2. МЕТОД exec() ----------
function regexExec() {
    const input = document.getElementById('regexExecInput').value;
    const resultEl = document.getElementById('regexExecResult');

    const re = /(\d{2})\.(\d{2})\.(\d{4})/g;
    const matches = [];
    let m;

    while ((m = re.exec(input)) !== null) {
        matches.push({
            full: m[0],
            day: m[1],
            month: m[2],
            year: m[3],
            index: m.index
        });
    }

    if (matches.length === 0) {
        resultEl.innerHTML =
            `<b>RegExp.exec()</b> — не найдено ни одной даты в формате ДД.ММ.ГГГГ<br>` +
            `Строка: <code>${escapeHtml(input)}</code>`;
        return;
    }

    let html = `<b>RegExp.exec()</b> — найдено ${matches.length} дат(ы):<br><br>`;
    matches.forEach((match, i) => {
        html +=
            `${i + 1}. Найдено: <span class="match">${match.full}</span> (позиция ${match.index})<br>` +
            `&nbsp;&nbsp;&nbsp;Группа 1 (день): <b>${match.day}</b><br>` +
            `&nbsp;&nbsp;&nbsp;Группа 2 (месяц): <b>${match.month}</b><br>` +
            `&nbsp;&nbsp;&nbsp;Группа 3 (год): <b>${match.year}</b><br><br>`;
    });
    resultEl.innerHTML = html;
}

// ---------- 3.3. МЕТОД String.split() ----------
function regexSplit() {
    const input = document.getElementById('regexSplitInput').value;
    const resultEl = document.getElementById('regexSplitResult');

    const parts = input.split(/\s*[,;]\s*|\s+/).filter(Boolean);

    let html = `<b>String.split()</b> — разбито по регулярке <code>/\\s*[,;]\\s*|\\s+/</code>:<br><br>`;
    html += `<b>Всего частей:</b> ${parts.length}<br>`;
    parts.forEach((p, i) => {
        html += `${i + 1}. <span class="match">${escapeHtml(p)}</span><br>`;
    });
    resultEl.innerHTML = html;
}

// ---------- 3.4. МЕТОД String.match() ----------
function regexMatch() {
    const input = document.getElementById('regexMatchInput').value;
    const resultEl = document.getElementById('regexMatchResult');

    const re = /\b[A-ZА-ЯЁ][a-zа-яё]+\b/g;
    const found = input.match(re);

    if (!found) {
        resultEl.innerHTML =
            `<b>String.match()</b> — слов с заглавной буквы не найдено<br>` +
            `Строка: <code>${escapeHtml(input)}</code>`;
        return;
    }

    let html = `<b>String.match()</b> — найдено слов с заглавной буквы: ${found.length}<br><br>`;
    found.forEach((word, i) => {
        html += `${i + 1}. <span class="match">${escapeHtml(word)}</span><br>`;
    });
    resultEl.innerHTML = html;
}

// ---------- 3.5. МЕТОД String.search() ----------
function regexSearch() {
    const input = document.getElementById('regexSearchInput').value;
    const resultEl = document.getElementById('regexSearchResult');

    const re = /\d/;
    const index = input.search(re);

    if (index === -1) {
        resultEl.innerHTML =
            `<b>String.search()</b> — цифры не найдены<br>` +
            `Строка: <code>${escapeHtml(input)}</code>`;
    } else {
        resultEl.innerHTML =
            `<b>String.search()</b> — первая цифра найдена на позиции: <b>${index}</b><br>` +
            `Строка: <code>${escapeHtml(input)}</code><br>` +
            `Символ: <span class="match">${escapeHtml(input[index])}</span><br><br>` +
            `<i>search() возвращает индекс первого совпадения или -1.</i>`;
    }
}

// ---------- 3.6. МЕТОД String.replace() ----------
function regexReplace() {
    const input = document.getElementById('regexReplaceInput').value;
    const resultEl = document.getElementById('regexReplaceResult');

    const badWords = /(мат|дурак|глупый)/gi;
    const replaced = input.replace(badWords, '***');

    const cleaned = replaced.replace(/\s+/g, ' ');

    const reformatted = cleaned.replace(
        /(\d{2})\.(\d{2})\.(\d{4})/g,
        (match, d, m, y) => `${y}-${m}-${d}`
    );

    resultEl.innerHTML =
        `<b>String.replace()</b> — три последовательные замены:<br><br>` +
        `<b>1. Цензура</b> (мат, дурак, глупый → ***):<br>` +
        `<code>${escapeHtml(replaced)}</code><br><br>` +
        `<b>2. Сжатие пробелов</b> (/\\s+/g → ' '):<br>` +
        `<code>${escapeHtml(cleaned)}</code><br><br>` +
        `<b>3. Переформатирование дат</b> (ДД.ММ.ГГГГ → ГГГГ-ММ-ДД):<br>` +
        `<code>${escapeHtml(reformatted)}</code>`;
}

// ---------- 3.7. Общая демонстрация флагов RegExp ----------
function regexFlags() {
    const input = document.getElementById('regexFlagsInput').value;
    const resultEl = document.getElementById('regexFlagsResult');

    const pattern = 'javascript';
    const text = input;

    const rePlain = new RegExp(pattern);
    const reGlobal = new RegExp(pattern, 'g');
    const reIgnore = new RegExp(pattern, 'i');
    const reGlobalIgnore = new RegExp(pattern, 'gi');

    const results = [
        { flags: '(без флагов)', re: rePlain,        result: rePlain.exec(text) ? 'найдено (регистр важен)' : 'не найдено' },
        { flags: 'g',            re: reGlobal,       result: (text.match(reGlobal) || []).length + ' совпадений' },
        { flags: 'i',            re: reIgnore,       result: reIgnore.test(text) ? 'найдено (регистр не важен)' : 'не найдено' },
        { flags: 'gi',           re: reGlobalIgnore, result: (text.match(reGlobalIgnore) || []).length + ' совпадений (регистр не важен)' }
    ];

    let html = `<b>Флаги RegExp — поиск подстроки "${pattern}" в строке:</b><br>` +
               `<code>${escapeHtml(input)}</code><br><br>`;

    results.forEach(r => {
        html += `Флаг <b>${r.flags}</b> → ${r.result}<br>`;
    });

    resultEl.innerHTML = html;
}

// ==========================================================================
// ПРИВЯЗКА ОБРАБОТЧИКОВ
// ==========================================================================
document.addEventListener('DOMContentLoaded', function () {
    const html5Form = document.getElementById('demoForm2Html5');
    if (html5Form) html5Form.addEventListener('submit', submitHtml5Form);

    const jsForm = document.getElementById('demoForm2Js');
    if (jsForm) jsForm.addEventListener('submit', submitJsForm);

    const regexForm = document.getElementById('demoForm2Regex');
    if (regexForm) regexForm.addEventListener('submit', submitRegexForm);

    console.log('📝 Модуль форм и регулярных выражений загружен');
});