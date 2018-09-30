import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.isChecked
    };
  }

  handleChange = (event) => {
    this.changeState = true;
    this.setState({
      checked: event.target.checked
    });
  };

  handleClick = (event) => {
    this.props.onClick && this.props.onClick(event);
    event.stopPropagation();
  };

  shouldComponentUpdate(newProps) {
    if (this.changeState) {
      this.changeState = false;
    } else {
      this.changeState = true;
      this.setState({
        checked: newProps.isChecked
      });
    }
    return true;
  }

  render() {
    return (<input
      aria-checked={this.state.checked}
      checked={this.state.checked}
      className={classnames({[this.props.className]: !!this.props.className, 'gk-checkbox': true,'gk-checkbox-checked':this.state.checked })}
      onChange={this.handleChange}
      onClick={this.handleClick}
      type="checkbox"
    />)
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  isChecked: PropTypes.bool,
  onClick: PropTypes.func
};

export default Checkbox;

