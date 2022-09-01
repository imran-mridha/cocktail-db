// Load Cocktail
const loadCocktail = async (search,dataLimit) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;

  const res = await fetch(url);
  const data = await res.json();
  displayCocktails(data.drinks,dataLimit)
}

// Display Cocktails

const displayCocktails = (drinks,dataLimit) => {
  // console.log(drinks)
  const containerCocktails = document.getElementById('cocktails-container');
  containerCocktails.textContent = '';
  const showAll = document.getElementById('show-all');
  const notFound = document.getElementById('not-found-massege');
  if(!drinks){
    showAll.classList.add('hidden')
    // const notFound = document.getElementById('not-found-massege');
    // const mealsContainer = document.getElementById('meals-container');
    // mealsContainer.innerHTML = '';
    toggleSpinner(false);
    notFound.classList.remove('hidden');
  }else{
    if(dataLimit && drinks.length > 8){
      drinks = drinks.slice(0,8);
      showAll.classList.remove('hidden')
    }else{
      showAll.classList.add('hidden')
    }
    if (drinks === null) {
      notFound.classList.remove('hidden');
    } else {
      notFound.classList.add('hidden');
    }
    drinks?.forEach(drink => {
      // console.log(drink);
      const {strDrinkThumb,strDrink,strInstructions} = drink;
      // console.log(strDrinkThumb,strDrink,strInstructions);
  
      const drinkDiv = document.createElement('div');
      drinkDiv.classList.add('card')
      drinkDiv.innerHTML = `
      <a href="#!">
         <img class="rounded-t-lg" src="${strDrinkThumb ? strDrinkThumb: 'N/A'}" alt=""/>
      </a>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">${strDrink ? strDrink.slice(0, 20): 'N/A'}..</h5>
        <p class="text-gray-700 text-base mb-4">${strInstructions.slice ? strInstructions.slice(0, 20): 'N/A' }...</p>
                  
        </div>
      `;
      containerCocktails.appendChild(drinkDiv);
      toggleSpinner(false)
  
    });
  }
  
}
const searchProces = dataLimit => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadCocktail(searchText,dataLimit)
}

const searchDrinkLimit = () => {
  searchProces(8)
}

const searchdrinkAll = () => {
  searchProces()
}

// Set Enter Event on the search field
document.getElementById('search-field').addEventListener('keypress', function (e) {
  // console.log(event.target.value)
  if (e.key === 'Enter') {
    searchFoodLimit(9);
  }
})
// Toggle Spinner

const toggleSpinner = isLoading => {
  const spinner = document.getElementById('spinner');

  if (isLoading) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}
loadCocktail('', 8)