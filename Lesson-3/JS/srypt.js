let money, time; //Объявляем глобальные переменные для работы с функцией start

function start() {
    /* Первые два вопроса */
    money = +prompt('Ваш бюджет на месяц?', ''); //ставим + перед promt для того, чтобы введенные данные имели тип number
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    //isNaN будет выдавать true до тех пор, пока туда будут попадать не цифры и цикл будет продолжаться
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}
//start();

/* Создаем объект */
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true
}

function chooseExpenses() {
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
}
//chooseExpenses();

// Функция расчета бюджета на месяц
function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30).toFixed(); // Используем метод toFixed, чтобы округлить число, 
    //если нет числа то округляем до ближайшего целого, если стоит цифра 1, то до первого знака после запятой. 
    //Но возвращает строковое значение

    alert(`Ваш бюджет на месяц =  ${appData.moneyPerDay}`);
}
//detectDayBudget();

// Функция расчета уровня дохода
function detectLevel() {
    if (appData.moneyPerDay < 13000) {
        console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 13000 && appData.moneyPerDay < 30000) {
        console.log('Средний уровень достатка');
    } else if (appData.moneyPerDay > 30000) {
        console.log('Высокий уровень достатка');
    } else {
        console.log('ошибка');
    }
}
//detectLevel();

// Функция расчета дохода по депозиту
function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt('Какова сумма накоплений'),
            percent = +prompt('Под какой процент');

        appData.monthIncome = save / 100 / 12 * percent;
        alert(`Доход в месяц с вашего депозита: ${appData.monthIncome}`);
    }
}
//checkSavings()

// Функция определения необязательных расходов
function chooseOptExpenses() {
    for (let i = 1; i < 4; i++) {
        let question = prompt('Статья необязательных расходов?', '');
        appData.optionalExpenses[i] = question;
    }
}
chooseOptExpenses();
console.log(appData.optionalExpenses);


