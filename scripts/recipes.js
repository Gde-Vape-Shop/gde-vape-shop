/*

==========================================================

GDE VAPE SHOP

RECIPES.JS

==========================================================

*/

"use strict";

let recipes = [];

/* ==========================================

   Завантаження рецептів

========================================== */

async function loadRecipes(){

    try{

        const response = await fetch("data/recipes.json");

        recipes = await response.json();

        renderRecipes(recipes);

    }catch(error){

        console.error("Не вдалося завантажити рецепти", error);

    }

}

/* ==========================================

   Відображення рецептів

========================================== */

function renderRecipes(list){

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

            order.currentLiquid.recipe = recipe;

            showScreen(7);

        });

        container.appendChild(card);

    });

}

/* ==========================================

   Пошук

========================================== */

const recipeSearch =

document.getElementById("recipeSearch");

if(recipeSearch){

    recipeSearch.addEventListener("input",()=>{

        const value =

        recipeSearch.value.toLowerCase();

        const filtered =

        recipes.filter(recipe=>

            recipe.name

            .toLowerCase()

            .includes(value)

        );

        renderRecipes(filtered);

    });

}

/* ==========================================

   Старт

========================================== */

loadRecipes();
