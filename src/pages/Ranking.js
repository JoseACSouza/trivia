import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleButtonHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
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
}.isRequired;

export default Ranking;
