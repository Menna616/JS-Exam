export let rowData = document.getElementById('rowData');
export let categoryData = [];
export async function getCategories(){
   let result = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
   let finalResult = await result.json();
   categoryData = finalResult.categories;
   console.log(categoryData);
   displayCategories();
}
export function displayCategories(){
    var cartoona = "";
    for(let i = 0;i<categoryData.length;i++){
        cartoona += `
        <div class="col-md-3">
                    <div class="component position-relative overflow-hidden">
                        <img src="${categoryData[i].strCategoryThumb}" alt="component image" class="w-100 rounded-3"/>
                        <div class="layer position-absolute text-center rounded-3 overflow-hidden py-1">
                            <h3 class="mt-1">${categoryData[i].strCategory}</h3>
                            <p class="py-2">${categoryData[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
        `
    }
    document.querySelector('#Categories .row').innerHTML = cartoona
}

export async function getCategoryMeals(category){
    rowData.innerHTML = ""
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let finalResult = await result.json();
    categoryData = finalResult.meals;
    console.log(categoryData);
    mealsDisplay(finalResult.meals.slice(0,20))
}