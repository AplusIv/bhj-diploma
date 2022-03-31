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
      if (err === 200) {
        // console.log(this.element); // element указывает на form #new-account-form

        if (!response.success) {
          alert(response.error); // Для удобства. ЧТобы понимать, что такой счёт уже существует
        }
        this.element.reset();

        App.getModal('createAccount').close();
        App.update();
      } else {
        console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
      }
    });   
  }
}