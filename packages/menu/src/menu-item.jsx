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
      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z',
      48: '0',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      8: 'BackSpace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      20: 'Cape Lock',
      27: 'Esc',
      32: 'Space',
      33: 'Page Up',
      34: 'Page Down',
      35: 'End',
      36: 'Home',
      37: 'Left',
      38: 'Up',
      39: 'Right',
      40: 'Down',
      45: 'Insert',
      46: 'Delete',
      144: 'Num Lock',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
      };
  }

  showRight() {
    return this.state.shortcut || this.props.menu || this.props.after;
  }

  initShortcut(code, help) {
    let shortcut = '';
    if (help !== undefined) {
        if (getOS() === 'Mac' && help === 'META') {
            this.shortcut = '⌘' + this.special[code];
        } else {
            this.shortcut = (help.slice(0, 1) + help.slice(1).toLowerCase()) + '+' + this.special[code];
        }
    } else {
        this.shortcut = this.special[code];
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
    if (event.keyCode === this.state.keyCode) {
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
    if (event.keyCode === this.state.keyCode) {
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