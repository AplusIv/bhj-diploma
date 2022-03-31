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
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {    
    Account.list(User.current(), (err, response) => {
      if (err === 200) {

        let accountsList = '';
        for (let account of response.data) {
          accountsList += `<option value="${account.id}">${account.name}</option>\n`
        }

        this.element.querySelector('[name="account_id"]').innerHTML = '';
        this.element.querySelector('[name="account_id"]').insertAdjacentHTML('beforeEnd', accountsList); 
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
    // this.element указывает на форму #new-income-form. Смотри App.initForms()    
    Transaction.create(data, (err, response) => {
      console.log(data);
      if (err === 200) {
        // console.log(this.element); // element указывает на form #new-income-form

        if (!response.success) {
          alert(response.error);
        }
        this.element.reset();

        const modalElement = this.element.closest('[data-modal-id]');
        // console.log(modalElement.dataset.modalId); // Либо "newIncome", либо "newExpense" в зависимости от формы в которой находимся.
        App.getModal(modalElement.dataset.modalId).close();
        App.update();
      } else {
        console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
      }
    })
  }
}