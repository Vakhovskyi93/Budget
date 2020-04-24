

let budget = {
    income:[

    ],
    expenses:[
                
     ]
}

/**
 * 
 */
const description = document.querySelector(".add__description");
const add_value = document.querySelector(".add__value");
const add_type = document.querySelector(".add__type");
const btn = document.querySelector('.add__btn');
const getContent = document.querySelector('.add');
const income = document.querySelector('.income__list');
const expens = document.querySelector('.expenses__list');
const budgetValue = document.querySelector('.budget__value');
const budgetIncomeValue = document.querySelector('.budget__income--value');
const budgetExpensesValue = document.querySelector('.budget__expenses--value');
const container_clearfix = document.querySelector('.container.clearfix');



// Генерация id
const generate_id = () => {
    const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let id = "";
    for (let i = 0; i < 10; i++) {
        id += words[Math.floor(Math.random() * words.length)];
    }

    return id;
}


// получение вводных 
const add_new_income = (sing, title, amount ) => {
    if (!title) return console.log("Введите заголовок задачи.");
    if (!amount) return console.log("Введите текст задачи.");
    
    if(sing == "income") add_new_profit(title, amount);
    else { 
        add_new_expense(title, amount);
    } 
}
/**добавление в Income
 * 
 * @param {title} title 
 * @param {amount} amount 
 */
const add_new_profit = (title, amount) => {
    const new_todo = { title, amount, id: generate_id() };
    budget.income.push(new_todo);
    budgetIncomeValue.innerHTML = "";
    const template = create_template(new_todo);
    income.insertAdjacentHTML('afterbegin', template);
    budgetIncomeValue.innerHTML = culc_income(budget.income);
    diferent();
    return budget.income;   
}
/**
 * добавление в expence
 * @param {*} title 
 * @param {*} amount 
 */
const add_new_expense = (title, amount) => {    
    const new_todo = { title, amount, id: generate_id() };
    budget.expenses.push(new_todo);
    budgetExpensesValue.innerHTML = "";
    const template = create_template(new_todo);
    expens.insertAdjacentHTML('afterbegin', template);
    budgetExpensesValue.innerHTML =  culc_income(budget.expenses);
    diferent();
    
    return budget.expenses;
}


/***результат для budget_value */
function diferent() {
    let t = culc_income(budget.expenses);
    let r =culc_income(budget.income);

    return budgetValue.innerHTML = r - t;
}

/**
 * Изменение класов для input
 */
function check_select_value() {
    const add_type = document.querySelector('.add__type').value;
    if(add_type == 'income'){
        return change_color_green();
    } else { 
        return change_color_red();
}
    
}
function change_color_green() {
    add_value.classList.remove('red-focus');
    description.classList.remove('red-focus');
    add_type.classList.remove('red-focus') 
}

function change_color_red() {
    add_value.classList.add('red-focus');
    description.classList.add('red-focus');
    add_type.classList.add('red-focus') 
}

add_type.addEventListener('change', (e) => {
    check_select_value()
});


/**
 * 
 * @param {select} sing
 * @param {*text} title
 * @param {*number} amount
 */
function value( sing, title, amount) {
    add_new_income( sing, title, amount);
    clearFotm();
}
 
/**
 * отправка формы
 * 
 */
btn.addEventListener('click', (e) => {
    return value(add_type.value, description.value, add_value.value)
});
getContent.addEventListener('keydown', (e) => {
    if (e.keyCode === 13)
    return value(add_type.value, description.value, add_value.value)
});

/**
 *  Очистка формы.
 */
function clearFotm() {
    add_value.value= '';
    description.value= '';
}
/**
 * Создание разметки
 * @param {new_todo} title 
 */
const create_template = (title) => {

    return `
    <div class="item clearfix" id="income-0" data-title-id="${title.id}">
        <div class="item__description">${title.title}</div>
        <div class="right clearfix">
            <div class="item__value">${title.amount}</div>
            <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
        </div>
    </div>
    `
};

const add_new_item_template = (title) => {
    const template = create_template(title);
    table.insertAdjacentHTML('afterbegin', template);   
}

/**
 * подсчет value
 * @param {budget.} e 
 */
function culc_income(e) {
    let a = 0;
    let j;
    for(let i = 0; i < e.length; i++){ 
       j = e[i].amount;
       a += Number(j);
    }    
       
    return a
}


/**
 * Удаление задачи из масива и разметки
 * 
 */

container_clearfix.addEventListener('click', (e) => {
    if (e.target.classList.contains('ion-ios-close-outline')) {
        const id = e.target.closest('#income-0').dataset.titleId;
        delete_item(id);
    }
})

const delete_item = id => {
    budget.income = budget.income.filter(title => title.id !== id);
    budget.expenses = budget.expenses.filter(title => title.id !== id);
    diferent();
    delete_todo_from_html(id);
    return budget;
}

const delete_todo_from_html= id => {
    const target = document.querySelector(`[data-title-id="${id}"]`);
    const target_parent = target.parentElement;
    target_parent.removeChild(target);
}

