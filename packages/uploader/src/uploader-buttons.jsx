import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../button/index";
import Dropdown from "../../dropdown/index";
import classnames from 'classnames';
import {isIE} from "gokuai-components/src/common/util";

class UploaderButtons extends React.Component {

  constructor(props) {
    super(props);
    this.defaultButtons = {
      delete: {
        type: 'delete',
        class: 'gk-uploader-delete',
        label: this.gettext('delete')
      },
      file: {
        type: 'file',
        class: 'gk-uploader-file',
        label: this.gettext('upload file')
      }
    };
    if (!isIE()) {
        this.defaultButtons['folder'] = {
            type: 'folder',
            class: 'gk-uploader-folder',
            label: this.gettext('upload folder')
        }
    }
  }

  getList() {
    let list = [];
    if (this.props.buttons === undefined) {
      list = Object.values(this.defaultButtons);
    } else {
      this.props.buttons.forEach((button) => {
        if (button.type === 'folder' && isIE()) {
          return;
        }
        list.push(Object.assign(this.defaultButtons[button.type], button));
      });
    }
    return list;
  }

  gettext(value) {
    return this.props.translate && this.props.translate[value] || value;
  }

  getButtonType(type) {
    return ['file', 'folder'].indexOf(type) > -1 ? 'html' : 'button'
  }

  render() {
    const list = this.getList();
    let classList = classnames({
      'gk-uploader-buttons': true,
      'gk-uploader-buttons-inline': !this.props.dropdown
    });
    let content;
    if (this.props.dropdown && list.length > 1) {
      let items = [];
      list.map((button, index) => {
        items.push(<Dropdown.Item key={index} className={button.class}>{button.label}</Dropdown.Item>);
      });
      content = (<Dropdown menu={(<Dropdown.Menu className="gk-uploader-dropdown" >{items}</Dropdown.Menu>)}><Button
        size={this.props.size} >{this.props.children}</Button></Dropdown>);
    } else {
      let items = [];
      list.map((button, index) => {
        items.push(<Button size={this.props.size} type={this.getButtonType(button.type)} key={index}
                           className={button.class}>{button.label}</Button>);
      });
      content = items;
    }
    return (<div className={classList}>{content}</div>)
  }
}

UploaderButtons.propTypes = {
  children: PropTypes.string,
  size: PropTypes.string,
  buttons: PropTypes.array,
  dropdown: PropTypes.bool,
  translate: PropTypes.object
};

export default UploaderButtons;
