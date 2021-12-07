/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
/*  const createRequest = (options = {}) => {

}; */

const createRequest = ({url2, method, data = {}, callback} = {}) => {

  const xhr = new XMLHttpRequest;   

  try {
    const url = new URL(url2,'http://localhost:8000');
    // url = new URL(Entity.URL,'http://localhost:8000');
    // url = new URL('/user/login','http://localhost:8000'); // объект url с начальным параметром base, относительно которого будет создаваться путь для запроса
    /* data = {
      email: 'demo@demo',
      password: 'demo'
    } */

    if (method === 'GET') {
      for (let key in data) {
        url.searchParams.set(key, data[key]); // добавляем параметры к url из data
      }

      console.log(url);

      xhr.open(method, url);
      xhr.responseType = 'json';    
      xhr.send();

    } else {
      console.log(url);

      let formData = new FormData;      
      for (let key in data) {
        formData.append(key, data[key]);
      }
      console.log(formData);

      xhr.open(method, url/* 'http://localhost:8000/user/current' *//* '/account' *//* '/user/login' */ ); 
      xhr.responseType = 'json';      
      xhr.send(formData);    
    }

    xhr.onload = callback = function(err, response = xhr.response) {
      if (xhr.status === 200) {
        console.log(`Загружено: ${xhr.status} ${JSON.stringify(response)}`);
        console.log(response);
      } else {
        console.log(err); // ??? Как попасть в ошибку здесь?
      }
    }; // Это рабочий вариант

    // xhr.onload = callback;

    /* xhr.onload = () => {
      console.log(`Загружено: ${xhr.status} ${JSON.stringify(xhr.response)}`);
    } */
    

  } catch(err) {
    // callback(err);
    console.log(err);
  }  
};