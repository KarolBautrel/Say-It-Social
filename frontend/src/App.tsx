import React from 'react';
import './App.css';
import Routings from './Routings';
import { CookiesProvider } from 'react-cookie';
import { Sidebar } from './components/layout/Navigation/Sidebar';
import { Navbar } from './components/layout/Navigation/Navbar';

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
