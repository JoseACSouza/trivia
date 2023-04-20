import { LOGIN_ACESS, REQUEST_FETCH, REQUEST_FETCH_FAIL,
  REQUEST_FETCH_SUCESS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  questions: [],
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACESS: {
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  }

  case REQUEST_FETCH_SUCESS: {
    return {
      ...state,
      questions: action.payload,
    };
  }

  case REQUEST_FETCH: {
    return {
      ...state,
    };
  }

  case REQUEST_FETCH_FAIL: {
    return {
      ...state,
      error: action.payload,
    };
  }

  default: return state;
  }
};

export default player;
