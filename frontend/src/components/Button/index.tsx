import React from 'react';
import PropTypes from 'prop-types';

const Button = ({...props}) => {
  return <button type={props.type} className={props.className}>
            <props.ico />
            {props.label}
         </button>
};

Button.propTypes = {
    type: PropTypes.string,
    icone: PropTypes.element,
    label: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    to: PropTypes.string,
};
  
export default Button;