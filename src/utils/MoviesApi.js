import { MOVIES_API_URL } from './consts';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

function request(url, options) {
  return fetch(url, options).then((res) => checkResponse(res));
}

export const getFilmsApi = () => {
  return request(`${MOVIES_API_URL}`);
};
