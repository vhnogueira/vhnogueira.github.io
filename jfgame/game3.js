const rightColumn = document.getElementById("rightColumn");
const leftButtons = document.querySelectorAll("#leftColumn button");
const rightButtons = [...rightColumn.querySelectorAll("button")];
const arrowColors = ["red", "blue", "orange", "green", "purple"];

let leftButtonClicked = "";
let arrowsArray = [];
let teamActive;
let teamPoints = [0, 0, 0, 0, 0]; // Inicializa o array de pontos das equipes com zeros

function captureLeftButtonClick() {
  leftButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      leftButtonClicked = event.target.id;
      document.getElementById("instructions").innerText =
        "Now select a country name on the right column.";
      // Remove active class from all #leftColumn button elements except the clicked element
      for (const button of leftButtons) {
        if (button !== event.target) {
          button.classList.remove("active");
        }
      }
      // Add an active class to the clicked element
      event.target.classList.add("active");
    });
  });
}

function captureRightButtonClick() {
  // Get all the buttons in the right column
  const rightButtons = Array.from(
    document.querySelectorAll("#rightColumn button")
  );

  // Attach a click event listener to each button
  rightButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // Check if a button in the left column was clicked before clicking a button in the right column
      if (leftButtonClicked === "") {
        return false;
      }

      // Clear the data-user-answer attribute of other buttons in the right column with the same value as the left button clicked
      for (let i = 1; i < rightButtons.length; i++) {
        const userAnswer = rightButtons[i].getAttribute("data-user-answer");
        if (userAnswer === leftButtonClicked) {
          rightButtons[i].setAttribute("data-user-answer", "");
        }
      }

      // Hide the previous LeaderLine if the button already has a data-user-answer attribute
      let previousAnswer = event.target.getAttribute("data-user-answer");
      if (previousAnswer && typeof previousAnswer !== "object") {
        arrowsArray[previousAnswer].hide();
      }

      // Create a new LeaderLine and set the data-user-answer attribute to the left button clicked
      const rightButtonClicked = event.target.id;
      if (arrowsArray[leftButtonClicked]) {
        // arrowsArray[leftButtonClicked].remove();
        arrowsArray[leftButtonClicked].hide();
      }
      arrowsArray[leftButtonClicked] = new LeaderLine(
        document.getElementById(leftButtonClicked),
        document.getElementById(rightButtonClicked),
        { hide: true, color: arrowColors[leftButtonClicked] }
      );
      arrowsArray[leftButtonClicked].show();
      event.target.setAttribute("data-user-answer", leftButtonClicked);

      // Remove the active class from the left button clicked
      document.getElementById(leftButtonClicked).classList.remove("active");
      leftButtonClicked = "";

      // Check if all buttons in the right column have a data-user-answer attribute
      for (const button of rightButtons) {
        if (!button.getAttribute("data-user-answer")) {
          // If not all buttons have been answered, set the instructions text and return
          document.getElementById("instructions").innerText =
            "Let's continue! Select another flag on the left column.";
          return false;
        }
      }

      // If all buttons have been answered, set the instructions text
      document.getElementById("instructions").innerText =
        "All items are filled! If you don't want to change anything, press the End Game button!";
    });
  });
}

function shuffleButtons(buttons) {
  // temporarily disabled
  // for (let i = buttons.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
  // }
  // return buttons;
}

function renderRightColumn() {
  // Função para embaralhar um array usando o algoritmo Fisher-Yates
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Selecionar todas as divs com a classe "team-inside"
  const teamInsideDivs = document.querySelectorAll(".team-inside");

  // Embaralhar os elementos dentro de cada div
  teamInsideDivs.forEach((div) => {
    const elements = Array.from(div.children);
    shuffleArray(elements);
    elements.forEach((element) => {
      div.appendChild(element);
    });
  });

  rightColumn.style.display = "block";
  // shuffleButtons(rightButtons).forEach((button, index) => {
  //   rightColumn.insertBefore(button, rightColumn.childNodes[index]);
  // });
}

captureLeftButtonClick();
captureRightButtonClick();
renderRightColumn();

function atualizarScore() {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`team-${i}-score`).textContent = teamPoints[i - 1];
  }
}

