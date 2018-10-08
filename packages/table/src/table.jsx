import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tableMixin from './table-mixin';
import TableCell from './table-cell';
import Loading from '../../loading';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollbar: false,
      property: ''
    };
  }

  setScrollbar() {
    if (!this.props.header || !table) {
      return false;
    }
    this.inset = true;
    const table = document.querySelector('.gk-table-virtual');
    const height = table ? table.clientHeight : this.props.height;
    this.setState({
      scrollbar: this.props.itemHeight * this.props.data.length > height
    });
  }

  handleSort = (property, order) => {
    this.setState({
      sortProperty: property
    });
    this.props.onSort && this.props.onSort(property, order);
  };

  handleWindowResize = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setScrollbar();
    }, 5);
  };

  componentDidMount() {
    this.setScrollbar();
    this.props.fit && window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    this.props.fit && window.removeEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate() {
    if (this.inset) {
      this.inset = false;
    } else {
      this.setScrollbar();
    }
  }

  render() {
    const classList = classnames({
      [this.props.className]: !!this.props.className,
      'gk-table-fit': this.props.fit,
      'gk-table-show-checkbox': this.props.showCheckbox,
      'gk-table': true,
      'gk-table-with-header': this.props.header,
    });
    const children = [];
    React.Children.map(this.props.children, (child, index) => {
      children.push(React.cloneElement(child, {
        key: index,
        $sortProperty: this.state.sortProperty,
        $isChecked: this.props.data.length === Object.values(this.props.$selected).length,
        $handleCheckAll: this.props.$handleCheckAll,
        $handleSort: this.handleSort
      }));
    });
    return (
      <section className={classList}>
        {
          this.props.data.length ? (
            <React.Fragment>
              {
                this.props.header && <table className="gk-table-header">
                  <thead>
                  <tr>
                    {children}
                    {
                      this.state.scrollbar && <th className="gk-table-header-last"/>
                    }
                  </tr>
                  </thead>
                </table>
              }

              <Loading loading={this.props.loading}>
              <div className="gk-table-virtual gk-scrollbar"
                   style={this.props.$style}
                   onContextMenu={event => this.props.$handleContextMenu(null, null, event)}
                   onClick={this.props.$handleCancelSelect}
              >
                <table cellSpacing="0" cellPadding="0" className="gk-table-body"
                       style={{width: '100%'}}>
                  <tbody>
                  {
                    this.props.data.map((row, index) => <tr
                      key={index}
                      className={classnames({
                        'gk-table-item': true,
                        'gk-table-item-active': this.props.$selected[index] !== undefined
                      })}
                      onClick={event => this.props.$handleSelect(row, index, event)}
                      onDoubleClick={event => this.props.$handleDoubleClick(row, index, event)}
                      onContextMenu={event => this.props.$handleContextMenu(row, index, event)}>
                      {
                        children.map((column, idx) => <TableCell onCheck={this.props.$handleCheck}
                                                                 $isChecked={this.props.$checked[index] !== undefined}
                                                                 index={index} data={row} column={column}
                                                                 height={this.props.itemHeight}
                                                                 key={idx}/>)
                      }
                    </tr>)
                  }
                  </tbody>
                </table>
                {
                  this.props.more &&
                  <div className="gk-table-more">
                    <span className="gk-table-more-text">{this.props.moreText}</span>
                  </div>
                }
              </div>
              </Loading>
            </React.Fragment>
          ) : <div className="gk-table-empty" style={this.props.$style}>{this.props.empty}</div>
        }
      </section>);
  }
}

Table.propTypes = {
  $checked: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  $selected: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  $style: PropTypes.object,
  $handleCheck: PropTypes.func,
  $handleCheckAll: PropTypes.func,
  $handleSelect: PropTypes.func,
  $handleContextMenu: PropTypes.func,
  $handleDoubleClick: PropTypes.func,
  $handleCancelSelect: PropTypes.func,
  fit: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.array,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  loading: PropTypes.bool,
  more: PropTypes.bool,
  header: PropTypes.bool,
  data: PropTypes.array,
  moreText: PropTypes.string,
  empty: PropTypes.object,
  itemHeight: PropTypes.number,
  onSort: PropTypes.func
};

Table.defaultProps = {
  $selected: {},
  $checked: {},
  moreText: 'loading...',
  itemHeight: 42
};

export default tableMixin(Table, (mixin, event) => {
  if (event.code === 'ArrowUp') {
    mixin.handleSelectTo(-1, event);
    event.preventDefault();
  } else if (event.code === 'ArrowDown') {
    mixin.handleSelectTo(+1, event);
    event.preventDefault();
  }
});