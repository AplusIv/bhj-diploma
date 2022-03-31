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
    // Для передачи element используется метод класса App initModals()
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw 'Элемент не выбран или не найден';
    }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let modalClosures = this.element.querySelectorAll('[data-dismiss="modal"]');
    for (let modalClosure of modalClosures) {
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
    this.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {    
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = ''; // возврат к первичным css стилям
  }
}