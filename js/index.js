const tableOne = new tableEditor().init({
	'root': '#table-storage',
	'headers': [
		{
			'name': '№'
		},
		{
			'key': 'name',
			'name': 'Название предмета'
		},
		{
			'key': 'count',
			'name': 'Групп сдает',
			'sortable': false
		},
		{
			'key': 'date',
			'name': 'Дата экзамена',
		}
	]
});

tableOne.createRows([
	{
		'name': 'Математика',
		'count': '11',
		'date': '12.11.2020'
	},
	{
		'name': 'Экология',
		'count': '4',
		'date': '24.12.2020'
	},
	{
		'name': 'Биология',
		'count': '3',
		'date': '13.10.2020'
	},
	{
		'name': 'Химия',
		'count': '3',
		'date': '13.10.2020'
	},
	{
		'name': 'Физика',
		'count': '9',
		'date': '16.05.2021'
	},
	{
		'name': 'Базы данных',
		'count': '4',
		'date': '01.12.2020'
	}
]);

const tableTwo = new tableEditor().init({
	'root': '#table-storage',
	'headers': [
		{
			'key': 'number',
			'name': '№'
		},
		{
			'key': 'name',
			'name': 'Название напитка',
			'sortable': false
		},
		{
			'key': 'fortress',
			'name': 'Крепость'
			
		}
	]
});

tableTwo.createRows([
	{
		'number': '2',
		'name' : 'Пиво',
		'fortress': '3-8%'
	},
	{
		'number': '8',
		'name' : 'Квас',
		'fortress': '0,3-2,6%'
	},
	{
		'number': '4',
		'name' : 'Спирт',
		'fortress': '95%'
	},
	{
		'number': '6',
		'name' : 'Водка',
		'fortress': '36-60%'
	}
]);

document.addEventListener('DOMContentLoaded', () => {
	new tableEditor().editTable('.sortable')
}); 