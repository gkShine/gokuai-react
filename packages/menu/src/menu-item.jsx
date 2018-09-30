import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {getOS} from "gokuai-components/src/common/util";

export class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpKey: undefined,
      keyCode: undefined,
      shortcut: ''
    };
    this.special = {
      'SPACE': 'Space',
      'CAPSLOCK': 'CapsLock',
      'TAB': 'Tab',
      'BACKSPACE': 'Backspace',
      'DELETE': 'Delete',
      'ARROWUP': 'ArrowUp',
      'ARROWDOWN': 'ArrowDown',
      'ARROWLEFT': 'ArrowLeft',
      'ARROWRIGHT': 'ArrowRight'
    };
  }

  showRight() {
    return this.state.shortcut || this.props.menu || this.props.after;
  }

  initShortcut(code, help) {
    let shortcut = '';
    if (this.special[code] !== undefined) {
      code = this.special[code];
      if (help !== undefined) {
        shortcut = help + code;
      } else {
        shortcut = code;
      }
    }
    if (getOS() === 'Mac' && help === 'META') {
      shortcut = '⌘' + code;
    }
    if (code.length === 1) {
      code = 'Key' + code;
    }
    this.setState({
      keyCode: code,
      helpKey: help,
      shortcut: shortcut
    });
    if (help === undefined) {
      document.addEventListener('keydown', this.handleDocumentKeyDown);
    } else {
      document.addEventListener('keydown', this.handleDocumentKeyDownWithHelp);
    }
  }

  handleClick = (event) => {
    if (this.props.disabled) {
      return;
    }
    if (!this.props.command) {
      return;
    }
    this.props.handleCommand(this.props.command);
    event.preventDefault();
    event.stopPropagation();
  };

  handleDocumentKeyDown = (event) => {
    if (event.code === this.state.keyCode) {
      this.handleClick(event);
      event.preventDefault();
    }
  };

  handleDocumentKeyDownWithHelp = (event) => {
    if (this.state.helpKey === 'META' && !event.metaKey) {
      return;
    } else if (this.state.helpKey === 'CTRL' && !event.ctrlKey) {
      return;
    } else if (this.state.helpKey === 'ALT' && !event.altKey) {
      return;
    } else if (this.state.helpKey === 'SHIFT' && !event.shiftKey) {
      return;
    }
    if (event.code === this.state.keyCode) {
      this.handleClick(event);
      event.preventDefault();
    }
  };

  componentDidMount() {
    if (this.props.keymap) {
      let keymap = this.props.keymap.toUpperCase();
      switch (getOS()) {
        case 'Mac':
          if (keymap.indexOf('+') > -1) {
            let [help, code] = keymap.split('+');
            if (help === 'FORCECTRL') {
              help = 'CTRL';
            } else if (['CTRL', 'META'].indexOf(help) > -1) {
              help = 'META';
            }
            this.initShortcut(code, help);
          } else {
            this.initShortcut(keymap);
          }
          break;
        case 'Windows':
        case 'Linux':
          if (keymap.indexOf('+') > -1) {
            let [help, code] = keymap.split('+');
            this.initShortcut(code, help);
          } else {
            this.initShortcut(keymap);
          }
          break;
      }
    }
  }

  componentWillUnmount() {
    if (this.state.helpKey === undefined) {
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
    } else {
      document.removeEventListener('keydown', this.handleDocumentKeyDownWithHelp);
    }
  }

  render() {
    let classList = classnames({
      [this.props.className]: !!this.props.className,
      'gk-menu-item': true,
      'gk-menu-item-disabled': this.props.disabled
    });
    const icon = this.props.icon && (<i className={this.props.icon}/>);
    let right = '';
    if (this.showRight()) {
      const after = this.props.after && (this.props.after);
      const shortcut = this.state.shortcut && (<em>{this.state.shortcut}</em>);
      const subicon = this.props.menu && (<i className="gk-icon-caretright"/>);
      right = (<span className="gk-menu-item-right">{after}{shortcut}{subicon}</span>);
    }
    return (
      <li className={classList} onClick={this.handleClick} aria-disabled={this.props.disabled}>
        {icon}{this.props.children}{right}{this.props.menu && React.cloneElement(this.props.menu, { target: this })}
      </li>
    )
  }
}

MenuItem.propTypes = {
  className: PropTypes.string,
  divided: PropTypes.bool,
  disabled: PropTypes.bool,
  command: PropTypes.any,
  icon: PropTypes.string,
  keymap: PropTypes.string,
  handleCommand: PropTypes.func,
  children: PropTypes.any,
  after: PropTypes.element,
  menu: PropTypes.element
};

export default MenuItem;