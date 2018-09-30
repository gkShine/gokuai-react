import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class ButtonGroup extends React.Component {
  render() {
    const children = React.Children.map(this.props.children, child => {
      return this.props.plain && React.cloneElement(child, {
        plain: this.props.plain
      }) || child;
    });
    return (
      <div className={classnames({
        'gk-button-group': true,
        [this.props.className]: !!this.props.className
      })} style={this.props.style}>{children}</div>
    );
  }
}

ButtonGroup.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  plain: PropTypes.bool,
  children: PropTypes.any
};

export default ButtonGroup;