import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tableMixin from '../../table/src/table-mixin';
import ThumbnailItem from './thumbnail-item';
import Loading from '../../loading';
import ScrollLoad from "../../scroll-load/src/scroll-load";

class Thumbnail extends React.Component {
  render() {
    const classList = classnames({
      'gk-thumbnail': true,
      'gk-scrollbar': true,
      [this.props.className]: !!this.props.className,
      'gk-thumbnail-fit': this.props.fit,
      'gk-thumbnail-checkbox': this.props.showCheckbox
    });
    if (this.props.data.length) {

      return (
        <React.Fragment>
          <Loading loading={this.props.loading}>
            <ScrollLoad onScroll={this.props.$handleLoadMore}>
              <ul ref={(thumbnail) => this.thumbnail = thumbnail}
                  style={this.props.$style}
                  className={classList}
                  onClick={this.props.$handleCancelSelect}
                  onContextMenu={event => this.props.$handleContextMenu(null, null, event)}>
                {this.props.data && this.props.data.map((row, index) => <ThumbnailItem
                  onClick={event => this.props.$handleSelect(row, index, event)}
                  onDoubleClick={event => this.props.$handleDoubleClick(row, index, event)}
                  onContextMenu={event => this.props.$handleContextMenu(row, index, event)}
                  onCheck={event => this.props.$handleCheck(row, index, event)}
                  key={index}
                  data={row}
                  checkbox={this.props.checkbox}
                  render={this.props.render}
                  property={this.props.property}
                  size={this.props.size}
                  isChecked={this.props.$checked[index] !== undefined}
                  className={classnames({'gk-thumbnail-active-item': this.props.$selected[index] !== undefined})}
                  style={{border: this.props.border + 'px'}}
                /> || this.props.children)}
              </ul>
            </ScrollLoad>
          </Loading>
          {
            this.props.more &&
            <div className="gk-thumbnail-more">
              <span className="gk-thumbnail-more-text">{this.props.moreText}</span>
            </div>
          }
        </React.Fragment>
      )
    } else {
      return (<div className="gk-thumbnail-empty" style={this.props.$style}>{this.props.empty}</div>);
    }
  }
}

Thumbnail.propTypes = {
  $handleCheck: PropTypes.func,
  $handleSelect: PropTypes.func,
  $handleContextMenu: PropTypes.func,
  $handleDoubleClick: PropTypes.func,
  $handleCancelSelect: PropTypes.func,
  $handleLoadMore: PropTypes.func,
  $checked: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  $selected: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  more: PropTypes.bool,
  moreText: PropTypes.string,
  empty: PropTypes.object,
  $style: PropTypes.object,
  size: PropTypes.object,
  property: PropTypes.string,
  border: PropTypes.number,
  fit: PropTypes.bool,
  data: PropTypes.array,
  checkbox: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  className: PropTypes.string,
  render: PropTypes.func,
  children: PropTypes.any,
  loading: PropTypes.bool
};

Thumbnail.defaultProps = {
  $checked: {},
  $selected: {},
  size: {w: 148, h: 180}
};

export default tableMixin(Thumbnail, (mixin, event) => {
  if (event.code === 'ArrowLeft') {
    mixin.handleSelectTo(-1, event);
    event.preventDefault();
  } else if (event.code === 'ArrowRight') {
    mixin.handleSelectTo(+1, event);
    event.preventDefault();
  } else if (event.code === 'ArrowUp') {
    mixin.handleSelectTo(-mixin.getLineSize(), event);
    event.preventDefault();
  } else if (event.code === 'ArrowDown') {
    mixin.handleSelectTo(+mixin.getLineSize(), event);
    event.preventDefault();
  }
});