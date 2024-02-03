const { i18next } = require('../i18next-setup');

function languageKeyboard(language) {
    const languageKeyboard = {
        reply_markup: {
            keyboard: [['🇺🇿 UZ', '🇬🇧 EN', '🇷🇺 RU']],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    };
    return languageKeyboard;
};

function menuKeyboard(language) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const menuKeyboard = {
        reply_markup: {
            keyboard: [
                [i18next.t('menu'), i18next.t('about')],
                [i18next.t('contact')],
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
        },
    };
    return menuKeyboard;
}

function categoriesKeyboard(language) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: i18next.t('milk_products'), callback_data: 'milk_products' },
                    { text: i18next.t('flour_products'), callback_data: 'flour_products' },
                ],
                [
                    { text: i18next.t('basket'), callback_data: 'basket' },
                ],
            ],
        },
    };
    return inlineKeyboard;
};

function back(language) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const obj = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: i18next.t('back'), callback_data: 'back1' },
                ],
            ],
        },
    };
    return obj;
}

function category1Products(language) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: i18next.t('category1sub1'), callback_data: 'f1936899-bfb3-4545-a0c0-00f339f6f64e' },
                    { text: i18next.t('category1sub2'), callback_data: 'e0612cdd-dcc1-4e9c-985c-b184569092e0' },
                ],
                [
                    { text: i18next.t('category1sub3'), callback_data: '84fff119-0c16-4805-86b0-823ed70dee40' },
                    { text: i18next.t('category1sub4'), callback_data: '65e161fd-99fc-4391-b0b4-3020442bcf5a' },
                ],
                [
                    { text: i18next.t('category1sub5'), callback_data: 'e3f46080-3464-4485-98a1-89179391a7a8' },
                    { text: i18next.t('category1sub6'), callback_data: '97c53be9-b721-4658-a331-f3784ac3d12b' },
                ],
                [
                    { text: i18next.t('category1sub7'), callback_data: 'cfd55236-010f-4afb-80b0-5be4917424d1' },
                    { text: i18next.t('category1sub8'), callback_data: 'fe317abe-8284-49d6-8fad-ec261054c16d' },
                ],
                [
                    { text: i18next.t('category1sub9'), callback_data: '8c167f3a-d75d-47c2-8fd5-feea734a89f0' },
                    { text: i18next.t('category1sub10'), callback_data: 'cc02baf2-6ff6-4cf3-9d6c-3d82d9a03741' }
                ],
                [
                    { text: i18next.t('category1sub11'), callback_data: 'cf9f2501-f6fa-4edf-8088-6ebcae0d9d8e' },
                ],
                [
                    { text: i18next.t('basket'), callback_data: 'basket' },
                    { text: i18next.t('back'), callback_data: 'back1' },
                ],
            ],
        },
    };
    return inlineKeyboard;
};

function category2Products(language) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: i18next.t('category2sub1'), callback_data: '574b4f53-a644-4cb8-b716-7c20f5b0b2f7' },
                    { text: i18next.t('category2sub2'), callback_data: 'f47d81c0-2928-476b-9d0a-7dd5d9592229' },
                ],
                [
                    { text: i18next.t('basket'), callback_data: 'basket' },
                    { text: i18next.t('back'), callback_data: 'back1' },
                ],
            ],
        },
    };
    return inlineKeyboard;
}

function cartToEmpty(language) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const inlineKeyboard = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: i18next.t('back'), callback_data: 'back1' },
                    { text: i18next.t('checkout'), callback_data: 'checkout' }
                ],
                [
                    { text: i18next.t('empty_trash'), callback_data: 'empty_trash' },
                ],
            ],
        },
    };
    return inlineKeyboard;
}

