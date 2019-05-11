import React from 'react';

import Header from './Header';
import Content from './Content';

import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
    </div>
  );
}

export default App;
