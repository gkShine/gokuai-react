import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import menuMixin from './menu-mixin.jsx';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.menu = this.arrow = undefined;
  }

  showMenu() {
    if (this.menu.parentNode.nodeName !== 'BODY') {
      document.body.appendChild(this.menu);
    }
    this.menu.style.display = 'block';
    this.setPosition();
    window.requestAnimationFrame(() => {
      this.menu.style.opacity = '1';
    });
    this.props.onChange && this.props.onChange(true);
  }

  hideMenu() {
    this.menu.style.opacity = '0.01';
    this.props.onChange && this.props.onChange(false);
  }

  setPosition() {
    this.position = this.props.targetDom.mouse ? this.props.targetDom : this.props.targetDom.getBoundingClientRect();
    let {left, top} = this.getPosition(this.props.placement);
    this.menu.style.left = left + 'px';
    this.menu.style.top = top + 'px';

    if (this.props.arrow) {
      if (this.position.top > top) {
        //菜单在上面
        this.arrow.classList.add('gk-menu-arrow-top');
      }
      let arrowStyle = window.getComputedStyle(this.arrow);
      this.arrow.style.left = (this.position.left - left + this.position.width / 2 - parseInt(arrowStyle.borderWidth)) + 'px';
    }
  }

  getPosition(placement) {
    let left, top;
    let position = this.position;
    let menuStyle = window.getComputedStyle(this.menu);
    let {topTop, bottomTop, startLeft, centerLeft, endLeft} = {
      topTop: position.top + window.pageYOffset - this.menu.clientHeight - parseInt(menuStyle.marginTop) - parseInt(menuStyle.marginBottom),
      bottomTop: position.top + window.pageYOffset + position.height,
      startLeft: position.left + window.pageXOffset,
      centerLeft: position.left + window.pageXOffset - (this.menu.clientWidth - position.width) / 2,
      endLeft: position.left + window.pageXOffset - this.menu.clientWidth + position.width
    };
    switch (placement) {
      case 'top':
        left = centerLeft;
        top = topTop;
        break;
      case 'top-start':
        left = startLeft;
        top = topTop;
        break;
      case 'top-end':
        left = endLeft;
        top = topTop;
        break;
      case 'bottom':
        left = centerLeft;
        top = bottomTop;
        break;
      case 'bottom-start':
        left = startLeft;
        top = bottomTop;
        break;
      case 'bottom-end':
        left = endLeft;
        top = bottomTop;
        break;
    }
    if (top < 0) {
      top = bottomTop;
    }
    if (position.top + position.height + this.menu.clientHeight - parseInt(menuStyle.marginTop) > window.innerHeight) {
      top = topTop;
    }

    if (left < 0) {
      left = centerLeft;
      if (left < 0) {
        left = startLeft;
      }
    }
    if (left + this.menu.clientWidth > window.innerWidth) {
      left = centerLeft;
      if (left + this.menu.clientWidth > window.innerWidth) {
        left = endLeft;
      }
    }
    return {left, top}
  }

  handleWindowResize = () => {
    if (this.props.visible) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setPosition();
      }, 100);
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate() {
    if (this.props.visible) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }

  render() {
    let list = this.props.list;
    if (this.props.arrow) {
      list.push((<div key="-1" className="gk-menu-arrow" ref={(arrow) => this.arrow = arrow}/>));
    }
    let classList = classnames({
      'gk-menu': true,
      [this.props.className]: !!this.props.className
    });
    return (<ul className={classList} style={this.props.style} ref={(menu) => this.menu = menu}>{list}</ul>);
  }
}

Menu.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  visible: PropTypes.bool,
  targetDom: PropTypes.object,
  list: PropTypes.array,
  command: PropTypes.func,
  data: PropTypes.array,
  target: PropTypes.object,
  arrow: PropTypes.bool,
  trigger: PropTypes.string,
  placement: PropTypes.string,
  onChange: PropTypes.func
};

Menu.defaultProps = {
  placement: 'bottom-start'
};

export default menuMixin(Menu, 'click');