/*

==========================================================

GDE VAPE SHOP

APP.JS

Версія 2.0

==========================================================

*/

"use strict";

/* =======================================================

   ЕКРАНИ

======================================================= */

const screens = [...document.querySelectorAll(".screen")];

let currentScreen = 0;

/* =======================================================

   КНОПКИ

======================================================= */

const startButton = document.getElementById("startOrder");

const nextButtons = document.querySelectorAll(".nextButton");

const backButtons = document.querySelectorAll(".backButton");

/* =======================================================

   ПОКАЗ ЕКРАНУ

======================================================= */

function showScreen(index){

    if(index<0) return;

    if(index>=screens.length) return;

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    screens[index].classList.add("active");

    currentScreen=index;

}

/* =======================================================

   НАСТУПНИЙ

======================================================= */

function nextScreen(){

    showScreen(currentScreen+1);

}

/* =======================================================

   НАЗАД

======================================================= */

function previousScreen(){

    showScreen(currentScreen-1);

}

/* =======================================================

   КНОПКА СТАРТ

======================================================= */

if(startButton){

    startButton.addEventListener("click",()=>{

        showScreen(1);

    });

}

/* =======================================================

   ДАЛІ

======================================================= */

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        nextScreen();

    });

});

/* =======================================================

   НАЗАД

======================================================= */

backButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        previousScreen();

    });

});

/* =======================================================

   ПЕРШИЙ ЕКРАН

======================================================= */

showScreen(0);
/* =======================================================

   ВИБІР ТИПУ НІКОТИНУ

======================================================= */

const nicotineCards = document.querySelectorAll("[data-base]");

nicotineCards.forEach(card=>{

    card.addEventListener("click",()=>{

        nicotineCards.forEach(item=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        order.currentLiquid.nicotineType = card.dataset.base;

        renderStrengths();

    });

});

/* =======================================================

   ВИБІР ОБ'ЄМУ

======================================================= */

const volumeCards = document.querySelectorAll("[data-volume]");

volumeCards.forEach(card=>{

    card.addEventListener("click",()=>{

        volumeCards.forEach(item=>{

            item.classList.remove("active");

        });

        card.classList.add("active");

        order.currentLiquid.volume = Number(card.dataset.volume);

        calculateCurrentLiquid();

        updateCart();

    });

});
/* =======================================================

   ГЕНЕРАЦІЯ МІЦНОСТІ

======================================================= */

const strengthContainer =

document.querySelector("#screenStrength .cardList");

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
/* =======================================================

   ВИБІР РЕЖИМУ

======================================================= */

const recipesButton = document.getElementById("recipesButton");

const mixButton = document.getElementById("mixButton");

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

/* =======================================================

   КОШИК

======================================================= */

const cartLiquids=document.getElementById("cartLiquids");

const cartTotal=document.getElementById("cartTotal");

const giftCounter=document.getElementById("giftCounter");

function updateCart(){

    updateTotalPrice();

    if(cartLiquids){

        cartLiquids.textContent=order.liquids.length;

    }

    if(cartTotal){

        cartTotal.textContent=order.totalPrice+" грн";

    }

    if(giftCounter){

        const left=giftProgress();

        if(left===0){

            giftCounter.textContent="🎁";

        }else{

            giftCounter.textContent=left;

        }

    }

}

/* =======================================================

   ДОДАТИ РІДИНУ

======================================================= */

function saveCurrentLiquid(){

    calculateCurrentLiquid();

    addLiquidToOrder();

    updateCart();

}

/* =======================================================

   СТАРТ

======================================================= */

updateCart();
/* =======================================================

   ДОСТАВКА

======================================================= */

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

        pickupSection.classList.add("hidden");

        novaSection.classList.add("hidden");

        taxiSection.classList.add("hidden");

        if(index===0){

            order.delivery.type="pickup";

            pickupSection.classList.remove("hidden");

        }

        if(index===1){

            order.delivery.type="nova";

            novaSection.classList.remove("hidden");

        }

        if(index===2){

            order.delivery.type="taxi";

            taxiSection.classList.remove("hidden");

        }

    });

});

/* =======================================================

   МАГАЗИНИ

======================================================= */

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
