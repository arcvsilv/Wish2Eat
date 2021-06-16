import React from 'react';
import PropTypes from 'prop-types'

const Input = ({ ...props }) => {
// label, id, type, required, placeholder, onChange, onBlur,
  return (
    <div style={{ margin: '.2em 0' }}>
      <label htmlFor={props.id} style={{ textTransform: 'capitalize' }} className="controllabel">
        {props.label}
      </label>
      <input 
      //id={props.id} name={props.id} type={props.type} 
      {...props} 
      //required={required}  placeholder={placeholder} onChange={onChange} onBlur={onBlur}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  onBlur: PropTypes.func,
};


export default Input;