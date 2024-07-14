"use strict";

let currentAction='showMeals'
let currentList =''


//sideNav

    let sideNavWidth = $('#sideNav').innerWidth()
    $('#side').css('left', `${-sideNavWidth}px`)

function openSideNav() {
    $('#side').animate({ left: `0` }, 500)
    $('#open').animate({ left: `${sideNavWidth}` }, 500)
    $('#openIcon').addClass('fa-xmark');
    $('#openIcon').removeClass('fa-bars');
    for (let i = 0; i < 5; i++) {
        $(`navbar li`).eq(i).animate({ top: 0 }, ((i * 200) + 500))
    }
}

function closeSideNav() {
    $('#side').animate({ left: `${-sideNavWidth}` }, 500)
    $('#open').animate({ left: `0` }, 500)
    $('#openIcon').removeClass('fa-xmark');
    $('#openIcon').addClass('fa-bars');
    for (let i = 0; i < 5; i++) {
        $(`navbar li`).eq(i).animate({ top: 300 }, 1000)
    }
}

$('#open').on('click', function () {
    sideNavWidth = $('#sideNav').innerWidth()
    if ($('#sideNav').offset().left === 0) {
        closeSideNav()
    } else {
        openSideNav()
    }
})







////////////////////////////////////////////
///API



async function APIDATA(a,b,c) {
   
    $("#loader").fadeIn(10,function(){
        $('body').css('overflow','hidden' )
        // $(window).scrollTop(0)
        $('body').animate({scrollTop:0},10)
        $('html').animate({scrollTop:0},10)
    })

    let myResponce = await fetch(`https://www.themealdb.com/api/json/v1/1/${a}.php${b}${c}`)
     let responceData = await myResponce.json();

     switch(currentAction) {
        case 'showMeals':
            showMeals(responceData)
            break;
        case 'categories':
            showCatagory(responceData)
            break;
        case 'a':
            showArea(responceData)
            break;
        case 'i':
            showIngredients(responceData)
            break;
        case 'showFilterMeals':
            showFilterMeals(responceData)
            break;
        case 'mealId':
            mealDetails(responceData)
            break;

        default:
console.log('nooo')      



}

setTimeout(function(){
    $('body').css('overflow','auto' )
    $("#loader").fadeOut(300)

},200)

}

function mealDetails(responceData){
    $('#searchInput').addClass(`d-none`)
    console.log(responceData.meals[0])
let strMeal = responceData.meals[0].strMeal;
let strCategory = responceData.meals[0].strCategory;
let strArea = responceData.meals[0].strArea;
let strInstructions = responceData.meals[0].strInstructions;
let strTags = responceData.meals[0].strTags?.split(",") ;
let strTagsHTML=''
let strYoutube = responceData.meals[0].strYoutube;
let strSource = responceData.meals[0].strSource;
let strMealThumb = responceData.meals[0].strMealThumb;
let strRecipes = [];
let strRecipesHTML = '';
for (let i = 1; i <= 20; i++) {
if(responceData.meals[0][`strMeasure${i}`]!=' '&&responceData.meals[0][`strMeasure${i}`]!=''&&responceData.meals[0][`strMeasure${i}`]!=null) {
    strRecipes.push(responceData.meals[0][`strMeasure${i}`]+' '+responceData.meals[0][`strIngredient${i}`])
}   
}
for (let i = 0; i < strRecipes.length; i++) {
    strRecipesHTML += `<li class="list-unstyled  px-3 py-2 rounded-pill mx-2 my-3 fw-bold shadow-yellow">${strRecipes[i]}</li>` 
  }
for (let i = 0; i < strTags?.length; i++) {
    strTagsHTML += ` <li class="list-unstyled px-3 py-2 rounded-pill mx-2 my-3 fw-bold shadow-blue">${strTags[i]}</li>` 
  }


     let containerData =`   <h1 class="text-center yellow-title display-5 fw-bolder pb-3">${strMeal}</h1>

  <div class="col-lg-5">
    <div>
      <img src="${strMealThumb}" alt="" class="w-100 rounded-5 custom-box-shadow">    
    </div>

  </div>
  <div class="col-lg-7">
    <div>

    <div class="pb-4">
          <P class="fw-bold">${strInstructions}</p>
    </div>
    <div class="pb-4">

      <h3><span class="fw-bold">Area :</span>${strArea}</h3>
    </div>
    <div class="pb-4">
      <h3><span class="fw-bold">Category :</span>${strCategory}</h3>

    </div>
    <div  class="pb-4">
      
      <h3 class="fw-bold">Recipes :</h3>
      <ul class="d-flex flex-wrap">${strRecipesHTML}</ul>

    </div>
    <div  class="pb-4">
      <h3 class="fw-bold">Tags :</h3>
      <ul class="d-flex">${strTagsHTML}</ul>
    </div>
<div  class="pb-4">
  <button class="btn bg-transparent m-3"><a class="text-decoration-none text-white fs-5 m-2" href="${strSource}"  target="_blank">Source</a></button>
  <button class="btn bg-transparent m-3"><a class="text-decoration-none text-white fs-5 m-2" href="${strYoutube}"  target="_blank">Youtube</a></button>
</div></div>
</div>
 `

$('#contentData').html(containerData)
}





