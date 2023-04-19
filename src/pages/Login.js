import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  validateForm = () => {
    const { email, name } = this.state;
    const MIN = 0;
    const validate = /^\S+@\S+\.\S+$/;

    if (email.match(validate) && name.length > MIN) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  handleSubmit = async () => {
    const { history } = this.props;
    const token = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenJson = await token.json();
    const finalToken = tokenJson.token;
    localStorage.setItem('token', finalToken);
    history.push('/game');
  };

  render() {
    const { isDisable } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } width="300px" className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <form>
          <label htmlFor="name">
            Nome
            <input
              onChange={ this.handleChange }
              type="text"
              name="name"
              id="name"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              onChange={ this.handleChange }
              type="email"
              name="email"
              id="email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            disabled={ isDisable }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleSubmit }
          >
            Play

          </button>
        </form>
      </header>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
