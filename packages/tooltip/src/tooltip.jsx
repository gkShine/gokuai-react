import React from 'react';
import PropTypes from 'prop-types';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  setPosition(target) {
    let tooltip = this.tooltip;
    let position = target.getBoundingClientRect();
    let tooltipStyle = window.getComputedStyle(tooltip);
    let left, top;
    switch (this.props.placement) {
      case 'top':
        left = position.left + window.pageXOffset - (tooltip.clientWidth - position.width) / 2 - parseInt(tooltipStyle.marginLeft);
        top = position.top + window.pageYOffset - tooltip.clientHeight - parseInt(tooltipStyle.marginTop) - parseInt(tooltipStyle.marginBottom);
        break;
      case 'left':
        left = position.left + window.pageXOffset - tooltip.clientWidth - parseInt(tooltipStyle.marginLeft) - parseInt(tooltipStyle.marginRight);
        top = position.top + window.pageYOffset - (tooltip.clientHeight - position.height) / 2 - parseInt(tooltipStyle.marginTop);
        break;
      case 'right':
        left = position.left + window.pageXOffset + position.width;
        top = position.top + window.pageYOffset - (tooltip.clientHeight - position.height) / 2 - parseInt(tooltipStyle.marginTop);
        break;
      default:
        left = position.left + window.pageXOffset - (tooltip.clientWidth - position.width) / 2 - parseInt(tooltipStyle.marginLeft);
        top = position.top + window.pageYOffset + position.height;
    }
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  handleMouseEnter = (event) => {
    if (this.tooltip.parentNode.nodeName !== 'BODY') {
      document.body.appendChild(this.tooltip);
    }
    this.visible = true;
    this.tooltip.style.display = 'block';
    this.setPosition(event.target);
    window.requestAnimationFrame(() => {
      this.tooltip.style.opacity = '0.9';
    });
  };

  handleMouseOut = () => {
    this.visible = false;
    this.tooltip.style.opacity = '0.01';
  };

  componentDidMount() {
    this.childRef.current.addEventListener('mouseenter', this.handleMouseEnter);
    this.childRef.current.addEventListener('mouseout', this.handleMouseOut);

    this.tooltip.addEventListener('transitionend', () => {
      !this.visible && (this.tooltip.style.display = 'none');
    });
  }

  componentWillUnmount() {
    this.tooltip.remove();
  }

  render() {
    const child = React.cloneElement(this.props.children, {
      ref: this.childRef
    });
    return (<React.Fragment>
      {child}
      <div className="gk-tooltip" ref={(tooltip) => this.tooltip = tooltip}>
        {this.props.content || child.props.title}
        <s className={'gk-tooltip-arrow gk-arrow-' + this.props.placement}/>
      </div>
    </React.Fragment>);
  }
}

Tooltip.propTypes = {
  children: PropTypes.object,
  content: PropTypes.string,
  placement: PropTypes.string
};

Tooltip.defaultProps = {
  placement: 'bottom'
};

export default Tooltip;