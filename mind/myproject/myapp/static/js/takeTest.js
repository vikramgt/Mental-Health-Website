function getCookie(name) {
  const cookieValue = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return cookieValue ? cookieValue.pop() : "";
}

const choiceToNumber = {
  'option0': 0,
  'option1': 1,
  'option2': 2,
  'option3': 3,
  'option4': 4,
};

const csrfToken = getCookie("csrftoken");

const quizData = [
    {
      question: "What is your age?",
      inputType: "text",
    },
    {
      question: "What is your gender?",
      choice: ["Female", "Male", "Others"],
    },
    {
      question: "Are you self-employed?",
      choice: ["No", "Yes"],
    },
    {
      question: "Do you have a family history of mental illness?",
      choice: ["No", "Yes"],
    },
    {
      question:
        " If you have a mental health condition, do you feel that it interferes with your work?",
      choice: ["Don't Know", "Never", "Often", "Rarely", "Sometimes"],
    },
    {
      question: "How many employees does your company or organization have?",
      choice: ["1-5", "100-500", "26-100", "500-1000","6-25", "1000>"],
    },
    {
      question:
        "Do you work remotely (outside of an office) at least 50% of the time?",
      choice: ["No", "Yes"],
    },
    {
      question: "Is your employer primarily a tech company/organization?",
      choice: ["No", "Yes"],
    },
    {
      question: "Does your employer provide mental health benefits?",
      choice: ["Don't Know", "No", "Yes"],
    },
    {
      question:
        "Do you know the options for mental health care your employer provides?",
      choice: ["No", "Not Sure", "Yes"],
    },
    {
      question:
        "Has your employer ever discussed mental health as part of an employee wellness program?",
      choice: ["Don't Know", "No", "Yes"],
    },
    {
      question:
        "Does your employer provide resources to learn more about mental health issues and how to seek help?",
      choice: ["Don't Know", "No", "Yes"],
    },
    {
      question:
        "Is your anonymity protected if you choose to take advantage of mental health or substance abuse treatment resources?",
      choice: ["Don't Know", "No", "Yes"],
    },
    {
      question:
        "How easy is it for you to take medical leave for a mental health condition?",
      choice: [
        "Don't Know",
        "Somewhat Difficult",
        "Somewhat Easy",
        "Very Difficult",
        "Very Easy",
      ],
    },
    {
      question:
        "Do you think that discussing a mental health issue with your employer would have negative consequences?",
      choice: ["Maybe", "No", "Yes"],
    },
    {
      question:
        ":Do you think that discussing a physical health issue with your employer would have negative consequences?",
      choice: ["Maybe", "No", "Yes"],
    },
    {
      question:
        "Would you be willing to discuss a mental health issue with your coworkers??",
      choice: ["No", "Some of them", "Yes"],
    },
    {
      question:
        "Would you be willing to discuss a mental health issue with your direct supervisor(s)?",
      choice: ["No", "Some of them", "Yes"],
    },
    {
      question:
        "Would you bring up a mental health issue with a potential employer in an interview?",
      choice: ["Maybe", "No", "Yes"],
    },
    {
      question:
        "Would you bring up a physical health issue with a potential employer in an interview?",
      choice: ["Maybe", "No", "Yes"],
    },
  
    {
      question:
        "Do you feel that your employer takes mental health as seriously as physical health?",
      choice: ["Don't Know", "No", "Yes"],
    },
    {
      question:
        "Have you heard of or observed negative consequences for coworkers with mental health conditions in your workplace?",
      choice: ["No", "Yes"],
    },
  ];
  
  const submitBtn = document.getElementById("submit");
  const answerEls = document.getElementsByName("option");
  
  function deselectAnswers() {
    const answerEls = document.querySelectorAll("input[type='radio']");
    answerEls.forEach((answerEl) => (answerEl.checked = false));
  }
  
  let currentQuestion = 0;
  loadQuiz();
  
  function loadQuiz() {
    deselectAnswers();
  
    const questionElement = document.getElementById("question");
    const formElement = document.getElementById("form");
  
    questionElement.innerText = `${currentQuestion + 1}. ${
      quizData[currentQuestion].question
    }`;
    if (currentQuestion === 0) {
      // Create a text input field for age
      const inputField = document.createElement("input");
      inputField.type = "number"; // Set the input type to number
      inputField.name = "age"; // You can set a name attribute if needed
      inputField.placeholder = "Enter your age"; // Placeholder text
      formElement.innerHTML = ""; // Clear the form content
      formElement.appendChild(inputField); // Append the input field to the form
    }
    else{
    const options = quizData[currentQuestion].choice;
    let formHTML = "";
    
    for (let i = 0; i < options.length; i++) {
      formHTML += `
        <div>
          <input type="radio" name="option"  value="${i}" id="option${i}" required>
          <label for="option${i}">${options[i]}</label>
        </div>
        <br>
      `;
    }
    formElement.innerHTML = formHTML;
    document.getElementById("option0").checked = true;
  }
  }
  
  function getSelected() {
    let answer;
    if (currentQuestion === 0){
      const ageInput = document.querySelector("input[name='age']");
      answer = parseInt(ageInput.value, 10);
    }
    else{
    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = choiceToNumber[answerEl.id];
      }
    });
    }
    return answer;
  }
  
  var answerArry = [];
  
  submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    answerArry.push(answer);
    let flag = true;
  
    if((currentQuestion+2) === quizData.length){
      const subbtn = document.getElementById("submit");
      subbtn.innerText = "Submit";
    }
  
    if (flag) {
      currentQuestion++;
  
      if (currentQuestion < quizData.length) {
        loadQuiz();
      }else if(currentQuestion === quizData.length){
        console.log(answerArry)
        $.ajax({
          url: '/my-api-endpoint/',
          method: 'POST',
          headers: {"X-CSRFToken": csrfToken,},
          data: {
            'my_array': answerArry.map(value => typeof value === 'number' ? value : parseInt(value))
          },
          success: function(response) {
            const predictions = response.predictions;
            alert("Our ML Model has reviewed your submission. "+ predictions);
            window.location.assign("/thank_you")
          },
          error: function(xhr, status, error) {
            console.log(error);
            alert(error);
          }
        });
      }
      
    }
  flag = false
    
  });

  