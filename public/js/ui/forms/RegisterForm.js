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
        console.log(response);
         if (response.success) {
           console.log(response.success);
           console.log(response.user);
           User.setCurrent(response.user);
           User.current();

           // +
          const registerForm = document.querySelector('#register-form');
          registerForm.reset(); // ??? Может быть, надо как-то иначе искать открытую форму? Через this.element?
          App.setState('user-logged');
          console.log('Должен был залогиниться, во всяком случае, ответ сервера успешный');
          
          const registerModal = new Modal(registerForm.closest('#register-login'));
          registerModal.close();  
         }
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      })
  }
}