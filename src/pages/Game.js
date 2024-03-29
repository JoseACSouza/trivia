import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

// tivemos que mandar o history por props para o o compenente Questions

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
