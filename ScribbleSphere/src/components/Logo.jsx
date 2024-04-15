import React from 'react';

import logoImage from '../assets/Loggoo.png'; 

function Logo( {width}  ) {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImage} alt="ScribbleSphere Logo" style={{ width }} />
        </div>
    );
}

export default Logo;
