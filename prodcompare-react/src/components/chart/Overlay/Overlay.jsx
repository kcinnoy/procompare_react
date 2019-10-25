import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Toast } from "toaster-js";
import "toaster-js/default.scss";

import './Overlay.scss';
import Api from "../../../utils/Api";

class Overlay extends React.Component {
    async markAsFavorite(product) {
    await Api.post('/favorites.json', {
        "ref_id"  : product.listing_id,
        "title" : product.title,
        "price" : product.price,
        "image" : product.MainImage.url_fullxfull,
        "num_favorers" : product.Shop.num_favorers,
        "url" : product.url
    }, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
        }
    ).then(response => {
      new Toast("You have successfully marked this product as favorite")
    }).catch(error => {
     new Toast(error);
    });
  };

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
          {` £ ${product.price}`}
        </div>
        <div className='overlay-info'>
          <strong>FAVORITED: </strong>
          {` ${product.Shop.num_favorers} TIMES`}
        </div>
        <div onClick={() => this.markAsFavorite(product)} className='overlay-like-btn'>
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