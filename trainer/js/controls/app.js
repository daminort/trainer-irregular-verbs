'use strict';
/**
 * Основной контроллер всего приложения
 */
class App {
	constructor() {
		// вьюшки
		this.irregularVerbs = new ViewIrregularVerbs();
		this.timer = new ViewTimer();

		// внутренние объекты и переменные
		this.viewList = [this.irregularVerbs];
		this.currentView = null;

		this.results = {};

		// HTML-элементы
		this.container = document.getElementById('app');
		this.buttonCheck = document.getElementById('buttonCheck');
		this.buttonNext = document.getElementById('buttonNext');

		this.divTaskDone = document.getElementById('taskDone');
		this.divTaskCorrect = document.getElementById('taskCorrect');
		this.divTaskError = document.getElementById('taskError');
		this.divTaskTimeTotal = document.getElementById('taskTimeTotal');
	}
	/** -------------------------------------------------------------------
	 * Инициализация приложения
	 */
	init() {
		// инициализируем вьюшки
		this.timer.init();
		this.irregularVerbs.init();

		// устанавливаем и отображаем начальную вьюшку
		this.currentView = this.irregularVerbs;
		this.showCurrentView();

		// сбрасываем и отрисовываем общие результаты
		this.resetResults();
		this.renderResults();

		// вешаем обработчики событий на кнопки "Проверить" и "Далее"
		this.buttonCheck.addEventListener('click', this.buttonClick.bind(this));
		this.buttonNext.addEventListener('click', this.buttonClick.bind(this));

		// на общий контейнер вешаем обработчик нашего события "timerClicked",
		// которое порождает кнопка управления таймером: по нему будем заставлять
		// текущую вьюшку ставить фокус на свое первое поле ввода
		this.container.addEventListener('timerClicked', function() {
			this.currentView.setFirstFocus();
		}.bind(this) );
	}
	/** -------------------------------------------------------------------
	 * Отображение текущей вьюшки (остальные при этом скрываем)
	 */
	showCurrentView() {
		for (let i = 0; i < this.viewList.length; i++) {
			if (this.viewList[i] !== this.currentView) {
				this.viewList[i].hide();
			};
		};
		this.currentView.show();
	}
	/** -------------------------------------------------------------------
	 * Сброс общих результатов
	 */
	resetResults() {

		// сброс реультатов
		this.results = {
			taskCount: this.currentView.model.wordsCount,
			taskDone: 0,
			taskCorrect: 0,
			taskError: 0,
			taskTimeTotal: 0
		};
		// остановка и сброс таймера
		this.timer.reset();
	}
	/** -------------------------------------------------------------------
	 * Отрисовка общих результатов
	 */
	renderResults() {

		// получим время у таймера
		this.results.taskTimeTotal = this.timer.getCurrentTime();

		this.divTaskDone.innerHTML = this.results.taskDone + ' / ' + this.results.taskCount;
		this.divTaskCorrect.innerHTML = this.results.taskCorrect;
		this.divTaskError.innerHTML = this.results.taskError;
		this.divTaskTimeTotal.innerHTML = this.timer.timeFormat(this.results.taskTimeTotal);
	}
	/** -------------------------------------------------------------------
	 * Обаботка нажатия на кнопки "Проверить" и "Далее"
	 */
	buttonClick(e) {

		let button = e.target;
		
		// если все задания выполнены,ничего не делаем
		if (this.currentView.model.done) {
			return;
		}

		// проверка
		if (button === this.buttonCheck) {

			let checkResult = this.currentView.check();
			
			// получим у вьюшки массив элементов-значков для отображения результатов
			let resultIcons = this.currentView.getResultIcons();

			// отображаем результаты проверки
			for (let i = 0; i < resultIcons.length; i++) {
				let iconParams = resultIcons[i];
				let iconElement = iconParams.element;

				iconElement.classList.remove('unvisible');
				iconElement.classList.add('visible');

				iconElement.style.top = iconParams.top + 'px';
				iconElement.style.left = iconParams.left + 'px';
			};

			this.results.taskDone++;
			if (checkResult) 
				this.results.taskCorrect++;
			else
			this.results.taskError++;

			this.renderResults();

		// следующее задание	
		} else if (button === this.buttonNext) {

			// сбрасываем у вьюшки предыдущие результаты проверки
			this.currentView.resetCheckStatus();

			// получаем следующее задание
			this.currentView.next();

			// если все задания выполнены, останавливаем таймер
			if (this.currentView.model.done) {
				this.timer.stop();
				this.renderResults();
			}
		};
	};
}