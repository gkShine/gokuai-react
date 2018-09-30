import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.targetRef = React.createRef();
  }

  render() {
    return (<div className="gk-dropdown" style={this.props.style}>
      {
        React.cloneElement(this.props.children, {
          ref: this.targetRef
        })
      }
      {
        React.cloneElement(this.props.menu, {
          target: this.targetRef,
          command: this.props.command
        })
      }
    </div>);
  }
}

Dropdown.propTypes = {
  style: PropTypes.object,
  menu: PropTypes.element,
  command: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

export default Dropdown;