/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw 'Элемент не выбран или не найден';
    }
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();

      this.submit();
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const formData = new FormData(this.element);
    console.log(formData);
    
    const entries = formData.entries();
    const data = {};

    // Вставить пары в объект и вернуть его из метода

    for (let item of entries) {
      const key = item[ 0 ],
      value = item[ 1 ];
      data[key] = value; // Заполняю новый объект парами ключ-значение из объекта formData
      console.log(entries);
      console.log( `${key}: ${value}` );
      console.log(data);
    }
    return data;
  }

  onSubmit(options) {
    console.log(this); // Проверка. По условию задания метод должен остаться пустым
    console.log(options); // Проверка. По условию задания метод должен остаться пустым
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    console.log(this);
    console.log(this.getData());
    const data = this.getData();
    this.onSubmit(data);
  }
}