// import babelpolyfill from 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom';
import Mock from './mock';
import 'gokuai-components/lib/default-theme/index.css';
import 'font-awesome/scss/font-awesome.scss';
import App from './App.jsx';

Mock.bootstrap();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);