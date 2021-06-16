import React from 'react';
import './App.css';
import Routes from './Routes';
import { GlobalStorage } from './components/Context';
 
function App() {
  return (
    <GlobalStorage>
        <Routes />
    </GlobalStorage>
  );
}

export default App;
