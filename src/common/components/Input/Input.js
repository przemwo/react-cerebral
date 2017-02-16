import styles from './Input.css';

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class Input extends Component {
  render () {
    const {
      className,
      autoComplete,
      isError,
      label,
      message,
      onChange,
      type,
      value,
      id
    } = this.props;

    return (
      <div className={className}>
        {label &&
          <label
            className="dB"
            htmlFor={`Input--${id}`}
          >
            {label}
          </label>
        }
        <input
          id={`Input--${id}`}
          autoComplete={autoComplete ? 'on' : 'off'}
          type={type}
          value={value}
          onChange={onChange}
        />
        <span
          className={cx(styles.message, {
            [`${styles.active} red100`]: isError
          })}
        >
          {message}
        </span>
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  autoComplete: PropTypes.bool,
  isError: PropTypes.bool,
  label: PropTypes.string,
  message: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string.isRequired
};

Input.defaultProps = {
  className: '',
  autoComplete: false,
  isError: false,
  message: '',
  type: 'text',
  value: ''
};
