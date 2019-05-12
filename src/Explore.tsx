import React from 'react'
import { Route } from 'react-router-dom';
import Chessboard from './Chessboard';


const Explore: React.FC = () => {
    return (
      <Route path="/explore" render={(props) => (
        <Chessboard></Chessboard>
      )} />
    );
  }
  
  export default Explore;