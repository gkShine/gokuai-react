import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Checkbox from '../../checkbox';

class TableCell extends React.Component {

  handleCheck = (event) => {
    this.props.onCheck && this.props.onCheck(this.props.data, this.props.index, event);
  };

  render() {
    let column = this.props.column.props;
    let content;
    if (column.render) {
      content = column.render(this.props.data);
    } else if (column.checkbox) {
      content = (<Checkbox isChecked={this.props.$isChecked} onClick={this.handleCheck}/>);
    } else if (column.property) {
      let value = this.props.data[column.property];
      content = column.formatter ? column.formatter(value, this.props.data, this.props.index) : value;
    } else if (column.formatter) {
      content = column.formatter();
    }
    return (
      <td style={{
        height: this.props.height + 'px',
        width: typeof column.width === 'number' ? column.width + 'px' : column.width,
        textAlign: column.align
      }} className={classnames({'gk-table-checkbox': column.checkbox})}>{content}</td>);
  }
}

TableCell.propTypes = {
  $isChecked: PropTypes.bool,
  column: PropTypes.object,
  height: PropTypes.number,
  data: PropTypes.object,
  index: PropTypes.number,
  onCheck: PropTypes.func
};

export default TableCell;