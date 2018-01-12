import React, { Component } from "react";
import QuizOptions from "./QuizOptions";
import classNames from "classnames";

class Quiz extends Component {
  constructor(props) {
    super(props);

    let riddle = this.playGame();
    let correct = false;
    let gameOver = false;
    this.state = {
      riddle,
      correct,
      gameOver
    };

    this.renderOptions = this.renderOptions.bind(this);
    this.checkResults = this.checkResults.bind(this);
    this.play = this.play.bind(this);
  }
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generateRandomOptions(sum) {
    let resultsArray = [];
    let randomNumberArray = [];

    while (randomNumberArray.length < 3) {
      let randomNumber = this.randomNumber(1, 19);
      if (randomNumberArray.indexOf(randomNumber) > -1) continue;
      randomNumberArray.push(randomNumber);
    }

    for (let i = 0; i < 3; i++) {
      // it's just to decide whether to add or subtract
      let addSubtract = this.randomNumber(0, 1);
      if (addSubtract === 1) {
        // add the number to the result
        sum += randomNumberArray[i];
      } else {
        // subtract the number from the result
        sum -= randomNumberArray[i];
      }
      resultsArray.push(sum);
    }
    return resultsArray;
  }
  playGame() {
    let field1 = this.randomNumber(1, 100);
    let field2 = this.randomNumber(1, 100);
    let answer = field1 + field2;
    let resultsArray = this.generateRandomOptions(answer);
    resultsArray.push(answer);
    resultsArray.sort(() => 0.5 - Math.random());
    let riddle = {
      resultsArray,
      field1,
      field2,
      answer
    };
    if (this.state && this.state.gameOver) {
      this.setState({ riddle });
    } else {
      return riddle;
    }
  }
  checkResults(selectAnswer) {
    if (this.state.riddle.answer === selectAnswer) {
      this.setState({ correct: true, gameOver: true });
    } else {
      this.setState({ correct: false, gameOver: true });
    }
  }
  renderOptions() {
    return (
      <div className="options">
        {this.state.riddle.resultsArray.map((option, i) => (
          <QuizOptions
            key={i}
            option={option}
            checkResults={this.checkResults}
          />
        ))}
      </div>
    );
  }
  renderMessage() {
    if (this.state.correct) {
      return "Good Job! Hit the button below to Play Again!";
    } else {
      return "ohhh ohhh! Hit the button below to Play Again!";
    }
  }
  play() {
    this.setState({ correct: false, gameOver: false });
    this.playGame();
  }
  render() {
    return (
      <div className="quiz">
        <div className="quiz-content">
          <p className="question">
            What is the sum of{" "}
            <span className="text-info">{this.state.riddle.field1}</span> and{" "}
            <span className="text-info">{this.state.riddle.field2}</span>?
          </p>
          {this.renderOptions()}
        </div>
        <div
          className={classNames(
            "after",
            { hide: !this.state.gameOver },
            { "wrong animated zoomInDown": !this.state.correct },
            { "correct animated zoomInDown": this.state.correct }
          )}
        >
          <h4>{this.renderMessage()}</h4>
        </div>
        <div className="play-again">
          <a className="button" onClick={this.play}>
            Play Again
          </a>
        </div>
      </div>
    );
  }
}

export default Quiz;
