/* Первые два вопроса */
let money = +prompt('Ваш бюджет на месяц?', ''); //ставим + перед promt для того, чтобы введенные данные имели тип number
let time = prompt('Введите дату в формате YYYY-MM-DD', '');

/* Создаем объект */
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
}

/* задаем пользовалю вопросы по 2 раза */
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


appData.moneyPerDay = appData.budget / 30; // Передаем новый параметр объекта "бюджет на 1 день"
alert(`Ваш бюджет на месяц =  ${appData.moneyPerDay}`);
console.log(appData.expenses); //проверяем корректность полученных данных

if (appData.moneyPerDay < 13000) {
    console.log('Минимальный уровень достатка');
} else if (appData.moneyPerDay > 13000 && appData.moneyPerDay < 30000) {
    console.log('Средний уровень достатка');
} else if (appData.moneyPerDay > 30000) {
    console.log('Высокий уровень достатка');
} else {
    console.log('ошибка');
}






