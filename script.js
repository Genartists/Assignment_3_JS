//login popup
const loginButton = document.getElementById('loginButton');
const popupModal = document.getElementById("modal");

// login button click event check if it's the right button to prevent errors
if (loginButton) {
    loginButton.addEventListener('click', (event) => {
        console.log('Button clicked');
        popupModal.style.display = 'block';
        loginButton.style.display = 'none';
    });
}
//close the popup when clicking outside the modal
window.onclick = function(event) {
    if (event.target === popupModal) {
        popupModal.style.display = "none";
        loginButton.style.display = 'block';
    }
}

//quizzes interaction
// array of objects containing the questions, options, and correct answers
const quizData = [
    {
        question: 'Who directed the movie “Inception”?',
        options: ['Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Martin Scorsese'],
        answer: 'Christopher Nolan'
    },
    {
        question: 'Which movie won the Academy Award for Best Picture in 2019?',
        options: ['Joker', '1917', 'Green Book', 'Once Upon a Time in Hollywood'],
        answer: 'Green Book'
    },
    {
        question: 'Who is the youngest person to win a competitive Oscar?',
        options: ['Anna Paquin', 'Tatum O’Neal', 'Haley Joel Osment', 'Shirley Temple'],
        answer: 'Tatum O’Neal'
    },
    {
        question: 'Which actor has been nominated for an Oscar the most times without ever winning?',
        options: ['Peter O’Toole', 'Richard Burton', 'Glenn Close', 'Amy Adams'],
        answer: 'Peter O’Toole'
    },
    {
        question: 'What was the first animated film to be nominated for Best Picture at the Oscars?',
        options: ['The Lion King', 'Toy Story', 'Beauty and the Beast', 'Shrek'],
        answer: 'Beauty and the Beast'
    },
]

const answerButtons = document.getElementById('answer-button');
const nextButton = document.getElementById('next-button');
const questionElement = document.getElementById('question');
const buttonContainer = document.getElementById('button-container');
const startButton = document.getElementById('start-quiz');
const progressBar = document.getElementById('progress-bar');

//start quiz button
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    document.getElementById('container').style.display = 'block';
});

let currentQuestionIndex = 0;
let score = 0;

//function to show the questions and answers inside the container
function showQuestion() {
    let CurrentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = CurrentQuestion.question;

    // Hide the next button until an answer is selected
    nextButton.style.opacity = '0';
    nextButton.style.transition = 'all 0.2s';

    // Show the empty state of the progress bar
    progressBar.style.width = `${(currentQuestionIndex) / quizData.length * 100}%`;
    progressBar.innerText = currentQuestionIndex;

    // Show the options for the current question
    buttonContainer.innerHTML = '';
    CurrentQuestion.options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('button');
        button.addEventListener('click', () => {
            // if click on the correct answer, add 1 to the score and add the correct class to the button represented as green
            if (option === CurrentQuestion.answer) {
                score++;
                button.classList.add('correct');
                button.classList.add('no-hover');
            }
            // if click on the incorrect answer add the correct class to the correct answer represented as red and add shaky animation
            else {
                button.classList.add('incorrect');
                button.classList.add('no-hover');
                button.classList.add('shaking');

                // Loop through all buttons and add 'correct' class to the correct answer
                Array.from(buttonContainer.children).forEach((childButton) => {
                    if (childButton.innerText === CurrentQuestion.answer) {
                        childButton.classList.add('correct');
                        childButton.classList.add('no-hover');
                    }
                    //Prevent user from clicking on other buttons after selecting a wrong answer
                    childButton.disabled = true;
                    childButton.classList.add('no-hover');
                });
            }
            // Show next button only after an answer is selected
            nextButton.style.opacity = '1';
            // Show the progress bar with the current question number
            progressBar.style.width = `${(currentQuestionIndex + 1) / quizData.length * 100}%`;
            progressBar.innerText = currentQuestionIndex + 1;

        });
        // Append the answer to the button container
        buttonContainer.appendChild(button);
    });
}
showQuestion();

//click event to show next question

nextButton.addEventListener('click', () => {
    // if the current question is not the last question, show the next question,
    if (currentQuestionIndex <= quizData.length - 2) {
        currentQuestionIndex++;
        showQuestion();
        document.getElementById('container').classList.add('slide');
        setTimeout(() => {
            document.getElementById('container').classList.remove('slide');
        }, 500);
    }
    // if the last question is reached, call showresult function to show the result
    else {
        document.getElementById('result').innerText = `You scored ${score} out of ${quizData.length}`;
        showResult(true);
    }
});

//function to show result after the last question
function showResult(show) {
    const resultContainer = document.getElementById('result-container');
    // if show is true, hide the answer buttons and show the result container
    if (show) {
        answerButtons.style.display = 'none';
        nextButton.style.display = 'none';
        resultContainer.style.display = 'block';
        progressBar.style.display = 'none';
    }
    // if show is false, hide the result container and show the answer buttons
    else {
        answerButtons.style.display = 'block';
        nextButton.style.display = 'block';
        resultContainer.style.display = 'none';
        progressBar.style.display = 'block';
    }
}
//click event to restart the progress bar and come back to the first question
document.getElementById('restart').addEventListener('click', () => {
    showResult(false);
    currentQuestionIndex = 0;
    showQuestion();
    score = 0;
    progressBar.style.width = '0';
});




