/*

==========================================================

GDE VAPE SHOP

CALCULATOR.JS

Version 2.0

==========================================================

*/

"use strict";

/* ==========================================================

   PRICES

========================================================== */

const prices = {

    organic:{

        15:70,

        30:120,

        60:170,

        115:270

    },

    salt:{

        15:130,

        30:220,

        60:350,

        115:610

    }

};

/* ==========================================================

   ORGANIC

========================================================== */

function calculateOrganicPrice(liquid){

    if(!liquid.volume){

        return 0;

    }

    let price = prices.organic[liquid.volume];

    if(liquid.strength>0){

        const nicotineMl =

        liquid.volume *

        (liquid.strength/100);

        const boosters =

        Math.ceil(nicotineMl/1.5);

        price += boosters*12;

    }

    return price;

}

/* ==========================================================

   SALT

========================================================== */

function calculateSaltPrice(liquid){

    if(!liquid.volume){

        return 0;

    }

    let boosters = 0;

    switch(liquid.volume){

        case 15:

            boosters =

            liquid.strength>0 ? 1 : 0;

            break;

        case 30:

            if(liquid.strength<=3){

                boosters = 1;

            }else if(liquid.strength<=5){

                boosters = 2;

            }else{

                boosters = 3;

            }

            break;

        case 60:

            if(liquid.strength<=2){

                boosters = 1;

            }else if(liquid.strength===3){

                boosters = 2;

            }else if(liquid.strength===4){

                boosters = 3;

            }else if(liquid.strength===5){

                boosters = 4;

            }else{

                boosters = 5;

            }

            break;

        case 115:

            if(liquid.strength<=2){

                boosters = 2;

            }else if(liquid.strength===3){

                boosters = 4;

            }else if(liquid.strength===4){

                boosters = 6;

            }else if(liquid.strength===5){

                boosters = 8;

            }else{

                boosters = 10;

            }

            break;

    }

    return prices.salt[liquid.volume] +

    boosters*25;

}
/* ==========================================================

   CURRENT LIQUID

========================================================== */

function calculateCurrentLiquid(){

    const liquid = order.currentLiquid;

    if(!liquid.nicotineType){

        liquid.price = 0;

        return 0;

    }

    switch(liquid.nicotineType){

        case "organic":

            liquid.price =

            calculateOrganicPrice(liquid);

            break;

        case "salt":

            liquid.price =

            calculateSaltPrice(liquid);

            break;

        default:

            liquid.price = 0;

    }

    return liquid.price;

}

/* ==========================================================

   TOTAL

========================================================== */

function updateTotalPrice(){

    let total = 0;

    order.liquids.forEach(liquid=>{

        total += liquid.price;

    });

    order.totalPrice = total;

    order.giftAvailable =

        order.liquids.filter(liquid=>!liquid.isGift).length >= 4;

    return total;

}

/* ==========================================================

   GIFT

========================================================== */

function giftProgress(){

    const paidLiquids =

    order.liquids.filter(liquid=>!liquid.isGift).length;

    if(paidLiquids>=4){

        return 0;

    }

    return 4-paidLiquids;

}
/* ==========================================================

   ADD LIQUID

========================================================== */

function addLiquidToOrder(){

    const liquid = JSON.parse(

        JSON.stringify(order.currentLiquid)

    );

    if(order.giftLiquid){

        liquid.isGift = true;

        liquid.price = 0;

        order.giftLiquid = false;

    }

    order.liquids.push(liquid);

    updateTotalPrice();

}

/* ==========================================================

   UPDATE LIQUID

========================================================== */

function updateLiquid(index){

    if(index < 0 || index >= order.liquids.length){

        return;

    }

    const liquid = JSON.parse(

        JSON.stringify(order.currentLiquid)

    );

    if(order.liquids[index].isGift){

        liquid.isGift = true;

        liquid.price = 0;

    }

    order.liquids[index] = liquid;

    updateTotalPrice();

}

/* ==========================================================

   REMOVE LIQUID

========================================================== */

function removeLiquid(index){

    if(index < 0 || index >= order.liquids.length){

        return;

    }

    order.liquids.splice(index,1);

    updateTotalPrice();

}

/* ==========================================================

   CLEAR ORDER

========================================================== */

function clearOrder(){

    order.liquids = [];

    order.totalPrice = 0;

    order.giftAvailable = false;

    order.giftLiquid = false;

    order.editingLiquid = null;

    order.isEditing = false;

    resetCurrentLiquid();

}

/* ==========================================================

   HELPERS

========================================================== */

function getLiquidPrice(liquid){

    return liquid.isGift ? 0 : liquid.price;

}

function liquidsTotal(){

    return order.liquids.length;

}

function paidLiquidsTotal(){

    return order.liquids.filter(liquid => !liquid.isGift).length;

}
