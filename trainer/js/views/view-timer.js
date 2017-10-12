'use strict';
/**
 * Вьюшка, управляющая таймером
 */
class ViewTimer {
	constructor() {
		// внутренние объекты
		this.time = 0;
		this.started = false;
		this.timerID = null;

		// HTML-элементы
		this.container = document.getElementById('viewTimer');
		this.divTimer = document.getElementById('timer');
		this.buttonTimer = document.getElementById('buttonTimer');
	}
	/** -------------------------------------------------------------------
	 * Инициализация
	 */
	init() {
		// вешаем обработчик на кнопку старта/останова таймера
		this.buttonTimer.addEventListener('click', this.toggleTimer.bind(this));
	}
	/** -------------------------------------------------------------------
	 * Форматирование времени: количество секунд в формате 00:00:00
	 */
	timeFormat(seconds) {
		let time = new Date(1970,0,0,0,0,seconds);
		
		let hour = time.getHours();
		let minute = time.getMinutes();
		let second = time.getSeconds();
		
		if (hour < 10) hour = "0" + hour;
		if (minute < 10) minute = "0" + minute;
		if (second < 10) second = "0" + second;
		
		let res = hour + ":" + minute + ":" + second;
		return res;	
	}
	/** -------------------------------------------------------------------
	 * Отрисовка таймера
	 */
	render() {
		this.divTimer.innerHTML = this.timeFormat(this.time);
	}
	/** -------------------------------------------------------------------
	 * Получение времени таймера
	 */
	getCurrentTime() {
		return this.time;
	}
	/** -------------------------------------------------------------------
	 * Обработчик клика по кнопке старта/останова таймера
	 */
	toggleTimer(e) {

		this.started = !this.started;

		if (this.started) {
			this.start();
		} else {
			this.stop();
		};	

		// генерируем событие о том, что была нажата кнопка таймера
		let clickEvent = new CustomEvent('timerClicked', { bubbles: true });
		e.target.dispatchEvent(clickEvent);
	}
	/** -------------------------------------------------------------------
	 * Запуск таймера
	 */
	start() {
		this.started = true;

		this.buttonTimer.classList.remove('play');
		this.buttonTimer.classList.add('pause');

		this.timerID = setInterval(function() {
			this.time++;
			this.render();
		}.bind(this), 1000);
	}
	/** -------------------------------------------------------------------
	 * Останов таймера
	 */
	stop() {
		this.started = false;

		this.buttonTimer.classList.remove('pause');
		this.buttonTimer.classList.add('play');

		clearInterval(this.timerID);
		this.render();
	}
	/** -------------------------------------------------------------------
	 * Сброс таймера
	 */
	reset() {
		this.stop();
		this.time = 0;
		this.render();
	}
}