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

    /* const user = {
      id: 12,
      name: 'Vlad'
    }; */

    /* (err, response) => {
        if (err === 200) {
          console.log(User.current());
          if (response.success) {
            console.log(response);
            console.log(response.success);

            User.setCurrent( response.user );
            console.log(response.user);
          } else {
            console.log(response);
            console.log(response.success);

            console.log(User.unsetCurrent());
            console.log(User.current());
          }
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
          }
        }
     */


    console.log(this.current());

    const xhr = createRequest({
      url2: this.URL + '/current', 
      method: 'GET', 
      callback
      })
    // createRequest({url2: this.URL + '/current', method: 'GET', data: this.current(), callback});
    // createRequest({url2: this.URL + '/current', method: 'GET', data: {id: 12, name: 'Vlad'}, callback});
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
    
        /* {
      email: 'scranton@electricsity.us',
      password: 'dundermifflin'
    } */

    /* (err, response) => {
        if (err === 200) {
          console.log(response);
          if (response.success) {
            console.log(response.success);
            console.log(response.user);
            User.setCurrent(response.user);
            User.current();
          }
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      } */

    createRequest({
      url2: this.URL + '/login',
      method: 'POST',
      // responseType: 'json',
      data,
      callback
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    /* const data = {
      name: 'Vlad',
      email: 'test@test.ru',
      password: 'abracadabra'
    } */

    /* {
      name: 'Michael Scott',
      email: 'scranton@electricsity.us',
      password: 'dundermifflin'
    } */

    /* (err, response) => {
      if (err === 200) {
        console.log(response);
         if (response.success) {
           console.log(response.success);
           console.log(response.user);
           User.setCurrent(response.user);
           User.current();
         }
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      } */

    createRequest({
      url2: this.URL + '/register',
      method: 'POST',
      // responseType: 'json',
      data,
      /* callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      } */
      callback
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    
    createRequest({
      url2: this.URL + '/logout',
      method: 'POST',
      // responseType: 'json',
      callback
    })

    

    /* (err, response) => {
      if (err === 200) {
        console.log(response);
        if (response.success) {
          console.log(response);
          User.unsetCurrent();
        } else{
          console.log('Некого деавторизовывать')
        }
      }  
    } */
  }
}