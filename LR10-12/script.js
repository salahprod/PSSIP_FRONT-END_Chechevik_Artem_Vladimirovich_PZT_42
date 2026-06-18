// script.js
// Задание №4: Пользовательская функция для вычисления площади круга

function calculateCircleArea(radius) {
    // Проверка на корректность ввода
    if (typeof radius !== 'number' || radius <= 0) {
        return 0;
    }
    // Площадь круга: S = π * r^2
    const area = Math.PI * Math.pow(radius, 2);
    return area;
}

// Автоматический запуск при загрузке страницы (скрипт в head не мешает)
(function() {
    const radius = 7; // Радиус круга (можно изменить)
    const area = calculateCircleArea(radius);

    const outputDiv = document.getElementById('mathOutput');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <p><strong>Радиус круга (R):</strong> ${radius} ед.</p>
            <p><strong>Площадь круга (S = π·R²):</strong> ${area.toFixed(4)} кв. ед.</p>
            <p style="color: #475569; font-size: 14px;">(Функция calculateCircleArea() определена во внешнем файле script.js)</p>
        `;
    }
})();