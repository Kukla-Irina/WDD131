import recipes from "./recipes.mjs";

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  const listLength = list.length;
  const randomNum = random(listLength);
  return list[randomNum];
}

function tagsTemplate(tags) {
  return tags.map((tag) => `<span>${tag}</span>`).join("");
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
        <img src="${recipe.image}" alt="${recipe.name}">
        <div class="card">
            <div class="tags">
                ${tagsTemplate(recipe.tags || [])}
            </div>
            <h2>${recipe.name}</h2>
            ${ratingTemplate(recipe.rating)}
            <p class="hide">${recipe.description}</p>
        </div>
    `;
}

function renderRecipes(recipeList) {
    const containerElement = document.querySelector('.recipe-container');
    containerElement.innerHTML = ''; 
    recipeList.forEach(recipe => {
        const recipeHTML = recipeTemplate(recipe);
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = recipeHTML;
        containerElement.appendChild(recipeCard);
    });
}

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

function filterRecipes(query) {
  const filtered = recipes.filter((recipe) => {
    const tags = recipe.tags || [];
    const ingredients = recipe.recipeIngredient || [];

    return (
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      tags.find((tag) => tag.toLowerCase().includes(query)) ||
      ingredients.find((ingredient) => ingredient.toLowerCase().includes(query))
    );
  });

  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  return sorted;
}

function searchHandler(e) {
  e.preventDefault();

  const searchInput = document.getElementById("search");
  const query = searchInput.value.toLowerCase();
  const filteredRecipes = filterRecipes(query);
  renderRecipes(filteredRecipes);
}

document.getElementById("search-icon").addEventListener("click", searchHandler);

init();