function endGameValidator() {
  const instructions = document.getElementById("instructions");
  const rightButtons = Array.from(
    document.querySelectorAll("#rightColumn button")
  );
  let totalAnswers = 0;
  let correctAnswers = 0;
  let uniqueAnswers = new Set();

  // Step 1: Check if all #rightColumn button elements have a data-user-answer set.
  // for (const button of rightButtons) {
  //   if (
  //     !button.hasAttribute("data-user-answer") ||
  //     button.getAttribute("data-user-answer") == ""
  //   ) {
  //     instructions.innerText = "There are empty answers.";
  //     return false;
  //   }
  //   totalAnswers++;
  // }

  // Step 2: Check if all data-user-answer values are unique.
  // for (const button of rightButtons) {
  //   const userAnswer = button.getAttribute("data-user-answer");
  //   uniqueAnswers.add(userAnswer);
  // }
  // if (uniqueAnswers.size !== rightButtons.length) {
  //   instructions.innerText = "Please, select unique values for each answer.";
  //   return false;
  // }

  // Step 3: If step 1 and 2 are ok, check how many data-user-answer are equal for data-correct-answer on each element.
  for (const button of rightButtons) {
    const userAnswer = button.getAttribute("data-user-answer");
    const correctAnswer = button.getAttribute("data-correct-answer");
    if (userAnswer === correctAnswer) {
      correctAnswers++;
    }
  }

  // Step 4: Display a message on p#instructions and return true.

  // instructions.innerHTML = `Congratulations! You've got <strong>${correctAnswers} out of ${totalAnswers}</strong>. To restart the game, please refresh the page.`;
  instructions.innerHTML = `Congratulations! You've got <strong>${correctAnswers}</strong> correct answers. Change to the next team on the top.`;
  if (teamActive >= 1 && teamActive <= 5) {
    // Verificar o valor de teamActive e adicionar correctAnswers aos pontos correspondentes
    if (teamActive >= 1 && teamActive <= 5) {
      teamPoints[teamActive - 1] += correctAnswers;
    }

    // Atualizar o score de cada equipe com base nos valores de teamPoints
    atualizarScore();
  }
  return true;
}

// Ativar botões de equipe + configurar equipe ativa

function teamButtonTrigger() {
  var teamButtons = document.querySelectorAll(".team-buttons");

  for (var i = 0; i < teamButtons.length; i++) {
    teamButtons[i].addEventListener("click", function () {
      var clickedButton = this;
      var activeButtons = document.querySelectorAll(".team-buttons.active");

      for (var j = 0; j < activeButtons.length; j++) {
        if (activeButtons[j] !== clickedButton) {
          activeButtons[j].classList.remove("active");
        }
      }

      clickedButton.classList.add("active");
      resetGame3();
      teamActive = Array.from(teamButtons).indexOf(clickedButton) + 1;
      console.log("teamActive:", teamActive);
      displayButtonsFromTeam();
      startTimer();
    });
  }
}

function hideAllArrows() {
  for (const key in arrowsArray) {
    if (arrowsArray.hasOwnProperty(key)) {
      arrowsArray[key].hide();
    }
  }
}

function resetRoundButton() {
  var activeButtons = document.querySelectorAll(".team-buttons.active");

  for (var j = 0; j < activeButtons.length; j++) {
      activeButtons[j].classList.remove("active");
  }
  resetGame3();
  startTimer();
}

function resetGame3() {
  // Remover os atributos data-user-answer de todos os botões
  const leftButtons = document.querySelectorAll("#leftColumn button");
  const rightButtons = document.querySelectorAll("#rightColumn button");

  leftButtons.forEach((button) => {
    button.classList.remove("active");
    button.style.display = "none";
  });
  
  rightButtons.forEach((button) => {
    button.removeAttribute("data-user-answer");
    button.style.display = "none";
  });

  // Ocultar todos os elementos da variável arrowsArray
  hideAllArrows();
  document.getElementById("instructions").innerText =
    "Start selecting a flag on the left column.";
  leftButtonClicked = "";
}

