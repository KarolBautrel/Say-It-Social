import React from 'react';
import './App.css';
import Routings from './Routings';
import Navbar from './components/Navbar';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <div className="app">
        <Navbar />
        <Routings />
      </div>
    </CookiesProvider>
  );
}

export default App;
