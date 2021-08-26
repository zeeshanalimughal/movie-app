// Storing the themoviedb api url in the variable
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
// Storing the image path that will be used to show movie image
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
// Storing the api irl for searching the movie
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// getting the id's of required html elements
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Calling the getMovie function and passing the API url in it
getMovies(API_URL)

// Defining the async function that will return a promise and fetch the data of api
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    // calling the function and passing the data to show movies data into html page
    showMovies(data.results)
}

// function that will loop through each movie result and show movies on the html page
function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        // getting the required data by array destructuring
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

// function that is passing a value (rating) and return string of color name accourding to the given condition.
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


// performing an input event that will get the search term from user input and call the same function getMovies() but this time it will pass the SEARCH API with the user input value.
search.addEventListener("input",()=>{
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
    }
     else {
        window.location.reload()
    }
})