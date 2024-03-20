
const sowdata = document.querySelector('.sow-data');
const inputValueBySearch = document.querySelector('.inputText');
const typeSelect = document.getElementById('type'); // Select element for types
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
let pokemonArray = []; // Define pokemonArray globally

async function fetchData() {
    const promises = [];
    for(let i = 1; i <= 151; i++) {
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(pokemonURL).then(response => response.json()));
    }
    Promise.all(promises)
    .then(allPokemon => {
        let firstGenPokemon = allPokemon.map(pokemon => ({
            frontImage: pokemon.sprites['front_default'],
            pokemon_id: pokemon.id,
            name: pokemon.name,
            type: pokemon.types[0].type.name,
            abilities: pokemon.abilities.map(ability => ability.ability.name).join(', '),
            description: pokemon.species.url
        }));
        pokemonArray = firstGenPokemon;
        showDataOnUI(pokemonArray);
    });
}

fetchData();

function showDataOnUI(pokemonArray) {
    sowdata.innerHTML = ''; // Clear existing data before showing filtered data
    pokemonArray.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<img src="${element.frontImage}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.type}</p>
            <p class="card-text">${element.abilities}</p>
            <a href="${element.description}" target="_blank" class="btn btn-primary">More Info</a>
        </div>`;
        sowdata.appendChild(card);
    });
}

inputValueBySearch.addEventListener("keyup", function(e) {
    const searchText = e.target.value.toLowerCase();
    const filteredPokemonArray = pokemonArray.filter(pokemon => pokemon.name.toLowerCase().includes(searchText));
    showDataOnUI(filteredPokemonArray);
});
btn1.addEventListener("click",function(e){
    // filter by type

    const selectedType = typeSelect.value.toLowerCase();
    const filteredPokemonArray = pokemonArray.filter(pokemon => pokemon.type === selectedType);
    showDataOnUI(filteredPokemonArray);
})

    btn2.addEventListener("click",function(e){
        // reset data 
        inputValueBySearch.value = '';
        typeSelect.value = '';
        showDataOnUI(pokemonArray);
    });
