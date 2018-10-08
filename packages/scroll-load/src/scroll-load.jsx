import React from 'react';
import PropTypes from 'prop-types';

class ScrollLoad extends React.Component {

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.timer = 0;
  }

  handleCheck = () => {
    if (this.props.disabled) {
      return;
    }
    if (this.el.scrollTop && this.el.scrollTop + this.el.clientHeight + this.props.distance >= this.el.scrollHeight) {
      typeof this.props.onScroll === 'function' && this.props.onScroll();
    }
  };

  handleScroll = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.handleCheck();
    }, this.props.frequency);
  };

  componentDidMount() {
    this.el = this.tableRef.current;
    if (this.props.selector) {
      this.el = this.el.querySelector(this.props.selector);
    }
    this.handleCheck();
  }

  render() {
    return React.cloneElement(this.props.children, {
      onScroll: this.handleScroll,
      ref: this.tableRef
    });
  }
}

ScrollLoad.propTypes = {
  children: PropTypes.object,
  distance: PropTypes.number,
  disabled: PropTypes.bool,
  frequency: PropTypes.number,
  selector: PropTypes.string,
  onScroll: PropTypes.func
};

ScrollLoad.defaultProps = {
  frequency: 200,
  distance: 20
};

export default ScrollLoad;