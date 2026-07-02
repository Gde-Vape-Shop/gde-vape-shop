/*

==========================================================

GDE VAPE SHOP

STATE.JS

Version 3.0

==========================================================

*/

"use strict";

/* ==========================================================

   DEFAULT LIQUID

========================================================== */

function createEmptyLiquid(){

    return{

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

        price: 0

    };

}
/* ==========================================================

   ORDER

========================================================== */

const order = {

    liquids: [],

    currentLiquid: createEmptyLiquid(),

    totalPrice: 0,

    giftLiquid: false,

    isEditing: false,

    editingLiquid: null,

    delivery: {

        type: null,

        shop: null,

        city: "",

        department: "",

        address: ""

    },

    customer: {

        name: "",

        phone: "",

        telegram: "",

        comment: ""

    }

};
/* ==========================================================

   FUNCTIONS

========================================================== */

function resetCurrentLiquid(){

    order.currentLiquid = createEmptyLiquid();

}

function addLiquidToOrder(){

    order.liquids.push({

        ...order.currentLiquid,

        flavors: [...order.currentLiquid.flavors]

    });

}

function updateLiquid(index){

    if(index===null || index===undefined) return;

    order.liquids[index] = {

        ...order.currentLiquid,

        flavors: [...order.currentLiquid.flavors]

    };

}

function giftProgress(){

    const count = order.liquids.length % 5;

    return count===4 ? 0 : 4-count;

}
