import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { addPlayer } from '../redux/actions/gameAction';

class Feedback extends Component {
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
    const lisPlayersOrder = listPlayers.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(lisPlayersOrder));
    dispatch(addPlayer(savedPlayer));

    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        { (assertions < NUMBER)
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p> }

        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
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
