import React from 'react';

import './error-indicator.css'
import icon from './star-death.svg';

const ErrorIndicator = () => {
  return (
      <div className="error-indicator">
          <img src={icon} alt='error icon' className='error-icon' />
          <span className='boom'>BOOM!</span>
          <span>
              samething has gone realy wronge
          </span>
          <span>
              (But we already send droids to fix it)
          </span>
      </div>
  );
};

export default ErrorIndicator;