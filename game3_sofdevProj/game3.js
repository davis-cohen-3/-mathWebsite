question = document.querySelector('#question');
choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is 2*2",
        choice1: '2',
        choice2: '4',
        choice3: '20',
        choice4: '16',
        answer: 2,
    },
    {
        question: "What is 40+40",
        choice1: '40',
        choice2: '82',
        choice3: '80',
        choice4: '0',
        answer: 3,
    },
    {
        question: "What is 2^2",
        choice1: '2',
        choice2: '4',
        choice3: '200',
        choice4: '16',
        answer: 2,
    },
    {
        question: "What is 2*20 + 2",
        choice1: '2',
        choice2: '40',
        choice3: '44',
        choice4: '42',
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

//on load game start
startGame = () => {
     questionCounter = 0
     score = 0
     availableQuestions = [...questions]
     getNewQuestion() 
}

getNewQuestion = () => {
    //score
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    // progress bar
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width  = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionsIndex = Math.floor(Math.random() = availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

var timer = document.getElementById('time');
var timerID = setInterval(countDown, 1000);
var current_time = 6 * 60;
var min;
var sec;

function countDown(){
    if (current_time <= 0)
        {
            alert('Game Over');
        }
    else
        {
            min = Math.floor(current_time / 60);
            sec = current_time % 60;
            timer.innerHTML = min + ':' + sec;
            current_time--;
        }
}

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


