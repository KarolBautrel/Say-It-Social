import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoomListPage from './pages/RoomListPage';
import RoomPage from './pages/RoomPage';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import { CookiesProvider } from 'react-cookie';
function App() {
  return (
    <CookiesProvider>
      <Router>
        <div className="container dark">
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" exact element={<RoomListPage />} />
              <Route path="/room/:id" element={<RoomPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;
