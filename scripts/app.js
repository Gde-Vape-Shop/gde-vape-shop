/*

==========================================================

GDE VAPE SHOP

APP.JS

Version 1.0

==========================================================

*/

"use strict";

/* ==========================================================

   DOM

========================================================== */

const screens = [...document.querySelectorAll(".screen")];

const nextButtons = document.querySelectorAll(".nextButton");

const backButtons = document.querySelectorAll(".backButton");

const startButton = document.getElementById("startOrder");

const nicotineCards = document.querySelectorAll("[data-base]");

const volumeCards = document.querySelectorAll("[data-volume]");

const strengthContainer =

document.querySelector("#screenStrength .cardList");

const cartLiquids =

document.getElementById("cartLiquids");

const cartTotal =

document.getElementById("cartTotal");

const giftCounter =

document.getElementById("giftCounter");

const cartPrice =

document.getElementById("cartPrice");

const cartItems =

document.getElementById("cartItems");

/* ==========================================================

   STATE

========================================================== */

let currentScreen = 0;

/* ==========================================================

   SCREEN

========================================================== */

function showScreen(index){

    if(index<0) return;

    if(index>=screens.length) return;

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    screens[index].classList.add("active");

    currentScreen=index;

}

/* ==========================================================

   NEXT

========================================================== */

function nextScreen(){

    if(currentScreen===1){

        if(order.currentLiquid.nicotineType==="organic"){

            showScreen(2);

            return;

        }

        if(order.currentLiquid.nicotineType==="salt"){

            showScreen(3);

            return;

        }

    }

    if(currentScreen===2){

        showScreen(3);

        return;

    }

    showScreen(currentScreen+1);

}

/* ==========================================================

   BACK

========================================================== */

function previousScreen(){

    showScreen(currentScreen-1);

}

/* ==========================================================

   BUTTONS

========================================================== */

if(startButton){

    startButton.addEventListener("click",()=>{

        showScreen(1);

    });

}

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        switch(currentScreen){

            case 1:

                showScreen(2);

                break;

            case 2:

                showScreen(3);

                break;

            case 3:

                showScreen(4);

                break;

            case 4:

                break;

            case 5:

            case 6:

                showScreen(7);

                break;

            case 7:

                addCurrentLiquid();

                break;

            case 8:

                showScreen(9);

                break;

            case 9:

                break;

            default:

                nextScreen();

        }

    });

});

backButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        previousScreen();

    });

});

/* ==========================================================

   NICOTINE

========================================================== */

