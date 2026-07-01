/*

==========================================================

GDE VAPE SHOP

APP.JS

==========================================================

*/

let currentScreen = 0;

const screens = document.querySelectorAll(".screen");

const startButton = document.getElementById("startOrder");

const nextButtons = document.querySelectorAll(".nextButton");

const backButtons = document.querySelectorAll(".backButton");

/* ========================================= */

function showScreen(index){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    screens[index].classList.add("active");

    currentScreen=index;

}

/* ========================================= */

function nextScreen(){

    if(currentScreen>=screens.length-1) return;

    showScreen(currentScreen+1);

}

/* ========================================= */

function previousScreen(){

    if(currentScreen<=0) return;

    showScreen(currentScreen-1);

}

/* ========================================= */

if(startButton){

    startButton.addEventListener("click",()=>{

        showScreen(1);

    });

}

/* ========================================= */

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        nextScreen();

    });

});

/* ========================================= */

backButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        previousScreen();

    });

});

/* ========================================= */

showScreen(0);
/* ===========================================

   ВИБІР SALT / ORGANIC

=========================================== */

const nicotineCards = document.querySelectorAll("[data-base]");

nicotineCards.forEach(card=>{

    card.addEventListener("click",()=>{

        nicotineCards.forEach(c=>c.classList.remove("active"));

        card.classList.add("active");

        order.currentLiquid.nicotineType = card.dataset.base;

        console.log(order);

    });

});

/* ===========================================

   ВИБІР ОБ'ЄМУ

=========================================== */

const volumeCards = document.querySelectorAll("[data-volume]");

volumeCards.forEach(card=>{

    card.addEventListener("click",()=>{

        volumeCards.forEach(c=>c.classList.remove("active"));

        card.classList.add("active");

        order.currentLiquid.volume = Number(card.dataset.volume);

        console.log(order);

    });

});

/* ===========================================

   ВИБІР МІЦНОСТІ

=========================================== */

const strengthCards = document.querySelectorAll("[data-strength]");

strengthCards.forEach(card=>{

    card.addEventListener("click",()=>{

        strengthCards.forEach(c=>c.classList.remove("active"));

        card.classList.add("active");

        order.currentLiquid.strength = Number(card.dataset.strength);

        console.log(order);

    });
/* ===========================================

   ВИБІР ТИПУ РІДИНИ

=========================================== */

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

/* ===========================================

   ДОДАТИ РІДИНУ

=========================================== */

function addCurrentLiquid(){

    addLiquidToOrder();

    updateTotalPrice();

    updateCart();

}

/* ===========================================

   КОШИК

=========================================== */

const cartLiquids=document.getElementById("cartLiquids");

const cartTotal=document.getElementById("cartTotal");

const giftCounter=document.getElementById("giftCounter");

function updateCart(){

    if(cartLiquids){

        cartLiquids.textContent=order.liquids.length;

    }

    if(cartTotal){

        cartTotal.textContent=order.totalPrice+" грн";

    }

    if(giftCounter){

        const left=giftProgress();

        giftCounter.textContent=left;

    }

}

/* ===========================================

   СТАРТОВИЙ СТАН

=========================================== */

updateCart();
});
/* ===========================================

   ГЕНЕРАЦІЯ МІЦНОСТІ

=========================================== */

const strengthContainer = document.querySelector("#screenStrength .cardList");

function renderStrengths() {

    if (!strengthContainer) return;

    strengthContainer.innerHTML = "";

    let strengths = [];

    if (order.currentLiquid.nicotineType === "organic") {

        strengths = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    } else {

        strengths = [0,1,2,3,4,5,6.5];

    }

    strengths.forEach(value => {

        const card = document.createElement("div");

        card.className = "selectCard";

        card.dataset.strength = value;

        card.innerHTML = `

            <h3>${value}</h3>

            <p>мг/мл</p>

        `;

        card.addEventListener("click", () => {

            document

                .querySelectorAll("#screenStrength .selectCard")

                .forEach(c => c.classList.remove("active"));

            card.classList.add("active");

            order.currentLiquid.strength = value;

            calculateCurrentLiquid();

            updateCart();

        });

        strengthContainer.appendChild(card);

    });

}

/* ===========================================

   ПІСЛЯ ВИБОРУ ТИПУ НІКОТИНУ

=========================================== */

nicotineCards.forEach(card => {

    card.addEventListener("click", () => {

        renderStrengths();

    });

});
