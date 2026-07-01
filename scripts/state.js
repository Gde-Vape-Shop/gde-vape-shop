/*

==========================================================

GDE VAPE SHOP

STATE.JS

Version 1.0

==========================================================

*/

"use strict";

const order = {

    currentLiquid: {

        nicotineType: null,

        volume: null,

        strength: null,

        recipeType: null,

        recipe: null,

        flavors: [],

        sweetness: 5,

        cold: 5,

        acid: 5,

        price: 0

    },

    liquids: [],

    delivery: {

        type: null,

        shop: "",

        city: "",

        branch: "",

        address: "",

        payment: ""

    },

    customer: {

        name: "",

        surname: "",

        phone: "",

        telegram: "",

        comment: ""

    },

    totalPrice: 0,

    giftLiquid: false

};

/* ==========================================================

   RESET CURRENT LIQUID

========================================================== */

function resetCurrentLiquid(){

    order.currentLiquid = {

        nicotineType: null,

        volume: null,

        strength: null,

        recipeType: null,

        recipe: null,

        flavors: [],

        sweetness: 5,

        cold: 5,

        acid: 5,

        price: 0

    };

}

/* ==========================================================

   COUNT

========================================================== */

function liquidsCount(){

    return order.liquids.length;

}
