import {actors} from "./actorData.js"

const movieImageOne = document.getElementById('movie-one-image')
const movieImageTwo = document.getElementById('movie-two-image')
// const playerInput = document.getElementById('player-input')
const guessBtn = document.getElementById('guess-btn')
const getFilmsBtn = document.getElementById('get-films-btn')
const loadingBtn = document.getElementById('loading-btn')
const loadingText = document.querySelector(".get-films-btn div")
const actorOption = document.getElementById("actor-option")
const optionBtns = document.getElementById("option-btns")
const actorBtn1 = document.getElementById("actor-option-btn-1")
const actorBtn2 = document.getElementById("actor-option-btn-2")
const actorBtn3 = document.getElementById("actor-option-btn-3")
const actorBtn4 = document.getElementById("actor-option-btn-4")
const filmDisplay = document.querySelector(".film-display")




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
    // playerInput.value = ""
    sessionStorage.clear()
    
    const actorFullName = Math.floor(Math.random()*actors.length)
    const actorName = actors[actorFullName].name
    const actorSurname = actors[actorFullName].surname
    actorCombinedName = actorName + " " + actorSurname
    actorsUsed.push(actorCombinedName)
    console.log(actorsUsed)
    // playerGuesses(actorsUsed)
    document.getElementById('actor-display-name').textContent = `${actorName} ${actorSurname}`
    fetchActorProfile(actorName, actorSurname)
    presentOptions(actorCombinedName)
    sortAnswer(actorsUsed)
    
    
}

let actorChoices = []


function presentOptions(actor) {
    const randomActor = [getRandomNumber(), getRandomNumber(), getRandomNumber()]

    actorChoices = 
            [actor,
             actors[randomActor[0]].fullName, 
             actors[randomActor[1]].fullName, 
             actors[randomActor[2]].fullName].sort(() => Math.random() - 0.5)
   
    let actorNoCopies = [...new Set(actorChoices)];

    actorBtn1.textContent = actorChoices[0]
    actorBtn2.textContent = actorChoices[1]
    actorBtn3.textContent = actorChoices[2]
    actorBtn4.textContent = actorChoices[3]

    // console.log(actorNoCopies)

    // const actorbtns = actorNoCopies.map(actor => `<button id="actor-option-btn" class="option-btn">${actor}</button>`).join('')
   
    // setTimeout(() => optionBtns.innerHTML = `${actorbtns}`, 3000)

   
    }

function getRandomNumber() {
    let randomNumber = Math.floor(Math.random()*actors.length)
    return randomNumber
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
	        .catch((err => {
                console.log(err)
                getFilmsBtn.textContent="Error, Try Again >>"}));
 }

 function renderFilms(movie) {
    const getMovieOne = Math.floor(Math.random()*movie.length)
    const getMovieTwo = Math.floor(Math.random()*movie.length)
    const movieOne = movie[getMovieOne]
    const movieTwo = movie[getMovieTwo]
    // loadingText.classList.toggle('loading')
    displayMovies(movieOne, movieTwo)
 }



function displayMovies(movieOne, movieTwo) {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=d389b4f1&t=${movieOne[0]}&y=${movieOne[1]}`)
        .then (res => res.json())
        .then (data =>  {
            
            let movieOnePoster = data.Poster
            movieImageOne.innerHTML = `<img src="${movieOnePoster}">
                                    <p class="movie-info mt-2 text-center">${movieOne[0].slice(0, 30)} (${movieOne[1]})</p> `      
                                     
            
    
}).catch(err => console.log(err));

    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=d389b4f1&t=${movieTwo[0]}&y=${movieTwo[1]}`)
        .then (res => res.json())
        .then (data =>  {
            let movieTwoPoster = data.Poster
            movieImageTwo.innerHTML = `<img src="${movieTwoPoster}">
                                        <p class="movie-info mt-2 text-center">${movieTwo[0].slice(0, 30)} (${movieTwo[1]})</p>`       
            loadingText.classList.toggle('loading')
                                             
            
            }).catch(err => console.log(err))
}


let latestCorrectActor = ""

function sortAnswer(correctActor) {
    latestCorrectActor = correctActor[correctActor.length-1]
    document.querySelectorAll(".four-actors").forEach((element) => {
    element.addEventListener("click", (e) => {
      const targetData = e.target.textContent
      if(targetData === latestCorrectActor) {
        console.log(targetData)
        correctAnswer(targetData)
    } else {
        incorrectAnswer(latestCorrectActor)
    }
    })
})}





// function checkAnswer(guess, correctActor) {
//     console.log("Correct")
    
// }





// function playerGuesses(name) {
//     
//     guessBtn.addEventListener("click", checkAnswer)
     
// }

// function checkAnswer() {
//     if (playerInput.value.toUpperCase().trim() === actorSmash) {
//         correctAnswer()
//        } else {
//         incorrectAnswer()
//        }
// }

function correctAnswer(actor) {
    console.log("Correct")
    filmDisplay.innerHTML = `
                   <h1>Correct!</h1>
                   <h3>It was ${actor} `
    setTimeout(() => location.reload(), 2000)
    
}

function incorrectAnswer(actor) {
    console.log("Incorrect")
    filmDisplay.innerHTML = `
                   <h1>Sorry!</h1>
                   <h3>It was ${actor} `
    setTimeout(() => location.reload(), 2000)
}



function toggleButton() {
    loadingText.classList.toggle('loading')
}

getFilmsBtn.addEventListener("click", getActor)

setTimeout(() => getActor(), 1000)

// loadingBtn.addEventListener("click", toggleButton)


