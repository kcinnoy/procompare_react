import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Loader.scss';

const Loader = ({ visible }) => (
  <div 
    className={cn(
      'loader-container', 
      !visible && 'loader-container-hidden'
    )}
  >
    <div className='loader-content' />
  </div>
);

Loader.propTypes = {
  loading: PropTypes.bool
};

export default Loader;