const { i18next } = require('../i18next-setup');
const functions = require('./functions');
const axios = require('axios');
const apiKey = "66302fc7-75ba-4c4d-b62b-91812d024dd7";
const groupChatId = 2057409728;

async function getProducts(subCatId) {
    try {
        const apiUrl = `https://api.melekuz.com/v1/botproduct/subcat/${subCatId}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error on fetch products:', error);
        throw error;
    };
};

async function createOrder(dataToSend) {
    try {
        const apiUrl = 'https://api.melekuz.com/v1/botorder/create';
        const response = await axios.post(apiUrl, dataToSend);
        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.error('Error on post create order:', error);
        throw error;
    };
};

async function productsInner(prodId) {
    try {
        const apiUrl = `https://api.melekuz.com/v1/botproduct/${prodId}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error on fetch product inner:', error);
        throw error;
    };
};

async function getUser(chatID) {
    try {
        const apiUrl = `https://api.melekuz.com/v1/botuser/bychatid/${chatID}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error on fetch user:', error);
        throw error;
    };
};

async function getOrder() {
    try {
        const apiUrl = `https://api.melekuz.com/v1/botorder/all`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error on fetch order:', error);
        throw error;
    };
};

async function getAddressFromCoordinates(latitude, longitude) {
    try {
        const apiUrl = 'https://geocode-maps.yandex.ru/1.x/';
        const response = await axios.get(apiUrl, {
            params: {
                geocode: `${longitude},${latitude}`,
                apikey: apiKey,
                format: 'json',
            },
        });
        const address = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
        return address;
    } catch (error) {
        console.error('Error on fetch location:', error);
        throw error;
    };
};

