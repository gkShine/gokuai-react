import React from 'react';
import {GkButton, GkFinder} from 'gokuai-components/src';
import {getFile, getFileList} from "../api";

class Finder extends React.Component {
  constructor(props) {
    super(props);
    this.file = {};
    this.root = {};
    this.cache = {};
    this.moreText = '加载中...';
    this.sort = 'filename asc';
    this.sortList = [
      {
        value: 'filename',
        label: '文件名'
      },
      {
        value: 'last_dataline',
        label: '最后修改'
      },
      {
        value: 'filesize',
        label: '大小'
      }
    ];
    this.state = {
      fileList: [],
      locked: false,
      loading: false,
      total: 0,
      page: 1
    }
  }

  getFiles(fullpath) {
    if (this.cache[fullpath] !== undefined) {
      this.setState({
        file: this.file,
        fileList: this.cache[fullpath]
      });
      return;
    }
    let para = {
      page: 1,
      fullpath: fullpath
    };
    this.setState({
      loading: true
    });
    getFileList(para).then(data => {
      this.cache[fullpath] = data.list;

      this.setState({
        file: this.file,
        page: 1,
        total: data.total,
        loading: false,
        fileList: data.list
      });
    });
  }

  getRoot() {
    getFile({}).then(data => {
      this.root = data;

      this.getFiles(data.fullpath);
    });
  }

  handleLoadMore = (file) => {
    if (this.state.locked) {
      return;
    }
    let para = {
      page: this.state.page + 1,
      fullpath: file.fullpath
    };
    this.setState({
      locked: true
    });
    getFileList(para).then(data => {
      this.setState({
        fileList: this.state.fileList.concat(data.list),
        locked: false,
        total: data.total,
        page: para.page
      });
    });
  };

  getPreviewUrl = (file) => {
    console.log(file);
    return 'http://www.gokuai.com';
  };

  handleNavigator = (fullpath, file) => {
    this.file = file || {
      fullpath: 'fullpath'
    };
    this.getFiles(fullpath);
  };

  handleEnter = (file) => {
    this.file = file;
    if (file.dir) {
      this.getFiles(file.fullpath);
    } else {
      this.setState({
        file: this.file
      });
    }
  };

  componentDidMount() {
    this.getRoot();
  }

  render() {
    return (<div className="container">
      <h3 className="demo-title">
        文件管理器
      </h3>
      <div className="demo-block" style={{height: '768px', width: '1024px'}}>
        <GkFinder checkbox={true}
                  root={this.root}
                  list={this.state.fileList}
                  total={this.state.total}
                  loading={this.state.loading}
                  defaultSort={this.sort}
                  sortList={this.sortList}
                  onLoadMore={this.handleLoadMore}
                  more={this.state.locked}
                  moreText={this.moreText}
                  current={this.state.file}
                  onEnter={this.handleEnter}
                  onNavigator={this.handleNavigator}
                  getPreviewUrl={this.getPreviewUrl}
                  breadcrumb={
                    <GkButton.Group plain style={{marginTop: '-4px', marginRight: '10px'}}>
                      <GkButton size="mini" onClick={(event) => event.stopPropagation()}>上传</GkButton>
                      <GkButton size="mini">下载</GkButton>
                    </GkButton.Group>
                  }
        ><div>测试控控空</div></GkFinder>
      </div>
    </div>)
  }
}

export default Finder;