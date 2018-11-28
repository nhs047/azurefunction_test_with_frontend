import axios from 'axios';

export const BaseUrl = "https://serverlesspoc.azurewebsites.net/api";
// export const BaseUrl = "http://localhost:3000/api";

export const http = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});


// http.interceptors.request.use(
//   config => {
//     const token = getToken();
//     if (token != null) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );