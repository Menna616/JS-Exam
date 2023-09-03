
$(document).ready(function(){
    $('#loading').fadeOut(1000,function(){
            $('.sideBar').animate({'left':`-${fixedBoxWidth}`},100);
        })
    });

// show and hide side bar
let fixedBoxWidth = $('.fixed-box').outerWidth(true);

$('#menuBar').click(function(){
    if($('.sideBar').css('left')==='0px'){
        // close sideBar
        closeSideBar();
    }else{

    // open sideBar
        $('.sideBar').animate({'left':'0'},500);
        $('#menuBar i').addClass("fa-solid fa-x fa-2x");
    }
})
// Function to close side bar
function closeSideBar(){
    $('.sideBar').animate({'left':`-${fixedBoxWidth}`},500);
    $('#menuBar i').removeClass("fa-solid fa-x fa-2x");
        $('#menuBar i').addClass("fa-solid fa-bars fa-2x")
}
// Function to get Home Data
async function getHomeData(){
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let finalResult = await result.json();
    console.log(finalResult.meals);
    mealsDisplay(finalResult.meals);
}
// Function to display Home Data
let rowData = document.querySelector('#rowData')
function mealsDisplay(arr){
    let cartoona = "";
    for(let i=0;i<arr.length;i++){
        cartoona += `
        <div class="col-md-3">
                <div class="meal-img  position-relative cursor-pointer overflow-hidden text-dark">
                    <img src="${arr[i].strMealThumb}" alt="recipe image" class="w-100 rounded-3"/>
                    <div class="layer d-flex align-items-center rounded-3 position-absolute">
                        <h3 class="ms-2">${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    } 
    rowData.innerHTML = cartoona;  
}
getHomeData()

let listItems = $('.sideBar ul li');
listItems.eq(0).click(function(){ // search لما اضغط ع 
    $('#Search').removeClass('d-none');
    $('section').not('#Search').addClass('d-none')
    closeSideBar();
})
listItems.eq(1).click(function(){  // categories لما اضغط ع 
    $('#Categories').removeClass('d-none');
    $('section').not('#Categories').addClass('d-none')
    getCategories();
    closeSideBar();
})
listItems.eq(2).click(function(){ // area لما اضغط ع 
    $('#Area').removeClass('d-none')
    $('section').not('#Area').addClass('d-none')
    getArea();
    closeSideBar();
})
listItems.eq(3).click(function(){ //ingredients لما اضغط ع 
    // $('#Ingredients').removeClass('d-none')
    // $('section').not('#Ingredients').addClass('d-none')
    getIngredients();
    closeSideBar();
})
listItems.eq(4).click(function(){
    $('#Contact').removeClass('d-none'); // contact us لما اضغط ع 
    $('section').not('#Contact').addClass('d-none');
    closeSideBar();

})

// function to search by meal name
let searchByNameData = [];
async function searchByName(term){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let finalResult = await result.json();
    searchByNameData  = finalResult.meals;
    console.log(searchByNameData);
    displaySearchByNameData()
}
function displaySearchByNameData(){
    var cartoona = "";
    for(let i=0;i<searchByNameData.length;i++){
        cartoona += `
        <div class="col-md-3">
                <div class="meal-img position-relative cursor-pointer overflow-hidden">
                    <img src="${searchByNameData[i].strMealThumb}" alt="recipe image" class="w-100 rounded-3"/>
                    <div class="layer d-flex align-items-center rounded-3 position-absolute">
                        <h3 class="ms-2">${searchByNameData[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    } 
    document.querySelector('#Search .searchData').innerHTML = cartoona;  
}

document.querySelector('.name-input input').addEventListener('keyup',function(){
    searchByName(this.value)
})

// function to search by meal name
let searchByLetterData = [];
async function searchByLetter(term){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let finalResult = await result.json();
    searchByLetterData  = finalResult.meals;
    console.log(searchByLetterData);
    displaySearchByLetterData()
}
function displaySearchByLetterData(){
    var cartoona = "";
    for(let i=0;i<searchByLetterData.length;i++){
        cartoona += `
        <div class="col-md-3">
                <div class="meal-img position-relative cursor-pointer overflow-hidden">
                    <img src="${searchByLetterData[i].strMealThumb}" alt="recipe image" class="w-100 rounded-3"/>
                    <div class="layer d-flex align-items-center rounded-3 position-absolute">
                        <h3 class="ms-2">${searchByLetterData[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    } 
    document.querySelector('#Search .searchData').innerHTML = cartoona;  
}
document.querySelector('.letter-input input').addEventListener('keyup',function(){
    searchByName(this.value)
})
// Contact Section


// Name Validation
function nameValidation(){
    var nameRegex = /^[a-zA-Z]+$/;
    var name = document.querySelector('.contact-name-input input').value;
    if(nameRegex.test(name) == true){
        document.querySelector('.contact-name-input p').classList.add('d-none')
        return true
    }
    else{
        document.querySelector('.contact-name-input p').classList.remove('d-none')
        return false
    }
}
$('.contact-name-input input').keyup(function(){
    nameValidation();
    toSubmit()
})

// Phone Validation
function phoneValidation(){
    var phoneRegex = /^(01[0125][0-9]{8})$/;
    var phone = document.querySelector('.contact-phone-input input').value;
    if(phoneRegex.test(phone) == true){
        document.querySelector('.contact-phone-input p').classList.add('d-none')
        return true
    }
    else{
       document.querySelector('.contact-phone-input p').classList.remove('d-none')
        return false
    }
}

$('.contact-phone-input input').keyup(function(){
    phoneValidation();
})

// Email Validation
function emailValidation(){
    var emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    var email = document.querySelector('.contact-email-input input').value;
    if(emailRegex.test(email) == true){
        document.querySelector('.contact-email-input p').classList.add('d-none')
        return true
    }
    else{
        document.querySelector('.contact-email-input p').classList.remove('d-none')
        return false
    }
}
$('.contact-email-input input').keyup(function(){
    emailValidation();
 })

//  Age Validation
function ageValidation(){
    var ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    var age = document.querySelector('.contact-age-input input').value;
    if(ageRegex.test(age) == true){
        document.querySelector('.contact-age-input p').classList.add('d-none')
        return true
    }
    else{
        document.querySelector('.contact-age-input p').classList.remove('d-none')
        return false
    }
}
$('.contact-age-input input').keyup(function(){
    ageValidation();
 })


//  Password Validation
function passwordValidation(){
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    var password = document.querySelector('.contact-password-input input').value;
    if(passwordRegex.test(password) == true){
        document.querySelector('.contact-password-input p').classList.add('d-none')
        return true
    }
    else{
        document.querySelector('.contact-password-input p').classList.remove('d-none')
        return false
    }
}
$('.contact-password-input input').keyup(function(){
    passwordValidation();
 })
 
//  Repassword Validation
 function repasswordValidation(){
    if(document.querySelector('.contact-password-input input').value ==
    document.querySelector('.contact-repassword-input input').value
    ){
        document.querySelector('.contact-repassword-input p').classList.add('d-none')
        return true
    }
    else{
        document.querySelector('.contact-repassword-input p').classList.remove('d-none')
        return false
    }
 }
 $('.contact-repassword-input input').keyup(function(){
   repasswordValidation();
 })


 
 document.querySelector('.for-button button').disabled = true;
 // function to able th button


function toSubmit(){
    if(nameValidation() == true && 
    phoneValidation() == true && 
    emailValidation() == true &&
    ageValidation() == true && 
    passwordValidation() == true &&
    repasswordValidation() == true){
        document.querySelector('.for-button button').removeAttribute('disabled');
    }
    else{
        document.querySelector('.for-button button').setAttribute('disabled',true)} 
}
    
// Categories
let categoryData = [];
async function getCategories(){    //basic API
   let result = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
   let finalResult = await result.json();
   categoryData = finalResult.categories;
   console.log(categoryData);
   displayCategories();
}
function displayCategories(){   //basic Display
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

let categorySecondMealsSection = document.getElementById('categorySecondMeals');
let secondMealsOfCategory = document.querySelectorAll('#Categories');
secondMealsOfCategory.forEach((secondMealOfCategory)=>{
    secondMealOfCategory.addEventListener('click',function(e){
        let componentName = e.target.innerText
        console.log(componentName);
        document.getElementById('Categories').classList.add('d-none')
        categorySecondMealsSection.classList.remove('d-none')
        getCategoryMeals(componentName);  
    })
})

let secondCategoryMeals = [];
async function getCategoryMeals(category){  //second API
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let finalResult = await result.json(); 
    secondCategoryMeals = finalResult.meals
    console.log(secondCategoryMeals);
    displaycategoryMeals()
}

function displaycategoryMeals(){  //second display
    var cartoona = "";
    for(let i=0;i<20;i++){
        cartoona += `
        <div class="col-md-3">
                <div class="meal-img  position-relative cursor-pointer overflow-hidden">
                    <img src="${secondCategoryMeals[i].strMealThumb}" alt="recipe image" class="w-100 rounded-3"/>
                    <div class="layer d-flex align-items-center rounded-3 position-absolute">
                        <h3 class="ms-2">${secondCategoryMeals[i].strMeal}"</h3>
                    </div>
                </div>
            </div>
        `
    } 
    document.querySelector('#categorySecondMeals .row').innerHTML = cartoona;  
}

// Area

let areaData = [];
async function getArea(){  //basic API
   let result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
   let finalResult = await result.json();
   areaData = finalResult.meals;
   console.log(areaData);
   displayArea();
}
function displayArea(){   //basic display
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

let areaSecondMealsSection = document.getElementById('areaSecondMeals');
let secondMealsOfArea = document.querySelectorAll('#Area');

secondMealsOfArea.forEach((secondMealOfArea)=>{
    secondMealOfArea.addEventListener('click',function(e){
        let areaName = e.target.innerText
        console.log(areaName);
        document.getElementById('Area').classList.add('d-none')
        areaSecondMealsSection.classList.remove('d-none')
        getAreaMeals(areaName);  
    })
})
let secondAreaMeals = [];
async function getAreaMeals(area){  //second API
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let finalResult = await result.json(); 
    secondAreaMeals = finalResult.meals
    console.log(secondAreaMeals);
    displayAreaMeals()
}

function displayAreaMeals(){  //second display
    var cartoona = "";
    for(let i=0;i<secondAreaMeals.length;i++){
        cartoona += `
        <div class="col-md-3">
                <div class="meal-img  position-relative cursor-pointer overflow-hidden">
                    <img src="${secondAreaMeals[i].strMealThumb}" alt="recipe image" class="w-100 rounded-3"/>
                    <div class="layer d-flex align-items-center rounded-3 position-absolute">
                        <h3 class="ms-2">${secondAreaMeals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    } 
    document.querySelector('#areaSecondMeals .row').innerHTML = cartoona;  
}


// Ingredients

let ingredientsData = [];
async function getIngredients(){   //basic API
   let result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
   let finalResult = await result.json();
   ingredientsData = finalResult.meals;
   console.log(ingredientsData);
   displayIngredients();
}
function displayIngredients(){     //basic display
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
let ingredientsSecondMealsSection = document.getElementById('ingredientsSecondMeals');
let secondMealsOfIngredients = document.querySelectorAll('#Ingredients');

secondMealsOfIngredients.forEach((secondMealOfIngredient)=>{
    secondMealOfIngredient.addEventListener('click',function(e){
        let ingredientName = e.target.innerText
        console.log(ingredientName);
        // document.getElementById('Ingredients').classList.add('d-none')
        ingredientsSecondMealsSection.classList.remove('d-none')
        getIngredientsMeals(ingredientName);  
    })
})

let secondIngredientsMeals = [];
async function getIngredientsMeals(ingredients){  //second API
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    let finalResult = await result.json(); 
    secondIngredientsMeals = finalResult.meals
    console.log(secondIngredientsMeals);
    displayIngredientsMeals()
}

function displayIngredientsMeals(){  //second display
    var cartoona = "";
    for(let i=0;i<secondIngredientsMeals.length;i++){
        cartoona += `
        <div class="col-md-3">
                <div class="meal-img  position-relative cursor-pointer overflow-hidden">
                    <img src="${secondIngredientsMeals[i].strMealThumb}" alt="recipe image" class="w-100 rounded-3"/>
                    <div class="layer d-flex align-items-center rounded-3 position-absolute">
                        <h3 class="ms-2">${secondIngredientsMeals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    } 
    document.querySelector('#ingredientsSecondMeals .row').innerHTML = cartoona;  
}

