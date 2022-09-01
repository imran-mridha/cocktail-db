// Load Cocktail
const loadCocktail = async (search,dataLimit) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayCocktails(data.drinks,dataLimit)
}

// Display Cocktails
const displayCocktails = (drinks,dataLimit) => {
  const containerCocktails = document.getElementById('cocktails-container');
  containerCocktails.textContent = '';
  const showAll = document.getElementById('show-all');
  const notFound = document.getElementById('not-found-massege');
  if(!drinks){
    showAll.classList.add('hidden')
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
      const {strDrinkThumb,strDrink,strInstructions} = drink;
      const drinkDiv = document.createElement('div');
      drinkDiv.classList.add('card')
      drinkDiv.innerHTML = `
      <a href="#!">
         <img class="rounded-t-lg" src="${strDrinkThumb ? strDrinkThumb: 'N/A'}" alt=""/>
      </a>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">${strDrink ? strDrink.slice(0, 20): 'N/A'}..</h5>
        <p class="text-gray-700 text-base mb-4">${strInstructions ? strInstructions.slice(0, 20): 'N/A' }...</p>
        <button onclick="loadDrinkDetails(${drink.idDrink? drink.idDrink: 'N/A'})" type="button" class="w-full inline-block px-6 py-2.5 bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
        Show Details
        </button>
      
        </div>
      `;
      containerCocktails.appendChild(drinkDiv);
      toggleSpinner(false)
  
    });
  }
  
}
// Added Common Function For Search System
const searchProces = dataLimit => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadCocktail(searchText,dataLimit)
}

const searchDrinkLimit = () => {
  searchProces(8)
}
/// Show All
const searchdrinkAll = () => {
  searchProces()
  const searchField = document.getElementById('search-field');
  searchField.value = '';
}

// Set Enter Event on the search field
document.getElementById('search-field').addEventListener('keypress', function (e) {
  // console.log(event.target.value)
  if (e.key === 'Enter') {
    searchDrinkLimit(8);
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

// Load Drink Details
const loadDrinkDetails = async id => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  // console.log(url)
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data.drinks);
}
// Display Drink Details With Modal
const displayMealDetails = drink => {
  console.log(drink)
  const {strDrink,strDrinkThumb,idDrink,strInstructionsDE,strCategory} = drink[0];
  
  const drinkTilte = document.querySelector('.title');
  drinkTilte.innerText = strDrink;

  const drinkDetails = document.getElementById('drink-details');

  drinkDetails.innerHTML = `
  <img src="${strDrinkThumb ? strDrinkThumb: 'N/A'}" alt=""/>
  <h2 class="py-2 text-2xl"><span class="text-red-500">ID:</span> ${idDrink ? idDrink: 'N/A'}</h2>
  <h2 class="py-2 text-2xl"><span class="text-red-500">Category:</span> ${strCategory ? strCategory: 'N/A'}</h2>
  <h2 class="py-2 text-2xl"><span class="text-red-500">Description:</span> ${strInstructionsDE ? strInstructionsDE: 'N/A'}</h2>
  `
}

// Default
loadCocktail('', 8)