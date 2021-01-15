const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk");

let rawdata = fs.readFileSync("data-en_us.json");
let story = JSON.parse(rawdata);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const findQuestionByID = (storyId) => {
  return story.stories.find((element) => element.id === storyId);
};

const findAnswerByID = (question, id) => {
  return question.answers.find((element) => element.id === Number(id));
};

rl.question(chalk.yellow(story.prologue.text), function (answer) {
  console.log(chalk.yellow(story.prologue.answer), chalk.blue(answer));

  const question = findQuestionByID(1);
  console.log(chalk.magenta(question.text));

  const answerText = question.answers.map((answer) => {
    return `${answer.id}) ${answer.text}`;
  });

  /*
  // -----
  while (terminalasiFeltetel) {

  }
  // -----
  */

  rl.question(
    chalk.yellow(question.question) + " " + chalk.green(answerText.join(" ")),
    function (answer) {
      // answer: 1 or 2
      const answerObj = findAnswerByID(question, answer);
      const questionObj = findQuestionByID(answerObj.nextStoryId);
      console.log(chalk.magenta(questionObj.text));

      const answerText2 = questionObj.answers.map((answer) => {
        return `${answer.id}) ${answer.text}`;
      });
      rl.question(
        chalk.yellow(questionObj.question) +
          " " +
          chalk.green(answerText2.join(" ")),
        function (answer) {
          // answer: 1 or 2
          const answerObj2 = findAnswerByID(questionObj, answer);
          const questionObj2 = findQuestionByID(answerObj2.nextStoryId);
          console.log(chalk.magenta(questionObj2.text));
          console.log(chalk.yellow(story.epilogue.text));
          rl.close();
        }
      );
    }
  );
});
