import { LOGIN_ACESS, REQUEST_FETCH, REQUEST_FETCH_FAIL, REQUEST_FETCH_SUCESS } from '.';
import { fetchQuestionsApi } from '../../services/fetchAPI';

export const nameAcess = (payload) => ({
  type: LOGIN_ACESS,
  payload,
});

export const fetchQuestionsRequest = () => ({
  type: REQUEST_FETCH,
});

export const fetchQuestionsSucess = (payload) => ({
  type: REQUEST_FETCH_SUCESS,
  payload,
});

export const fetchQuestionsFail = (error) => ({
  type: REQUEST_FETCH_FAIL,
  error,
});

export const fetchQuestions = (token) => async (dispatch) => {
  dispatch(fetchQuestionsRequest());
  try {
    const data = await fetchQuestionsApi(token);
    dispatch(fetchQuestionsSucess(data));
  } catch (error) {
    dispatch(fetchQuestionsFail(error));
  }
};
