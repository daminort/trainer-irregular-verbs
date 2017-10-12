'use strict';
/**
 * Вьюшка, которая управляет отображением тренажера неправильных глаголов
 */
class ViewIrregularVerbs {
	constructor() {
		// необходимые объекты
		this.model = new IrregularVerbs();
		this.word = null;
		this.checkStatus = {};

		// внутренние переменные
		this.ru = '';
		this.form01 = '';
		this.form02 = '';
		this.form03 = '';

		// HTML-элементы
		this.container = document.getElementById('viewIrregularVerbs');

		this.divRu = document.getElementById('ivRu');
		this.inputForm01 = document.getElementById('ivEnForm01');
		this.inputForm02 = document.getElementById('ivEnForm02');
		this.inputForm03 = document.getElementById('ivEnForm03');

		this.iconResult01 = document.getElementById('ivIconResultForm01');
		this.iconResult02 = document.getElementById('ivIconResultForm02');
		this.iconResult03 = document.getElementById('ivIconResultForm03');
	}
	/** -------------------------------------------------------------------
	 * Инициализация вьюшки
	 */
	init() {

		// инициализируем состояние проверки
		this.initCheckStatus();

		// вешаем обработчики получения и потери фокуса на поля ввода
		this.inputForm01.addEventListener('focus', this.togglePlaceholder );
		this.inputForm02.addEventListener('focus', this.togglePlaceholder );
		this.inputForm03.addEventListener('focus', this.togglePlaceholder );

		this.inputForm01.addEventListener('blur', this.togglePlaceholder );
		this.inputForm02.addEventListener('blur', this.togglePlaceholder );
		this.inputForm03.addEventListener('blur', this.togglePlaceholder );

		// запускаем задачу
		this.next();
	}
	/** -------------------------------------------------------------------
	 * Инициализация состояния проверки
	 */
	initCheckStatus() {
		this.checkStatus = {
			status: true,
			form01: { status: true, correct: ''},
			form02: { status: true, correct: ''},
			form03: { status: true, correct: ''}
		};
	}
	/** -------------------------------------------------------------------
	 * Сброс состояния проверки
	 */
	resetCheckStatus() {

		// инициализируем внутренний объект
		this.initCheckStatus();

		// скрываем иконки результатов
		this.iconResult01.classList.remove('visible');
		this.iconResult02.classList.remove('visible');
		this.iconResult03.classList.remove('visible');

		this.iconResult01.classList.add('unvisible');
		this.iconResult02.classList.add('unvisible');
		this.iconResult03.classList.add('unvisible');
	}
	/** -------------------------------------------------------------------
	 * Отображение вьюшки
	 */
	show() {
		this.container.classList.remove('unvisible');
		this.container.classList.add('visible');
	}
	/** -------------------------------------------------------------------
	 * Скрытие вьюшки
	 */
	hide() {
		this.container.classList.remove('visible');
		this.container.classList.add('unvisible');
	}
	/** -------------------------------------------------------------------
	 * Запуск следующей задачи
	 */
	next() {
		this.form01 = '';
		this.form02 = '';
		this.form03 = '';

		this.word = this.model.getNextWord();
		if (this.word === null) {
			this.ru = 'Все задания пройдены!';
		} else {
			this.ru = this.word.ru;
		}
		// перерисовываем состояние вьюшки
		this.render();

		// фокус ставим в первое поле ввода
		this.setFirstFocus();
	}
	/** -------------------------------------------------------------------
	 * Перерисовка вьюшки
	 */
	render() {
		// устанавливаем значения
		this.divRu.innerHTML = this.ru;
		this.inputForm01.value = '';
		this.inputForm02.value = '';
		this.inputForm03.value = '';
		// возвращаем плейсхолдеры
		this.inputForm01.blur();
		this.inputForm02.blur();
		this.inputForm03.blur();
	}
	/** -------------------------------------------------------------------
	 * Обработка команды проверки введеных данных
	 */
	check() {
		// полчаем данные из полей ввода
		this.form01 = (this.inputForm01.value).trim().toLowerCase();
		this.form02 = (this.inputForm02.value).trim().toLowerCase();
		this.form03 = (this.inputForm03.value).trim().toLowerCase();

		// готовим объект для сравнения с исходным словом
		let userWord = new Word( [this.form01, this.form02, this.form03], this.ru );

		// сравниваем
		let isEqual = this.model.isEqual(this.word, userWord);
		this.checkStatus.status = isEqual;

		// если есть ошибка, получим, где именно, и установим соответствующий checkStatus
		if ( !isEqual ) {
			let sampleWord = this.word;
			if ( sampleWord.en.form01 !== userWord.en.form01 ) {
				this.checkStatus.form01.status = false;
				this.checkStatus.form01.correct = sampleWord.en.form01;
			};
			if ( sampleWord.en.form02 !== userWord.en.form02 ) {
				this.checkStatus.form02.status = false;
				this.checkStatus.form02.correct = sampleWord.en.form02;
			};
			if ( sampleWord.en.form03 !== userWord.en.form03 ) {
				this.checkStatus.form03.status = false;
				this.checkStatus.form03.correct = sampleWord.en.form03;
			};	
		}
		return isEqual;
	}
	/** -------------------------------------------------------------------
	 * Добавление/удаление плейс-холдера в поле ввода
	 */
	togglePlaceholder(e) {
		let inputElement = e.target;
		let isFocused = ( inputElement === document.activeElement );
		if ( isFocused ) {
			inputElement.setAttribute('placeholder', '');
		} else {
			let dataPlaceholder = inputElement.getAttribute('data-placeholder');
			inputElement.setAttribute('placeholder', dataPlaceholder);
		};
	}
	/** -------------------------------------------------------------------
	 * Получение абсолютных координат для позиционирования иконок результатов
	 * и сообщений с корректными значениями
	 */
	getCoords() {
		// получаем абсолютные координаты полей ввода
		let form01Coords = this.inputForm01.getBoundingClientRect();
		let form02Coords = this.inputForm02.getBoundingClientRect();
		let form03Coords = this.inputForm03.getBoundingClientRect();

		// рассчитаем смещение (за образец берем первое поле ввода)
		let offsetTop = (this.inputForm01.offsetHeight - 22) / 2;
		let offsetLeft = this.inputForm01.offsetWidth - 28;

		let iconCoords = {
			form01: { top: form01Coords.top + offsetTop, left: form01Coords.left + offsetLeft },
			form02: { top: form02Coords.top + offsetTop, left: form02Coords.left + offsetLeft },
			form03: { top: form03Coords.top + offsetTop, left: form03Coords.left + offsetLeft }
		};
		return iconCoords;
	}
	/** -------------------------------------------------------------------
	 * Получение массива элементов, содержащих иконки и стикеры результата
	 */
	getResultIcons() {

		let coords = this.getCoords();

		// form 01
		let iconForm01 = this.iconResult01.querySelector('.icon');
		let stickerForm01 = this.iconResult01.querySelector('.sticker');
		if (this.checkStatus.form01.status) {
			iconForm01.classList.remove('wrong');
			iconForm01.classList.add('right');
			stickerForm01.classList.remove('visible');
			stickerForm01.classList.add('unvisible');
		} else {
			iconForm01.classList.remove('right');
			iconForm01.classList.add('wrong');
			stickerForm01.classList.remove('unvisible');
			stickerForm01.classList.add('visible');
			stickerForm01.innerHTML = this.checkStatus.form01.correct;
		}

		// form 02
		let iconForm02 = this.iconResult02.querySelector('.icon');
		let stickerForm02 = this.iconResult02.querySelector('.sticker');
		if (this.checkStatus.form02.status) {
			iconForm02.classList.remove('wrong');
			iconForm02.classList.add('right');
			stickerForm02.classList.remove('visible');
			stickerForm02.classList.add('unvisible');
		} else {
			iconForm02.classList.remove('right');
			iconForm02.classList.add('wrong');
			stickerForm02.classList.remove('unvisible');
			stickerForm02.classList.add('visible');
			stickerForm02.innerHTML = this.checkStatus.form02.correct;
		}

		// form 03
		let iconForm03 = this.iconResult03.querySelector('.icon');
		let stickerForm03 = this.iconResult03.querySelector('.sticker');
		if (this.checkStatus.form03.status) {
			iconForm03.classList.remove('wrong');
			iconForm03.classList.add('right');
			stickerForm03.classList.remove('visible');
			stickerForm03.classList.add('unvisible');
		} else {
			iconForm03.classList.remove('right');
			iconForm03.classList.add('wrong');
			stickerForm03.classList.remove('unvisible');
			stickerForm03.classList.add('visible');
			stickerForm03.innerHTML = this.checkStatus.form03.correct;
		}

		let icons = [
			{
				element: this.iconResult01,
				top: coords.form01.top,
				left: coords.form01.left
			},
			{
				element: this.iconResult02,
				top: coords.form02.top,
				left: coords.form02.left
			},
			{
				element: this.iconResult03,
				top: coords.form03.top,
				left: coords.form03.left
			}
		];
		return icons;
	}
	/** -------------------------------------------------------------------
	 * Установка фокуса на первое поле ввода
	 */
	setFirstFocus() {
		this.inputForm01.focus();
	}
}