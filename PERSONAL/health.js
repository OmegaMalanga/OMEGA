const questions =[
{
    question : "What is the best way to stay hydrated?",
    answer: [
        {Text: "Drink water", correct: true },
        {Text: "Eat Candy", correct: false},
        {Text: "Drink Juice", correct: false },
        {Text: "Take Yorghut", correct: false },

    ]
},
{
    question : "What should you do if you have a cold?",
    answer: [
        {Text: "Go to the play ground", correct: false },
        {Text: "Go to School ", correct: false },
        {Text: "Stay home and rest", correct: true },
        {Text: "Go for shopping", correct: false },

    ] 
},
{
    question : "What is the most important thing to do after using the restroom?",
    answer: [
        {Text: "Wash your hands ", correct: true },
        {Text: "Sing a song ", correct: false },
        {Text: "Go to play ground", correct: false },
        {Text: "Eat food", correct: false },
    ]
},
{
    question : "How do you keep your teeth clean?",
    answer: [
        {Text: "Brush your teeth with  Toothbrush", correct: true },
        {Text: "Chew gum ", correct: false },
        {Text: "Eat Candy", correct: false},
        {Text: "Go for shopping", correct: false },
    ]
}
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
console.log(answerButtons.children)
const nextButton = document.getElementById("next-button");
const time1 = document.getElementById("time");

let timeleft = 60;
let timer;
let currentQuestionIndex = 0;
let score = 0;
function starttimer(){
timer = setInterval(() => {
    timeleft--;
    time1.textContent = timeleft;
    if(timeleft<=0){
        clearInterval(timer);
        showScore();
    }
}, 500);
}
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
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement ("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", (e) => {
            selectAnswer(e);
        }
        );
        
    });
}

 function resetState(){
     nextButton.classList.add("hide");
    while(answerButtons.firstChild){
         answerButtons.removeChild(answerButtons.firstChild)
    }


 }

 function selectAnswer(e){
     const selectedBtn = e.target;
     const isCorrect = selectedBtn.dataset.correct === "true" ;
     console.log(selectedBtn.dataset.correct)
     if(isCorrect){
         selectedBtn.classList.add("correct");
         score++;
        //  alert(`${score}`) 
     }else{
        // alert("Incorrect!")
        selectedBtn.classList.add("incorrect");
     }
     Array.from(answerButtons.children).forEach(button =>{
         if(button.dataset.correct === "true"){
             button.classList.add("correct");
         }
         button.style.pointerEvents = 'none';
     });
    
    // console.log(nextButton.classList)
    nextButton.classList.remove("hide")
    // console.log(nextButton.classList)


}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click",  ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        location.reload();
    }
});


startQuiz();
starttimer();
