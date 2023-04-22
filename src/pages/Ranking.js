import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  state = {
    listPlayers: [],
  };

  componentDidMount() {
    const listPlayers = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ listPlayers });
  }

  render() {
    const { listPlayers } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {
          listPlayers
            .map((player, index) => (
              <div key={ index }>
                <img
                  alt="avatar"
                  src={ player.gravatarEmail }
                />
                <p data-testid={ `player-score-${index}` }>{ player.score }</p>
                <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              </div>
            ))
        }
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Go Home
          </button>
        </Link>
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
