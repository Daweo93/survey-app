import React from 'react';

export default ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="input-field">
      <input {...input} type={type} />
      <label className={input.value ? 'active' : ''}>{label}</label>
      {touched && error && <span className="error red-text">{error}</span>}
    </div>
  );
};
