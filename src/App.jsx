import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles.css';
import Search from './pages/Search';
import getAllProperties from './services/getProperties';
import Header from './compositions/Header';
import Details from './pages/Details';

function App() {
  const [properties, setProperties] = useState([]);

  async function fetchData() {
    const data = await getAllProperties();
    setProperties(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterProperties(type) {
    const field = type === 'zap' ? 'isAvaliableZAP' : 'isAvaliableVivaReal';
    return properties.filter(item => item[field]);
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Route
          path="/zap"
          component={() => <Search properties={filterProperties('zap')} />}
        />
        <Route
          path="/vivareal"
          component={() => <Search properties={filterProperties()} />}
        />
        <Route
          path="/details/:id"
          component={() => <Details properties={properties} />}
        />
      </div>
    </Router>
  );
}

export default App;
