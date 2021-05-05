import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Employe from './components/Employe';
import Home from './components/Home';

function App() {
  return (
    <Router>
    <div class="navbar">
     <Link to="/">Home</Link>
        <Link to="/employe">Employe</Link>
    </div>
    <div>
       <Route exact path="/" component={Home} />
       <Route path="/employe" component={Employe} />
    </div>
  </Router>
  );
}

export default App;
