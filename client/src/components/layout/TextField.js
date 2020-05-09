import React from "react";

import { PropTypes } from "prop-types";

const TextField = ({
  name,
  placeholder,
  value,
  type,
  onChange,
  disabled,
  required
}) => {
  return (
    <div className="form-group">
      <input className = 'form-control'
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  type: "text",
};

export default TextField;
