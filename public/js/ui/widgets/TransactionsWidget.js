/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw 'Элемент не выбран или не найден'; // ??? Нужно ли? См. App.initWidgets(). Там по умолчанию добавляется панель в конструктор
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeBtn = this.element.querySelector('.create-income-button');
    incomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('newIncome').open();
    })

    const expenseBtn = this.element.querySelector('.create-expense-button');
    expenseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('newExpense').open();
    })
  }
}
