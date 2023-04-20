import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <div>
        <img
          alt="Avatar do usuário"
          src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}` }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Header);
