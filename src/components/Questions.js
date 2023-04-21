import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchQuestionsApi } from '../services/fetchAPI';
import '../styles/Questions.css';

class Questions extends Component {
  state = {
    // isCorrect: false,
    indexQuestion: 0,
    arrayQuestions: [],
    arrayAnswers: [],
    isLoading: true,
    correctAnswer: '',
    correct: false,
    incorrect: false,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
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

  handleButtonOptions = () => {
    // const { answerResponse } = this.state;
    this.setState({
      correct: 'correct',
      incorrect: 'incorrect',
    });
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

  render() {
    const { indexQuestion, isLoading, arrayQuestions,
      arrayAnswers, correctAnswer, correct, incorrect } = this.state;
    return (
      <div>
        {/* { (isLoading) ? <p>Carregando...</p>
          : <p>{arrayQuestions[indexQuestion].question }</p> } */}

        { isLoading && <p>Carregando...</p> }
        { !isLoading && (
          <div>
            <p data-testid="question-category">
              {arrayQuestions[indexQuestion].category }
            </p>
            <p data-testid="question-text">{arrayQuestions[indexQuestion].question }</p>
            <div data-testid="answer-options">
              {
                arrayAnswers.map((answer, index) => (
                  <button
                    type="button"
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
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Questions;
