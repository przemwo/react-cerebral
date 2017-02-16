import React, { Component, PropTypes } from 'react';

export const NOVALUE = '__NOVALUE__';

export default class Select extends Component {
  handleChange = e => {
    const { value } = e.target;

    this.props.onChange({
      target: {
        value: value === NOVALUE
          ? null
          : value
      }
    });
  };

  renderOption (option) {
    const key = option.value === NOVALUE ? '__NOVALUE__' : option.value;

    return (
      <option
        value={option.value}
        key={key}
      >
        {option.label}
      </option>
    );
  }

  render () {
    const {
      className,
      label,
      value,
      options,
      id,
      disabled
    } = this.props;

    return (
      <div className={className}>
        {label &&
          <label
            className="dB"
            htmlFor={`Select--${id}`}
          >
            {label}
          </label>
        }
        <div className="selectField dB">
          <div className="selectField-control">
            <select
              id={`Select--${id}`}
              onChange={this.handleChange}
              value={value}
              disabled={disabled}
            >
              {options.map(this.renderOption, this)}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  options: PropTypes.array,
  id: PropTypes.string.isRequired
};

Select.defaultProps = {
  className: '',
  value: NOVALUE,
  options: [],
  selected: null
};
