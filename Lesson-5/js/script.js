let menuItems = document.querySelectorAll('.menu-item'), // находим все пункты меню
    menu = document.querySelector('.menu'), // Находим класс menu куда будем помещать новый пункт меню
    menuItem = document.createElement('li'), //создаем пункт меню
    title = document.querySelector('.title'), // Нахдоим класс заголовка
    adv = document.querySelector('.adv'), // Находим класс рекламного блока
    answer = document.querySelector('#prompt'); // нахдоим ID prompt

menu.appendChild(menuItem); // Добавляем в меню наш созданный пункт меню
menuItem.classList.add('menu-item'); // Добавляем класс .menu-item к пункту меню 
menuItem.textContent = 'Пятый пункт'; // Выставляем текст в 5-й пункт меню

menu.insertBefore(menuItems[1], menuItems[3]);  // Вставляем элемент с индексом 1 перед элементом с индексом 3

document.body.style.backgroundImage = 'url(img/apple_true.jpg)'; // Меняем фоновую картинку

title.textContent = 'Мы продаем только подлинную технику Apple'; // Меняем текст заголовка

adv.remove(); // удаляем рекламный блок

answer.textContent = prompt('Ваше отношение к технике Apple', ''); // Задаем вопрос пользователю и принимаем значение