function displayButtonsFromTeam() {
  // Ocultar todos os botões inicialmente
  leftButtons.forEach((button) => {
    button.style.display = "none";
  });
  rightButtons.forEach((button) => {
    button.style.display = "none";
  });

  // Determinar o intervalo dos botões a serem mostrados com base em teamActive
  let start = (teamActive - 1) * 5;
  let end = teamActive * 5;

  // Mostrar os botões dentro do intervalo determinado
  for (let i = start; i < end; i++) {
    leftButtons[i].style.display = "block";
    rightButtons[i].style.display = "block";
  }
}

// Get the timer element
const timerElement = document.getElementById("timer");

// Get the button element
const startTimerButton = document.getElementById("start-timer");

// Variable to track if the timer is currently running
let timerInterval;
let timeRemaining = 59; // Initial time remaining in seconds

// Function to update the timer element with the remaining time
function updateTimer() {
  timerElement.textContent = "Timer: " + timeRemaining + "s";
}

// Function to start or restart the timer
function startTimer(time = 60) {
  timeRemaining = time - 1;
  timerElement.textContent = "Timer: " + time + "s";

  if (timerInterval) {
    // Timer is already running, reset it
    clearInterval(timerInterval);
    timeRemaining = time - 1;
  }

  // Start the timer by updating it every second
  timerInterval = setInterval(() => {
    updateTimer();

    if (timeRemaining <= 0) {
      // Time is up, clear the interval
      clearInterval(timerInterval);
      timerElement.textContent = "Time Up!";
    } else {
      // Decrease the remaining time by 1 second
      timeRemaining--;
    }
  }, 1000);
}

// Add a click event listener to the start timer button
// startTimerButton.addEventListener('click', startTimer);

teamButtonTrigger();
displayButtonsFromTeam();



function findTeamsWithMaxPoints(teamPoints) {
  const maxPoints = Math.max(...teamPoints);
  const teamsWithMaxPoints = [];

  for (let i = 0; i < teamPoints.length; i++) {
    if (teamPoints[i] === maxPoints) {
      teamsWithMaxPoints.push(i + 1);
    }
  }

  return teamsWithMaxPoints;
}

function finishGame() {
  const teamsWithMaxPoints = findTeamsWithMaxPoints(teamPoints);

  if (teamsWithMaxPoints.length === 1) {
    // Apenas uma equipe tem a pontuação máxima, essa é a vencedora
    const winningTeam = teamsWithMaxPoints[0];
    alert("Game is finished! Winner is Team " + winningTeam);
  } else {
    // Mais de uma equipe tem a pontuação máxima, é um empate
    const teamsString = teamsWithMaxPoints.join(", ");
    alert("Game is finished! It's a tie between Teams " + teamsString);
  }
}

function showFirstGame() {
  if (game1CurrentIndex < 9) {
    startTimer(30);
  } else {
    startTimer(60);
  }
  // Hide the element with id "game-1"
  const game1Element = document.getElementById("game-1");
  game1Element.style.display = "block";

  // Show the element with id "game-2"
  const game2Element = document.getElementById("game-2");
  game2Element.style.display = "none";

  // Show the element with id "game-3"
  const game3Element = document.getElementById("game-3");
  game3Element.style.display = "none";
}
function showSecondGame() {
  resetGame3();
  startTimer(30);

  // Hide the element with id "game-1"
  const game1Element = document.getElementById("game-1");
  game1Element.style.display = "none";

  // Show the element with id "game-2"
  const game2Element = document.getElementById("game-2");
  game2Element.style.display = "block";

  // Show the element with id "game-3"
  const game3Element = document.getElementById("game-3");
  game3Element.style.display = "none";

  // Hide the end game button
  const endGameButton = document.getElementById("endGameButton");
  endGameButton.style.display = "none";

  const buttons = document.querySelectorAll("button.team-buttons");
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.remove("active");
  });
}
function showThirdGame() {
  const buttons = document.querySelectorAll("button.team-buttons");
  buttons.forEach((button) => {
    button.disabled = false;
  });
  startTimer(0);
  // Hide the element with id "game-1"
  const game1Element = document.getElementById("game-1");
  game1Element.style.display = "none";

  // Show the element with id "game-2"
  const game2Element = document.getElementById("game-2");
  game2Element.style.display = "none";

  // Show the element with id "game-3"
  const game3Element = document.getElementById("game-3");
  game3Element.style.display = "block";

  // Show the end game button
  const endGameButton = document.getElementById("endGameButton");
  endGameButton.style.display = "block";
}