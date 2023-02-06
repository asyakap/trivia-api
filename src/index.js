import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getQuestions() {
  let request = new XMLHttpRequest();
  const url = `https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=boolean`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response);
      return response;
    } else {
      // there's a new argument
      printError(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getQuestions1() {
  let request = new XMLHttpRequest();
  const url = `https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=boolean`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      if (response.results[0].correct_answer === "True") {
        document.getElementById("showAnswers").innerText = "Correct. It's true!";
      } else {
        document.getElementById("showAnswers").innerText = "Incorrect. It's false!";
      }
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getQuestions2() {
  let request = new XMLHttpRequest();
  const url = `https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=boolean`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      if (response.results[0].correct_answer === "False") {
        document.getElementById("showAnswers").innerText = "Correct. It's false!";
      } else {
        document.getElementById("showAnswers").innerText = "Incorrect. It's true!";
      }
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, apiResponse, search) {
  document.querySelector('#showResponse').innerText = `There was an error accessing TRIVIA ${search}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(response) {
  document.querySelector('#showAnswers').innerText = "";
  document.querySelector('#showQuestion').innerText = response.results[0].question;
  document.getElementById("true").removeAttribute("class");
  document.getElementById("false").removeAttribute("class");
  let rightAnswer = response.results[0].correct_answer;
  return rightAnswer;
}

function handleFormSubmission(event) {
  event.preventDefault();
  let response = getQuestions();
  return response;
}

function getAnswer1() {
  getQuestions1();
}

function getAnswer2() {
  getQuestions2();
}


window.addEventListener("load", function () {
  document.getElementById('trivia').addEventListener("click", handleFormSubmission);
  document.getElementById('true').addEventListener("click", getAnswer1);
  document.getElementById('false').addEventListener("click", getAnswer2);
});

