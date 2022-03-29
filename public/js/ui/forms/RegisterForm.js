/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (err === 200) {
         if (response.success) {
           User.setCurrent(response.user);
           User.current();
           // +
          // const registerForm = document.querySelector('#register-form');
          // registerForm.reset(); // ??? Может быть, надо как-то иначе искать открытую форму? Через this.element?
          this.element.reset();

          App.setState('user-logged');        
          // const registerModal = new Modal(registerForm.closest('#register-login'));
          // registerModal.close(); 
          App.getModal('register').close(); 
         }
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      })
  }
}