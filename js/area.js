// Start Of Display Area
let rowData = document.getElementById('rowData');
export let areaData = [];
export async function getArea(){
   let result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
   let finalResult = await result.json();
   areaData = finalResult.meals;
   console.log(areaData);
   displayArea();
}
export function displayArea(){
    var cartoona = "";
    for(let i = 0;i<areaData.length;i++){
        cartoona += `
        <div class="col-md-3">
                    <div class="meal-country text-white mx-4 text-center">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${areaData[i].strArea}</h3>
                    </div>
                </div>
        `
    }
    document.querySelector('#Area .row').innerHTML = cartoona
}
// End Of Display Area

export async function getareaMeals(area){
    rowData.innerHTML = ""
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let finalResult = await result.json();
    areaData = finalResult.meals;
    console.log(areaData);
    mealsDisplay(finalResult.meals.slice(0,20))
}