document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.header-nav > ul > li');

    menuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');

        if(submenu) {
            menuItems.addEventListener('mouseenter', () => {
                submenu.style.display = 'block';
            });

            item.addEventListener('mouseleave', () => {
                submenu.style.display = 'none';
            });
        }
    });
});








const containerMap = {
    'grass': document.getElementById('grass-type-container'),
    'poison': document.getElementById('poison-type-container'),
    'fire': document.getElementById('fire-type-container'),
    'water': document.getElementById('water-type-container'),
    'steel': document.getElementById('steel-type-container'),
    'ghost': document.getElementById('ghost-type-container'),
    'normal': document.getElementById('normal-type-container'),
    'bug': document.getElementById('bug-type-container'),
    'dragon': document.getElementById('dragon-type-container'),
    'electric': document.getElementById('electric-type-container'),
    'fairy': document.getElementById('fairy-type-container'),
    'psychic': document.getElementById('psychic-type-container'),
    'rock': document.getElementById('rock-type-container'),
    'dark': document.getElementById('dark-type-container'),
    'ground': document.getElementById('ground-type-container'),
    'flying': document.getElementById('flying-type-container'),
    'ice': document.getElementById('ice-type-container'),
    'fighting': document.getElementById('fighting-type-container')
};

async function fetchAndRenderPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
        const data = await response.json();
        const pokemonList = data.results;

        const detailedPokemonPromises = pokemonList.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        const detailedPokemon = await Promise.all(detailedPokemonPromises);

        detailedPokemon.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');
            
            const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const imageUrl = pokemon.sprites.front_default;
            const primaryType = pokemon.types[0].type.name;

            pokemonCard.innerHTML = `
                <img src="${imageUrl}" alt="${name}">
                <p>${name}</p>
            `;

            pokemonCard.addEventListener("click", () => {
                const abilities = pokemon.abilities.map(a => a.ability.name).join(", ");
                const stats = pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join("\n");
                alert(`
                    Nombre: ${name}
                    ID: ${pokemon.id}
                    Tipo: ${primaryType}
                    Habilidades: ${abilities}
                    ${stats}
                `);
            });

            if (containerMap[primaryType]) {
                containerMap[primaryType].appendChild(pokemonCard);
            }
        });

    } catch (error) {
        console.error('Hubo un error al obtener los datos de la API:', error);
    }
}

fetchAndRenderPokemon();