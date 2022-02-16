/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw 'Элемент не выбран или не найден';
    }
    // this.element = element;
    // this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let modalClosures = this.element.querySelectorAll('[data-dismiss="modal"]');
    console.log(modalClosures);
    for (let modalClosure of modalClosures) {
      console.log(modalClosure);
      let boundOnClose = this.onClose.bind(this); // Привязал this к экземпляру класса. Иначе, this бы указывал на button слушателя, и нельзя было бы его использовать в вызове метода this.close() 
      modalClosure.addEventListener('click', boundOnClose);
      // modalClosure.onclick = this.onClose();
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    e.preventDefault();
    console.log('модальное окно закрыто');
    console.log(this);
    this.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    
    // ??? Нужно добавлять инлайновые стили? Или можно как-то css через js иначе поменять? 
    console.log(this);
    console.log(this.element);
    console.log(getComputedStyle(this.element).display);
    this.element.style.display = 'block';
    console.log(this.element.style.display);
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = ''; // возврат к первичным css стилям
    console.log(this.element.style.display);
    console.log(getComputedStyle(this.element).display);
  }
}