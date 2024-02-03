const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { i18next } = require('./i18next-setup');
const botToken = '6925342359:AAHNNLeP5XmXTUTFJDhx3_WuDrkx_BtFW6k';

const keyboards = require('./utils/keyboard');
const CallbackQuery = require('./utils/validation');
const userLanguages = {};

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, 'Salom, Iltimos tilni tanlang!\nHello, Please select the language!\nЗдравствуйте. Пожалуйста, выберите язык!', keyboards.languageKeyboard());
    }catch (error) {
        console.log(`Error on start command: ${error}`);
    }
});

async function createUser(dataToSend) {
    try {
        const apiUrl = 'https://api.melekuz.com/v1/botuser/create';
        const response = await axios.post(apiUrl, dataToSend);
        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.error(`Error on create user: ${error}`);
    }
}

async function updateUser(dataToSend, chatID) {
    try {
        const apiUrl = `https://api.melekuz.com/v1/botuser/${chatID}`;
        const response = await axios.patch(apiUrl, dataToSend);
        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.error(`Error on update user: ${error}` );
    }
}

async function getUser(chatID) {
    try {
        const apiUrl = `https://api.melekuz.com/v1/botuser/bychatid/${chatID}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(`Error on get user: ${error}`);
    }
}

bot.on('message', async (msg) => {
    try {
        const chatId = msg.chat.id;
        if (['🇺🇿 UZ', '🇬🇧 EN', '🇷🇺 RU'].includes(msg.text)) {
            const languageMap = {
                '🇺🇿 UZ': 'uz',
                '🇬🇧 EN': 'en',
                '🇷🇺 RU': 'ru',
            };
            userLanguages[chatId] = languageMap[msg.text];
            getUser(chatId).then(data => {
                const user = data.data.user;
                if (!user.length) {
                    const obj = {
                        name: "user",
                        chatId: chatId,
                        phone_number: "00000000",
                        latitude: "",
                        longitude: "",
                        language: languageMap[msg.text],
                    };
                    createUser(obj);
                } else {
                    const obj = {
                        language: languageMap[msg.text],
                    };
                    updateUser(obj, chatId);
                }
            })
            .catch(error => console.log(`Error on get user: ${error}`));
            i18next.changeLanguage(languageMap[msg.text], (err, t) => {
                try {
                    if (err) return console.log('Error changing language:', err);
                    const confirmationMessage = i18next.t('language_set', { language: msg.text });
                    return bot.sendMessage(chatId, confirmationMessage).then(() => {
                        const requestContactMessage = i18next.t('take_contact');
                        const requestContactOptions = {
                            reply_markup: {
                                keyboard: [[{ text: i18next.t('send_contact'), request_contact: true }]],
                                resize_keyboard: true,
                                one_time_keyboard: true,
                            },
                        };
                    bot.sendMessage(chatId, requestContactMessage, requestContactOptions);
                    })
                    .catch(error => console.log(`Error on bot.sendMessage request contact: ${error}`));
                } catch (error) {
                    console.log(`Error on function changeLanguage: ${error}`);
                }    
            });
        };
    } catch (error) {
        console.log(`Error on contact: ${error}`);
    };
});

bot.on('contact', (msg) => {
    try {
        const contact = msg.contact;
        const chatId = msg.chat.id;
        const language = userLanguages[chatId];
        const obj = {
            name: contact.first_name,
            phone_number: contact.phone_number,
            latitude: '',
            longitude: '',
        };
        updateUser(obj, chatId);
        i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            }
        const confirmationMessage = i18next.t('contact_saved');
        bot.sendMessage(chatId, confirmationMessage).then(() => {
            const requestLocationMessage = i18next.t('send_location');
            const requestLocationOptions = {
                reply_markup: {
                    keyboard: [[{ text: i18next.t('share_location'), request_location: true }]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            };
            return bot.sendMessage(chatId, requestLocationMessage, requestLocationOptions);
        })
        .catch(error => console.log(`Error on bot.sendMessage request location: ${error}`))
    });
    } catch (error) {
        console.log(`Error on location: ${error}`);
    };
});

bot.on('location', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const language = userLanguages[chatId];
        const obj = {
            latitude: msg.location.latitude.toString(),
            longitude: msg.location.longitude.toString(),
        };
        updateUser(obj, chatId);
        i18next.changeLanguage(language, async (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
        await bot.sendMessage(chatId, i18next.t('register_finish'), { reply_markup: { remove_keyboard: true } });
        await bot.sendMessage(chatId, i18next.t('choose_option'), keyboards.menuKeyboard(language));
        });
    } catch (error) {
        console.log(`Error on choose option: ${error}`);
    };
});

bot.on('message', (msg) => {
    try {
        const chatId = msg.chat.id;
        const text = msg.text;
        const language = userLanguages[chatId];
        i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
        switch (text) {
            case i18next.t('menu'):
                bot.sendMessage(chatId, i18next.t('choose_category'), keyboards.categoriesKeyboard(language));
                break;
            case i18next.t('about'):
                const description = i18next.t('description');
                const photoUrl = 'https://melekuz.com/_next/image?url=%2Fassets%2Fimages%2Fstart-cooperation-banner.png&w=1920&q=75';
                bot.sendPhoto(
                    chatId,
                    photoUrl,
                    {
                        caption: description,
                        parse_mode: 'Markdown',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: i18next.t('this_web_site'),
                                        url: 'https://melekuz.com/',
                                    },
                                ],
                            ],
                        },
                    },
                );
                break;
            case i18next.t('contact'):
                bot.sendMessage(chatId, i18next.t('contact_info'));
                break;
        }
    });
    } catch (error) {
        console.log(`Error on choose category: ${error}`);
    };
});

bot.on('callback_query', (query) => {
    try {
        const chatId = query.message.chat.id;
        getUser(chatId).then(data => {
            const user = data.data.user;
            const language = user[0].language;
            CallbackQuery.callback(query, language, bot);
            bot.answerCallbackQuery(query.id);
        })
        .catch(error => console.log(`Error on get user data: ${error}`))
    } catch (error) {
        console.log(`Error on callback query: ${error}`)
    }
});

console.log('Bot is running...');