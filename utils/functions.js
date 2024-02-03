const { i18next } = require('../i18next-setup');
const keyboards = require('./keyboard');
const functions = require('./validation');
let cart = [];

function deletedMessage(language, bot, query) {
    console.log(query)
    // return i18next.changeLanguage(language, (err, t) => {
    //     if (err) {
    //         console.log('Error changing language:', err);
    //         return;
    //     }
    //     bot.sendMessage(chatId, i18next.t('choose_category'), keyboards.categoriesKeyboard(language))
    // });

}

function back1(language, bot, chatId) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            bot.sendMessage(chatId, i18next.t('choose_category'), keyboards.categoriesKeyboard(language));
        });
    } catch (error) {
        console.log(`Erron on back1: ${error}`)
    }
}

function categories1Products(language, bot, chatId) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            return bot.sendMessage(chatId, i18next.t('choose_product'), keyboards.category1Products(language))
        });
    } catch (error) {
        console.log(`Error on function categories1Products: ${error}`);
    };
};

function categories2Products(language, bot, chatId) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            return bot.sendMessage(chatId, i18next.t('choose_product'), keyboards.category2Products(language));
        });
    } catch (error) {
        console.log(`Error on function categories2Products: ${error}`);
    };
};

function categorySub1Products(language, bot, chatId, products) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            return bot.sendMessage(chatId, i18next.t('choose_product'), keyboards.categorySub1Products(language, products));
        });
    } catch (error) {
        console.log(`Error on function categorySub1Products: ${error}`);
    };
};

function categorySub2Products(language, bot, chatId, products) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            return bot.sendMessage(chatId, i18next.t('choose_product'), keyboards.categorySub2Products(language, products));
        });
    } catch (error) {
        console.log(`Error on function categorySub2Products: ${error}`);
    };
};

function productsInner1(language, bot, chatId, product) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            const img = `https://api.melekuz.com/v1/file/botProducts/${product.image}`;
            bot.sendPhoto(chatId, img, keyboards.productInner1(language, product));
        });
    } catch (error) {
        console.log(`Error on function productsInner1`);
    };
};

function productsInner2(language, bot, chatId, product) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            const img = `https://api.melekuz.com/v1/file/botProducts/${product.image}`;
            bot.sendPhoto(chatId, img, keyboards.productInner2(language, product));
        });
    } catch (error) {
        console.log(`Error on function productsInner2: ${error}`);
    };
};

function quantityIncrease(language, bot, chatId, query) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            let currentQuantity = parseInt(query.message.reply_markup.inline_keyboard[0][1].text);
            currentQuantity += 1;
            const inlineKeyboard = {
                inline_keyboard: [
                    [
                        {
                            text: '➖',
                            callback_data: `decrease`,
                        },
                        {
                            text: `${currentQuantity}`,
                            callback_data: `quantity`,
                        },
                        {
                            text: '➕',
                            callback_data: `increase`,
                        },
                    ],
                    [
                        { text: i18next.t('addcart'), callback_data: 'addcart1' },
                    ],
                    [
                        { text: i18next.t('basket'), callback_data: 'basket' },
                        { text: i18next.t('back'), callback_data: 'back3' },
                    ],
                ],
            };
            bot.editMessageReplyMarkup(inlineKeyboard, {
                chat_id: chatId,
                message_id: query.message.message_id,
            });
        });
    } catch (error) {
        console.log(`Error on function quantityIncrease: ${error}`);
    };
};

function quantityDecrease(language, bot, chatId, query) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            };
            let currentQuantity = parseInt(query.message.reply_markup.inline_keyboard[0][1].text);
            const newQuantity = Math.max(1, currentQuantity - 1);
            const inlineKeyboard = {
                inline_keyboard: [
                    [
                        {
                            text: '➖',
                            callback_data: `decrease`,
                        },
                        {
                            text: `${newQuantity}`,
                            callback_data: `quantity`,
                        },
                        {
                            text: '➕',
                            callback_data: `increase`,
                        },
                    ],
                    [
                        { text: i18next.t('addcart'), callback_data: 'addcart' },
                    ],
                    [
                        { text: i18next.t('basket'), callback_data: 'basket' },
                        { text: i18next.t('back'), callback_data: 'back3' }
                    ],
                ],
            };
            if (newQuantity !== currentQuantity) {
                bot.editMessageReplyMarkup(inlineKeyboard, {
                    chat_id: chatId,
                    message_id: query.message.message_id,
                });
            };
        });
    } catch (error) {
        console.log(`Error on function quantityDecrease: ${error}`);
    };
};

