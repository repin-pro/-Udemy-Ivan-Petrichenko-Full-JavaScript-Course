let money, time; //Объявляем глобальные переменные для работы с функцией start

function start() {
    /* Первые два вопроса */
    money = +prompt('Ваш бюджет на месяц?', ''); 

    //isNaN будет выдавать true до тех пор, пока туда будут попадать не цифры и цикл будет продолжаться
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}

/* Создаем объект */
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt('Введите обязательную статью расходов в этом месяце', '');
            let b = +prompt('Во сколько обойдется?', '');

            if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null &&
                a != '' && b != '' && a.length < 50) {
                console.log('done')
                appData.expenses[a] = b;
            } else {
                alert('Вы допустили ошибку, попробуйте еще раз');
                i--;
            }
        }
    },
    detectDayBudget: function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert(`Ваш бюджет на месяц =  ${appData.moneyPerDay}`);
    },
    detectLevel: function () {
        if (appData.moneyPerDay < 13000) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay > 13000 && appData.moneyPerDay < 30000) {
            console.log('Средний уровень достатка');
        } else if (appData.moneyPerDay > 30000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('ошибка');
        }
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt('Какова сумма накоплений'),
                percent = +prompt('Под какой процент');
            appData.monthIncome = save / 100 / 12 * percent;
            alert(`Доход в месяц с вашего депозита: ${appData.monthIncome}`);
        }
    },
    chooseOptExpenses: function () {
        for (let i = 1; i < 4; i++) {
            let question = prompt('Статья необязательных расходов?', '');
            appData.optionalExpenses[i] = question;
        }
    },
    chooseIncome: function () {
        for (i = 0; i < 1; i++) {
            let items = prompt('Что принесет дополнительный доход? (Ответ запишите через запятую)', '');
            if (typeof (items) === 'string' && typeof (items) != null && items != '') {
                appData.income = items.split(', ');
            } else {
                alert('Ошибка: Отсутвуют данные или введены цифры')
                i--;
            }
        }
        appData.income.push(prompt('Может что-то еще?'));
        appData.income.sort(); //Сортируем массив в алфавитном порядке
        /* перебираем массив appData.income, принимаем параметры ключа (i) и данные ключа (item) */
        appData.income.forEach(function (item, i) {
            alert(`${i + 1})  способ доп. заработка: ${item}`); //выводим на экран полученые данные
        });

        /* отображаем все, что включаем в себя объект appData */
        console.log(`Наша программа включает в себя данные:`);
        for (let key in appData) {
            console.log(`${key}:  ${appData[key]}`)
        }
    }
}

/* Принимаем поля вывода */
let startValue = document.querySelector('#start'), // Получаем ID от кнопки начать расчет
    budgetValue = document.querySelector('.budget-value'), //Получаем класс поля "Доход"
    daybudgetValue = document.querySelector('.daybudget-value'), //Получаем класс поля "Доход на 1 день"
    levelValue = document.querySelector('.level-value'), //Получаем класс поля "Уровень дохода"
    expensesValue = document.querySelector('.expenses-value'), //Получаем класс поля "Обязательные расходы"
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'), //Получаем класс поля "Возможные траты"
    incomeValue = document.querySelector('.income-value'), //Получаем класс поля "Дополнительный доход"
    monthsavingsValue = document.querySelector('.monthsavings-value'), //Получаем класс поля "Накоплений за 1 месяц"
    yearsavingsValue = document.querySelector('.yearsavings-value'); //Получаем класс поля "Накопления за 1 год"

/* Принимаем поля ввода */
let input = document.querySelectorAll('.expenses-item'), //* Получаем поля(input) c обязательными расходами через класс. (class=”expenses-item”) */
    btnApproveUp = document.querySelector('button')[0], //Получаем по тэгу верхнюю кнопку "утвердить"
    btnApproveDown = document.querySelector('button')[1], //Получаем по тэгу ниюнюю кнопку "утвердить"
    btnApproveCalc = document.querySelector('button')[2], //Получаем по тэгу кнопку "Рассчитать"
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'), //Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
    chooseIncome = document.querySelector('.choose-income'), // Поле статьи возможного дохода
    savings = document.querySelector('.savings'), // Чекбокс (есть ли накопления)
    sum = document.querySelector('#sum'), // Поле сумма
    percent = document.querySelector('#percent'), // Поле процент
    yearValue = document.querySelector('.year-value'), // Поле год
    monthValue = document.querySelector('.month-value'), // Поле месяц
    dayValue = document.querySelector('.day-value'); // Поле день


