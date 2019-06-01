import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'

import Splash from './Splash';
import Explore from './Explore';
import Practice from './Practice';

const App: React.FC = () => {
  return (
    <Router>
      <Splash></Splash>
      <Explore></Explore>
      <Practice></Practice>
    </Router>
  );
}

export default App;
