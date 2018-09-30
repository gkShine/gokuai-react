import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classList = classnames({
      [this.props.className]: !!this.props.className,
      'gk-button': true,
      'gk-button-plain': this.props.plain,
      'gk-button-active': this.props.isActive,
      ['gk-button--' + this.props.size]: ['medium', 'small', 'mini'].indexOf(this.props.size) > -1,
      ['gk-button--' + this.props.type]: ['primary', 'success', 'info', 'warning', 'danger'].indexOf(this.props.type) > -1
    });
    let icon = '';
    if (this.props.icon) {
      icon = (<i className={this.props.icon}/>);
    }
    const props = {
      className: classList,
      style: this.props.style,
      onClick: this.props.onClick
    };
    if (this.props.type === 'html') {
      return (<div {...props} >{icon}{this.props.children}</div>)
    } else if (this.props.type === 'text') {
      return (<span {...props} >{icon}{this.props.children}</span>)
    } else {
      return (<button {...props} >{icon}{this.props.children}</button>)
    }
  }
}

Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
  plain: PropTypes.bool,
  icon: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any
};

export default Button;