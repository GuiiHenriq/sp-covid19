import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://suegoi0x.srv-45-34-12-247.webserverhost.top"
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  }
}

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}