import React from 'react'
import { Route } from 'react-router-dom';
import Chessboard from './Chessboard';
import Explorer from './Explorer';

const Explore: React.FC = () => {
    return (
      <Route path="/explore" render={(props) => (
        <Explorer></Explorer>
      )} />
    );
  }
  
  export default Explore;