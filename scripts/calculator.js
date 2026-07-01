/*

==========================================================

GDE VAPE SHOP

CALCULATOR.JS

==========================================================

*/

/* ===============================

   БАЗОВІ ЦІНИ

================================= */

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

/* ===============================

   ORGANIC

================================= */

function calculateOrganic(volume,strength){

    let price = prices.organic[volume];

    if(strength<=0){

        return price;

    }

    const nicotineMl = volume*(strength/100);

    const pouches = Math.ceil(nicotineMl/1.5);

    return price + (pouches*12);

}

/* ===============================

   SALT

================================= */

function calculateSalt(volume,strength){

    let pouches=0;

    if(volume===15){

        if(strength>0){

            pouches=1;

        }

    }

    if(volume===30){

        if(strength>=1 && strength<=3) pouches=1;

        else if(strength<=5) pouches=2;

        else pouches=3;

    }

    if(volume===60){

        if(strength<=2) pouches=1;

        else if(strength===3) pouches=2;

        else if(strength===4) pouches=3;

        else if(strength===5) pouches=4;

        else pouches=5;

    }

    if(volume===115){

        if(strength<=2) pouches=2;

        else if(strength===3) pouches=4;

        else if(strength===4) pouches=6;

        else if(strength===5) pouches=8;

        else pouches=10;

    }

    return prices.salt[volume] + (pouches*25);

}

/* ===============================

   ГОЛОВНИЙ РОЗРАХУНОК

================================= */

function calculateCurrentLiquid(){

    const liquid = order.currentLiquid;

    if(liquid.nicotineType==="organic"){

        liquid.price = calculateOrganic(

            liquid.volume,

            liquid.strength

        );

    }

    if(liquid.nicotineType==="salt"){

        liquid.price = calculateSalt(

            liquid.volume,

            liquid.strength

        );

    }

    return liquid.price;

}
/* ===============================

   TOTAL PRICE

================================= */

function updateTotalPrice(){

    let total = 0;

    order.liquids.forEach(liquid=>{

        total += liquid.price;

    });

    order.totalPrice = total;

    return total;

}

/* ===============================

   GIFT PROGRESS

================================= */

function giftProgress(){

    const count = order.liquids.length;

    const left = 4 - (count % 5);

    if(left===5){

        return 0;

    }

    return left;

}

/* ===============================

   ADD LIQUID

================================= */

function addLiquidToOrder(){

    const liquid = JSON.parse(

        JSON.stringify(order.currentLiquid)

    );

    order.liquids.push(liquid);

    updateTotalPrice();

}

/* ===============================

   REMOVE LIQUID

================================= */

function removeLiquid(index){

    order.liquids.splice(index,1);

    updateTotalPrice();

}

/* ===============================

   CLEAR ORDER

================================= */

function clearOrder(){

    order.liquids=[];

    order.totalPrice=0;

}
