/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
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
    createRequest({url2: this.URL, method: 'GET', data, callback}); 
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    // Для запроса счёта в url передавать '/account' Account
    // Для запроса попытки транзакции в url передавать /transaction Transaction
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