function addToCart1(bot, query, language) {
    try {
        const chatId = query.message.chat.id;
        const product = String(query.message.caption);
        const order = product.split('\n');
        const amount = order[1].split(' ');
        const count = Number(query.message.reply_markup.inline_keyboard[0][1].text);
        const foundProduct = cart.find((element) => {
            if (element.chatId == chatId && element.product_name == order[0]) {
                return element;
            };
        });
        const foundIndex = cart.findIndex((element) => {
            if (element.chatId == chatId && element.product_name == order[0]) {
                return element;
            };
        });
        if (foundProduct) {
            const newCount = foundProduct.count + count;
            cart[foundIndex] = {
                chatId,
                product_name: order[0],
                count: newCount,
                total_cost: Number(amount[1]) * newCount,
            };
        } else {
            const obj = {
                chatId,
                product_name: order[0],
                count,
                total_cost: Number(amount[1]) * count,
            };
            cart.push(obj);
        };
        return bot.sendMessage(chatId, i18next.t('choose_category'), keyboards.categoriesKeyboard(language));
    } catch (error) {
        console.log(`Error on function addToCart1: ${error}`);
    };
};

function addToCart2(bot, query, language) {
    try {
        const chatId = query.message.chat.id;
        const product = String(query.message.caption);
        const order = product.split('\n');
        const amount = order[1].split(' ');
        const count = Number(query.message.reply_markup.inline_keyboard[0][1].text);
        const foundProduct = cart.find((element) => {
            if (element.chatId == chatId && element.product_name == order[0]) {
                return element;
            };
        });
        const foundIndex = cart.findIndex((element) => {
            if (element.chatId == chatId && element.product_name == order[0]) {
                return element;
            };
        });
        if (foundProduct) {
            const newCount = foundProduct.count + count;
            cart[foundIndex] = {
                chatId,
                product_name: order[0],
                count: newCount,
                total_cost: Number(amount[1]) * newCount,
            };
        } else {
            const obj = {
                chatId,
                product_name: order[0],
                count,
                total_cost: Number(amount[1]) * count,
            };
            cart.push(obj);
        };
        return bot.sendMessage(chatId, i18next.t('choose_product'), keyboards.category1Products(language));
    } catch (error) {
        console.log(`Error on function addToCart2: ${error}`);
    };
};

function showCart(language, bot, chatId) {
    try {
        const foundOrder = cart.filter((element) => element.chatId == chatId);
        if (!foundOrder.length) {
            i18next.changeLanguage(language, (err, t) => {
                if (err) {
                    console.log('Error changing language:', err);
                    return;
                };
            });
            return bot.sendMessage(chatId, `*${i18next.t('basket')}*\n\n ${i18next.t('empty')}`, keyboards.back(language));
        }
        else {
            i18next.changeLanguage(language, (err, t) => {
                if (err) {
                    console.log('Error changing language:', err);
                    return;
                };
                let orders = ''
                let totalCost = 0;
                for (let i = 0; i < foundOrder.length; i++) {
                    orders = orders + `${foundOrder[i].count} ✖️ ${foundOrder[i].product_name}\n`;
                    totalCost = totalCost + foundOrder[i].total_cost;
                };
                const content = `*${i18next.t('basket')}*\n\n${orders}\n${i18next.t('total_cost')} ${totalCost} ${i18next.t('sum')}`;
                bot.sendMessage(chatId, content, keyboards.cartToEmpty(language));
            });
        };
    } catch (error) {
        console.log(`Erron on showCart: ${error}`);
    };
};

function makeEmptyCart(language, bot, chatId) {
    try {
        let newCart = [];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].chatId !== chatId) {
                newCart.push(cart[i]);
            };
        }
        cart = newCart;
        return showCart(language, bot, chatId);
    } catch (error) {
        console.log(`Error on function makeEmptyCart: ${error}`);
    };
};

function makeEmptyCart2(chatId) {
    try {
        let newCart = [];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].chatId !== chatId) {
                newCart.push(cart[i]);
            };
        };
        cart = newCart;
    } catch (error) {
        console.log(`Error on function makeEmptyCart2: ${error}`);
    };
};

function checkout(language, bot, chatId, userInfo, address) {
    try {
        return i18next.changeLanguage(language, (err, t) => {
            if (err) {
                console.log('Error changing language:', err);
                return;
            }
            const alertMessage = `*${i18next.t('to_check')}*\n\n${i18next.t('name')} ${userInfo.name}\n${i18next.t('phone_number')} ${userInfo.phone_number}\n${i18next.t('location')} ${address}`;
            return bot.sendMessage(chatId, alertMessage, keyboards.checkout(language));
        });
    } catch (error) {
        console.log(`Error on function checkout: ${error}`);
    };
};

function returnCart() {
    try {
        return cart;
    } catch (error) {
        console.log(`Error on function returnCart: ${error}`);
    };
}

module.exports = {
    categories1Products,
    categories2Products,
    back1,
    categorySub1Products,
    categorySub2Products,
    productsInner1,
    productsInner2,
    quantityIncrease,
    quantityDecrease,
    showCart,
    addToCart1,
    addToCart2,
    makeEmptyCart,
    checkout,
    returnCart,
    makeEmptyCart2,
    deletedMessage
};