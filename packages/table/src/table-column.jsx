import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Checkbox from '../../checkbox';

class TableColumn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: props.sortable
    };
    this.showSort = props.sortable !== undefined;
  }

  handleCheckAll = (event) => {
    typeof this.props.$handleCheckAll === 'function' && this.props.$handleCheckAll(event.target.checked);
    event.stopPropagation();
  };

  handleClick = (event) => {
    if (!this.showSort) {
      event.preventDefault();
      return;
    }
    let order = this.state.order;
    switch (order) {
      case 'asc':
        order = 'desc';
        break;
      case 'desc':
        order = '';
        break;
      default:
        order = 'asc';
    }
    //清楚其他排序
    this.props.$handleSort && this.props.$handleSort(this.props.property, order);
    this.setState({
      order: order
    });
  };

  shouldComponentUpdate(newProps) {
    if (this.props.sortable !== undefined && newProps.$sortProperty !== this.props.property && this.state.order) {
      this.setState({
        order: ''
      })
    }
    return true;
  }

  render() {
    const classList = classnames({
      'gk-table-checkbox': this.props.checkbox,
      'gk-table-sortable': this.showSort
    });
    const style = {
      width: typeof this.props.width === 'number' ? this.props.width + 'px' : this.props.width,
      textAlign: this.props.align
    };
    return (
      <th style={style} className={classList} onClick={this.handleClick}>
        {
          this.props.checkbox && <Checkbox isChecked={this.props.$isChecked} onClick={this.handleCheckAll}/> ||
          <span>{this.props.label}</span>
        }
        {
          this.showSort &&
          <span className={classnames({'sortable': true, ['sortable-' + this.state.order]: !!this.state.order})}>
            <i className="sort-caret asc"/>
            <i className="sort-caret desc"/>
          </span>
        }
      </th>
    );
  }
}

TableColumn.propTypes = {
  $isChecked: PropTypes.bool,
  $handleCheckAll: PropTypes.func,
  $handleSort: PropTypes.func,
  $sortProperty: PropTypes.string,
  render: PropTypes.func,
  label: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  checkbox: PropTypes.bool,
  property: PropTypes.string,
  sortable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  align: PropTypes.string,
  formatter: PropTypes.func,
  onCheckAll: PropTypes.func
};

TableColumn.defaultProps = {
  align: 'left'
};

export default TableColumn;