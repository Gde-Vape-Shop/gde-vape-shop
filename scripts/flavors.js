/*

==========================================================

GDE VAPE SHOP

FLAVORS.JS

==========================================================

*/

"use strict";

let flavors = [];

/* ==========================================

   Завантаження смаків

========================================== */

async function loadFlavors(){

    try{

        const response = await fetch("data/flavors.json");

        flavors = await response.json();

        renderFlavors(flavors);

    }catch(error){

        console.error("Помилка завантаження смаків", error);

    }

}

/* ==========================================

   Відображення

========================================== */

function renderFlavors(list){

    const container =

    document.getElementById("flavorsList");

    if(!container) return;

    container.innerHTML="";

    list.forEach(flavor=>{

        const card=document.createElement("div");

        card.className="flavorCard";

        card.innerHTML=`

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

/* ==========================================

   Додати смак

========================================== */

function addFlavor(flavor){

    if(order.currentLiquid.flavors.length>=5){

        alert("Максимум 5 смаків");

        return;

    }

    order.currentLiquid.flavors.push({

        name:flavor.name,

        percent:0

    });

    console.log(order.currentLiquid.flavors);

}

/* ==========================================

   Пошук

========================================== */

const flavorSearch =

document.getElementById("flavorSearch");

if(flavorSearch){

    flavorSearch.addEventListener("input",()=>{

        const value=

        flavorSearch.value.toLowerCase();

        const filtered=

        flavors.filter(flavor=>

            flavor.name

            .toLowerCase()

            .includes(value)

        );

        renderFlavors(filtered);

    });

}

/* ==========================================

   Старт

========================================== */

loadFlavors();
