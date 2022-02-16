/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
/*  const createRequest = (options = {}) => {

}; */

// const { response } = require("express");

const createRequest = ({url2, method, data = {}, callback} = {}) => {
// const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest;   

  try {
    const url = new URL(url2,'http://localhost:8000');
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

    /* xhr.addEventListener('readystatechange', function(err) {
    // xhr.onload = (err) => {
      if (this.status === 200) {

        console.log(this);
        console.log(`Загружено: ${this.status} ${JSON.stringify(this.response)}`);
        // let response = this.response;

        let ave = callback;
        console.log(ave(xhr.response));

        // console.log(callback(response));
        console.log(callback(xhr.response));
        console.log(typeof callback(xhr.response));
        // console.log(`Загружено: ${xhr.status} ${JSON.stringify(response)}`);
        // console.log(response);
        // response1 = response;        
      } else {
        console.log(err); // ??? Как попасть в ошибку здесь?
        err1 = err;
      }  
    }) */

    xhr.addEventListener('readystatechange', function(err) {
      /* if (err == null) {
        callback('какие-то данные');
      } */
      callback(this.status, this.response);      
    })    

    /* xhr.onload = callback = function(err, response = xhr.response) {
      if (xhr.status === 200) {
        console.log(`Загружено: ${xhr.status} ${JSON.stringify(response)}`);
        console.log(response);
      } else {
        console.log(err); // ??? Как попасть в ошибку здесь?
      }
    }; */ // Это рабочий вариант       

  } catch(err) {
    // callback(err);
    console.log(err); // ??? Как попасть в ошибку здесь?
  }  
};

/* createRequest({url2:'/user/login', method:'POST', data:{
  email: 'demo@demo',
  password: 'demo'
}}) */

/* createRequest({url2:'/user/login', method:'POST', data:{
  email: 'demo@demo',
  password: 'demo',
  },
  callback(response) {
    console.log(`Загружено: ${JSON.stringify(response)}`);
    console.log(response);
  }
}) */


// Верно!!!
/* let options = {
  url2:'/user/login', 
  method:'POST', 
  data:{
    email: 'demo@demo',
    password: 'demo',
  },
  callback(err, response) {
    if (err === 200) {
      console.log(`Загружено: ${JSON.stringify(response)}`);
      console.log(response);
    } else {
      console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
    }    
  }
} */
// createRequest(options); 
// Верно!!!


/* createRequest({url2:'/user/login', method:'POST', data:{
  email: 'demo@demo',
  password: 'demo',
  },
  callback(err, response) {
    if (err === 200) {
      console.log(`Загружено: ${JSON.stringify(response)}`);
      console.log(response);
    } else {
      console.log(`Наконец-то всё сломалось, статус ошибки ${err}`);
    }    
  }
}) */

