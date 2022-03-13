import React from 'react';
import './App.css';
import Routings from './Routings';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <div className="app">
        <Routings />
      </div>
    </CookiesProvider>
  );
}

export default App;
