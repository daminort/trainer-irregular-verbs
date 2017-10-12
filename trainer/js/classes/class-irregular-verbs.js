'use strict';
// объект с неправильными глаголами
class IrregularVerbs extends WordCollection {
	constructor() {
		super();
		this.words = this.getWords();
		this.wordsCount = this.getWordsCount();
		this.indexList = this.getIndexList();
		this.done = false;
	}
	/** -------------------------------------------------------------------
	 * Формирование списка слов
	 */
	getWords() {
		let words = {
			// new Word( ['','',''],''),
			A: [
				new Word( ['arise', 		'arose', 			'arisen'], 			'возникать, появляться'),
				new Word( ['awake', 		'awoke', 			'awoken'], 			'будить, просыпаться'),
			],
			B: [
				new Word( ['be', 			'was/were', 		'been'], 			'быть'),
				new Word( ['bear', 			'bore', 			'born'], 			'рождать, приносить'),
				new Word( ['beat', 			'beat', 			'beaten'], 			'бить'),
				new Word( ['become', 		'became', 			'become'], 			'становиться'),
				new Word( ['begin', 		'began', 			'begun'], 			'начинать'),
				new Word( ['bend', 			'bent', 			'bent'], 			'гнуть, сгибать'),
				new Word( ['bind', 			'bound', 			'bound'], 			'связывать'),
				new Word( ['bite', 			'bit', 				'bitten'], 			'кусать'),
				new Word( ['bleed', 		'bled', 			'bled'], 			'кровоточить'),
				new Word( ['blow', 			'blew', 			'blown'], 			'дуть'),
				new Word( ['break', 		'broke', 			'broken'], 			'ломать(ся), прекращать'),
				new Word( ['breed', 		'bred', 			'bred'], 			'воспитывать'),
				new Word( ['bring', 		'brought', 			'brought'], 		'приносить'),
				new Word( ['build', 		'built', 			'built'], 			'строить'),
				new Word( ['burn', 			'burnt', 			'burnt'], 			'гореть, жечь'),
				new Word( ['burst', 		'burst', 			'burst'], 			'разразиться, взрывать(ся)'),
				new Word( ['buy', 			'bought', 			'bought'], 			'покупать'),
				// дополнительные
				new Word( ['backslide',		'backslid',			'backslid'],		'отступаться от веры'),
				new Word( ['befall',		'befell',			'befallen'],		'приключаться, происходить'),
				new Word( ['browbeat',		'browbeat',			'browbeaten'],		'запугивать, наводить страх'),
			],
			C: [
				new Word( ['cast', 			'cast', 			'cast'], 			'кинуть, лить (металл)'),
				new Word( ['catch', 		'caught', 			'caught'], 			'ловить, схватывать'),
				new Word( ['choose',		'chose',			'chosen'],			'выбирать, подбирать'),
				new Word( ['come',			'came',				'come'],			'приходить'),
				new Word( ['cost',			'cost',				'cost'],			'стоить'),
				new Word( ['cut',			'cut',				'cut'],				'резать'),
			],
			D: [
				new Word( ['dig',			'dug',				'dug'],				'рыть, копать'),
				new Word( ['do',			'did',				'done'],			'делать'),
				new Word( ['draw',			'drew',				'drawn'],			'рисовать, тащить'),
				new Word( ['dream',			'dreamt',			'dreamt'],			'мечтать, сниться'),
				new Word( ['drink',			'drank',			'drunk'],			'пить'),
				new Word( ['drive',			'drove',			'driven'],			'водить, управлять (машиной)'),
			],
			E: [
				new Word( ['eat',			'ate',				'eaten'],			'есть'),
			],
			F: [
				new Word( ['fall',			'fell',				'fallen'],			'падать'),
				new Word( ['feed',			'fed',				'fed'],				'кормить'),
				new Word( ['feel',			'felt',				'felt'],			'чувствовать'),
				new Word( ['fight',			'fought',			'fought'],			'бороться'),
				new Word( ['find',			'found',			'found'],			'находить'),
				new Word( ['fit',			'fit',				'fit'],				'соответствовать, подходить'),
				new Word( ['fly',			'flew',				'flown'],			'летать'),
				new Word( ['forget',		'forgot',			'forgotten'],		'забывать'),
				new Word( ['forgive',		'forgave',			'forgiven'],		'прощать'),
				new Word( ['freeze',		'froze',			'frozen'],			'замерзать'),
				// дополнительные
				new Word( ['forbear',		'forbore',			'forborne'],		'сдерживаться'),
				new Word( ['foresee',		'foresaw',			'foreseen'],		'предвидеть'),
				new Word( ['forbid',		'forbad',			'forbidden'],		'запрещать, не позволять'),
			],
			G: [
				new Word( ['get',			'got',				'got'],				'получать'),
				new Word( ['give',			'gave',				'given'],			'давать'),
				new Word( ['go',			'went',				'gone'],			'идти, ходить'),
				new Word( ['grow',			'grew',				'grown'],			'расти'),
				// дополнительные
				new Word( ['grind',			'ground',			'ground'],			'молоть'),
			],
			H: [
				new Word( ['hang',			'hung',				'hung'],			'висеть, развешивать'),
				new Word( ['have',			'had',				'had'],				'иметь'),
				new Word( ['hear',			'heard',			'heard'],			'слышать'),
				new Word( ['hide',			'hid',				'hidden'],			'прятать'),
				new Word( ['hit',			'hit',				'hit'],				'ударять, попадать в цель'),
				new Word( ['hold',			'held',				'held'],			'держать'),
				new Word( ['hurt',			'hurt',				'hurt'],			'ранить, причинить боль'),
			],
			I: [
				new Word( ['interweave',	'interwove',		'interwoven'],		'сплетать, прошивать'),
			],
			K: [
				new Word( ['keep',			'kept',				'kept'],			'держать, сохранять'),
				new Word( ['kneel',			'knelt',			'knelt'],			'становиться на колени'),
				new Word( ['knit',			'knit',				'knit'],			'вязать (спицами)'),
				new Word( ['know',			'knew',				'known'],			'знать'),
			],
			L: [
				new Word( ['lay',			'laid',				'laid'],			'класть, положить'),
				new Word( ['lead',			'led',				'led'],				'вести, возглавлять'),
				new Word( ['lean',			'leant',			'leant'],			'наклоняться'),
				new Word( ['learn',			'learnt',			'learnt'],			'учить'),
				new Word( ['leave',			'left',				'left'],			'оставлять, покидать'),
				new Word( ['lend',			'lent',				'lent'],			'занимать, одалживать'),
				new Word( ['let',			'let',				'let'],				'позволять'),
				new Word( ['lie',			'lay',				'lain'],			'лежать'),
				new Word( ['light',			'lit',				'lit'],				'освещать, зажигать'),
				new Word( ['lose',			'lost',				'lost'],			'терять'),
			],
			M: [
				new Word( ['make',			'made',				'made'],			'делать (производить)'),
				new Word( ['mean',			'meant',			'meant'],			'значить'),
				new Word( ['meet',			'met',				'met'],				'встречать'),
				new Word( ['mistake',		'mistook',			'mistaken'],		'ошибаться'),
				// дополнительные
				new Word( ['mislead',		'misled',			'misled'],			'вводить в заблуждение'),
				new Word( ['mow',			'mowed',			'mown'],			'косить, жать'),
			],
			P: [
				new Word( ['pay',			'paid',				'paid'],			'платить'),
				new Word( ['put',			'put',				'put'],				'класть, ставить'),
				// дополнительные
				new Word( ['partake',		'partook',			'partaken'],		'принимать участие'),
			],
			R: [
				new Word( ['read',			'read',				'read'],			'читать'),
				new Word( ['ride',			'rode',				'ridden'],			'ехать верхом'),
				new Word( ['ring',			'rang',				'rung'],			'звонить, звенеть'),
				new Word( ['rise',			'rose',				'risen'],			'подниматься'),
				new Word( ['run',			'ran',				'run'],				'бежать'),
				// дополнительные
				new Word( ['rive',			'rived',			'riven'],			'разрывать, раскалывать'),
			],
			S: [
				new Word( ['say',			'said',				'said'],			'говорить'),
				new Word( ['see',			'saw',				'seen'],			'видеть'),
				new Word( ['seek',			'sought',			'sought'],			'искать'),
				new Word( ['sell',			'sold',				'sold'],			'продавать'),
				new Word( ['send',			'sent',				'sent'],			'посылать'),
				new Word( ['set',			'set',				'set'],				'ставить, устанавливать'),
				new Word( ['shake',			'shook',			'shaken'],			'трясти'),
				new Word( ['shine',			'shone',			'shone'],			'светить, сиять, блестеть'),
				new Word( ['shoot',			'shot',				'shot'],			'стрелять'),
				new Word( ['show',			'showed',			'shown'],			'показывать'),
				new Word( ['shrink',		'shrank',			'shrunk'],			'уменьшать(ся), сокращать(ся)'),
				new Word( ['shut',			'shut',				'shut'],			'закрывать'),
				new Word( ['sing',			'sang',				'sung'],			'петь'),
				new Word( ['sink',			'sank',				'sunk'],			'тонуть'),
				new Word( ['sit',			'sat',				'sat'],				'сидеть'),
				new Word( ['sleep',			'slept',			'slept'],			'спать'),
				new Word( ['smell',			'smelt',			'smelt'],			'нюхать, пахнуть'),
				new Word( ['slide',			'slid',				'slid'],			'скользить'),
				new Word( ['sow',			'sowed',			'sown'],			'сеять, засевать'),
				new Word( ['speak',			'spoke',			'spoken'],			'говорить, разговаривать'),
				new Word( ['spell',			'spelt',			'spelt'],			'произносить'),
				new Word( ['spend',			'spent',			'spent'],			'тратить'),
				new Word( ['spill',			'spilt',			'spilt'],			'проливать'),
				new Word( ['spit',			'spat',				'spat'],			'плевать'),
				new Word( ['split',			'split',			'split'],			'расщеплять, разделять'),
				new Word( ['spoil',			'spoilt',			'spoilt'],			'портить'),
				new Word( ['spread',		'spread',			'spread'],			'распространять(ся)'),
				new Word( ['stand',			'stood',			'stood'],			'стоять'),
				new Word( ['steal',			'stole',			'stolen'],			'воровать, красть'),
				new Word( ['stick',			'stuck',			'stuck'],			'приклеивать(ся)'),
				new Word( ['sting',			'stung',			'stung'],			'жалить'),
				new Word( ['strike',		'struck',			'struck'],			'ударять, бастовать'),
				new Word( ['strive',		'strove',			'striven'],			'стараться, стремиться'),
				new Word( ['swear',			'swore',			'sworn'],			'давать клятву'),
				new Word( ['sweep',			'swept',			'swept'],			'мести, подметать'),
				new Word( ['swim',			'swam',				'swum'],			'плавать'),
				// дополнительные
				new Word( ['shear',			'sheared',			'shorn'],			'стричь, резать'),
				new Word( ['spotlight',		'spotlit',			'spotlit'],			'осветить'),
			],
			T: [
				new Word( ['take',			'took',				'taken'],			'брать, взять'),
				new Word( ['teach',			'taught',			'taught'],			'учить, обучать'),
				new Word( ['tear',			'tore',				'torn'],			'рвать'),
				new Word( ['tell',			'told',				'told'],			'рассказывать'),
				new Word( ['think',			'thought',			'thought'],			'думать'),
				new Word( ['throw',			'threw',			'thrown'],			'бросать'),
				// дополнительные
				new Word( ['tread',			'trod',				'trod'],			'идти, шагать'),
			],
			U: [
				new Word( ['understand',	'understood',		'understood'],		'понимать'),
				new Word( ['upset',			'upset',			'upset'],			'опрокидывать, огорчать, расстраивать (планы)'),
				// дополнительные
				new Word( ['uphold',		'upheld',			'upheld'],			'поддерживать'),
			],
			W: [
				new Word( ['wake',			'woke',				'woken'],			'просыпаться'),
				new Word( ['wear',			'wore',				'worn'],			'носить'),
				new Word( ['weep',			'wept',				'wept'],			'плакать'),
				new Word( ['wet',			'wet',				'wet'],				'мочить, увлажнять'),
				new Word( ['win',			'won',				'won'],				'выигрывать, побеждать'),
				new Word( ['wind',			'wound',			'wound'],			'извиваться, обматывать, заводить (часы)'),
				new Word( ['write',			'wrote',			'written'],			'писать'),
				// дополнительные
				new Word( ['withdraw',		'withdrew',			'withdrawn'],		'отодвигать, забирать'),
				new Word( ['wring',			'wrung',			'wrung'],			'крутить, выламывать'),
			]
		};
		return words;
	}
	/** -------------------------------------------------------------------
	 * Проверка правильности (эквивалентности)
	 */
	isEqual(sampleWord, userWord) {
		return ( 
			sampleWord.en.form01 === userWord.en.form01.toLowerCase() &&
			sampleWord.en.form02 === userWord.en.form02.toLowerCase() &&
			sampleWord.en.form03 === userWord.en.form03.toLowerCase() &&
			sampleWord.ru === userWord.ru.toLowerCase()
		);
	}
}

