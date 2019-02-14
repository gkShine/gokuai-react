import "mdn-polyfills/Node.prototype.remove";
import React from 'react';
import ReactDom from "react-dom";
import MenuItem from './menu-item.jsx';
import Submenu from './submenu.jsx';
import PropTypes from "prop-types";

export default function menuMixin(WrappedComponent, defaultTrigger) {
  // eslint-disable-next-line
  return class extends React.Component {
    propTypes = {
      command: PropTypes.func,
      data: PropTypes.array,
      target: PropTypes.object,
      trigger: PropTypes.string,
      children: PropTypes.any
    };

    constructor(props) {
      super(props);
      this.dom = null;
      this.menu = null;
      this.timer = 0;
      this.state = {
        visible: false
      }
    }

    addTargetEvent() {
      switch (this.props.trigger || defaultTrigger) {
        case 'click':
          this.dom.addEventListener('click', this.handleTargetClick);
          break;
        case 'contextmenu':
          this.dom.addEventListener('contextmenu', this.handleContextMenu);
          break;
        case 'hover':
          this.dom.addEventListener('mouseenter', this.handleMouseEnter);
          this.dom.addEventListener('mouseleave', this.handleMouseLeave);
          this.menu.addEventListener('mouseenter', this.handleMouseEnter);
          this.menu.addEventListener('mouseleave', this.handleMouseLeave);
          break;
      }
    }

    hideMenu() {
      this.setState({
        visible: false
      });
    }

    showMenu() {
      this.setState({
        visible: true
      });
    }

    show = (el) => {
      this.dom = el;
      this.showMenu();
    };

    handleTargetClick = (event) => {
      if (this.state.visible) {
        this.hideMenu();
      } else {
        this.showMenu();
      }
      event.preventDefault();
      event.stopPropagation();
    };

    handleContextMenu = (event) => {
      this.dom = {
        mouse: true,
        left: event.clientX,
        top: event.clientY,
        height: 0,
        width: 0
      };
      this.showMenu();
      event.preventDefault();
      event.stopPropagation();
    };

    handleMouseEnter = () => {
      clearTimeout(this.timer);
      this.showMenu();
    };

    handleMouseLeave = () => {
      this.timer = setTimeout(() => {
        this.hideMenu();
      }, 100);
    };

    handleMenuTransitionEnd = (event) => {
      if (this.state.visible === false) {
        event.target.style.display = 'none';
      }
    };

    handleDocumentClick = () => {
      this.state.visible && this.hideMenu();
    };

    componentDidMount() {
      if (this.props.target) {
        // eslint-disable-next-line
        this.dom = ReactDom.findDOMNode(this.props.target.current || this.props.target);
        this.addTargetEvent();
      }

      document.addEventListener('click', this.handleDocumentClick);
      this.menu.addEventListener('transitionend', this.handleMenuTransitionEnd);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
      this.menu.remove();
    }

    renderList() {
      let list = [];
      if (this.props.data !== undefined) {
        this.props.data.forEach((node, index) => {
          if (node.divided) {
            list.push((<li className="gk-menu-divided"/>));
          }
          list.push((<MenuItem {...node} handleCommand={this.props.command} key={index}
                               menu={(node.children !== undefined ? (<Submenu data={node.children}
                                                                              command={this.props.command}/>) : undefined)}>{node.label}</MenuItem>));
        });
      } else {
        React.Children.map(this.props.children, (child, index) => {
          if (child.props.divided !== undefined) {
            list.push((<li className="gk-menu-divided"/>));
          }
          list.push(React.cloneElement(child, {
            key: index,
            handleCommand: this.props.command
          }));
        });
      }
      return list;
    }

    render() {
      return (
        <WrappedComponent {...this.props} list={this.renderList()} targetDom={this.dom} visible={this.state.visible}
                          ref={
                            // eslint-disable-next-line
                            (menu) => this.menu = ReactDom.findDOMNode(menu)
                          }/>);
    }
  }
}