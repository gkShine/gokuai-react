import React from 'react';
import PropTypes from 'prop-types';

class ScrollLoad extends React.Component {
  render() {
    return (this.props.children);
  }
}

ScrollLoad.propTypes = {
  children: PropTypes.object,
  distance: PropTypes.number,
  disabled: PropTypes.bool,
  frequency: PropTypes.number,
  selector: PropTypes.bool
};

ScrollLoad.defaultProps = {
  frequency: 200,
  distance: 20
};

export default ScrollLoad;