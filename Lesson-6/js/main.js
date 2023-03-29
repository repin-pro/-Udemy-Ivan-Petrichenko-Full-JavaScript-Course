let money, time; //Объявляем глобальные переменные для работы с функцией start

/* Принимаем поля вывода */
let startValue = document.querySelector('#start'), // Получаем ID от кнопки начать расчет
    budgetValue = document.querySelector('.budget-value'), //Получаем класс поля "Доход"
    daybudgetValue = document.querySelector('.daybudget-value'), //Получаем класс поля "Доход на 1 день"
    levelValue = document.querySelector('.level-value'), //Получаем класс поля "Уровень дохода"
    expensesValue = document.querySelector('.expenses-value'), //Получаем класс поля "Обязательные расходы"
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'), //Получаем класс поля "Возможные траты"
    incomeValue = document.querySelector('.income-value'), //Получаем класс поля "Дополнительный доход"
    monthSavingsValue = document.querySelector('.monthsavings-value'), //Получаем класс поля "Накоплений за 1 месяц"
    yearSavingsValue = document.querySelector('.yearsavings-value'); //Получаем класс поля "Накопления за 1 год"

/* Принимаем поля ввода */
let expensesItem = document.querySelectorAll('.expenses-item'), //* Получаем поля(input) c обязательными расходами через класс. (class=”expenses-item”) */
    btnApproveUp = document.getElementsByTagName('button')[0], //Получаем по тэгу верхнюю кнопку "утвердить"
    btnApproveDown = document.getElementsByTagName('button')[1], //Получаем по тэгу ниюнюю кнопку "утвердить"
    btnApproveCalc = document.getElementsByTagName('button')[2], //Получаем по тэгу кнопку "Рассчитать"
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'), //Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
    chooseIncome = document.querySelector('.choose-income'), // Поле статьи возможного дохода
    checkSavings = document.querySelector('#savings'), // Чекбокс (есть ли накопления)
    sumValue = document.querySelector('#sum'), // Поле сумма
    percentValue = document.querySelector('#percent'), // Поле процент
    yearValue = document.querySelector('.year-value'), // Поле год
    monthValue = document.querySelector('.month-value'), // Поле месяц
    dayValue = document.querySelector('.day-value'); // Поле день

/* Отключаем все кнопки, кроме "начать расчет" */
btnApproveUp.setAttribute('disabled', true);
btnApproveDown.setAttribute('disabled', true);
btnApproveCalc.setAttribute('disabled', true);

/* запуск по кнопке начать расчет */
startValue.addEventListener('click', function () {
    /* Активируем все кнопки */
    btnApproveUp.removeAttribute('disabled');
    btnApproveDown.removeAttribute('disabled');
    btnApproveCalc.removeAttribute('disabled');

    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();
});

/* обязательные расходы */
btnApproveUp.addEventListener('click', function () {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value, //получаем наименование
            b = expensesItem[++i].value; // сумма расхода

        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null &&
            a != '' && b != '' && a.length < 50) {
            console.log('done');
            appData.expenses[a] = b;
            sum += +b;
        } else {
            alert('Вы допустили ошибку, попробуйте еще раз');
            i--;
        }
    }
    expensesValue.textContent = sum;
    sumExpenses = sum;
    return sumExpenses;
});

/* необязательные расходы */
btnApproveDown.addEventListener('click', function () {
    for (let i = 0; i < optionalexpensesItem.length; i++) {
        let question = optionalexpensesItem[i].value;
        appData.optionalExpenses[i] = question;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

/* Расчет дневного бюджета */
btnApproveCalc.addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget + sumExpenses / 30).toFixed(); // Складываем общий бюджет с суммой обязательных расходов и делим на 30 дней
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 13000) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 13000 && appData.moneyPerDay < 30000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 30000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'ошибка';
        }
    } else {
        daybudgetValue.textContent = 'ошибка';
    }
});

/* статьи возможного дохода через запятую */
chooseIncome.addEventListener('input', function () {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

/* Проверка на наличие накоплений */
checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

/* расчет на год и на месяц */
sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * +percent;
        appData.yearIncome = sum / 100 * +percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * +percent;
        appData.yearIncome = sum / 100 * +percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

/* Создаем объект */
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
}
