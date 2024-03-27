import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import Auth from './pages/auth';

const App: React.FC = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Something went wrong. There is nothing to display here!</p>
              </main>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
