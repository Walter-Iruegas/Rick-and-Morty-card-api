let currentPage = 1;
const cardContainer = document.getElementById("card-container");
const currentPageSpan = document.getElementById("current-page");

function fetchCharacters(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => response.json())
    .then(data => {
        // Limpia el contenedor de tarjetas antes de mostrar las nuevas tarjetas
        while (cardContainer.firstChild) {
            cardContainer.removeChild(cardContainer.firstChild);
        }
        // Muestra el número de página actual
        currentPageSpan.textContent = page;
        // Itera a través de cada personaje y muestra su información en una tarjeta
        const characters = data.results;
        characters.forEach(character => {
            const card = createCard(character);
            cardContainer.appendChild(card);
        });
    });
}

function createCard(character) {
    const card = document.createElement("div");
    card.classList.add("card");
    // Crea el contenido de la tarjeta
    const name = document.createElement("h2");
    name.textContent = character.name;
    const image = document.createElement("img");
    image.src = character.image;
    // Crea la sección de información adicional y la oculta
    const additionalInfo = document.createElement("div");
    additionalInfo.style.display = "none";
    // Crea los elementos de información adicional
    const status = document.createElement("p");
    status.textContent = `Status: ${character.status}`;
    const species = document.createElement("p");
    species.textContent = `Species: ${character.species}`;
    const gender = document.createElement("p");
    gender.textContent = `Gender: ${character.gender}`;
    const origin = document.createElement("p");
    origin.textContent = `Origin: ${character.origin.name}`;
    // Agrega los elementos de información adicional a la sección
    additionalInfo.appendChild(status);
    additionalInfo.appendChild(species);
    additionalInfo.appendChild(gender);
    additionalInfo.appendChild(origin);
    // Crea el botón "Detalles"
    const detailsButton = document.createElement("button");
    detailsButton.textContent = "Detalles";
    detailsButton.addEventListener("click", function() {
        // Muestra la información adicional del personaje
        additionalInfo.style.display = "block";
        detailsButton.style.display = "none";
    });
    // Crea el botón "Borrar"
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Borrar";
    deleteButton.addEventListener("click", function() {
        // Elimina la tarjeta del contenedor
        cardContainer.removeChild(card);
    });
    // Agrega el contenido a la tarjeta
    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(additionalInfo);
    card.appendChild(detailsButton);
    card.appendChild(deleteButton);
    return card;
}

// Agrega eventos a los botones para navegar entre páginas
const firstButton = document.getElementById("first-button");
firstButton.addEventListener("click", function() {
    currentPage = 1;
    fetchCharacters(currentPage);
});
const prevButton = document.getElementById("prev-button");
prevButton.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
});
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", function() {
    currentPage++;
    fetchCharacters(currentPage);
});
const lastButton = document.getElementById("last-button");
lastButton.addEventListener("click", function() {
    fetch(`https://rickandmortyapi.com/api/character/`)
    .then(response => response.json())
    .then(data => {
    currentPage = data.info.pages;
    fetchCharacters(currentPage);
    });
    });
    fetchCharacters(currentPage);