nicotineCards.forEach(card=>{

    card.addEventListener("click",()=>{

        nicotineCards.forEach(item=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        order.currentLiquid.nicotineType =

        card.dataset.base;

        renderStrengths();

        calculateCurrentLiquid();

        updateCart();

    });

});

/* ==========================================================

   VOLUME

========================================================== */

volumeCards.forEach(card=>{

    card.addEventListener("click",()=>{

        volumeCards.forEach(item=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        order.currentLiquid.volume =

        Number(card.dataset.volume);

        calculateCurrentLiquid();

        updateCart();

    });

});

/* ==========================================================

   STRENGTH

========================================================== */

function renderStrengths(){

    if(!strengthContainer) return;

    strengthContainer.innerHTML="";

    let strengths=[];

    if(order.currentLiquid.nicotineType==="organic"){

        for(let i=0;i<=15;i++){

            strengths.push(i);

        }

    }else{

        strengths=[0,1,2,3,4,5,6.5];

    }

    strengths.forEach(value=>{

        const card=document.createElement("div");

        card.className="selectCard";

        card.dataset.strength=value;

        card.innerHTML=`

            <h3>${value}</h3>

            <p>мг/мл</p>

        `;

        card.addEventListener("click",()=>{

            strengthContainer

            .querySelectorAll(".selectCard")

            .forEach(item=>{

                item.classList.remove("active");

            });

            card.classList.add("active");

            order.currentLiquid.strength=value;

            calculateCurrentLiquid();

            updateCart();

        });

        strengthContainer.appendChild(card);

    });

}
/* ==========================================================

   RECIPE TYPE

========================================================== */

const recipesButton =

document.getElementById("recipesButton");

const mixButton =

document.getElementById("mixButton");

if(recipesButton){

    recipesButton.addEventListener("click",()=>{

        order.currentLiquid.recipeType="recipe";

        showScreen(5);

    });

}

if(mixButton){

    mixButton.addEventListener("click",()=>{

        order.currentLiquid.recipeType="custom";

        showScreen(6);

    });

}

/* ==========================================================

   SLIDERS

========================================================== */

const sweetness =

document.getElementById("sweetness");

const cold =

document.getElementById("cold");

const acid =

document.getElementById("acid");

const sweetValue =

document.getElementById("sweetValue");

const coldValue =

document.getElementById("coldValue");

const acidValue =

document.getElementById("acidValue");

function bindSlider(slider,label,key){

    if(!slider || !label) return;

    slider.addEventListener("input",()=>{

        label.textContent=slider.value;

        order.currentLiquid[key]=

        Number(slider.value);

    });

}

bindSlider(

    sweetness,

    sweetValue,

    "sweetness"

);

bindSlider(

    cold,

    coldValue,

    "cold"

);

bindSlider(

    acid,

    acidValue,

    "acid"

);

/* ==========================================================

   CART

========================================================== */

function updateCart(){

    updateTotalPrice();

    if(cartLiquids){

        cartLiquids.textContent=

        order.liquids.length;

    }

    if(cartTotal){

        cartTotal.textContent=

        order.totalPrice+" грн";

    }

    if(cartPrice){

        cartPrice.textContent=

        order.totalPrice+" грн";

    }

    if(giftCounter){

        const left=giftProgress();

        giftCounter.textContent=

        left===0 ? "🎁" : left;

    }

    renderCart();

}

/* ==========================================================

   RENDER CART

========================================================== */

function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML="";

    order.liquids.forEach((liquid,index)=>{

        const item=

        document.createElement("div");

        item.className="cartItem";

        item.innerHTML=`

            <h3>

            ${liquid.nicotineType}

            ${liquid.volume} мл

            </h3>

            <p>

            ${liquid.strength} мг

            </p>

            <strong>

            ${liquid.price} грн

            </strong>

        `;

        cartItems.appendChild(item);

    });

}
/* ==========================================================

   ADD LIQUID

========================================================== */

function addCurrentLiquid(){

    if(

        !order.currentLiquid.nicotineType ||

        !order.currentLiquid.volume ||

        order.currentLiquid.strength===null

    ){

        alert("Спочатку оберіть основу, об'єм та міцність.");

        return;

    }

    calculateCurrentLiquid();

    addLiquidToOrder();

    updateCart();

    resetCurrentLiquid();

    showScreen(8);

}

/* ==========================================================

   DELIVERY

========================================================== */

const deliveryCards =

document.querySelectorAll(".deliveryCard");

const pickupSection =

document.getElementById("pickupSection");

const novaSection =

document.getElementById("novaSection");

const taxiSection =

document.getElementById("taxiSection");

deliveryCards.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        deliveryCards.forEach(item=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        pickupSection?.classList.add("hidden");

        novaSection?.classList.add("hidden");

        taxiSection?.classList.add("hidden");

        switch(index){

            case 0:

                order.delivery.type="pickup";

                pickupSection?.classList.remove("hidden");

                break;

            case 1:

                order.delivery.type="nova";

                novaSection?.classList.remove("hidden");

                break;

            case 2:

                order.delivery.type="taxi";

                taxiSection?.classList.remove("hidden");

                break;

        }

    });

});

/* ==========================================================

   SHOPS

========================================================== */

const shopCards =

document.querySelectorAll(".shopCard");

