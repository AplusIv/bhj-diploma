/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {

    // !!! Проверить корректность
    Account.create(data, (err, response) => {
      console.log(data);
      if (err === 200) {
        console.log(response);
        
        // console.log(this.element); // element указывает на form #new-account-form
        // this.element.open();

        if (!response.success) {
          alert(response.error); // Для удобства. ЧТобы понимать, что такой счёт уже существует
        }
        // this.element.reset();
        // new Modal(document.getElementById('modal-new-account')).close(); 
        // App.update();
        this.element.reset();

        /* const modalElement = this.element.closest('[data-modal-id]');
        console.log(modalElement);

        console.log(modalElement.dataset.modalId); */ // 'newAccount'.
        App.getModal('createAccount').close();
        App.update();

      } else {
        console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
      }
    });   
  }
}