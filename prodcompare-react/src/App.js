import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'

import { etsyController } from './contollers';
import { Chart, Loader, NavBar } from './components';

import './App.scss';

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
      <form onSubmit={handleSubmit}>
        <input 
          id='query'
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <input 
          type="submit" 
          value="Search" 
        />
      </form>

      {/* <NavBar /> */}
      <Chart className='chart-container' data={result} />
      <Loader visible={loading} />
    </div>
  );
}

export default App;