function showMeals(responceData){
    let containerData =''
if(responceData.meals!=null){
       for (let i = 0; i <(responceData.meals.length>20?20:responceData.meals.length); i++) {
        containerData +=` <div class=" col-lg-4 col-md-6 ">
        <div class="card text-center rounded-5 " style="width: 18rem;" >
        <div class="overflow-hidden border border-0 rounded-5 card-img">      
        <img src="${responceData.meals[i].strMealThumb}" class="card-img-top " alt="..."></div>
        
        <div class="card-body ">
        <h5 class="card-title fw-bolder fs-4 ">${responceData.meals[i].strMeal}</h5>
        <p class="card-text fw-light p-2" >${responceData.meals[i].strInstructions.slice(0,150).split(" ").slice(0,responceData.meals[i].strInstructions.slice(0,150).split(" ").length-1).join(" ")} ...</p>
        <button class="btn fw-bolder yellowBtn mealDetails" id='${responceData.meals[i].idMeal}' onclick='getMealId(${responceData.meals[i].idMeal})'>Meal Details</button>
        </div>
        </div>  
        </div> `
        
    } 
}



$('#contentData').html(containerData)
}

function showCatagory(responceData){
    let containerData =''
for (let i = 0; i < responceData.categories.length; i++) {
containerData +=` <div class=" col-lg-4 col-md-6">
    <div class="   bg-transparent" style="width: 18rem;" >
      <div class=" ">      
        <img src="${responceData.categories[i].strCategoryThumb}" class="card-img-top border border-0 rounded-5 " alt="...">
        </div>

      <div class="card-body  text-center">
        <h5 class="card-title fw-bolder fs-5 pt-4 yellow-title">${responceData.categories[i].strCategory}</h5>
        <p class="card-text fw-light ">${responceData.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                <button class="btn fw-bolder filterBtn m-1" id='${responceData.categories[i].strCategory}'>Meals</button></div>
    </div>  
    </div> `
    
}
$('#contentData').html(containerData)
getFilterMeals()
}


function showArea(responceData){
    let containerData =''
for (let i = 0; i < responceData.meals.length; i++) {
containerData +=` <div class=" col-lg-4 col-md-6">
    <div class="  bg-transparent" style="width: 18rem;" >
      <div class="">      
        <img src="images/big-building-svgrepo-com\ \(1\).svg" class="m-auto custom-box-shadow  rounded-5 d-block" alt="..."></div>

      <div class="card-body text-center">
        <h5 class="card-title fw-bolder fs-4 pt-4 yellow-title ">${responceData.meals[i].strArea}</h5>
        <button class="btn fw-bolder filterBtn yellowBtn m-3" id='${responceData.meals[i].strArea}'>Meals</button>
       </div>
    </div>  
    </div> `
    
}
$('#contentData').html(containerData)
getFilterMeals()
}

