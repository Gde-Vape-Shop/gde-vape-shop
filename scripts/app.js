/*

==========================================================

GDE VAPE SHOP

APP.JS

Version 2.0

==========================================================

*/

"use strict";

/* ==========================================================

   DOM

========================================================== */

const screens = {};

document.querySelectorAll(".screen").forEach(screen => {

    screens[screen.id] = screen;

});

const nextButtons =

document.querySelectorAll(".nextButton");

const backButtons =

document.querySelectorAll(".backButton");

const startButton =

document.getElementById("startOrder");

const nicotineCards =

document.querySelectorAll("[data-base]");

const ratioCards =

document.querySelectorAll("[data-ratio]");

const volumeCards =

document.querySelectorAll("[data-volume]");

const strengthContainer =

document.querySelector("#screenStrength .cardList");

const cartItems =

document.getElementById("cartItems");

const cartPrice =

document.getElementById("cartPrice");

const cartLiquids =

document.getElementById("cartLiquids");

const cartTotal =

document.getElementById("cartTotal");

const giftCounter =

document.getElementById("giftCounter");

const finishOrderButton =

document.getElementById("finishOrder");
const addAnotherLiquidButton =

document.getElementById("addAnotherLiquid");
/* ==========================================================

   SCREEN

========================================================== */

let currentScreen = "screenHome";

function showScreen(id){

    if(!screens[id]){

        console.error("Screen not found:", id);

        return;

    }

    Object.values(screens).forEach(screen=>{

        screen.classList.remove("active");

    });

    screens[id].classList.add("active");

    currentScreen = id;

}
function nextScreen(){

    switch(currentScreen){

        case "screenHome":

            showScreen("screenBase");

            break;

        case "screenBase":

            if(!order.currentLiquid.nicotineType){

                alert("Оберіть основу.");

                return;

            }

            if(order.currentLiquid.nicotineType==="organic"){

                showScreen("screenRatio");

            }else{

                showScreen("screenVolume");

            }

            break;

        case "screenRatio":

            if(!order.currentLiquid.ratio){

                alert("Оберіть співвідношення VG/PG.");

                return;

            }

            showScreen("screenVolume");

            break;

        case "screenVolume":

            if(!order.currentLiquid.volume){

                alert("Оберіть об'єм.");

                return;

            }

            showScreen("screenStrength");

            break;

        case "screenStrength":

            if(order.currentLiquid.strength===null){

                alert("Оберіть міцність.");

                return;

            }

            showScreen("screenType");

            break;

        case "screenType":

            if(!order.currentLiquid.recipeType){

                alert("Оберіть тип рідини.");

                return;

            }

            if(order.currentLiquid.recipeType==="recipe"){

                showScreen("screenRecipes");

            }else{

                showScreen("screenCustomMix");

            }

            break;

        case "screenSettings":

            addCurrentLiquid();

            break;

        case "screenCart":

            showScreen("screenDelivery");

            break;

        case "screenDelivery":

            if(!order.delivery.type){

                alert("Оберіть спосіб доставки.");

                return;

            }

            showScreen("screenContact");

            break;

        case "screenContact":

            if(finishOrderButton){

                finishOrderButton.click();

            }

            break;

        default:

            break;

    }

}

/* ==========================================================

   BACK

========================================================== */

function previousScreen(){

    switch(currentScreen){

        case "screenBase":

            showScreen("screenHome");

            break;

        case "screenRatio":

            showScreen("screenBase");

            break;

        case "screenVolume":

            if(order.currentLiquid.nicotineType==="organic"){

                showScreen("screenRatio");

            }else{

                showScreen("screenBase");

            }

            break;

        case "screenStrength":

            showScreen("screenVolume");

            break;

        case "screenType":

            showScreen("screenStrength");

            break;

        case "screenRecipes":

        case "screenCustomMix":

            showScreen("screenType");

            break;

        case "screenSettings":

            if(order.currentLiquid.recipeType==="recipe"){

                showScreen("screenRecipes");

            }else{

                showScreen("screenCustomMix");

            }

            break;

        case "screenCart":

            showScreen("screenSettings");

            break;

        case "screenDelivery":

            showScreen("screenCart");

            break;

        case "screenContact":

            showScreen("screenDelivery");

            break;

        case "screenSuccess":

            showScreen("screenHome");

            break;

        default:

            showScreen("screenHome");

    }

}

/* ==========================================================

   BUTTONS

========================================================== */

if(startButton){

    startButton.addEventListener("click",()=>{

        showScreen("screenBase");

    });

}
if(addAnotherLiquidButton){

    addAnotherLiquidButton.addEventListener("click",()=>{

        resetCurrentLiquid();

        renderStrengths();

        renderSelectedFlavors();

        document

            .querySelectorAll(".selectCard.active")

            .forEach(card=>{

                card.classList.remove("active");

            });

        updateSliderLabels();

        showScreen("screenBase");

    });

}
nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        nextScreen();

    });

});

backButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        previousScreen();

    });

});
/* ==========================================================

   BASE

========================================================== */

