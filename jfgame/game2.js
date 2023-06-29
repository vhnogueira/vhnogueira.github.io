document.addEventListener("DOMContentLoaded", function () {
  const questionContainer = document.getElementById("question-container");
  const questions = [
    {
      team: 1,
      question:
        "Which social media platform is particularly popular among users in India?",
      answers: ["a) Facebook", "b) Instagram", "c) Whatsapp", "d) Snapchat"],
      correctAnswer: 0,
    },
    {
      team: 2,
      question:
        "Which European language is the most commonly used in website localization for targeting European audiences?",
      answers: ["a) German", "b) French", "c) English", "d) Spanish"],
      correctAnswer: 2,
    },
    {
      team: 3,
      question:
        "Which social media platform is commonly used for influencer marketing in the Middle East?",
      answers: ["a) Snapchat", "b) Instagram", "c) TikTok", "d) LinkedIn"],
      correctAnswer: 1,
    },
    {
      team: 4,
      question:
        "Which country in Latin America has the highest internet penetration rate, making it a promising market for B2B companies?",
      answers: ["a) Brazil", "b) Mexico", "c) Argentina", "d) Colombia"],
      correctAnswer: 2,
    },
    {
      team: 5,
      question:
        "Which online advertising platform is commonly used by B2B companies in Asia to reach their target audience?",
      answers: [
        "a) Google Ads",
        "b) Facebook Ads",
        "c) Baidu Ads",
        "d) Line Ads",
      ],
      correctAnswer: 2,
    },
  ];

  let currentQuestionIndex = 0;

  function createQuestionElement(question, answers) {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionTextElement = document.createElement("p");
    questionTextElement.textContent = question;
    questionElement.appendChild(questionTextElement);

    answers.forEach((answer, index) => {
      const answerButton = document.createElement("button");
      answerButton.classList.add(
        "me-2",
        "mb-2",
        "btn",
        "btn-dark",
        "d-block"
      );
      answerButton.textContent = answer;
      answerButton.addEventListener("click", function () {
        handleAnswerClick(index);
      });
      questionElement.appendChild(answerButton);
    });

    return questionElement;
  }

  function handleAnswerClick(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswer;

    if (selectedIndex === correctAnswerIndex) {
      teamPoints[currentQuestion.team - 1]++;
      alert("Correct answer!");
      // Increment the current question index
      atualizarScore();
    } else {
      alert(
        "Wrong answer! Correct answer is " +
          currentQuestion.answers[correctAnswerIndex]
      );
      renderQuestion(currentQuestionIndex);
    }
    currentQuestionIndex++;

    // Check if there are more questions
    // Find all teams with the maximum score

    // ...

    if (currentQuestionIndex < questions.length) {
      renderQuestion(currentQuestionIndex);
      startTimer(30);
    } else {
      alert("All questions done! Let's move to the 2nd part of the game!");
    }
  }

  function renderQuestion(questionIndex) {
    questionContainer.innerHTML = "";
    const question = questions[questionIndex];
    const questionElement = createQuestionElement(
      question.question,
      question.answers
    );
    questionContainer.appendChild(questionElement);
  }

  // Inicia com a primeira pergunta
  renderQuestion(currentQuestionIndex);
});
