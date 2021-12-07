/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    /* user = {
  id: 12,
  name: 'Vlad'
}; */
  localStorage.user = JSON.stringify(user);
  console.log(localStorage.user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    /* user = {
  id: 12,
  name: 'Vlad'
} */
  console.log(localStorage.user);
  localStorage.removeItem('user');
  console.log(localStorage.user);
  }

  /**
   * Возвращает ОБЪЕКТ текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    /* user = {
      id: 12,
      name: 'Vlad'
    }; */
    if (localStorage.user) {
      const current = JSON.parse(localStorage.user);
      console.log(current);
      return current;
    } else {
      console.log(undefined);
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({url2: this.URL + '/current', method: 'GET', data: this.current(), callback});
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    /* data = {
      email: 'demo@demo',
      password: 'demo'
    } */ 
    
    // ??? Успешный ответ {"success":true,"user":{"name":"demo","email":"demo@demo","password":"demo","id":"1"}}
    // Но ответ никак не связан со стораджем (id не добавился в сторадж). Полагаю, что ошибка в коллбэке, у меня он неизменный в createRequest.
    // Как правильно мне переработать решение? Нужно начинать с createRequest? 
    
    createRequest({
      url2: this.URL + '/login',
      method: 'POST',
      // responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {

  }
}
