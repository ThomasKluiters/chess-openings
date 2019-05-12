import React from 'react'
import { Route } from 'react-router-dom';


const Explore: React.FC = () => {
    return (
      <Route path="/explore" render={(props) => (
        <h1>Hello world!</h1>
      )} />
    );
  }
  
  export default Explore;