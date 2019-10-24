import React from 'react'

import './Home.scss';
import astroFind from '../astronaut-find.png'; 
import { ReactComponent as RocketIcon } from '../rocket.svg';
import { ReactComponent as MeteoriteIcon } from '../meteorite.svg';
import { ReactComponent as EmeraldIcon } from '../emerald.svg';

const Home = () => {
  return (
    <div className="home-section">
      <div className="explainer-container">
        <div className="explainer-header">
          Explore Amazing Products
        </div>
        <div className="explainer-content">
          Find amazing products easily and quickly. Compare products with a click of a button and save them to your favorites.
        </div>
        <div className="explainer-content">
          <div className="explainer-icon">
            <EmeraldIcon />
          </div>
          <div className="explainer-item">
            Quickly compare products across multiple criteria
          </div>
        </div>
        <div className="explainer-content">
          <div className="explainer-icon">
          <EmeraldIcon />
          </div>
          <div className="explainer-item">
            View all results on the same page
          </div>        
        </div>
        <div className="explainer-content">
          <div className="explainer-icon">
          <EmeraldIcon />
          </div>
          <div className="explainer-item">
            Inspect in detail only the items your interested in
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="astro-image" src={astroFind}></img>
      </div>
      
    </div>
  )
}

export default Home;
