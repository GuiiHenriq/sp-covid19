import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://covid19-sp.netlify.app"
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  }
}

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}