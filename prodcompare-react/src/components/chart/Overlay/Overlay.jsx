import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Overlay.scss';

class Overlay extends React.Component {
  render() {
    const { className, product, style } = this.props;
    if ( !product ) {
      return null;
    }

    return (
      <div 
        style={style}
        className={cn(className, 'overlay-container')}
      >
        <img src={product.MainImage['url_170x135']} alt='logo' />
        <div className='overlay-info'>
          <strong>TITLE:</strong>
          {` ${product.title}`}
        </div>
        <div className='overlay-info'>
          <strong>PRICE:</strong>
          {` ${product.price}`}
        </div>
        <div className='overlay-info'>
          <strong>FAVORITED: </strong>
          {` ${product.Shop.num_favorers} TIMES`}
        </div>
        <div className='overlay-like-btn'>
          <i className="fa fa-heart" />
          FAVORITE
        </div>
      </div>
    );
  }
}

Overlay.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  product: PropTypes.object,
  hide: PropTypes.func
};

export default Overlay;