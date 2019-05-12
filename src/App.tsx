import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'

import Splash from './Splash';
import Explore from './Explore';

const App: React.FC = () => {
  return (
    <Router>
      <Splash></Splash>
      <Explore></Explore>
    </Router>
  );
}

export default App;
