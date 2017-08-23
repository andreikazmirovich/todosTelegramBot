let TelegramBot = require('node-telegram-bot-api'),
    token = '388812803:AAHr_1dJQW_24_fVh5EPuIlxvIoWxmrCQRY',
    bot = new TelegramBot(token, {
	  polling: true,
	});

class Todo {
	constructor(text, date) {
		Todo.count++;
		Todo.todos.push({
			id: Todo.count - 1,
			text,
			date
		});
	}
}
Todo.todos = [
				// {
				// 	id: 0, 
				// 	done: false, 
				// 	text: 'Поприбирати в кімнаті', 
				// 	date: `${new Date().getDate()}.${new Date().getMonth() + 1} / ${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`
				// }, 
				// {
				// 	id: 1, 
				// 	done: false, 
				// 	text: 'Зробити проект з географії', 
				// 	date: `${new Date().getDate()}.${new Date().getMonth() + 1} / ${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`
				// }
			];
Todo.count = 0;

new Todo('Помити пісюнец', '24.8 / 1:32');

// let todos = ;

bot.onText(/\/start/, (msg) => {
	// bot.sendMessage(msg.chat.id, `Welcome ${msg.from.first_name}`, {
	// 	'reply_markup': {
	// 		'keyboard': [['Всі завдання']]
	// 	}
	// });

	setInterval(() => {
		let now = `${new Date().getDate()}.${new Date().getMonth() + 1} / ${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;

		for (todo of Todo.todos) {
			if(todo.date === now){
				bot.sendMessage(msg.chat.id, `Нагадую "${todo.text}"!`);
				Todo.todos.splice(todo.id, 1);
			}
		}
	}, 1000);
});

bot.onText(/\/todos/, (msg) => {
	let allTodos = '';

	for (todo of Todo.todos) {
		allTodos += `<b>${todo.date}</b> - ${todo.text}\n`;
	}

	bot.sendMessage(msg.chat.id, allTodos, {parse_mode: 'HTML'});
});

bot.onText(/\/new (.+) в (.+) - (.+)/, (msg, match) => {
	let date = match[1],
		time = match[2],
		text = match[3];

	new Todo(text, `${date} / ${time}`);
});

bot.onText(/\/help/, (msg) => {
	bot.sendMessage(msg.chat.id, "<b>Добавити нове нагадування:</b>\n/new {дата} в {година} - {текс}\nПриклад: /new 24.8 в 1:51 - Доробити проект\n\n<b>Список нагадувань:</b>\n/todos", {parse_mode: 'HTML'});
});