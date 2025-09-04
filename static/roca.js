const containerMap = {
        'rock': document.getElementById('rock-type-container'),
}

async function fetchAndRenderPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
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
                Swal.fire({
                    title: `Nombre: ${name}`,
                    html: `
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/> <br> <strong>HABILIDADES:</strong> ${abilities} <br> <strong>TIPO:</strong> ${primaryType} <br> <strong>ID:</strong> ${pokemon.id} <br> <strong>ESTADISTICAS:</strong> ${stats}
                    `,
                    confirmButtonText: 'cerrar'
                });
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