/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
      this.update();
    } else {
      throw 'Элемент не выбран или не найден'; // ??? Когда это может произойти? ПОдставляется же document.querySelector(".accounts-panel") через App.initWidgets()
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    document.querySelector('.create-account').addEventListener('click', () => {
      const createAccountModal = App.getModal('createAccount');
      console.log(createAccountModal);

      createAccountModal.open();

      console.log(this);
    });

    const accounts = document.querySelectorAll('.account');
    console.log(accounts);

    // На добавленные через renderItem() не добавляет слушатели. Приходится их добавлять вручную через цикл в методе renderItem()

    if (accounts) {
      for (let account of accounts) {
        account.addEventListener('click', () => {
          console.log(this);
          this.onSelectAccount(account);
        })
      }
    }
    
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if(User.current()) {
      Account.list(User.current(), (err, response) => {
        if (err === 200) {
          console.log(response);
          
          console.log(this);
          this.clear();
          this.renderItem(response.data);

          // !!! Метод render() ????? В описании к заданию написан этот метод, но разве тут не renderItem()?

        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = document.querySelectorAll('.account');
    console.log(accounts);

    if (accounts) {
      for (let account of accounts) {
        account.remove();
      }
    }
    console.log(accounts);
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const accounts = document.querySelectorAll('.account');
    console.log(accounts);

    if (accounts) {
      for (let account of accounts) {
        if (account.classList.contains('active')) {
          account.classList.remove('active');
        }
      }
    }

    element.classList.add('active');

    App.showPage( 'transactions', { account_id: element.dataset.id }); // !!! Под вопросом 2-й аргумент
    console.log(App.showPage( 'transactions', { account_id: element.dataset.id }));
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const accountHtml = 
    `<li class="account" data-id="${item.id}">
      <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
      </a>
    </li>`;

    // !!!! Все счета активны (.active). Убрал класс.
    // ! Привести суммы к формату образца из задания

    console.log(accountHtml);
    return accountHtml;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    let renderedAccounts = '';
    for (let item of data) {
      // this.element.insertAdjacentHTML('beforeEnd', this.getAccountHTML(item));   
      // this.element.appendChild(this.getAccountHTML(item));  
      renderedAccounts += this.getAccountHTML(item);
    }
    
    this.element.insertAdjacentHTML('beforeEnd', renderedAccounts);

    // Пришлось повторно вешать слушатели, так как рендерятся счета без них.

    const accounts = this.element.querySelectorAll('.account');
    console.log(accounts);

    if (accounts) {
      for (let account of accounts) {
        /* account.addEventListener('click', () => {
          console.log(this);
          this.onSelectAccount(account);
        }) */
        account.onclick = () => {
          console.log(this);
          this.onSelectAccount(account);
        }
      }
    }
  }
   
}
