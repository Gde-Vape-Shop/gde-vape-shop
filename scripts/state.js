/*

==========================================================

GDE VAPE SHOP

STATE.JS

==========================================================

*/

const order = {

    // Поточна рідина

    currentLiquid: {

        nicotineType: null,

        volume: null,

        strength: null,

        recipe: null,

        flavors: [],

        sweetness: 5,

        cold: 5,

        acid: 5,

        price: 0

    },

    // Усі рідини в замовленні

    liquids: [],

    // Доставка

    delivery: {

        type: null,

        shop: null,

        city: "",

        branch: "",

        address: ""

    },

    // Клієнт

    customer: {

        name: "",

        phone: "",

        telegram: "",

        comment: ""

    },

    // Загальна сума

    totalPrice: 0,

    // Подарункова рідина

    giftLiquid: false

};

/* ========================================= */

function resetCurrentLiquid(){

    order.currentLiquid = {

        nicotineType: null,

        volume: null,

        strength: null,

        recipe: null,

        flavors: [],

        sweetness: 5,

        cold: 5,

        acid: 5,

        price: 0

    };

}

/* ========================================= */

function addLiquidToOrder(){

    order.liquids.push({

        ...order.currentLiquid

    });

    resetCurrentLiquid();

}

/* ========================================= */

function updateTotalPrice(){

    let total = 0;

    order.liquids.forEach(liquid=>{

        total += liquid.price;

    });

    order.totalPrice = total;

}

/* ========================================= */

function liquidsCount(){

    return order.liquids.length;

}

/* ========================================= */

function giftProgress(){

    return Math.max(

        0,

        4 - order.liquids.length

    );

}