nicotineCards.forEach(card=>{

    card.addEventListener("click",()=>{

        nicotineCards.forEach(item=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        order.currentLiquid.nicotineType =

        card.dataset.base;

        if(order.currentLiquid.nicotineType==="salt"){

            order.currentLiquid.ratio = null;

        }

        renderStrengths();

        calculateCurrentLiquid();

        updateCart();

    });

});

/* ==========================================================

   RATIO

========================================================== */

ratioCards.forEach(card=>{

    card.addEventListener("click",()=>{

        ratioCards.forEach(item=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        order.currentLiquid.ratio =

        card.dataset.ratio;

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

    strengthContainer.innerHTML = "";

    let strengths = [];

    if(order.currentLiquid.nicotineType==="organic"){

        for(let i=0;i<=15;i++){

            strengths.push(i);

        }

    }else{

        strengths = [0,1,2,3,4,5,6.5];

    }

    strengths.forEach(value=>{

        const card = document.createElement("div");

        card.className = "selectCard";

        card.dataset.strength = value;

        card.innerHTML = `

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

            order.currentLiquid.strength = value;

            calculateCurrentLiquid();

            updateCart();

        });

        strengthContainer.appendChild(card);

    });

}
/* ==========================================================

   TYPE

========================================================== */

const recipesButton =

document.getElementById("recipesButton");

const mixButton =

document.getElementById("mixButton");

if(recipesButton){

    recipesButton.addEventListener("click",()=>{

        order.currentLiquid.recipeType = "recipe";

        showScreen("screenRecipes");

    });

}

if(mixButton){

    mixButton.addEventListener("click",()=>{

        order.currentLiquid.recipeType = "custom";

        showScreen("screenCustomMix");

    });

}

/* ==========================================================

   CUSTOM MIX

========================================================== */

const addFlavorButton =

document.getElementById("addFlavor");

const selectedFlavors =

document.getElementById("selectedFlavors");

function renderSelectedFlavors(){

    if(!selectedFlavors) return;

    selectedFlavors.innerHTML = "";

    order.currentLiquid.flavors.forEach((flavor,index)=>{

        const item = document.createElement("div");

        item.className = "selectedFlavor";

        item.innerHTML = `

            <span>

                ${typeof flavor==="string" ? flavor : flavor.name}

            </span>

            <button>

                ✕

            </button>

        `;

        item.querySelector("button")

        .addEventListener("click",()=>{

            order.currentLiquid.flavors.splice(index,1);

            renderSelectedFlavors();

        });

        selectedFlavors.appendChild(item);

    });

}

if(addFlavorButton){

    addFlavorButton.addEventListener("click",()=>{

        if(order.currentLiquid.flavors.length===0){

            alert("Оберіть хоча б один смак.");

            return;

        }

        showScreen("screenSettings");

    });

}

if(typeof addFlavor==="function"){

    const originalAddFlavor = addFlavor;

    addFlavor = function(flavor){

        originalAddFlavor(flavor);

        renderSelectedFlavors();

    };

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

function updateSliderLabels(){

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

function bindSlider(slider,key){

    if(!slider) return;

    slider.addEventListener("input",()=>{

        order.currentLiquid[key] =

        Number(slider.value);

        updateSliderLabels();

    });

}

bindSlider(sweetness,"sweetness");

bindSlider(cold,"cold");

bindSlider(acid,"acid");
/* ==========================================================

   CART

========================================================== */

function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML = "";

    order.liquids.forEach((liquid,index)=>{

        const card = document.createElement("div");

        card.className = "cartItem";

        card.innerHTML = `

            <div class="cartItemTop">

                <strong>

                    ${index+1}. ${liquid.nicotineType.toUpperCase()}

                </strong>

                <span>

                    ${liquid.price} грн

                </span>

            </div>

            <div>

                ${liquid.volume} мл

                •

                ${liquid.strength} мг

            </div>

        `;

        cartItems.appendChild(card);

    });

}

function updateCart(){

    updateTotalPrice();

    renderCart();

    if(cartLiquids){

        cartLiquids.textContent =

        order.liquids.length;

    }

    if(cartTotal){

        cartTotal.textContent =

        order.totalPrice + " грн";

    }

    if(cartPrice){

        cartPrice.textContent =

        order.totalPrice + " грн";

    }

    if(giftCounter){

        const left = giftProgress();

        giftCounter.textContent =

        left===0 ? "🎁" : left;

    }

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

        alert("Спочатку заповніть усі параметри рідини.");

        return;

    }

    calculateCurrentLiquid();

    if(order.isEditing){

        updateLiquid(order.editingLiquid);

        order.isEditing = false;

        order.editingLiquid = null;

    }else{

        addLiquidToOrder();

    }

    updateCart();

    resetCurrentLiquid();

    renderStrengths();

    renderSelectedFlavors();

    updateSliderLabels();

    document

        .querySelectorAll(".selectCard.active")

        .forEach(card=>{

            card.classList.remove("active");

        });

    const sliders = [

        sweetness,

        cold,

        acid

    ];

    sliders.forEach(slider=>{

        if(slider){

            slider.value = 5;

        }

    });

    updateSliderLabels();

    showScreen("screenCart");

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

   CONTACT

========================================================== */

if(finishOrderButton){

    finishOrderButton.addEventListener("click",()=>{

        order.customer.name =

        document

        .getElementById("customerName")

        .value

        .trim();

        order.customer.phone =

        document

        .getElementById("customerPhone")

        .value

        .trim();

        order.customer.telegram =

        document

        .getElementById("customerTelegram")

        .value

        .trim();

        order.customer.comment =

        document

        .getElementById("customerComment")

        .value

        .trim();

        console.log(order);

        showScreen("screenSuccess");

    });

}
/* ==========================================================

   GIFT

========================================================== */

const giftButton =

document.getElementById("giftButton");

if(giftButton){

    giftButton.addEventListener("click",()=>{

        order.giftLiquid = true;

        resetCurrentLiquid();

        renderStrengths();

        renderSelectedFlavors();

        updateSliderLabels();

        showScreen("screenBase");

    });

}
/* ==========================================================

   INIT

========================================================== */

renderStrengths();

renderSelectedFlavors();

updateSliderLabels();

updateCart();

showScreen("screenHome");
