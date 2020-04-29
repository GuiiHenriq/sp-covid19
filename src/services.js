import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://covid19-sp.netlify.app" // => PRODUCTION
  //baseURL: "http://localhost:3000" // => DEVELOPMENT
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  }
}

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}