'use strict';
/**
 * класс, содержащий элемент словаря
 * @param {string, object, array} en английское значение
 * @param {string} ru русское значение
 * Если en является объектом (для неправильных глаголов):
 * en = {
 * 	  form01: 'be',
 * 	  form02: 'was/were',
 * 	  form03: 'been'
 * }
 * Как вариант, en может быть массивом:
 * en = ['be', 'was/were', 'been']
 */
class Word {
	constructor(en, ru, type = 'word') {
		this.ru = ru;
		this.type = type;
		if ( en instanceof Array ) {
			this.en = {
				form01: en[0],
				form02: en[1],
				form03: en[2]
			};
			this.type = 'irregularVerb';
		} else {
			this.en = en;
		};	
	}
}