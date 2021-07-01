const base_URL = " https://pokeapi.co/api/v2/pokemon"
//1 
async function allPokemon(){
    const resp = await axios.get(`${base_URL}?limit=1118`)
    console.log(resp.data.results)
    return resp.data.results
}

allPokemon()

//2
function randomNum(){
    return Math.floor(Math.random() * 1119)
}

async function randomPokemons(){
    const all_pokemon = await allPokemon()
    let pokemon = await Promise.all([
        axios.get(all_pokemon[randomNum()].url),
        axios.get(all_pokemon[randomNum()].url),
        axios.get(all_pokemon[randomNum()].url)
    ])
    console.log(pokemon[0].data, pokemon[1].data, pokemon[2].data)
}

randomPokemons()

//3
function getEnglishText(data){
    for(entry of data){
        if(entry.language.name == "en"){
            return entry.flavor_text
        }
    }
}


$(".add-pkmn").on("click", async function(){
    let resp = await axios.get(`${base_URL}?limit=1118`);
    let all_pokemon = resp.data.results;
    let pokemon = await axios.get(all_pokemon[randomNum()].url);
    let pokemon_img = pokemon.data.sprites.front_default;
    let pokemon_name = pokemon.data.name;
    let species = await axios.get(pokemon.data.species.url);
    console.log(species)
    let description = getEnglishText(species.data.flavor_text_entries);
    $(".card-container").append(`<div class="pkmn-card"><p>${pokemon_name}</p> <img src="${pokemon_img}"> <p> ${description}</p></div>`);
    })