function categorySub1Products(language, products) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [],
        },
    };
    const dataNum = products.length;
    let arrNum = Math.floor(dataNum / 2);
    if (dataNum % 2) {
        arrNum++;
    }
    if (language == 'uz') {
        if (dataNum == 1) {
            const newArr = [{ text: products[0].nameuz, callback_data: products[0]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        } else if ((dataNum > 1) && (dataNum % 2 == 0)) {
            for (let i = 0; i < dataNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameuz, callback_data: products[i]._id },
                    { text: products[i + 1].nameuz, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
        } else if ((dataNum > 1) && (dataNum % 2)) {
            for (let i = 0; i < arrNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameuz, callback_data: products[i]._id },
                    { text: products[i + 1].nameuz, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
            const newArr = [{ text: products[dataNum - 1].nameuz, callback_data: products[dataNum - 1]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        };
    } else if (language == 'en') {
        if (dataNum == 1) {
            const newArr = [{ text: products[0].nameen, callback_data: products[0]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        } else if ((dataNum > 1) && (dataNum % 2 == 0)) {
            for (let i = 0; i < dataNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameen, callback_data: products[i]._id },
                    { text: products[i + 1].nameen, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
        } else if ((dataNum > 1) && (dataNum % 2)) {
            for (let i = 0; i < arrNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameen, callback_data: products[i]._id },
                    { text: products[i + 1].nameen, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
            const newArr = [{ text: products[dataNum - 1].nameen, callback_data: products[dataNum - 1]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        };
    } else if (language == 'ru') {
        if (dataNum == 1) {
            const newArr = [{ text: products[0].nameru, callback_data: products[0]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        } else if ((dataNum > 1) && (dataNum % 2 == 0)) {
            for (let i = 0; i < dataNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameru, callback_data: products[i]._id },
                    { text: products[i + 1].nameru, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            }
        } else if ((dataNum > 1) && (dataNum % 2)) {
            for (let i = 0; i < arrNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameru, callback_data: products[i]._id },
                    { text: products[i + 1].nameru, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
            const newArr = [{ text: products[dataNum - 1].nameru, callback_data: products[dataNum - 1]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        };
    };
    const button = [
        { text: i18next.t('basket'), callback_data: 'basket' },
        { text: i18next.t('back'), callback_data: 'back2' },
    ];
    inlineKeyboard.reply_markup.inline_keyboard.push(button);
    return inlineKeyboard;
};

function categorySub2Products(language, products) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [],
        },
    };
    const dataNum = products.length;
    let arrNum = Math.floor(dataNum / 2);
    if (dataNum % 2) {
        arrNum++;
    };
    if (language == 'uz') {
        if (dataNum == 1) {
            const newArr = [{ text: products[0].nameuz, callback_data: products[0]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        } else if ((dataNum > 1) && (dataNum % 2 == 0)) {
            for (let i = 0; i < dataNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameuz, callback_data: products[i]._id },
                    { text: products[i + 1].nameuz, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
        } else if ((dataNum > 1) && (dataNum % 2)) {
            for (let i = 0; i < arrNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameuz, callback_data: products[i]._id },
                    { text: products[i + 1].nameuz, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
            const newArr = [{ text: products[dataNum - 1].nameuz, callback_data: products[dataNum - 1]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        };
    } else if (language == 'en') {
        if (dataNum == 1) {
            const newArr = [{ text: products[0].nameen, callback_data: products[0]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        } else if ((dataNum > 1) && (dataNum % 2 == 0)) {
            for (let i = 0; i < dataNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameen, callback_data: products[i]._id },
                    { text: products[i + 1].nameen, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
        } else if ((dataNum > 1) && (dataNum % 2)) {
            for (let i = 0; i < arrNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameen, callback_data: products[i]._id },
                    { text: products[i + 1].nameen, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            }
            const newArr = [{ text: products[dataNum - 1].nameen, callback_data: products[dataNum - 1]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        }
    } else if (language == 'ru') {
        if (dataNum == 1) {
            const newArr = [{ text: products[0].nameru, callback_data: products[0]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        } else if ((dataNum > 1) && (dataNum % 2 == 0)) {
            for (let i = 0; i < dataNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameru, callback_data: products[i]._id },
                    { text: products[i + 1].nameru, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
        } else if ((dataNum > 1) && (dataNum % 2)) {
            for (let i = 0; i < arrNum; i = i + 2) {
                const newArr = [
                    { text: products[i].nameru, callback_data: products[i]._id },
                    { text: products[i + 1].nameru, callback_data: products[i + 1]._id },
                ];
                inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
            };
            const newArr = [{ text: products[dataNum - 1].nameru, callback_data: products[dataNum - 1]._id }];
            inlineKeyboard.reply_markup.inline_keyboard.push(newArr);
        };
    };
    const button = [
        { text: i18next.t('basket'), callback_data: 'basket' },
        { text: i18next.t('back'), callback_data: 'back3' },
    ];
    inlineKeyboard.reply_markup.inline_keyboard.push(button);
    return inlineKeyboard;
}

function productInner1(language, product) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    let caption = '';
    if (language == 'uz') {
        caption = `*${product.nameuz}*\n${i18next.t('cost')} ${product.cost} ${i18next.t('sum')}\n${i18next.t('info')} ${product.infouz}`;
    };
    if (language == 'ru') {
        caption = `*${product.nameru}*\n${i18next.t('cost')} ${product.cost} ${i18next.t('sum')}\n${i18next.t('info')} ${product.inforu}`;
    };
    if (language == 'en') {
        caption = `*${product.nameen}*\n${i18next.t('cost')} ${product.cost} ${i18next.t('sum')}\n${i18next.t('info')} ${product.infoen}`;
    };
    const obj = {
        caption,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '➖',
                        callback_data: `decrease`,
                    },
                    {
                        text: `1`,
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
                    { text: i18next.t('back'), callback_data: 'back1' },
                ],
            ],
        },
    };
    return obj;
}

function productInner2(language, product) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    let caption = '';
    if (language == 'uz') {
        caption = `*${product.nameuz}*\n${i18next.t('cost')} ${product.cost} ${i18next.t('sum')}\n${i18next.t('info')} ${product.infouz}`;
    };
    if (language == 'ru') {
        caption = `*${product.nameru}*\n${i18next.t('cost')} ${product.cost} ${i18next.t('sum')}\n${i18next.t('info')} ${product.inforu}`;
    };
    if (language == 'en') {
        caption = `*${product.nameen}*\n${i18next.t('cost')} ${product.cost} ${i18next.t('sum')}\n${i18next.t('info')} ${product.infoen}`;
    };
    const obj = {
        caption,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '➖',
                        callback_data: `decrease`,
                    },
                    {
                        text: `1`,
                        callback_data: `quantity`,
                    },
                    {
                        text: '➕',
                        callback_data: `increase`,
                    },
                ],
                [
                    { text: i18next.t('addcart'), callback_data: 'addcart2' },
                ],
                [
                    { text: i18next.t('basket'), callback_data: 'basket' },
                    { text: i18next.t('back'), callback_data: 'back1' },
                ],
            ],
        },
    };
    return obj;
}

function checkout(language) {
    i18next.changeLanguage(language, async (err, t) => {
        if (err) {
            console.log('Error changing language:', err);
            return;
        };
    });
    const obj = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: i18next.t('yes'), callback_data: 'yes' },
                    { text: i18next.t('no'), callback_data: 'no' }
                ],
            ],
        },
    };
    return obj;
};


module.exports = {
    languageKeyboard,
    menuKeyboard,
    categoriesKeyboard,
    category1Products,
    category2Products,
    categorySub1Products,
    categorySub2Products,
    productInner1,
    productInner2,
    back,
    cartToEmpty,
    checkout
};