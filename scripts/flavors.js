/*

==========================================================

GDE VAPE SHOP

FLAVORS.JS

Version 2.0

==========================================================

*/

"use strict";

let flavors = [];

/* ==========================================================

   LOAD

========================================================== */

async function loadFlavors(){

    try{

        const response = await fetch("data/flavors.json");

        flavors = await response.json();

        renderFlavors(flavors);

    }

    catch(error){

        console.error("Flavors loading error:", error);

    }

}

/* ==========================================================

   RENDER

========================================================== */

function renderFlavors(list){

    const container =

    document.getElementById("flavorsList");

    if(!container) return;

    container.innerHTML = "";

    list.forEach(flavor=>{

        const card = document.createElement("div");

        card.className = "flavorCard";

        card.innerHTML = `

            <div class="recipeTop">

                <div class="recipeName">

                    ${flavor.name}

                </div>

                <div class="recipeBadge">

                    ${flavor.category}

                </div>

            </div>

        `;

        card.addEventListener("click",()=>{

            addFlavor(flavor);

        });

        container.appendChild(card);

    });

}

/* ==========================================================

   ADD FLAVOR

========================================================== */

function addFlavor(flavor){

    if(order.currentLiquid.flavors.length>=5){

        alert("Максимум 5 смаків.");

        return;

    }

    const exists =

    order.currentLiquid.flavors.some(item=>

        item.name===flavor.name

    );

    if(exists){

        alert("Цей смак вже доданий.");

        return;

    }

    order.currentLiquid.flavors.push({

        name: flavor.name,

        percent: 0

    });

    if(typeof renderSelectedFlavors==="function"){

        renderSelectedFlavors();

    }

    updateCart();

}

/* ==========================================================

   SEARCH

========================================================== */

const flavorSearch =

document.getElementById("flavorSearch");

if(flavorSearch){

    flavorSearch.addEventListener("input",()=>{

        const value =

        flavorSearch.value

        .trim()

        .toLowerCase();

        const filtered =

        flavors.filter(flavor=>

            flavor.name

            .toLowerCase()

            .includes(value)

        );

        renderFlavors(filtered);

    });

}

/* ==========================================================

   INIT

========================================================== */

loadFlavors();
