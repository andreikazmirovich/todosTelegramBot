var TelegramBot = require('node-telegram-bot-api'),
    Cron = require('cron').CronJob,
    request = require('request'),
    Entities = require('html-entities').AllHtmlEntities,
    entities = new Entities(),
    striptags = require('striptags'),
    token = '388812803:AAHr_1dJQW_24_fVh5EPuIlxvIoWxmrCQRY';


var bot = new TelegramBot(token, {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome', {
    'reply_markup': {
      'keyboard': [["Hi"], ["Bye"]]
    }
  });
});

bot.onText(/\/test/, (msg) => {
  request('https://www.theverge.com/tech', (err, res, body) => {
    console.log(body);
  });
});

bot.onText(/\/sendSasiska/,(msg)=>{
  let id = msg.chat.id,
      url = 'https://dog.ceo/api/breed/dachshund/images/random';
  
  request(url, (err, res, body) => {
    var data = JSON.parse(body);
    bot.sendPhoto(id, data.message, {caption: 'Hoo... That puppy is so funny :D'});
  });
});

var job = new Cron('0,10,20,30,40,50 * * * * *', function() {
  var chatId = 431310527,
      url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json';

  request(url, function(error, response, body) {
    var data = JSON.parse(body);
    // console.log(body);
    bot.sendMessage(chatId, data.quoteText +'\n\n'+ data.quoteAuthor);
  })
});

// job.start();