import {actors} from "./actorData.js"

const movieImageOne = document.getElementById('movie-one-image')
const movieImageTwo = document.getElementById('movie-two-image')
const playerInput = document.getElementById('player-input')
const guessBtn = document.getElementById('guess-btn')
const getFilmsBtn = document.getElementById('get-films-btn')
const loadingBtn = document.getElementById('loading-btn')
const loadingText = document.querySelector(".get-films-btn div")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3819d4d7e1mshb60c35661a89497p1aa61djsnc8a15ba96b17',
		'X-RapidAPI-Host': 'what-from.p.rapidapi.com'
	}
};


let actorCombinedName = ""
let actorsUsed = []

function getActor() {
    loadingText.textContent = ""
    loadingText.classList.toggle('loading')
    playerInput.value = ""
    sessionStorage.clear()
    
    const actorFullName = Math.floor(Math.random()*actors.length)
    const actorName = actors[actorFullName].name
    const actorSurname = actors[actorFullName].surname
    actorCombinedName = actorName + " " + actorSurname
    actorsUsed.push(actorCombinedName)
    console.log(actorsUsed)
    playerGuesses(actorsUsed)
    document.getElementById('actor-display-name').textContent = `${actorName} ${actorSurname}`
    fetchActorProfile(actorName, actorSurname)
}



function fetchActorProfile(name, surname) {
    fetch(`https://what-from.p.rapidapi.com/actor/${name}%20${surname}`, options)
	    .then(res => res.json())
	    .then(data => {
            // console.log(data)     
            let movieList = data[1].filter((film) => film.role).map(film => {
                return [film.title, film.year]})
            console.log(movieList)
            renderFilms(movieList)
            
        })
	        .catch(err => console.error("Not today"));
 }

 function renderFilms(movie) {
    const getMovieOne = Math.floor(Math.random()*movie.length)
    const getMovieTwo = Math.floor(Math.random()*movie.length)
    const movieOne = movie[getMovieOne]
    const movieTwo = movie[getMovieTwo]
    console.log(movieTwo)
    displayMovies(movieOne, movieTwo)


function displayMovies(movieOne, movieTwo) {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=d389b4f1&t=${movieOne[0]}&y=${movieOne[1]}`)
        .then (res => res.json())
        .then (data =>  {
            
            let movieOnePoster = data.Poster
            movieImageOne.innerHTML = `<img src="${movieOnePoster}">
                                    <p class="movie-info mt-2 text-center">${movieOne[0]} (${movieOne[1]})</> `      
                                     
            console.log(movieOnePoster)
    
})
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=d389b4f1&t=${movieTwo[0]}&y=${movieTwo[1]}`)
        .then (res => res.json())
        .then (data =>  {
            let movieTwoPoster = data.Poster
            movieImageTwo.innerHTML = `<img src="${movieTwoPoster}">
                                        <p class="movie-info mt-2 text-center">${movieTwo[0]} (${movieTwo[1]})</p>`       
            loadingText.classList.toggle('loading')
            loadingText.textContent = "Skip >>"                                  
            console.log(movieTwoPoster)
            })
}
}

let actorSmash

function playerGuesses(name) {
    actorSmash = name[name.length-1].toUpperCase()
    guessBtn.addEventListener("click", checkAnswer)
     
}

function checkAnswer() {
    if (playerInput.value.toUpperCase().trim() === actorSmash) {
        correctAnswer()
       } else {
        incorrectAnswer()
       }
}

function correctAnswer() {
    console.log("Correct")
    playerInput.value = "Yes!"
    setTimeout(() => playerInput.value = "", 1000)
    setTimeout(() => getActor(), 2000)
    loadingText.textContent = "Yes!" 
}

function incorrectAnswer() {
    console.log("Incorrect")
    playerInput.value = "Nope"
    setTimeout(() => playerInput.value = "", 1000)
}



function toggleButton() {
    loadingText.classList.toggle('loading')
}

getFilmsBtn.addEventListener("click", getActor)

loadingBtn.addEventListener("click", toggleButton)


