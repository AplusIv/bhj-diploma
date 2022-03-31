/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element) {
      this.element = element; // <div class="content-wrapper">

      this.lastOptions; // Дополнительное свойство для сохранения данных options, переданных из App.showPage(pageName, options)

      this.registerEvents();
    } else {
      throw 'Элемент не выбран или не найден'; 
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {    
    const deleteAccountBtn = document.querySelector('.remove-account');
    deleteAccountBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Под вопросом. Ссылки никакой нет
      this.removeAccount();
    });


    this.element.querySelector('.content').addEventListener('click', (e) => {
      e.preventDefault(); // Под вопросом. Ссылки никакой нет
      const deleteTransactionBtn = e.target.closest('.transaction__remove');
      if (deleteTransactionBtn) {
        this.removeTransaction(deleteTransactionBtn.dataset.id);
      }
    });   
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      const question = confirm('Вы действительно хотите удалить счёт?');
      if(question) {
        Account.remove({id: this.lastOptions.account_id}, (err, response) => {
          if (err === 200) {

            this.clear(); // Очищаю страницу, удаляю записи со страницы о транзакциях, название счёта по умолчанию

            App.updateWidgets();
            App.updateForms();
          } else {
            console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
          }
        })
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {    
    let question = confirm('Вы действительно хотите удалить эту транзакцию?');
    if (question) {
      Transaction.remove({id: id}, (err, response) => {
        if (err === 200) {          
          App.update();
          // this.update();
          // App.updateWidgets();
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      this.lastOptions = options; //options - объект с настройками вида {account_id: 3}, где account_id - идентификатор счёта
      // Получаю данные конкретного счёта
      Account.get(options.account_id, (err, response) => {
        if (err === 200) {
          this.renderTitle(response.data['name']);
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      })

      // Получаю список доходов и расходов пользователя по конкретному счёту 
      Transaction.list(options, (err, response) => {
        if (err === 200) {
          this.renderTransactions(response.data);
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      })
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(responseDate) {
    const date = new Date(responseDate);
    let month = '';
    if (date.getMonth() === 0) {
      month = 'января'
    } else if (date.getMonth() === 1) {
      month = 'февраля'
    } else if (date.getMonth() === 2) {
      month = 'марта'
    } else if (date.getMonth() === 3) {
      month = 'апреля'
    } else if (date.getMonth() === 4) {
      month = 'мая'
    } else if (date.getMonth() === 5) {
      month = 'июня'
    } else if (date.getMonth() === 6) {
      month = 'июля'
    } else if (date.getMonth() === 7) {
      month = 'августа'
    } else if (date.getMonth() === 8) {
      month = 'сентября'
    } else if (date.getMonth() === 9) {
      month = 'октября'
    } else if (date.getMonth() === 10) {
      month = 'ноября'
    } else {
      month = 'декабря'
    }

    return (date.getHours() < 10) ? `${date.getDate()} ${month} ${date.getFullYear()} г. в 0${date.getHours()}:${date.getMinutes()}` : `${date.getDate()} ${month} ${date.getFullYear()} г. в ${date.getHours()}:${date.getMinutes()}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    const transaction = `
    <div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
        </div>      
        <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">${item.sum}<span class="currency">₽</span></div>
      </div>
      <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>\n`
    return transaction;

    // !!! Подкорректировать формат времени
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) { 
    let transactions = '';
    for (let transaction of data) {
      transactions += this.getTransactionHTML(transaction);
    }

    const transactionsSection = this.element.querySelector('.content');
    transactionsSection.innerHTML = ''; // Теперь данные не задваиваюся.
    transactionsSection.insertAdjacentHTML('beforeEnd', transactions);
  }
}