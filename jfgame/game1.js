// window.onbeforeunload = function () {
//   return "Dude, are you sure you want to leave? Think of the kittens!";
// };

const wrongAnswerIcon = document.getElementsByClassName("wrong-answer-modal");
const correctAnswerIcon = document.getElementsByClassName("correct-answer-modal");

function showWrongAnswerIcons() {
  for (let i = 0; i < wrongAnswerIcon.length; i++) {
    wrongAnswerIcon[i].style.display = "inline-block";
  }

  for (let i = 0; i < correctAnswerIcon.length; i++) {
    correctAnswerIcon[i].style.display = "none";
  }
}

function showCorrectAnswerIcons() {
  for (let i = 0; i < wrongAnswerIcon.length; i++) {
    wrongAnswerIcon[i].style.display = "none";
  }

  for (let i = 0; i < correctAnswerIcon.length; i++) {
    correctAnswerIcon[i].style.display = "inline-block";
  }
}


let game1CurrentIndex;

const game1ModalElement = document.getElementById("game1Modal");
const game1Modal = new bootstrap.Modal(game1ModalElement, {
  backdrop: "static",
  keyboard: false,
});

function openModalGame1(title, content) {
  const modalTitle = document.getElementById("game1ModalLabel");
  const modalText = document.getElementById("game1ModalText");

  // Definir o título e o conteúdo do modal
  modalTitle.textContent = title;
  modalText.textContent = content;

  // Abrir o modal
  game1Modal.show();
}

// document.addEventListener("DOMContentLoaded", function () {
startTimer(30);
const imageContainer = document.getElementById("image-container");
const difficultyLevels = ["Easy", "Medium", "Hard"];
const teams = [0, 1, 2, 3, 4];
game1CurrentIndex = 0;

for (let i = 0; i < difficultyLevels.length; i++) {
  const difficultyLevel = difficultyLevels[i];

  for (let j = 0; j < teams.length; j++) {
    const team = teams[j];
    const container = document.createElement("div");

    if (i !== 0 || j !== 0) {
      container.style.display = "none";
    }

    imageContainer.appendChild(container);

    const h3 = document.createElement("h3");
    h3.textContent = `Team ${team + 1} - ${difficultyLevel}`;
    container.appendChild(h3);

    const image = document.createElement("img");
    const country = getCountryByIndex(i * teams.length + j);
    image.src = guesses[country];
    image.classList.add("mb-3", "img-fluid");
    container.appendChild(image);

    const form = document.createElement("form");
    container.appendChild(form);

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("form-control", "mb-2", "country-input");
    input.placeholder = "Enter the country";
    form.appendChild(input);

    new Awesomplete(input, {
      list: allCountriesList,
    });

    const button = document.createElement("button");
    button.textContent = "Validate";
    button.classList.add("btn", "btn-primary", "mb-3", "mt-3", "ms-3");
    button.setAttribute("data-team", j);
    button.setAttribute("data-difficulty", i);
    form.appendChild(button);

    button.addEventListener("click", function (event) {
      event.preventDefault();
      const enteredText = input.value.trim().toLowerCase();
      const correctText = country.toLowerCase();
      const teamValue = parseInt(button.dataset.team);
      const difficultyValue = parseInt(button.dataset.difficulty);
      let pointsToAdd = 0;

      if (enteredText === correctText) {
        if (difficultyValue === 0) {
          pointsToAdd = 1;
        } else if (difficultyValue === 1) {
          pointsToAdd = 2;
        } else if (difficultyValue === 2) {
          pointsToAdd = 3;
        }

        teamPoints[teamValue] += pointsToAdd;
        atualizarScore();
        showCorrectAnswerIcons();
        openModalGame1("Correct!", "+" + pointsToAdd + " points!");
      } else {
        // let uppercaseText = correctText.toUpperCase()
        const mySentence = correctText;
        const capitalizedAnswer = mySentence.split(" ");

        for (let i = 0; i < capitalizedAnswer.length; i++) {
          capitalizedAnswer[i] =
            capitalizedAnswer[i][0].toUpperCase() +
            capitalizedAnswer[i].substr(1);
        }

        capitalizedAnswer.join(" ");
        showWrongAnswerIcons();
        openModalGame1(
          "Incorrect!",
          "Correct answer was " + capitalizedAnswer + "."
        );
      }
    });
  }
}
// });

function getCountryByIndex(index) {
  const countries = Object.keys(guesses);
  return countries[index];
}

function btnNextQuestionGame1() {
  // Hide current active container
  const currentContainer = imageContainer.children[game1CurrentIndex];
  currentContainer.style.display = "none";

  // Show next container
  game1CurrentIndex++;
  if (game1CurrentIndex < difficultyLevels.length * teams.length) {
    const nextContainer = imageContainer.children[game1CurrentIndex];
    nextContainer.style.display = "block";
    game1Modal.hide();

    startTimer(30);
    // if (game1CurrentIndex < 9) {
    //   startTimer(30);
    // } else {
    //   startTimer(30);
    // }
  } else {
    // Handle end of containers
    const nextQuestionButton = document.getElementById("goToNextQuestionBtnGame1");
    nextQuestionButton.style.display = "none";
    const nextGameButton = document.getElementById("goToGame2ModalBtn");
    nextGameButton.style.display = "block";
    openModalGame1("End of part 1!", "Let's move to part 2!");
  }
}

function showSecondGameModal() {
  game1Modal.hide();
  showSecondGame();
}