import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchQuestionsApi } from '../services/fetchAPI';
import '../styles/Questions.css';
import { amountHits, userScore } from '../redux/actions/gameAction';

let intervalId = 0;
const initialScore = 10;
const points = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class Questions extends Component {
  state = {
    indexQuestion: 0,
    amountAssert: 0,
    arrayQuestions: [],
    arrayAnswers: [],
    isLoading: true,
    correctAnswer: '',
    correct: false,
    incorrect: false,
    enabledNextButton: false,
    enabledAnswersButton: true,
    timer: 30,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  timerDisplay = () => {
    const RESTART = 1000;
    intervalId = setInterval(() => {
      let { timer } = this.state;
      if (timer > 0) {
        this.setState({
          timer: timer -= 1,
        });
      } else {
        clearInterval(intervalId);
        this.setState({
          enabledAnswersButton: false,
        });
      }
    }, RESTART);
  };

  fetchQuestions = async () => {
    this.timerDisplay();
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const data = await fetchQuestionsApi(token);
    const NUMBER = 3;

    if (data.response_code === NUMBER) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        isLoading: false,
        arrayQuestions: data.results,
      }, this.shuffleAnswers);
    }
  };

  handleButtonOptions = ({ target }) => {
    const { amountAssert } = this.state;

    const isCorrect = target.getAttribute('data-testid').includes('correct-answer');

    if (isCorrect) {
      this.setState({
        correct: 'correct',
        incorrect: 'incorrect',
        enabledNextButton: true,
        amountAssert: amountAssert + 1,
      }, this.countScore());
    } else {
      this.setState({
        correct: 'correct',
        incorrect: 'incorrect',
        enabledNextButton: true,
      });
    }
    clearInterval(intervalId);
  };

  countScore = () => {
    const { arrayQuestions, indexQuestion, timer } = this.state;
    const { dispatch } = this.props;
    const { difficulty } = arrayQuestions[indexQuestion];
    const score = initialScore + (timer * points[difficulty]);
    dispatch(userScore(score));
  };

  shuffleAnswers = () => {
    const { arrayQuestions, indexQuestion } = this.state;
    const NUMBER = 0.5;
    const allAnswers = [...arrayQuestions[indexQuestion].incorrect_answers,
      arrayQuestions[indexQuestion].correct_answer];
    allAnswers.sort(() => Math.random() - NUMBER);
    this.setState({
      arrayAnswers: allAnswers,
      correctAnswer: arrayQuestions[indexQuestion].correct_answer,
    });
  };

  handeButtonNext = () => {
    const { indexQuestion, amountAssert } = this.state;
    const { history, dispatch } = this.props;
    const NUMBER = 4;

    this.setState({
      indexQuestion: indexQuestion + 1,
      correct: '',
      incorrect: '',
      enabledNextButton: false,
      timer: 30,
    });

    if (indexQuestion >= NUMBER) {
      dispatch(amountHits(amountAssert));
      history.push('/feedback');
    } else {
      this.fetchQuestions();
    }
  };

  render() {
    const { indexQuestion, isLoading, arrayQuestions, enabledNextButton,
      arrayAnswers, correctAnswer, correct, incorrect,
      enabledAnswersButton, timer } = this.state;
    return (
      <div>
        { isLoading && <p>Carregando...</p> }
        { !isLoading && (
          <div>
            <p>{ timer }</p>
            <p data-testid="question-category">
              {arrayQuestions[indexQuestion].category }
            </p>
            <p data-testid="question-text">{arrayQuestions[indexQuestion].question }</p>
            <div data-testid="answer-options">
              {
                arrayAnswers.map((answer, index) => (
                  <button
                    type="button"
                    disabled={ !enabledAnswersButton }
                    onClick={ this.handleButtonOptions }
                    className={ answer === correctAnswer ? `${correct}`
                      : `${incorrect}` }
                    data-testid={ answer === correctAnswer ? 'correct-answer'
                      : `wrong-answer-${index}` }
                    key={ answer }
                  >
                    {answer}
                  </button>))
              }
            </div>
          </div>) }
        {
          enabledNextButton && (
            <button
              onClick={ this.handeButtonNext }
              data-testid="btn-next"
              type="button"
            >
              Next

            </button>)
        }
      </div>
    );
  }
}

Questions.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Questions);
