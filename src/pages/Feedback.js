import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';
import { addPlayer, resetScore } from '../redux/actions/gameAction';

class Feedback extends Component {
  handleRestart = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  handleButtonRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score, name, gravatarEmail, dispatch } = this.props;
    const NUMBER = 3;

    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }

    const currentStorage = JSON.parse(localStorage.getItem('ranking'));

    const savedPlayer = {
      name,
      score,
      gravatarEmail: `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`,
      assertions,
    };

    const listPlayers = [...currentStorage, savedPlayer];
    localStorage.setItem('ranking', JSON.stringify(listPlayers));
    dispatch(addPlayer(savedPlayer));

    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        { (assertions < NUMBER)
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p> }
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleRestart }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ this.handleButtonRanking }
          type="button"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  assertions: PropTypes.number,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
