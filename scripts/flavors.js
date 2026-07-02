/*

==========================================================

GDE VAPE SHOP

FLAVORS.JS

Version 3.0

==========================================================

*/

"use strict";

/* ==========================================================

   DATA

========================================================== */

let flavors = [];

const selectedFlavorsContainer =

document.getElementById("selectedFlavors");

const flavorsContainer =

document.getElementById("flavorsList");

const flavorSearch =

document.getElementById("flavorSearch");

const addFlavorButton =

document.getElementById("addFlavor");

/* ==========================================================

   LOAD

========================================================== */

async function loadFlavors(){

    try{

        const response =

        await fetch("data/flavors.json");

        flavors =

        await response.json();

        renderFlavors(flavors);

    }

    catch(error){

        console.error(

            "Flavors loading error:",

            error

        );

    }

}
/* ==========================================================

   RENDER FLAVORS

========================================================== */

function renderFlavors(list){

    if(!flavorsContainer) return;

    flavorsContainer.innerHTML = "";

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

        flavorsContainer.appendChild(card);

    });

}
/* ==========================================================

   CATEGORIES

========================================================== */

const categoryButtons =

document.querySelectorAll(

    ".flavorCategories .category"

);

categoryButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        categoryButtons.forEach(item=>{

            item.classList.remove("active");

        });

        button.classList.add("active");

        const category =

        button.textContent.trim();

        if(category==="Усі"){

            filterFlavors();

            return;

        }

        const filtered =

        flavors.filter(flavor=>

            flavor.category===category

        );

        filterFlavors();

    });

});
/* ==========================================================

   SEARCH

========================================================== */

if(flavorSearch){

    flavorSearch.addEventListener("input",filterFlavors);

}

function filterFlavors(){

    let filtered = [...flavors];

    const activeCategory =

    document.querySelector(

        ".flavorCategories .category.active"

    );

    if(activeCategory){

        const category =

        activeCategory.textContent.trim();

        if(category!=="Усі"){

            filtered =

            filtered.filter(flavor=>

                flavor.category===category

            );

        }

    }

    const value =

    flavorSearch.value

    .trim()

    .toLowerCase();

    if(value){

        filtered =

        filtered.filter(flavor=>

            flavor.name

            .toLowerCase()

            .includes(value)

        );

    }

    renderFlavors(filtered);

}
/* ==========================================================

   SELECTED FLAVORS

========================================================== */

function renderSelectedFlavors(){

    if(!selectedFlavorsContainer) return;

    selectedFlavorsContainer.innerHTML = "";

    order.currentLiquid.flavors.forEach((flavor,index)=>{

        const card = document.createElement("div");

        card.className = "selectedFlavor";

        card.innerHTML = `

            <div class="selectedFlavorTop">

    <strong>${flavor.name}</strong>

    <button

        class="removeFlavor"

        data-index="${index}">

        ✕

    </button>

</div>

<input

    type="range"

    min="0"

    max="100"

    value="${flavor.percent || 0}"

    class="flavorSlider"

    data-index="${index}"

>

<div class="selectedFlavorPercent">

    ${flavor.percent || 0}%

</div>

        `;
const slider = card.querySelector(".flavorSlider");

const percent = card.querySelector(".selectedFlavorPercent");

slider.addEventListener("input", () => {

    flavor.percent = Number(slider.value);

    if(order.currentLiquid.flavors.length===2){

        const second = order.currentLiquid.flavors.find(item=>item!==flavor);

        second.percent = 100 - flavor.percent;

    }

    percent.textContent = flavor.percent + "%";

    document.querySelectorAll(".flavorSlider").forEach((item,index)=>{

        item.value = order.currentLiquid.flavors[index].percent;

    });

    document.querySelectorAll(".selectedFlavorPercent").forEach((item,index)=>{

        item.textContent = order.currentLiquid.flavors[index].percent + "%";

    });

});
        card

        .querySelector(".removeFlavor")

        .addEventListener("click",()=>{

            order.currentLiquid.flavors.splice(index,1);

            renderSelectedFlavors();

            updateCart();

        });

        selectedFlavorsContainer.appendChild(card);

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

    const exists=

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

    renderSelectedFlavors();

    updateCart();

}

/* ==========================================================

   CONTINUE

========================================================== */

if(addFlavorButton){

    addFlavorButton.addEventListener("click",()=>{

        if(order.currentLiquid.flavors.length===0){

            alert("Оберіть хоча б один смак.");

            return;

        }

        showScreen("screenSettings");

    });

}

/* ==========================================================

   INIT

========================================================== */

loadFlavors();
