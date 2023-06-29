let game1CurrentIndex;

document.addEventListener("DOMContentLoaded", function () {
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

      const button = document.createElement("button");
      button.textContent = "Validate";
      button.classList.add("btn", "btn-primary", "mb-3");
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
          alert("Correct! +" + pointsToAdd + " points!");
        } else {
          alert("Incorrect!");
        }
        if (game1CurrentIndex < 9) {
          startTimer(30);
        } else {
          startTimer(60);
        }
        // Hide current container
        container.style.display = "none";

        // Show next container
        game1CurrentIndex++;
        if (game1CurrentIndex < difficultyLevels.length * teams.length) {
          const nextContainer = imageContainer.children[game1CurrentIndex];
          nextContainer.style.display = "block";
        } else {
          // Handle end of containers
          alert("End of Game 2! Let's move to game 3");
        }
      });
    }
  }
});

function getCountryByIndex(index) {
  const countries = Object.keys(guesses);
  return countries[index];
}
