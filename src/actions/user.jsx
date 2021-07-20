import { fetchNewApi } from './requestGameAPI'; // Req 5

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';
export const GET_USER_SCORE = 'GET_USER_SCORE';
export const SEND_USER_DATA = 'SEND_USER_DATA';

const requestApi = (payload) => ({
  type: REQUEST_API,
  payload,
});

const requestApiSucess = (payload) => ({
  type: REQUEST_API_SUCESS,
  payload,
});

const requestApiError = (payload) => ({
  type: REQUEST_API_ERROR,
  payload,
});

export const sendUserData = (payload) => ({ // Envia dados do usuário para o Redux
  type: SEND_USER_DATA,
  payload,
});

export const getUserScore = (payload) => ({ // *Envia score do usuário para o Redux
  type: GET_USER_SCORE,
  payload,
});

export const fetchApi = () => (dispatch) => { // Pega Token da API
  const API = 'https://opentdb.com/api_token.php?command=request';
  dispatch(requestApi());
  return fetch(API)
    .then((result) => result.json())
    .then((data) => {
      dispatch(requestApiSucess(data));
      localStorage.setItem('token', data.token);
      dispatch(fetchNewApi()); // Req 5
    })
    .catch((error) => dispatch(requestApiError(error)));
};
