import React from 'react';
// import { find } from 'lodash-es';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Setting from './pages/setting';
import About from './pages/about';

// const testValue = find([1, 2], (v) => v > 1);
// console.log('testValue', testValue);

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Setting />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
