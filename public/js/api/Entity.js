/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  // static URL = '/account';
  // static URL = '/transaction';
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    /*
        Функция, которая сработает после запроса.
        Если в процессе запроса произойдёт ошибка, её объект
        должен быть в параметре err.
        Если в запросе есть данные, они должны быть переданы в response.
      */
      /* callback: (err, response) => {
        console.log( 'Ошибка, если есть', err );
        console.log( 'Данные, если нет ошибки', response );
      } */

      /* (err, response) => {
        if (err === 200) {
          console.log(response);
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      } */

    /* data = {
      mail: 'ivan@biz.pro',
      password: 'odinodin'
    }; */

    createRequest({url2: this.URL, method: 'GET', data, callback}); 
  }

  /* Entity.list({
    mail: 'ivan@biz.pro',
    password: 'odinodin'
  }, function(err, response) {
    if (err === 200) {
      console.log(`Загружено: ${JSON.stringify(response)}`);
      console.log(response);
    } else {
      console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
    }    
  }) */

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    // Для запроса счёта в url передавать '/account' Account
    // Для запроса попытки транзакции в url передавать /transaction Transaction

    /* (err, response) => {
        if (err === 200) {
          console.log(response);
        } else {
          console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
        }
      } */


    /* data = {
      mail: 'ivan@biz.pro'
    }; */

    createRequest({url2: this.URL, method: 'PUT', data, callback}); 
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({url2: this.URL, method: 'DELETE', data, callback}); 
  }
}

/* {
  mail: 'ivan@biz.pro'
} */


/* {
  mail: 'ivan@biz.pro',
  password: 'odinodin'
} */