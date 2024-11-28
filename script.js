/* УВЕДОМЛЕНИЯ */
// Массив для хранения уведомлений
let notifications = [];
let notificationCount = 0;
let isPaused = false;  // Флаг для приостановки добавления уведомлений
// Декоратор, который будет приостанавливать выполнение функции на 10 секунд
function delayDecorator(fn, delay) {
    return function (...args) {
        if (isPaused) return;  // Если приостановлено, не выполняем функцию
        fn(...args);  // В противном случае выполняем оригинальную функцию
        isPaused = true;
        setTimeout(() => {
            isPaused = false;  // Разрешаем выполнение через 10 секунд
        }, delay);
    };
}
// Функция для добавления нового уведомления
function addNotification() {
    notificationCount++;

    // Добавляем новое уведомление в список
    const notification = `Новое уведомление ${notificationCount}`;
    notifications.push(notification);

    // Обновляем отображение уведомлений в списке
    updateNotificationList();

    // Обновляем счётчик уведомлений
    document.getElementById('notification-counter').innerText = notificationCount;
}
// Функция для обновления списка уведомлений
function updateNotificationList() {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = '';  // Очищаем текущие уведомления

    // Добавляем все уведомления в список
    notifications.forEach((notification, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${notification} <button class="close-btn" data-index="${index}">✖</button>`;
        notificationList.appendChild(li);
    });
}
// Функция для отображения/скрытия списка уведомлений
function toggleNotifications() {
    const notificationList = document.querySelector('.notification-list');
    notificationList.style.display = notificationList.style.display === 'block' ? 'none' : 'block';
}
// Делегированный обработчик для закрытия уведомлений
document.querySelector('.notification-list').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('close-btn')) {
        const index = event.target.getAttribute('data-index');
        removeNotification(index);
    }
});
// Функция для удаления уведомления
function removeNotification(index) {
    notifications.splice(index, 1);  // Удаляем уведомление по индексу
    notificationCount--;  // Уменьшаем счётчик уведомлений
    updateNotificationList();  // Обновляем отображение
    document.getElementById('notification-counter').innerText = notificationCount;  // Обновляем счётчик
}
// Создаем декорированную функцию, которая добавляет уведомления с задержкой
const addNotificationWithDelay = delayDecorator(addNotification, 10000);
// Добавление новых уведомлений каждые 3 секунды
setInterval(addNotificationWithDelay, 3000);




/* ДОБРО ПОЖАЛОВАТЬ НА САЙТ */
function showNotification({ message, className = 'notification' }) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = className; // Применяем класс, указанный в options
    notification.innerText = message; // Устанавливаем текст уведомления
    // Добавляем уведомление в начало body
    document.body.appendChild(notification);
    // Удаляем уведомление через 1.5 секунды с эффектом исчезновения
    setTimeout(() => {
        notification.classList.add('fade-out'); // Запускаем анимацию исчезновения
    }, 1000);
    // Полностью удаляем элемент из DOM через 1.5 секунды
    setTimeout(() => {
        notification.remove();
    }, 1500);
}
// Показ уведомления сразу после загрузки страницы
window.onload = function() {
    showNotification({ message: 'Добро пожаловать на наш сайт!' });
};




/* ПЕРЕХОД ПО ССЫЛКЕ */
// Получаем все ссылки внутри контейнера
const links = document.querySelectorAll('#contents a');
// Добавляем обработчик событий на каждую ссылку
links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Останавливаем переход по ссылке

        const userConfirmed = confirm("Вы точно хотите покинуть страницу?");
        if (userConfirmed) {
            // Если пользователь подтвердил, переходим по ссылке
            window.location.href = this.href;
        }
    });
});