shopCards.forEach(card=>{

    card.addEventListener("click",()=>{

        shopCards.forEach(item=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        order.delivery.shop =

        card.innerText;

    });

});

/* ==========================================================

   FINISH ORDER

========================================================== */

const finishOrderButton =

document.getElementById("finishOrder");

if(finishOrderButton){

    finishOrderButton.addEventListener("click",()=>{

        order.customer.name =

        document.getElementById("customerName").value;

        order.customer.phone =

        document.getElementById("customerPhone").value;

        order.customer.telegram =

        document.getElementById("customerTelegram").value;

        order.customer.comment =

        document.getElementById("customerComment").value;

        console.log(order);

        showScreen(10);

    });

}

/* ==========================================================

   START

========================================================== */

updateCart();

renderStrengths();

showScreen(0);
/* ==========================================================

   CART ACTIONS

========================================================== */

const addFlavorButton =

document.getElementById("addFlavor");

if(addFlavorButton){

    addFlavorButton.addEventListener("click",()=>{

        if(order.currentLiquid.flavors.length===0){

            alert("Оберіть хоча б один смак.");

            return;

        }

        showScreen(7);

    });

}

/* ==========================================================

   ADD TO CART BUTTON

========================================================== */



/* ==========================================================

   CART COUNTER

========================================================== */

function refreshBottomBar(){

    cartLiquids.textContent =

    order.liquids.length;

    cartTotal.textContent =

    order.totalPrice + " грн";

    const left = giftProgress();

    if(left>0){

        giftCounter.textContent = left;

    }else{

        giftCounter.textContent = "🎁";

    }
const giftButton =

document.getElementById("giftButton");

if(giftButton){

    const hasGift =

    order.liquids.some(liquid=>liquid.isGift);

    if(order.liquids.length>=4 && !hasGift){

        giftButton.classList.remove("hidden");

    }else{

        giftButton.classList.add("hidden");

    }

}
}

/* ==========================================================

   UPDATE UI

========================================================== */

function refreshUI(){

    updateCart();

    refreshBottomBar();

}

/* ==========================================================

   AUTO UPDATE

========================================================== */

setInterval(()=>{

    refreshBottomBar();

},300);
/* ==========================================================

   LIVE PRICE

========================================================== */

function updateCurrentPrice(){

    if(

        !order.currentLiquid.nicotineType ||

        !order.currentLiquid.volume ||

        order.currentLiquid.strength===null

    ){

        return;

    }

    calculateCurrentLiquid();

    const price =

    order.currentLiquid.price;

    if(cartPrice){

        cartPrice.textContent =

        price + " грн";

    }

}

/* ==========================================================

   OBSERVERS

========================================================== */

document.addEventListener("click",(event)=>{

    if(

        event.target.closest("[data-base]") ||

        event.target.closest("[data-volume]") ||

        event.target.closest("[data-strength]")

    ){

        setTimeout(()=>{

            updateCurrentPrice();

        },20);

    }

});

/* ==========================================================

   CART RENDER

========================================================== */

function renderCartItems(){

    if(!cartItems) return;

    cartItems.innerHTML="";

    order.liquids.forEach((liquid,index)=>{

        const card=document.createElement("div");

        card.className="cartItem";

        card.innerHTML=`

            <div class="cartItemTop">

                <strong>

                    ${

                        liquid.isGift

                        ? "🎁 Подарунок"

                        : `${index+1}. ${liquid.nicotineType.toUpperCase()}`

                    }

                </strong>

                <span>

                    ${

                        liquid.isGift

                        ? "0 грн"

                        : `${liquid.price} грн`

                    }

                </span>

            </div>

            <div>

                ${liquid.volume} мл • ${liquid.strength} мг

            </div>

        `;

        cartItems.appendChild(card);

    });

}



/* ==========================================================

   GLOBAL UPDATE

========================================================== */

const oldUpdateCart = updateCart;

updateCart = function(){

    oldUpdateCart();

    renderCartItems();

    refreshBottomBar();

};
/* ==========================================================

   LIVE SLIDERS

========================================================== */

function updateSliderValues(){

    if(sweetValue){

        sweetValue.textContent =

        order.currentLiquid.sweetness;

    }

    if(coldValue){

        coldValue.textContent =

        order.currentLiquid.cold;

    }

    if(acidValue){

        acidValue.textContent =

        order.currentLiquid.acid;

    }

}

if(sweetness){

    sweetness.addEventListener("input",()=>{

        order.currentLiquid.sweetness =

        Number(sweetness.value);

        updateSliderValues();

    });

}

if(cold){

    cold.addEventListener("input",()=>{

        order.currentLiquid.cold =

        Number(cold.value);

        updateSliderValues();

    });

}

if(acid){

    acid.addEventListener("input",()=>{

        order.currentLiquid.acid =

        Number(acid.value);

        updateSliderValues();

    });

}

/* ==========================================================

   RESET CURRENT LIQUID UI

========================================================== */

function resetLiquidUI(){

    volumeCards.forEach(card=>{

        card.classList.remove("active");

    });

    nicotineCards.forEach(card=>{

        card.classList.remove("active");

    });

    if(strengthContainer){

        strengthContainer.innerHTML="";

    }

    if(sweetness){

        sweetness.value=5;

    }

    if(cold){

        cold.value=5;

    }

    if(acid){

        acid.value=5;

    }

    updateSliderValues();

}

/* ==========================================================

   AFTER ADD

========================================================== */

const oldAddLiquid = addCurrentLiquid;

addCurrentLiquid = function(){

    oldAddLiquid();

    resetLiquidUI();

};
/* ==========================================================

   RECIPES

========================================================== */

const recipeContainer =

document.getElementById("recipesContainer");

function selectRecipe(recipe){

    order.currentLiquid.recipe = recipe;

    order.currentLiquid.flavors = [...recipe.flavors];

    showScreen(7);

}

function renderRecipeCards(list){

    if(!recipeContainer) return;

    recipeContainer.innerHTML="";

    list.forEach(recipe=>{

        const card=document.createElement("div");

        card.className="recipeCard";

        card.innerHTML=`

            <h3>${recipe.name}</h3>

            <p>${recipe.category}</p>

            <button class="mainButton">

                Обрати

            </button>

        `;

        card

        .querySelector("button")

        .addEventListener("click",()=>{

            selectRecipe(recipe);

        });

        recipeContainer.appendChild(card);

    });

}

/* ==========================================================

   FLAVORS

========================================================== */

const selectedFlavors =

document.getElementById("selectedFlavors");

function renderSelectedFlavors(){

    if(!selectedFlavors) return;

    selectedFlavors.innerHTML="";

    order.currentLiquid.flavors.forEach((flavor,index)=>{

        const item=document.createElement("div");

        item.className="selectedFlavor";

        item.innerHTML=`

            <span>

                ${flavor.name}

            </span>

            <button>

                ✕

            </button>

        `;

        item

        .querySelector("button")

        .addEventListener("click",()=>{

            order.currentLiquid.flavors.splice(index,1);

            renderSelectedFlavors();

        });

        selectedFlavors.appendChild(item);

    });

}

/* ==========================================================

   ADD FLAVOR

========================================================== */

const oldAddFlavor = addFlavor;

addFlavor=function(flavor){

    oldAddFlavor(flavor);

    renderSelectedFlavors();

};

/* ==========================================================

   START DATA

========================================================== */

if(typeof recipes!=="undefined"){

    renderRecipeCards(recipes);

}

renderSelectedFlavors();
/* ==========================================================

   TELEGRAM DATA

========================================================== */

function buildOrderMessage(){

    let message = "";

    message += "🧪 НОВЕ ЗАМОВЛЕННЯ\n\n";

    order.liquids.forEach((liquid,index)=>{

        message += `#${index+1}\n`;

        message += `Основа: ${liquid.nicotineType}\n`;

        message += `Об'єм: ${liquid.volume} мл\n`;

        message += `Міцність: ${liquid.strength} мг\n`;

        message += `Ціна: ${liquid.price} грн\n`;

        if(liquid.flavors.length){

            message += "Смаки:\n";

            liquid.flavors.forEach(flavor=>{

                if(typeof flavor==="string"){

                    message += "• "+flavor+"\n";

                }else{

                    message += "• "+flavor.name+"\n";

                }

            });

        }

        message += "\n";

    });

    message += "💰 Загальна сума: ";

    message += order.totalPrice+" грн\n\n";

    message += "🚚 Доставка: ";

    message += order.delivery.type+"\n";

    if(order.delivery.shop){

        message += "🏪 "+order.delivery.shop+"\n";

    }

    message += "\n";

    message += "👤 ";

    message += order.customer.name+"\n";

    message += "📞 ";

    message += order.customer.phone+"\n";

    if(order.customer.telegram){

        message += "Telegram: ";

        message += order.customer.telegram+"\n";

    }

    if(order.customer.comment){

        message += "\n💬 ";

        message += order.customer.comment;

    }

    return message;

}

/* ==========================================================

   DEBUG

========================================================== */

window.order = order;

window.showOrder = function(){

    console.log(order);

    console.log(buildOrderMessage());

};

/* ==========================================================

   INIT

========================================================== */

refreshBottomBar();

updateSliderValues();

renderSelectedFlavors();

renderCartItems();
/* ==========================================================

   GIFT LIQUID

========================================================== */

const giftButton =

document.getElementById("giftButton");

if(giftButton){

    giftButton.addEventListener("click",()=>{

        order.giftLiquid=true;

        resetCurrentLiquid();

        showScreen(1);

    });

}
