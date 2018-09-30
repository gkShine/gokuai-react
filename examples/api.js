import axios from 'axios';

export const getFileList = params => {
  return axios.get('/file/listpage', {params: params}).then(res => res.data);
};

export const getFile = params => {
  return axios.get('/file', {params: params}).then(res => res.data);
};

export const getData = params => {
  return axios.get('/data', {params: params}).then(res => res.data);
};