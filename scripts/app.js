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
