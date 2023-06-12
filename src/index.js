import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sidebar from './components/Sidebar';
import ChatApp from './components/ChatApp';

ReactDOM.render(
  <React.StrictMode>
    <Sidebar></Sidebar>
    <ChatApp></ChatApp>
  </React.StrictMode>,
  document.getElementById('root')
);


