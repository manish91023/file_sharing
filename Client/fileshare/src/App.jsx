import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
     
    </div>
  )
}

export default App