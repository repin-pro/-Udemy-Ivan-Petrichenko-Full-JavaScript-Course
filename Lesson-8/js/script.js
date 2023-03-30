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

    info.addEventListener('click', function(event) {
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

});