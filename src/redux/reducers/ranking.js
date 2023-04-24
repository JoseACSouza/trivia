import { ADD_PLAYER } from '../actions';

const INITIAL_STATE = {
  players: [],
};

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      players: [...state.players, action.payload],
    };

  default:
    return state;
  }
};

export default ranking;
