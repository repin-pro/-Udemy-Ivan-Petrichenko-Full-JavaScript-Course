window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {
        //цикл перебирает все табы и меняет класс show на hide в результате чего скрывает лишние табы
        for (let i = a; i < tabContent.length; i++) { //цикл будет работать до тех пор пока не кончатся найденные табы с классом .info-tabcontent
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    //стартуем функцию с аргументов 1, в результате чего, все табы кроме 1-го по умолчанию будут выключены
    hideTabContent(1);

    //функция меняет отображение таба, и скрывает остальные
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) { // Если в переменной tabContent будет найде класс hide, то этот класс будет удален и заменен на show
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {  // Мы проверяем, действительно ли мы кликнули на тот элемент, который хотел пользователь
            for (let i = 0; i < tab.length; i++) { //цикл работает пока не переерет все табы
                if (target == tab[i]) { //если то куда мы нажали полностью совпадает с определенным табом который мы перебираем
                    hideTabContent(0); //скрываем все табы если совпал таб с кликом пользователя
                    showTabContent(i); //отображаем таб = i
                    break;
                }
            }
        }
    });

    // Таймер
    let deadline = '2024-03-31';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), //Дата дедлайна минус дата которая сейчас
            seconds = Math.floor((t / 1000) % 60), // Присваиваем переменной seconds значение переменной t, переводим милисекунды в секунды
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        // hours = Math.floor((t / 1000 / 60 / 60) % 24),
        // days = Math.floor((t / (1000 * 60 * 60 * 24)));

        // Передаем из функции полученные значени в виде объекта
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // Функция в которой каждую секунду будут обновляться параметры (минуты часы и секунды)
        function updateClock() {
            let t = getTimeRemaining(endtime);

            // Добавляем ноль
            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                }
                return num;
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('timer', deadline); //запуск функции с аргументами ID таймера и его дедлайном

    // всплывающее окно
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        tabLearnMoreButtons = document.querySelectorAll('.description-btn');

    more.addEventListener('click', showModal); // Событие на клик по кнопке "узнать больше"

    // СобатиЯ на кнопки в табах
    tabLearnMoreButtons.forEach(learnMoreButton => {
        learnMoreButton.addEventListener('click', showModal);
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none'; //меняем стиль на display: none
        more.classList.remove('more-splash'); // удаляем класс more-splash
        document.body.style.overflow = ''; // разрешаем прокрутку страницы
    });

    //Функция которая отображает попап окно
    function showModal() {
        overlay.style.display = 'block'; //меняем стиль на display: block
        more.classList.add('more-splash'); // добавляем класс more-splash
        document.body.style.overflow = 'hidden'; // запрещаем прокрутку страницы
    }

    //Форма
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
    };

    let form = this.document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    //submit вешается на форму,а не на кнопку
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        // request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function (value, key) { //переводим в JSON формат
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json);

        request.send(formData);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    // Слайдер

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex); //вызов функции для отображения дефолтного слайда
    // создаем функцию, которая показывает нужный слайд
    function showSlides(n) {
        // Условия перевода в дефолтное состояние, в случае если слайды закончились при перемотки вперед
        if (n > slides.length) {
            slideIndex = 1;
        }
        // Условия перевода в дефолтное состояние, в случае если слайды закончились при перемотки назад
        if (n < 1) {
            slideIndex = slides.length;
        }
        //перебираем все наши слайды и раставляем стиль display none, тем самым скрываем их
        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) { // второй вариант цикла перебора с отключением отображения на жкране
        //     item.style.display = 'none';
        // }

        // ПО аналогии со слайдами перебираем наши точки и убираем у всех класс "актив"
        dots.forEach((item) => item.classList.remove('dot-active'));

        // Выставляем дефолтный слайд и точку в соответвии с пременной slideIndex (т.е. первый слайд)
        slides[slideIndex - 1].style.display = 'block'; //слайд
        dots[slideIndex - 1].classList.add('dot-active'); //точка
    }
    //Перемотка слайда
    //Вызываем функцию, которая отображает слайд, передаем аргемент с новым индексом и добавляем +1, т.е. слайдер переключится на 1 шаг вперед
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    //отображает текущий слайл
    function currentSlides(n) {
        showSlides(slideIndex = n);
    }

    //Активируем обработчик событий на кнопку вперед
    prev.addEventListener('click', function () {
        plusSlides(-1);
    });

    //Активируем обработчик событий на кнопку назад
    next.addEventListener('click', function () {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            // проверяем на наличие класса
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlides(i);
            }
        }
    });


});