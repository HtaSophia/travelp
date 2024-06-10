import React from 'react';
import './Badge.css';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

 function Badge(props) {}

    const Badge = ({ tooltipText, iconName, colorHex }) => {
        
        const IconComponent = Icons[iconName];
      
        const renderTooltip = (props) => (
          <Tooltip id="badge-tooltip" {...props}>
            {tooltipText}
          </Tooltip>
    );

    return (
        <div>Navbar</div>
    )
};


export default Badge;