/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {    
    Account.list(User.current(), (err, response) => {
      if (err === 200) {
        console.log(response);

        console.log(this);
        console.log(this.element);

        let accountsList = '';
        for (let account of response.data) {
          accountsList += `<option value="${account.id}">${account.name}</option>\n`
          // console.log(accountsList);
        }

        console.log(accountsList);

        // ??? Почему-то добавляет 4 раза данные из запроса в селект. Не могу разобраться, с чем это связано


        // console.log(this.element.querySelector('[name="account_id"]'));
        // this.element.querySelector('[name="account_id"]').insertAdjacentHTML('beforeEnd', accountsList);

        let selectElements = document.createElement('DIV'); // Пришлось делать через добавление пустого элемента в качестве потомка, потом менять его HTML
        console.log(selectElements);
        
        this.element.querySelector('[name="account_id"]').appendChild(selectElements);
        console.log(this.element.querySelector('[name="account_id"]'));

        selectElements.outerHTML = accountsList;
        console.log(selectElements);


        // this.element.querySelector('[name="account_id"]').insertAdjacentHTML('beforeEnd', '<div>ola-la</div>')
        console.log(this.element);
      } else {
        console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    // !!! Проверить корректность
    
    // this.element указывает на форму #new-income-form. Смотри App.initForms()    
    Transaction.create(data, (err, response) => {
      console.log(data);
      if (err === 200) {
        console.log(response);
        
        console.log(this.element); // element указывает на form #new-income-form

        if (!response.success) {
          alert(response.error);
        }
        this.element.reset();

        const modalElement = this.element.closest('[data-modal-id]');
        console.log(modalElement);

        console.log(modalElement.dataset.modalId); // Либо "newIncome", либо "newExpense" в зависимости от формы в которой находимся.
        App.getModal(modalElement.dataset.modalId).close();
        App.update();
      } else {
        console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
      }
    })
  }
}