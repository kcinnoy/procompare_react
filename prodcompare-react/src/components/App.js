import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Chart, Loader, NavBar } from '.';

import { etsyController } from '../contollers';


import './App.scss';
import searchImage from './astronaut-explore.png'; 



function App() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      alert('Input query here...');
      return;
    }
    setLoading(true);
    const data = await etsyController.searchByQuery(query);
    setResult(data);
    setLoading(false);
  }

  return (
    <div className='App'>
    <NavBar />
      <div className="search-section">
        <div className="search-astro">
          <img src={searchImage}></img>
        </div>
        <div className="search-wrapper">
          <form onSubmit={handleSubmit} className="search-container">
            <input  className="search-container-search"
              id='query'
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              id="search-bar" placeholder="Explore / Search products...."
            />
            <input className="search-container-icon"
              type="submit" 
              value="Search" 
            />
          </form>
        </div>
      </div>

      <div className="chart-section">
        <Chart className='chart-container' data={result} />
      </div>
      <Loader visible={loading} />
    </div>
  );
}

export default App;
