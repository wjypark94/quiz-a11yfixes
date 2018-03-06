const questionSet = [
  {
    number: 1,
    text: `Who won the NBA championship in the 2016-2017 season?`,
    ans1: `Cleveland Cavaliers`,
    ans2: `Boston Celtics`,
    ans3: `Golden State Warriors`,
    ans4: `Los Angeles Lakers`
  },
  
  {
    number: 2,
    text: `Who won the MVP award in the 2017 season?`,
    ans1: `Lebron James`,
    ans2: `Stephen Curry`,
    ans3: `James Harden`,
    ans4: `Russell Westbrook`
  },
  
  {
    number: 3,
    text: `Who won the Defensive Player of the Year award in the 2017 season?`,
    ans1: `Kawhi Leonard`,
    ans2: `Lebron James`,
    ans3: `Draymond Green`,
    ans4: `Giannis Antetokounmpo`
  },
  
  {
    number: 4,
    text: `Who is currently the oldest active player in the NBA at 41 years old?`,
    ans1: `Dirk Nowitzki`,
    ans2: `Jason Terry`,
    ans3: `Vince Carter`,
    ans4: `Manu Ginobili`
  },
  
  {
    number: 5,
    text: `Which NBA franchise has won the most championships with 17 NBA finals wins?`,
    ans1: `Chicago Bulls`,
    ans2: `Boston Celtics`,
    ans3: `Los Angeles Lakers`,
    ans4: `San Antonio Spurs`
  },
  
  {
    number: 6,
    text: `Which player is the all time leading scorer in NBA history with 38,387 points?`,
    ans1: `Kareem Abduhl Jabaar`,
    ans2: `Michael Jordan`,
    ans3: `Kobe Bryant`,
    ans4: `Lebron James`
  },
  
  {
    number: 7,
    text:`Which player is the all time leading rebounder in NBA history with 23,924 rebounds?`,
    ans1: `Wilt Chamberlain`,
    ans2: `Bill Russell`,
    ans3: `Shaquille Oneal`,
    ans4: `Tim Duncan`
  },
  
  {
    number: 8,
    text: `Which NBA player is the all time leader in assists with 15,806 assists?`,
    ans1: `Magic Johnson`,
    ans2: `Michael Jordan`,
    ans3: `John Stockton`,
    ans4: `Steve Nash`
  },
  
  {
    number: 9,
    text: `Which player has won the most championships in NBA history?`,
    ans1: `Kobe Bryant`,
    ans2: `Michael Jordan`,
    ans3: `Bill Russell`,
    ans4: `Magic Johnson`
  },
  
  {
    number: 10,
    text: `Who is the best NBA player of all time?`,
    ans1: `Kobe Bryant`,
    ans2: `Magic Johnson`,
    ans3: `Lebron James`,
    ans4: `Michael Jordan`
  }
];

const ANSWERS = [
  `Golden State Warriors`,
  `Russell Westbrook`,
  `Draymond Green`,
  `Vince Carter`,
  `Boston Celtics`,
  `Kareem Abduhl Jabaar`,
  `Wilt Chamberlain`,
  `John Stockton`,
  `Bill Russell`,
  `Michael Jordan`
];

let questionNum = 1;
let correctAnswers = 0;
//handleStartButton targets the js-start-button class and on click we trigger an event and call the nextQuestion function

//will increment questionNum by 1 everytime its invoked
function iterateQuestion(){
  questionNum++;
}

//will increment correctanswers by 1 every time its invoked
function iterateCorrectAnswers(){
  correctAnswers++;
}

function handleStartButton() {
  $('#js-start-button').click(function(event){
    nextQuestion();
  });
}

function nextQuestion() {
  const question = questionSet[questionNum-1];
  const questionsAnswered = questionNum - 1;
  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
   <section id="question-page" role="main">
   <h2 id="question">${question.text}</h2>
   
   <form>
     <fieldset>
     <legend>
       <label for="${question.ans1}"> ${question.ans1} </label>
         <input id="${question.ans1}"class="answer" type="radio" name="option"> 
       <br>
       <label for="${question.ans2}"> ${question.ans2} </label>
         <input id="${question.ans2}" class="answer" type="radio" name="option"> 
       <br>
        <label for="${question.ans3}"> ${question.ans3} </label>
         <input id="${question.ans3}" class="answer" type="radio" name="option"> 
       <br>
        <label for="${question.ans4}"> ${question.ans4} </label>
         <input id="${question.ans4}" class="answer" type="radio" name="option"> 
    </legend>
    </fieldset>
     <br>
     <button id="js-submit-button">Submit</button>
   </form>
   <br>
   <div id="status-bar">
     <span id="question-count">Question: ${question.number}/10</span>
     
     <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
   `;
}

//function that checks the answer

function checkUserAnswer(answer) {
  if (answer === ANSWERS[questionNum -1]) {
    return true;
  } else {
    return false;
  }
}

//function that generates when you correct
function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Correct!</h2>
    <img src="https://media.giphy.com/media/3oKIPo1a5JJPpSq9pu/giphy.gif" role="presentation">
    <button id="js-next-button">Next</button>
  </section>
`;

//function that generates when youre incorrect  

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate
     (questionNum));
}

//the template that shows when you click incorrect answer

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Nope! It was ${ANSWERS[questionNum-1]}!</h2>
      <img src="https://media.giphy.com/media/hC9YKQgNSkrF6/giphy.gif" role="none">
      <button id="js-next-button">Next</button>
    </section>
  `;
}


//second main function
function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', 
    function(event) {
      event.preventDefault()
      const answer = $('input:checked').attr('id');
      const userIsCorrect = checkUserAnswer(answer);
      if(userIsCorrect){
        generateCorrectFeedback();
      } else {
        generateIncorrectFeedback();
      }
    });
}

//3rd main function, if question is at 10 show results page, else invoke next button function
function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event){
    if(questionNum === 10){
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
    }
  });
}

function nextQuestion() {
  const question = questionSet[questionNum - 1];
  const questionsAnswered = questionNum-1;
  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Play Again?</button>
    </section>
  `);
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}



handleStartButton();
handleSubmitButton();
handleNextButton();
handleRestartButton();
  
  
  
  