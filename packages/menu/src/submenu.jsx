import React from 'react';
import PropTypes from 'prop-types';
import menuMixin from './menu-mixin.jsx';

class Submenu extends React.Component {

  constructor(props) {
    super(props);
    this.menu = undefined;
  }

  handleCommand(command) {
    this.props.command(command);
    this.hideMenu();
  }

  showMenu() {
    this.visible = true;
    this.menu.style.display = 'block';
    this.setPosition();
    window.requestAnimationFrame(() => {
      this.menu.style.opacity = '1';
    });
  }

  hideMenu() {
    this.visible = false;
    this.menu.style.opacity = '0.01';
    if (!("AnimationEvent" in window)) {
        this.menu.style.display = 'none';
    }
  }

  setPosition() {
    let menuStyle = window.getComputedStyle(this.menu);

    let left = this.props.targetDom.clientWidth;
    let top = this.props.targetDom.offsetTop - parseInt(menuStyle.paddingTop);

    this.menu.style.left = left + 'px';
    this.menu.style.top = top + 'px';

    let menuPos = this.menu.getBoundingClientRect();
    if (menuPos.left + this.menu.clientWidth > window.innerWidth) {
      left = -this.menu.clientWidth;
      this.menu.style.left = left + 'px';
    }

    let overTop = menuPos.top + this.menu.clientHeight + parseInt(menuStyle.marginBottom) - window.innerHeight;
    if (overTop > 0) {
      top -= overTop;
      this.menu.style.top = top + 'px';
    }
  }

  componentDidUpdate() {
    if (this.props.visible && !this.visible) {
      this.showMenu();
    } else if (this.visible) {
      this.hideMenu();
    }
  }

  render() {
    return (<ul className="gk-menu gk-sub-menu" ref={(menu) => this.menu = menu}>{this.props.list}</ul>);
  }
}

Submenu.propTypes = {
  visible: PropTypes.bool,
  targetDom: PropTypes.object,
  list: PropTypes.array,
  target: PropTypes.object,
  trigger: PropTypes.string,
  command: PropTypes.func
};

export default menuMixin(Submenu, 'hover');