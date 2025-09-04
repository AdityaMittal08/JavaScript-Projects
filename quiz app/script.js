const startPage = document.querySelector(".start-page");
const startButton = document.querySelector(".start-button");
const body = document.body;

const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false},
      { text: "Blue Whale", correct: true},
      { text: "Elephant", correct: false},
      { text: "Giraffe", correct: false},
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false},
      { text: "Gobi", correct: false},
      { text: "Sahara", correct: false},
      { text: "Antartica", correct: true},
    ]
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false},
      { text: "Australia", correct: true},
      { text: "Arctic", correct: false},
      { text: "Africa", correct: false},
    ]
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true},
      { text: "Bhutan", correct: false},
      { text: "Nepal", correct: false},
      { text: "Shri Lanka", correct: false},
    ]
  },
];

let currentQuestionIndex = 0;
let score = 0;
let questionElement, answerButtons, nextButton, counter;

startButton.addEventListener('click', ()=>{

  startPage.remove();

  const newContent =
  `<div class="app">
      <h1>Simple Quiz</h1>
      <h4 id="counter"></h4>
      <div class="quiz">
        <h2 id="question">Question goes here</h2>
        <div id="answer-buttons">
          <button class="btn">Answer 1</button>
          <button class="btn">Answer 2</button>
          <button class="btn">Answer 3</button>
          <button class="btn">Answer 4</button>
        </div>
        <button id="next-btn">Next</button>
      </div>
    </div>
    `;

    body.innerHTML = newContent;

    questionElement = document.getElementById("question");
    answerButtons = document.getElementById("answer-buttons");
    nextButton = document.getElementById("next-btn");
    counter = document.getElementById("counter");

    nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }else{
      startQuiz();
    }
  });

  startQuiz();
});


function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  counter.innerHTML = `${questionNo}/${questions.length}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "None";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "Block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  counter.style.display = "none";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}
