// Start Of Display Ingredients
let rowData = document.getElementById('rowData');
export let ingredientsData = [];
export async function getIngredients(){
   let result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
   let finalResult = await result.json();
   ingredientsData = finalResult.meals;
   console.log(ingredientsData);
   displayIngredients();
}
export function displayIngredients(){
    var cartoona = "";
    for(let i = 0;i<20;i++){
        cartoona += `
        <div class="col-md-3">
                    <div class="ingredient text-white text-center position-relative overflow-hidden">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredientsData[i].strIngredient}</h3>
                        <div class="ingredient-layer px-2">
                        <p>${ingredientsData[i].strDescription}</p>
                        </div>
                       
                    </div>
                </div>
        `
    }
    document.querySelector('#Area .row').innerHTML = cartoona
}

export async function getingredientsMeals(ingredients){
    rowData.innerHTML = ""
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${ingredients}`);
    let finalResult = await result.json();
    ingredientsData = finalResult.meals;
    console.log(ingredientsData);
    mealsDisplay(finalResult.meals.slice(0,20))
}