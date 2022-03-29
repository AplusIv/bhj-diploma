/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */

class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    toggleButton.addEventListener('click', () => {
      document.querySelector('body').classList.toggle('sidebar-open');
      document.querySelector('body').classList.toggle('sidebar-collapse');
      return false; // либо e.preventDefault()
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    // кнопка "Выйти" сайдбара

    // !!!! Проверить корректность

    const logoutLink = document.querySelector('.menu-item_logout a'); // Ссылка внутри элемента списка
    
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      User.logout((err, response) => {
        if (err === 200) {
          if (response.success) {
            User.unsetCurrent();
            // + Устанавливаем состояние 'init'
            App.setState('init');
          } else{
            console.log('Некого деавторизовывать')
          }
        }  
      })
    })

    // Кнопка "Вход" сайдбара
    
    const loginLink = document.querySelector('.menu-item_login a');

    loginLink.addEventListener('click', (e) => {
      e.preventDefault();

      const loginModal = App.getModal('login');      
      loginModal.open();
    })   

    // Кнопка "Регистрация" сайдбара
    const registerLink = document.querySelector('.menu-item_register a');

    registerLink.addEventListener('click', (e) => {
      e.preventDefault();

      const registerModal = App.getModal('register');      
      registerModal.open();
    })    
  }
}