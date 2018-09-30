import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../dropdown';
import Button from '../../button';
import Thumbnail from '../../thumbnail';
import Fileicon from '../../fileicon';
import Table from '../../table';
import Slide from "../../slide";
import Menu from "../../menu";
import Breadcrumb from "../../breadcrumb";
import {timeToDate, bitSize, baseName, dirName} from "gokuai-components/src/common/util";

class Finder extends React.Component {
  constructor(props) {
    super(props);

    this.navList = [];
    let [sort, order] = this.props.defaultSort.split(' ');
    this.views = ['listdetail', 'list', 'listgrid'];
    if (this.props.views instanceof Array) {
      this.views = this.views.filter(v => this.props.views.includes(v));
    }

    this.state = {
      sort: sort,
      order: order,
      opsWidth: '150px',
      selectedIndex: [],
      viewMode: this.props.views && this.props.views[0] || 'listdetail'
    };

    this.publicProps = {
      ref: (table) => this.table = table,
      shortcut: true,
      fit: true,
      scrollOnCheck: true,
      contextSelected: true,
      onSelect: this.handleSelectItem,
      onSelectAll: this.handleSelectAllItem,
      onCheck: this.handleCheckItem,
      onCheckAll: this.handleCheckAllItem,
      onDoubleClick: this.handleDoubleClickItem,
      onContextMenu: this.handleContextMenuItem,
      onLoadMore: "loadMore",
      moreText: this.props.moreText,
      showMore: this.props.showMore
    };
  }

  $emit() {
    let funcName = arguments[0];
    funcName = 'on' + funcName[0].toUpperCase() + funcName.substring(1);
    let args = Array.prototype.slice.apply(arguments);
    args = args.slice(1);
    typeof this.props[funcName] === 'function' && this.props[funcName](...args);
  }

  gettext(value) {
    return this.props.translate && this.props.translate[value] || value;
  }

  formatDate(value) {
    return timeToDate(value * 1000);
  }

  formatSize(value, item) {
    return item.dir ? '-' : bitSize(value);
  }

  getSortIcon(key) {
    let icon = '';
    if (key === this.state.sort) {
      icon = this.state.order === 'asc' ? 'gk-icon-longarrowup' : 'gk-icon-longarrowdown';
    }
    return icon;
  }

  getFileList() {
    const fileList = [];
    this.props.list.forEach((file) => {
      if (!file.dir) {
        fileList.push(file);
      }
    });
    return fileList;
  }

  commandFile(command) {
    this.$emit('command', this.getSelected(), command);
  }

  loadMore() {
    if (this.list.length === this.total) {
      return;
    }
    this.$emit('loadMore', this.value);
  }

  openFile(file) {
    this.setState({
      previewFile: file,
      preview: !file.dir
    })
  }

  getNavs() {
    let navs = [];
    let file = this.props.current;

    if (file && file.fullpath) {
      navs.unshift(file);
      let fullpath = dirName(file.fullpath);
      while (fullpath) {
        navs.unshift({
          filename: baseName(fullpath),
          fullpath: fullpath,
          dir: 1
        });
        fullpath = dirName(fullpath);
      }
    }

    Object.keys(this.props.root).length && navs.unshift(this.props.root);
    navs.forEach((nav, index) => {
      if (this.navList[index] && nav.fullpath === this.navList[index].fullpath) {
        navs[index] = this.navList[index]
      }
    });
    return navs;
  }

  getSelected() {
    return this.table.getSelected();
  }

  handleSelectItem = (files, event) => {
    this.$emit('select', files, event);
  };

  handleSelectAllItem = (event) => {
    this.$emit('selectAll', event);
  };

  handleCheckItem = (files, event) => {
    this.$emit('check', files, event);
  };

  handleCheckAllItem = (event) => {
    this.$emit('checkAll', event);
  };

  handleContextMenuItem = (files, event) => {
    if (!this.buttons || !this.buttons.length) {
      return;
    }
    if (this.props.beforeContextMenu && this.props.beforeContextMenu(files, event) === false) {
      return;
    }
    this.contextmenu.show(event);
  };

  handleDoubleClickItem = (file, index, event) => {
    if (this.props.onBeforeEnter && this.props.onBeforeEnter(file, event) === false) {
      return;
    }
    this.navList.push(file);
    this.openFile(file);
    this.$emit('enter', file);
  };

  handleViewMode = (mode) => {
    this.setState({
      viewMode: mode,
      selectedIndex: this.table.getSelectedIndex()
    });
  };

  handleNavigator = (value, file, index) => {
    this.navList = this.navList.slice(0, index + 1);
    this.handleSelectItem(null);
    this.$emit('navigator', value, file);
  };

  handleSort = (command) => {
    let order = this.state.order;
    if (this.state.sort === command) {
      order = order === 'desc' ? 'asc' : 'desc';
    }
    this.setState({
      order: order,
      sort: command
    });
    this.$emit('sort', this.sort, this.order);
  };

  componentDidMount() {
    if (this.props.current && Object.keys(this.props.current).length) {
      this.openFile(this.props.current);
    }
    this.setState({
      opsWidth: this.opsRef.clientWidth + 'px'
    });
  }

