import '@babel/polyfill';
import 'classlist-polyfill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Mock from './mock';
import '@gokuai/gokuai-default-theme';
import 'font-awesome/scss/font-awesome.scss';
import App from './App.jsx';

Mock.bootstrap();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);