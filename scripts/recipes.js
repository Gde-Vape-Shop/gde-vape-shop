/*

==========================================================

GDE VAPE SHOP

RECIPES.JS

Version 2.0

==========================================================

*/

"use strict";

let recipes = [];

/* ==========================================================

   LOAD RECIPES

========================================================== */

async function loadRecipes(){

    try{

        const response = await fetch("data/recipes.json");

        recipes = await response.json();

        renderRecipeCards(recipes);

    }

    catch(error){

        console.error("Recipes loading error:", error);

    }

}

/* ==========================================================

   SELECT RECIPE

========================================================== */

function selectRecipe(recipe){

    order.currentLiquid.recipe = recipe;

    order.currentLiquid.recipeType = "recipe";

    order.currentLiquid.flavors = [...recipe.flavors];

    calculateCurrentLiquid();

    updateCart();

    showScreen("screenSettings");

}

/* ==========================================================

   RENDER

========================================================== */

function renderRecipeCards(list){

    const container =

    document.getElementById("recipesContainer");

    if(!container) return;

    container.innerHTML = "";

    list.forEach(recipe=>{

        const card = document.createElement("div");

        card.className = "recipeCard";

        card.innerHTML = `

            <div class="recipeTop">

                <div class="recipeName">

                    ${recipe.name}

                </div>

                <div class="recipeBadge">

                    ${recipe.category}

                </div>

            </div>

            <div class="recipeDescription">

                ${recipe.description}

            </div>

            <button class="chooseRecipe">

                Обрати

            </button>

        `;

        card.querySelector(".chooseRecipe")

        .addEventListener("click",()=>{

            selectRecipe(recipe);

        });

        container.appendChild(card);

    });

}

/* ==========================================================

   SEARCH

========================================================== */

const recipeSearch =

document.getElementById("recipeSearch");

if(recipeSearch){

    recipeSearch.addEventListener("input",()=>{

        const value =

        recipeSearch.value

        .trim()

        .toLowerCase();

        const filtered =

        recipes.filter(recipe=>

            recipe.name

            .toLowerCase()

            .includes(value)

        );

        renderRecipeCards(filtered);

    });

}

/* ==========================================================

   INIT

========================================================== */

loadRecipes();
