const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const mealResults = document.getElementById("meal-results");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMeals(query);
    }
});

async function fetchMeals(query) {
    const response = await fetch(`${API_URL}${query}`);
    const data = await response.json();
    displayMeals(data.meals);
}

function displayMeals(meals) {
    mealResults.innerHTML = ""; 
    if (!meals) {
        mealResults.innerHTML = `<div class="col-12 text-center"><p>No meals found.</p></div>`;
        return;
    }

    meals.slice(0, 5).forEach(meal => {
        const mealCard = createMealCard(meal);
        mealResults.appendChild(mealCard);
    });

    if (meals.length > 5) {
        const showAllBtn = document.createElement("button");
        showAllBtn.textContent = "SHOW ALL";
        showAllBtn.className = "btn btn-secondary mt-3";
        showAllBtn.onclick = () => showAllMeals(meals);
        mealResults.appendChild(showAllBtn);
    }
}

function createMealCard(meal) {
    const col = document.createElement("div");
    col.className = "col-md-4 col-lg-3";
    col.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text"><strong>Meal Name:</strong> ${meal.strMeal}</p>
                <p class="card-text"><strong>Meal ID:</strong> ${meal.idMeal}</p>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
            </div>
        </div>`;
    return col;
}

function showAllMeals(meals) {
    mealResults.innerHTML = ""; 
    meals.forEach(meal => {
        const mealCard = createMealCard(meal);
        mealResults.appendChild(mealCard);
    });
}


