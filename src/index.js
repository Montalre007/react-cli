import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import './index.css';
import Router from './router'
import registerServiceWorker from './registerServiceWorker';
import server from './server/server';
ReactDOM.render(<BrowserRouter><Router /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
