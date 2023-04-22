import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions/gameAction';

class Ranking extends Component {
  state = {
    listPlayers: [],
  };

  componentDidMount() {
    const getLocalStorage = JSON.parse(localStorage.getItem('ranking'));
    const listPlayers = getLocalStorage.sort((a, b) => b.score - a.score);
    this.setState({ listPlayers });
  }

  handleButtonHome = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const { listPlayers } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        { listPlayers.length > 0 && listPlayers
          .map((player, index) => (
            <div key={ index }>
              <img
                alt="Avatar do usuário"
                src={ player.gravatarEmail }
              />
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            </div>
          ))}
        <button
          onClick={ this.handleButtonHome }
          data-testid="btn-go-home"
          type="button"
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Ranking);
