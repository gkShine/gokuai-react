import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Checkbox from "../../checkbox";

class ThumbnailItem extends React.Component {

  render() {
    let content;
    if (this.props.render) {
      content = this.props.render(this.props.data);
    } else {
      let src = '';
      if (typeof this.props.data === 'object') {
        src = this.props.data[this.props.property];
      } else {
        src = this.props.data;
      }
      content = <img src={src}/>;
    }
    return (
      <li className={classnames({"gk-thumbnail-item": true, [this.props.className]: !!this.props.className})}
          onClick={this.props.onClick}
          onDoubleClick={this.props.onDoubleClick}
          onContextMenu={this.props.onContextMenu}
          style={{
            width: this.props.size.w + 'px',
            height: this.props.size.h + 'px'
          }}
      >
        {content}
        {
          this.props.checkbox &&
          <Checkbox className="gk-thumbnail-checkbox" isChecked={this.props.isChecked} onClick={this.props.onCheck}/>
        }
      </li>);
  }
}

ThumbnailItem.propTypes = {
  checkbox: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onCheck: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  render: PropTypes.func,
  property: PropTypes.string,
  size: PropTypes.object,
  isChecked: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default ThumbnailItem;