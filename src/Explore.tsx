import React from 'react'
import { Route } from 'react-router-dom';
import Explorer from './Explorer';

const Explore: React.FC = () => {
    return (
      <Route path="/explore" render={(props) => (
        <Explorer></Explorer>
      )} />
    );
  }
  
  export default Explore;