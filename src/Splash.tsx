import React from 'react';
import Header from './Header';
import Cards from './Cards';
import { Route } from 'react-router-dom';

const Splash: React.FC = () => {
  return (
    <Route path="/(splash|home|)" render={(props) => (
        <div>
            <Header></Header>
            <Cards></Cards>
        </div>
    )} />
  );
}

export default Splash;