  renderListGrid() {
    return <Thumbnail {...this.publicProps} border={0} checkbox={this.props.checkbox} data={this.props.list}
                      defaultIndex={this.state.selectedIndex} loading={this.props.loading}
                      render={(file) =>
                        <React.Fragment>
                          <p><Fileicon thumbnail={file.thumbnail} filename={file.filename} size="128"
                                       folder={!!file.dir}/></p>
                          <p className="gk-finder-filename">{file.filename}</p>
                        </React.Fragment>
                      }/>
  }

  renderList() {
    return <Table {...this.publicProps} header data={this.props.list} itemHeight={this.props.itemHeight}
                  defaultIndex={this.state.selectedIndex} loading={this.props.loading}>
      <Table.Column checkbox={this.props.checkbox} width={25} align="center"/>
      <Table.Column property="filename" label={this.gettext('filename')} render={(file) =>
        <div className="gk-finder-filename-column">
          <Fileicon thumbnail={file.thumbnail} filename="file.filename" size="20" folder={!!file.dir}/>
          {file.filename}
        </div>
      }/>
      <Table.Column property="last_dateline" label={this.gettext('last_dateline')} formatter={this.formatDate}
                    width={180}/>
      <Table.Column property="filesize" label={this.gettext('size')} formatter={this.formatSize} width={80}/>
      <Table.Column width="10%"/>
    </Table>
  }

  renderListDetail() {
    return <Table {...this.publicProps} data={this.props.list} itemHeight={this.props.itemHeight + 20}
                  defaultIndex={this.state.selectedIndex} loading={this.props.loading}>
      <Table.Column width={25} checkbox={this.props.checkbox} align="center"/>
      <Table.Column property="filename" label="gettext('filename')" render={(file) =>
        <div className="gk-finder-filename-column">
          <Fileicon thumbnail={file.thumbnail} filename={file.filename} size="32" folder={!!file.dir}/>
          <div>
            <p>{file.filename}</p>
            <p>
              <span>{file.last_member_name}</span>
              <span>{this.formatDate(file.last_dateline)}</span>
              {file.filesize && <span>{this.formatSize(file.filesize, file)}</span>}
            </p>
          </div>
        </div>
      }/>
      <Table.Column width="20%"/>
    </Table>
  }

  render() {
    let viewContent;
    switch (this.state.viewMode) {
      case 'listgrid':
        viewContent = this.renderListGrid();
        break;
      case 'list':
        viewContent = this.renderList();
        break;
      default:
        viewContent = this.renderListDetail();
    }
    const isPreview = this.props.current && this.props.current.dir === 0;
    const navData = this.getNavs();
    return (
      <div className="gk-finder">
        {this.props.header}
        <div className="gk-finder-toolbar">
          <Breadcrumb data={navData} id="fullpath" onNavigator={this.handleNavigator} label="filename"
                      value="fullpath" style={{marginRight: this.state.opsWidth}}/>
          {!isPreview && <div ref={(ops) => this.opsRef = ops} className="gk-finder-show-ops">
            {this.props.breadcrumb}
            {this.props.sortList &&
            <Dropdown style={{display: 'inline-block'}} command={this.handleSort} menu={
              <Dropdown.Menu arrow>
                {
                  this.props.sortList.map((sort, idx) =>
                    <Dropdown.Item icon={this.getSortIcon(sort.value)} command={sort.value} key={idx}>
                      {sort.label}
                    </Dropdown.Item>)
                }
              </Dropdown.Menu>
            }>
              <Button icon="gk-icon-sort" className="gk-finder-sort-button" plain/>
            </Dropdown>
            }
            <Button.Group plain className="gk-finder-view-mode">
              {
                this.views.map((view, index) =>
                  <Button size="mini" key={index} icon={'gk-icon-' + view} isActive={this.state.viewMode === view}
                          onClick={() => this.handleViewMode(view)}/>)
              }
            </Button.Group>
          </div>}
        </div>

        <div className={'gk-finder-content gk-finder-view-' + this.state.viewMode}>
          {isPreview &&
          <Slide fit toolbar
                 options={this.props.previewToolbar}
                 list={this.getFileList()}
                 current={this.props.current}>
            {(file) => !!this.props.getPreviewUrl &&
              <iframe src={this.props.getPreviewUrl(file)}/>
            }
          </Slide> || viewContent}
        </div>

        {this.props.buttons &&
        <Menu ref={(contextmenu) => this.contextmenu = contextmenu} data={this.props.buttons} command="commandFile"/>}
        {this.props.footer}
      </div>
    )
  }
}

Finder.propTypes = {
  list: PropTypes.array,
  current: PropTypes.object,
  root: PropTypes.object,
  itemHeight: PropTypes.number,
  sortList: PropTypes.array,
  defaultSort: PropTypes.string,
  showMore: PropTypes.bool,
  moreText: PropTypes.string,
  checkbox: PropTypes.bool,
  total: PropTypes.number,
  buttons: PropTypes.array,
  loading: PropTypes.bool,
  previewToolbar: PropTypes.object,
  translate: PropTypes.object,
  getPreviewUrl: PropTypes.func,
  beforeEnter: PropTypes.func,
  beforeContextMenu: PropTypes.func,
  views: PropTypes.array,
  footer: PropTypes.any,
  header: PropTypes.any,
  breadcrumb: PropTypes.any,
  onBeforeEnter: PropTypes.func,
  onSort: PropTypes.func,
  onEnter: PropTypes.func,
  onNavigator: PropTypes.func,
  onLoadMore: PropTypes.func
};

Finder.defaultProps = {
  itemHeight: 42
};
export default Finder;