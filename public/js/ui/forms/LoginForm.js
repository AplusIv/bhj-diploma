/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (err === 200) {
        console.log(response);
        if (response.success) {
          console.log(response.success);
          console.log(response.user);
          User.setCurrent(response.user);
          User.current();

          // +
          const loginForm = document.querySelector('#login-form');
          loginForm.reset(); // ??? Может быть, надо как-то иначе искать открытую форму? Через this.element?
          App.setState('user-logged');
          console.log('Должен был залогиниться, во всяком случае, ответ сервера успешный');
          
          const loginModal = new Modal(loginForm.closest('#modal-login'));
          loginModal.close();  
        }
      } else {
        console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
      }
    })
  }
}