async function callback(query, language, bot) {
    try {
        const chatId = query.message.chat.id;
        const messageId = query.message.message_id;
        const data = query.data;
        i18next.changeLanguage(language, async (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
        });
        if (data === 'milk_products') {
            await bot.deleteMessage(chatId, messageId);
            return functions.categories1Products(language, bot, chatId);
        };
        if (data === 'flour_products') {
            await bot.deleteMessage(chatId, messageId);
            return functions.categories2Products(language, bot, chatId);
        };
        if (data === 'basket') {
            await bot.deleteMessage(chatId, messageId);
            return functions.showCart(language, bot, chatId);
        };
        if (data === 'back1') {
            await bot.deleteMessage(chatId, messageId);
            return functions.back1(language, bot, chatId);
        };
        if (data === 'back2') {
            await bot.deleteMessage(chatId, messageId);
            return functions.categories1Products(language, bot, chatId);
        };
        if (data === 'back3') {
            await bot.deleteMessage(chatId, messageId);
            return functions.categories2Products(language, bot, chatId);
        };
        if (data === 'increase') {
            return functions.quantityIncrease(language, bot, chatId, query);
        };
        if (data === 'decrease') {
            return functions.quantityDecrease(language, bot, chatId, query);
        };
        if (data === 'addcart1') {
            await bot.deleteMessage(chatId, messageId);
            return functions.addToCart1(bot, query, language);
        };
        if (data === 'addcart2') {
            await bot.deleteMessage(chatId, messageId);
            return functions.addToCart2(bot, query, language);
        };
        if (data === 'empty_trash') {
            await bot.deleteMessage(chatId, messageId);
            return functions.makeEmptyCart(language, bot, chatId);
        };
        if (data === 'checkout') {
            const cart = functions.returnCart();
            const order = cart.find(item => item.chatId == chatId);
            if (order) {
                getUser(chatId).then(data2 => {
                    const userInfo = data2.data.user
                    if (userInfo.length) {
                        getAddressFromCoordinates(userInfo[0].latitude, userInfo[0].longitude)
                            .then((address) => {
                                i18next.changeLanguage(language, (err, t) => {
                                    if (err) {
                                        console.log('Error changing language:', err);
                                        return;
                                    }
                                    return functions.checkout(language, bot, chatId, userInfo[0], address);
                                });
                            })
                            .catch(error => console.log(`Error on get coordinates: ${error}`));
                    };
                })
                .catch(error => console.log(`Error on get user: ${error}`));
            };
        };
        if (data.length > 30) {
            if ((data == '574b4f53-a644-4cb8-b716-7c20f5b0b2f7') || (data == 'f47d81c0-2928-476b-9d0a-7dd5d9592229')) {
                getProducts(data).then(async data2 => {
                    const products = data2.data.product;
                    if (products.length) {
                        await bot.deleteMessage(chatId, messageId);
                        return functions.categorySub2Products(language, bot, chatId, products);
                    } else {
                        productsInner(data).then(async data3 => {
                            const product = data3.data.botProduct;
                            if (product) {
                                return functions.productsInner2(language, bot, chatId, product);
                            };
                        })
                        .catch(error => console.log(`Error on product inner: ${error}`))
                    };
                })
                .catch(error => console.log(`Error on get products: ${error}`))
            } else {
                getProducts(data).then(async data2 => {
                    const products = data2.data.product;
                    if (products.length) {
                        await bot.deleteMessage(chatId, messageId);
                        return functions.categorySub1Products(language, bot, chatId, products);
                    } else {
                        productsInner(data).then(async data3 => {
                            const product = data3.data.botProduct;
                            if (product) {
                                return functions.productsInner1(language, bot, chatId, product);
                            }
                        })
                        .catch(error => console.log(`Error on get product inner: ${error}`));
                    };
                })
                .catch(error => console.log(`Error on get pruducts: ${error}`));
            };
        };
        if (data == 'no') {
            await bot.deleteMessage(chatId, messageId);
            return functions.makeEmptyCart(language, bot, chatId);
        };
        if (data == 'yes') {
            const cart = functions.returnCart();
            const foundOrder = cart.filter((element) => element.chatId == chatId);
            if (foundOrder.length) {
                getUser(chatId).then(data2 => {
                    const userInfo = data2.data.user;
                    if (userInfo.length) {
                        getOrder().then(data4 => {
                            const botOrders = data4.data.orders;
                            let order_number = 1;
                            if (botOrders.length) {
                                order_number = botOrders.length + 1;
                            };
                            let orders = '';
                            let totalCost = 0;
                            for (let i = 0; i < foundOrder.length; i++) {
                                orders = orders + `${foundOrder[i].count} ✖️ ${foundOrder[i].product_name}\n`;
                                totalCost = totalCost + foundOrder[i].total_cost;
                            };
                            const caption = `Order Number: ${order_number}\n\nName: ${userInfo[0].name}\nPhone number: +${userInfo[0].phone_number}\n\nProducts:\n ${orders}\n\nTotal cost: ${totalCost} sum`;
                            const orderInfo = {
                                order_number: order_number,
                                products: orders,
                                user_id: userInfo[0]._id,
                                total_cost: totalCost,
                            };
                            createOrder(orderInfo);
                            bot.sendLocation(groupChatId, userInfo[0].latitude, userInfo[0].longitude).then(() => {
                                bot.sendMessage(groupChatId, caption);
                            });
                            const inlineKeyboard = {
                                inline_keyboard: [
                                    [
                                        { text: i18next.t('back'), callback_data: 'back1' },
                                    ],
                                ],
                            };
                            i18next.changeLanguage(language, (err, t) => {
                                if (err) {
                                    console.log('Error changing language:', err);
                                    return;
                                }
                                functions.makeEmptyCart2(chatId);
                                const alertMessage = `<b>${i18next.t('successfully')}</b>\n${i18next.t('ordered')}`;
                                return bot.sendMessage(chatId, alertMessage, { parse_mode: 'HTML', reply_markup: inlineKeyboard });
                            });
                        })
                        .catch(error=> console.log(`Error on after get order: ${error}`))
                    };
                })
                .catch(error => console.log(`Error on get user: ${error}`));
            };
        };
    } catch (error) {
        console.log(`Error on callback function in validation: ${error}`);
    };
};

module.exports = {
    callback,
    productsInner,
};