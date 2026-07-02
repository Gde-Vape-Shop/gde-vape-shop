/*

==========================================================

GDE VAPE SHOP

STATE.JS

Version 2.0

==========================================================

*/

"use strict";

/* ==========================================================

   ORDER

========================================================== */

const order = {

    currentLiquid: {

        nicotineType: null,

        ratio: null,

        volume: null,

        strength: null,

        recipeType: null,

        recipe: null,

        flavors: [],

        sweetness: 5,

        cold: 5,

        acid: 5,

        price: 0,

        isGift: false

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

        comment: "",

        orderNumber: ""

    },

    totalPrice: 0,

    giftAvailable: false,

    giftLiquid: false,

    editingLiquid: null,

    isEditing: false

};

/* ==========================================================

   RESET CURRENT LIQUID

========================================================== */

function resetCurrentLiquid(){

    order.currentLiquid = {

        nicotineType: null,

        ratio: null,

        volume: null,

        strength: null,

        recipeType: null,

        recipe: null,

        flavors: [],

        sweetness: 5,

        cold: 5,

        acid: 5,

        price: 0,

        isGift: false

    };

}

/* ==========================================================

   HELPERS

========================================================== */

function liquidsCount(){

    return order.liquids.length;

}

function hasGiftAvailable(){

    return order.giftAvailable;

}

function currentLiquid(){

    return order.currentLiquid;

}
