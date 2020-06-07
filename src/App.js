import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchingData from './components/FetchingData';

function App() {
  return (
    <div className="App">
      {/* <PostList /> */}
        <h1>Data List</h1>
      
      <FetchingData/>
   
    </div>
  );
}

export default App;
