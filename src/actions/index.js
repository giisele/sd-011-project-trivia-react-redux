import getToken from '../services/getToken';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SUBMIT_TOKEN = 'SUBMIT_TOKEN';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
  loading: true,
});

export const submitToken = (token) => ({
  type: SUBMIT_TOKEN,
  token,
  loading: false,
});

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const saveToken = () => async (dispatch) => {
  dispatch((requestToken()));
  const token = await getToken();
  localStorage.setItem('token', token);
  return dispatch(submitToken(token));
};

export const fetchQuestions = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  dispatch(receiveQuestions(result));
};
