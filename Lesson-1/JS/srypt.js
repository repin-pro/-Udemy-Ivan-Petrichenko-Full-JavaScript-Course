/* Первые два вопроса */
let money = +prompt('Ваш бюджет на месяц?', ''); //ставим + перед promt для того, чтобы введенные данные имели тип number
let time = prompt('Введите дату в формате YYYY-MM-DD', '');

/* Создаем объект */
let appData = {
    moneyData: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
}

/* задаем пользовалю вопросы по 2 раза */
let questionExpenses = prompt('Введите обязательную статью расходов в этом месяце', '');
let questionAmount = +prompt('Во сколько обойдется?', '');
let questionExpenses2 = prompt('Введите обязательную статью расходов в этом месяце', '');
let questionAmount2 = +prompt('Во сколько обойдется?', '');

/* Создаем дополнительные переменные в объекте "expenses" и принимаем данные от пользователя в них*/
appData.expenses.amount = `${questionExpenses} : ${questionAmount}`;
appData.expenses.amount2 = `${questionExpenses2} : ${questionAmount2}`;

// Выводим на экран пользователя бюджет за 1 день из расчета, что у нас месяц = 30 дней
alert(`Ваш бюджет на месяц =  ${appData.moneyData / 30}`);





