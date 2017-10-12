'use strict';
/**
 * класс коллекции, содержит общие для всех словарных объектов методы
 */
class WordCollection {
	constructor() {
		this.usedID = [];
		this.words = {};
		this.indexList = [];
		this.done = false;
	}
	/** -------------------------------------------------------------------
	 * Получение массива букв, с которых начинаются слова
	 */
	getWordsLetters() {
		let letters = [];
		for (let key in this.words) {
			letters.push(key);
		};
		return letters;
	}
	/** -------------------------------------------------------------------
	 * Получение количества букв, с которых начинаются слова
	 */
	getWordsLettersCount() {
		return this.getWordsLetters().length;
	}
	/** -------------------------------------------------------------------
	 * Получение количества слов, которые содержит коллекция
	 */
	getWordsCount() {
		let wordsCount = 0;
		let letters = this.getWordsLetters();
		letters.forEach( function(letter) {
			wordsCount += this.words[letter].length;
		}.bind(this) );
		return wordsCount;
	}
	/** -------------------------------------------------------------------
	 * Получение массива всех возможных индексов, которые содержатся в коллекции
	 * (необходим для ускорения получения следующего случайного индекса])
	 */
	getIndexList() {
		let indexList = [];
		for (let key in this.words) {
			let wordList = this.words[key];
			for (let i = 0; i < wordList.length; i++) {
				let index = key + i;
				indexList.push(index);
			}
		};
		return indexList;
	}
	/** -------------------------------------------------------------------
	 * Получение следующего неиспользованного индекса
	 * Индекс выглядит так: A12, B6, S42, T0
	 */
	getNextIndex() {
		let indexListLength = this.indexList.length;
		let indexFound = false;
		let index = '0';
		// если массив использованных индексов содержит столько же елементов,
		// сколько всего содержится в коллекции, возвращаем нулевой индекс: '0'
		if ( this.usedID.length === this.getWordsCount() ) {
			return index;
		};

		// получаем следующий случайный индекс
		while ( !indexFound ) {
			let wordIndex = Math.floor(Math.random() * indexListLength);
			index = this.indexList[wordIndex];

			if ( this.usedID.indexOf(index) === -1 ) {
				this.usedID.push(index);
				indexFound = true;
			};
		};
		return index;
	}
	/** -------------------------------------------------------------------
	 * Получение следующего случайного слова
	 */
	getNextWord() {
		let index = this.getNextIndex();
		if ( index === '0' ) {
			this.done = true;
			return null;
		};
		let letter = index.charAt(0);
		let wordIndex = parseInt(index.slice(1));
		let wordList = this.words[letter];
		return this.getWord(index);
	}
	/** -------------------------------------------------------------------
	 * Получение слова по индексу
	 */
	getWord(index) {
		let letter = index.charAt(0);
		let wordIndex = parseInt(index.slice(1));
		let wordList = this.words[letter];
		return wordList[wordIndex];
	}
}
