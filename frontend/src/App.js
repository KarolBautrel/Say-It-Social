import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoomListPage from './pages/RoomListPage';
import RoomPage from './pages/RoomPage';
import Header from './components/Header';
function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" exact element={<RoomListPage />} />
            <Route path="/room/:id" element={<RoomPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
