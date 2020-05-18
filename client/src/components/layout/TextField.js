import React from "react";

import { PropTypes } from "prop-types";

const TextField = ({
  name,
  placeholder,
  value,
  type,
  onChange,
  disabled,
  className,
  parentClassName,
  children,
  required
}) => {
  return (
    <div className={`${parentClassName}__form-group`}>
      {children}
      <input className = {className}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      <label className = {`${parentClassName}__label`}>{placeholder}</label>
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