function showIngredients(responceData){
    let containerData =''
for (let i = 0; i < 20; i++) {
containerData +=` <div class=" col-lg-4 col-md-6">
    <div class="bg-transparent" style="width: 18rem;" >
      <div class="">      
        <img src="https://www.themealdb.com/images/ingredients/${responceData.meals[i].strIngredient}.png" class="card-img-top rounded-5" alt="..."></div>

      <div class="card-body text-center">
        <h5 class="card-title fw-bolder fs-5 pt-4 yellow-title ">${responceData.meals[i].strIngredient}</h5>
                <p class="card-text fw-light  ">${responceData.meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        <button class="btn fw-bolder yellowBtn filterBtn m-2"  id='${responceData.meals[i].strIngredient}'>Meals</button>
       </div>
    </div>  
    </div> `
    
}
$('#contentData').html(containerData)
getFilterMeals()
}

function showFilterMeals(responceData){
    let containerData =''
    for (let i = 0; i < responceData.meals.length; i++) {
        containerData +=` <div class=" col-lg-4 col-md-6">
        <div class="card  rounded-5" style="width: 18rem;" >
        <div class="overflow-hidden border border-0 rounded-5 card-img">      
        <img src="${responceData.meals[i].strMealThumb}" class="card-img-top " alt="..."></div>
        
        <div class="card-body text-center">
        <h5 class="card-title fw-bolder fs-6 m-2 ">${responceData.meals[i].strMeal}</h5>
        <button class="btn fw-bolder yellowBtn mt-1"  id='${responceData.meals[i].idMeal}' onclick='getMealId(${responceData.meals[i].idMeal})'>Meal Details</button>
        </div>
        </div>  
        </div> `
        
    }
$('#contentData').html(containerData)
}







/////////////////////////////////////////////////

///search
$('#search').on('click', () => {
    $('#contactInputs').addClass('d-none')
    sideNavWidth = $('#sideNav').innerWidth()
    closeSideNav()
    $('#s').val('')
    $('#f').val('')
currentAction = 'showMeals'
    $('#searchInput').removeClass(`d-none`)
    $('#contentData').html('')


})

$('#searchInput input').keyup(async function () {
    let searchVal=$(this).val()
    let idLetter = $(this).attr('id')
        APIDATA('search',`?${idLetter}`,`=${searchVal}`)

})


//////////////////////////////////////////
$('.similar').on('click',function(){
    $('#searchInput').addClass(`d-none`)
    $('#contactInputs').addClass('d-none')

    closeSideNav()
     currentList = $(this).attr('id').slice(0,1)
    currentAction =  $(this).attr('id').slice(0,1)
    APIDATA('list',`?${currentList}`,'=list')
  


})
//////////////////////////////////////////
$('#categories').on('click',function(){
    $('#searchInput').addClass(`d-none`)
    $('#contactInputs').addClass('d-none')

    closeSideNav()
    currentList = $(this).attr('id').slice(0,1)
    currentAction=$(this).attr('id')
    APIDATA(currentAction,'','')
})

///////////////////////////
function getFilterMeals(){
    $('.filterBtn').on('click',function(){
       let filterId=$(this).attr('id');
       currentAction='showFilterMeals'
        APIDATA('filter',`?${currentList}`,`=${filterId}`)
    })
    
}

/////////////////////////////////

$('#contact').on('click',()=>{
    $('#searchInput').addClass(`d-none`)
    $('#contentData').html('')    
    closeSideNav()
  $('#contactInputs').removeClass('d-none')
})

function getMealId(mealId){
    currentAction='mealId'
    console.log('000')
    APIDATA('lookup',`?i`,`=${mealId}`)

}
APIDATA('search',`?s`,`=`)
