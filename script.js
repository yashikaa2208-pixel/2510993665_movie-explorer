const API_KEY = "54d93d159214be0454ee455afa93365b";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/w500";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const mainContainer = document.getElementById("mainContainer");

getMovies();

async function getMovies() {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
        );

        const data = await response.json();

        console.log(data.results);

        displayMovie(data.results);
    } catch (error) {
        console.log(error);
    }
}

function displayMovie(movies){
    mainContainer.innerHTML="";

    movies.forEach(movie => {
        const card= document.createElement("div");
        const poster= IMAGE+movie.poster_path;
        card.innerHTML=`
        <img src="${poster}/>"
        <p>${movie.title}</p>
        <p>${movie.release_date}</p>
        <p class="rating">${movie.vote_average}</p>`

        mainContainer.appendChild(card);
    });
}
