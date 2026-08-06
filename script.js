console.log("JS Loaded");

// =================== API ===================
const API_KEY = "5738be1e1d761075a6ffe04b33331c22";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/w500";

// =================== Elements ===================
const inputBox = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const mainContainer = document.getElementById("mainContainer");

// =================== Load Top Rated Movies ===================
getMovies();

async function getMovies() {

    message.innerText = "Loading...";

    try {

        const response = await fetch(
            `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
        );

        const data = await response.json();

        if (!response.ok) {
            message.innerText = data.status_message;
            return;
        }

        message.innerText = "";
        displayMovie(data.results);

    } catch (error) {
        console.log(error);
        message.innerText = "Something went wrong!";
    }
}

// =================== Display Movies ===================
function displayMovie(movies) {

    mainContainer.innerHTML = "";

    movies.forEach(movie => {

        const poster = movie.poster_path
            ? IMAGE + movie.poster_path
            : "https://via.placeholder.com/300x450?text=No+Image";

        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p class="rating">⭐ ${movie.vote_average}</p>
            <p>${movie.release_date}</p>
        `;

        mainContainer.appendChild(card);
    });

}

// =================== Search Movie ===================
async function searchMovie() {

    const movieName = inputBox.value.trim();

    if (movieName === "") {
        getMovies();
        return;
    }

    message.innerText = "Searching...";

    try {

        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`
        );

        const data = await response.json();

        if (!response.ok) {
            message.innerText = data.status_message;
            return;
        }

        if (data.results.length === 0) {
            mainContainer.innerHTML = "";
            message.innerText = "Movie Not Found";
        } else {
            message.innerText = `Showing results for "${movieName}"`;
            displayMovie(data.results);
        }

    } catch (error) {
        console.log(error);
        message.innerText = "Something went wrong!";
    }
}

// =================== Events ===================
searchBtn.addEventListener("click", searchMovie);

inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchMovie();
    }
});
