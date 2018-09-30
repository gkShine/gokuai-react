import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import WebUploader from 'webuploader';
import swgimg from 'webuploader/dist/Uploader.swf';
import Table from "gokuai-components/packages/table/src/table";
import Fileicon from "gokuai-components/packages/fileicon/src/fileicon";
import {isIE, bitSize} from "gokuai-components/src/common/util";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mini: true,
      list: [],
      finishFiles: [],
      headLabel: this.props.headTpl.replace(':d', 0),
      hidden: this.props.dialog,
      emptyStyle: {}
    };

    this.states = {
      ready: 'ready',
      pause: 'pause',
      cancel: 'cancel',
      progress: 'progress',
      success: 'success',
      uploadError: 'uploadError',
      error: 'error'
    };

    const defaultButtons = {
      delete: {
        type: 'delete',
        class: 'gk-uploader-delete'
      },
      file: {
        type: 'file',
        class: 'gk-uploader-file',
        multiple: true
      },
      folder: {
        type: 'folder',
        class: 'gk-uploader-folder',
        multiple: true
      }
    };

    //获取操作按钮
    let list = [];
    if (this.props.buttons === undefined) {
      list = Object.values(defaultButtons);
    } else {
      this.props.buttons.forEach((button) => {
        if (button.type === 'folder' && isIE()) {
          return;
        }
        list.push(Object.assign(defaultButtons[button.type], button));
      });
    }

    this.buttonList = list;
    this.list = [];
    this.finishFiles = [];
    this.relation = {};
  }

  $emit() {
    let funcName = arguments[0];
    funcName = 'on' + funcName[0].toUpperCase() + funcName.substring(1);
    let args = Array.prototype.slice.apply(arguments);
    args = args.slice(1);
    typeof this.props[funcName] === 'function' && this.props[funcName](...args);
  }

  dialogTitle() {
    if (this.finishFiles.length === this.list.length) {
      return this.gettext('Upload Finish');
    }
    return this.gettext('Uploading (:n/:t)').replace(':n', this.finishFiles.length).replace(':t', this.list.length);
  }

  gettext(value) {
    return this.props.translate && this.props.translate[value] || value;
  }

  updateData(data) {
    this.uploader.option('formData', data);
  }

  updateList(other) {
    this.setState(Object.assign(other || {}, {
      list: this.list,
      finishFiles: this.finishFiles
    }));
  }

  findList(id) {
    return this.state.list[this.relation[id]];
  }

  removeFile(id) {
    let file = this.uploader.getFile(id);
    this.uploader.removeFile(file);

    let index = this.relation[id];
    this.list.splice(index, 1);
    delete this.relation[id];

    //更新关联
    for (let i = index; i < this.list.length; i++) {
      this.relation[this.list[i].id] = i;
    }
  }

  initDelete(selector) {
    this.deleteButtons = document.querySelectorAll(selector);
    this.deleteButtons.forEach((button) => {
      this.props.hideDelete && (button.style.display = 'none');
      button.onclick = () => {
        let checked = this.table.getChecked();
        checked.forEach(file => {
          this.removeFile(file.id);
        });
        this.updateList();
        this.handleCheck();
      };
    });
  }

  addFolderProperty(button) {
    let timer = setInterval(() => {
      let inputs = document.querySelectorAll(`.${button.class} input[type=file]`);

      if (inputs.length > 0) {
        inputs.forEach((input) => {
          input.setAttribute('webkitdirectory', '');
        });
        clearInterval(timer);
      }
    }, 10);
  }

  updateEmptyPosition() {
    let position = this.empty.getBoundingClientRect();
    this.setState({
      emptyStyle: {
        width: this.props.emptyWidth + 'px',
        marginLeft: -this.props.emptyWidth / 2 + 'px',
        marginTop: -position.height / 2 + 'px'
      }
    });
  }

  webUpload = (picker) => {
    if (this.uploader !== undefined) {
      this.uploader.addButton(picker);
      return this.uploader;
    }
    let uploader = WebUploader.create(Object.assign({
      chunked: this.props.chunked,
      auto: this.props.auto,
      swf: swgimg,
      server: this.props.server,
      pick: picker,
      formData: this.props.formData || {},
      dnd: this.props.dnd === undefined ? undefined : typeof this.props.dnd !== 'string' ? '.gk-uploader' : this.props.dnd,
      disableGlobalDnd: !!this.props.dnd
    }, this.props.options || {}));

    uploader.on('fileQueued', (file) => {
      let result = this.props.onBeforeCheck ? this.props.onBeforeCheck(file) : true;
      this.list.push({
        id: file.id,
        name: file.name,
        path: file.source.source.webkitRelativePath || file.name,
        state: result === true ? this.states.ready : this.states.error,
        size: file.size,
        percent: 0,
        speed: 0
      });
      this.relation[file.id] = this.list.length - 1;
      if (result !== true) {
        this.finishFiles.push(file);
        file.setStatus('invalid', result);
      }
      this.updateList({
        hidden: false,
        mini: false
      });
      this.$emit('before', file);
    });

    uploader.on('uploadProgress', (file, percent) => {
      let item = this.findList(file.id);
      let timestamp = new Date().getTime();
      let diffSecond = (timestamp - (item.timestamp || timestamp - 1000)) / 1000;
      let diffSize = (percent - item.percent) * item.size;
      Object.assign(item, {
        state: this.states.progress,
        percent: percent,
        timestamp: timestamp,
        speed: diffSize / diffSecond
      });
      this.updateList();
      this.$emit('progress', file, percent);
    });

    uploader.on('uploadBeforeSend', (object, data) => {
      let item = this.findList(object.file.id);
      data.path = item.path.substring(0, item.path.lastIndexOf(data.name) - 1);
    });

    uploader.on('uploadSuccess', (file, response) => {
      let item = this.findList(file.id);
      let result = this.onCheckResponse ? this.onCheckResponse(file, response) : true;
      if (result === true) {
        item.state = this.states.success;
      } else {
        item.state = this.states.uploadError;
        file.setStatus('error', result);
      }
      let other = {};
      this.finishFiles.push(file);
      if (this.finishFiles.length === this.list.length) {
        this.$emit('finish');
        this.props.dialog && (other.mini = true);
      }
      this.updateList(other);
      this.$emit('success', file, response);
    });

    uploader.on('uploadError', (file, reason) => {
      let item = this.findList(file.id);
      item.state = this.states.uploadError;
      file.setStatus('error', reason);
      this.updateList();
      this.$emit('uploadError', file, reason);
    });

    uploader.on('error', type => {
      const desc = {
        F_EXCEED_SIZE: '文件大小超过限制',
        Q_EXCEED_NUM_LIMIT: '文件上传数超出限制'
      };
      this.$emit('error', null, type, desc);
    });

    uploader.on('uploadComplete', (file, response) => {
      this.$emit('complete', file, response);
    });

    this.uploader = uploader;
    return uploader;
  };

  formatState = (value, data) => {
    let stateText = '';
    switch (data.state) {
      case this.states.ready:
        stateText = this.auto ? this.gettext('ready') : '';
        break;
      case this.states.pause:
        stateText = this.gettext('paused');
        break;
      case this.states.success:
        stateText = this.gettext('successful');
        break;
      case this.states.cancel:
        stateText = this.gettext('canceled');
        break;
      case this.states.uploadError:
      case this.states.error:
        // eslint-disable-next-line
        const file = this.uploader.getFile(data.id);
        stateText = file.statusText;
        break;
    }
    if (stateText) {
      return <span className={'uploader-state-' + data.state} >{stateText}</span>;
    }
    if (data.percent > 0) {
      return `${(data.percent * 100).toFixed(2)}% ${bitSize(data.speed, true)}/s`;
    }
    return '';
  };

  formatOption = (value, data) => {
    let icons = [];
    switch (data.state) {
      case this.states.ready:
      case this.states.error:
        if (!this.props.auto) {
          icons.push(<i key={data.state} className="gk-icon-times" onClick={() => {
            this.removeFile(data.id);
          }}/>);
        }
        break;
      case this.states.pause:
        icons.push(<i key={data.state} className="gk-icon-playarrow" onClick={() => {
          let file = this.uploader.getFile(data.id);
          this.uploader.upload(file);
          data.state = this.states.progress;
        }}/>);
        break;
      case this.states.progress:
        if (this.chunked) {
          icons.push(<i key={data.state} className="gk-icon-pause" onClick={() => {
            this.uploader.stop(data.id);
            data.state = this.states.pause;
          }}/>);
        }
        break;
      case this.states.cancel:
      case this.states.uploadError:
        icons.push(<i key={data.state} className="gk-icon-redo" onClick={() => {
          let file = this.uploader.getFile(data.id);
          this.uploader.retry(file);
          data.state = this.states.progress;
        }
        }/>);
        break;
    }
    if ([this.states.pause, this.states.progress].indexOf(data.state) > -1) {
      icons.push(<i key={data.state} className="gk-icon-times" onClick={() => {
        this.uploader.cancelFile(data.id);
        Object.assign(data, {
          state: this.states.cancel,
          percent: 0,
          speed: 0
        })
      }}/>);
    }
    return icons;
  };

  upload = () => {
    this.uploader.upload();
  };

  handleMiniClick = () => {
    this.setState({
      mini: !this.state.mini
    });
  };

  handleHideClick = () => {
    this.setState({
      hidden: true
    })
  };

  handleCheck = () => {
    setTimeout(() => {
      this.setState({
        headLabel: this.props.headTpl.replace(':d', this.table.getCheckedIndex().length)
      });
    }, 20);
  };

  componentDidMount() {
    this.updateEmptyPosition();
    if (this.props.picker !== undefined) {
      this.webUpload(this.props.picker);
    } else {
      this.buttonList.forEach((button) => {
        switch (button.type) {
          case 'delete':
            this.initDelete('.' + button.class);
            break;
          case 'file':
            this.webUpload({
              id: '.' + button.class,
              multiple: button.multiple
            });
            break;
          case 'folder':
            this.webUpload({
              id: '.' + button.class,
              multiple: button.multiple
            });
            this.addFolderProperty(button);
            break;
        }
      });
    }
  }

  render() {
    let classList = classnames({
      [this.props.className]: !!this.props.className,
      'gk-uploader': true,
      'gk-uploader-dialog': this.props.dialog
    });
    let style = Object.assign({
      display: this.state.hidden ? 'none' : 'block',
      height: this.state.mini ? 'auto' : this.props.height + 'px'
    }, this.props.style || {});
    return (<section className={classList} style={style}>
      {this.props.dialog && (<div className="gk-uploader-head">
        <h2>{this.dialogTitle()}</h2>
        <div>
          <i className={'gk-icon-window-' + (this.state.mini ? 'maximize' : 'minimize')}
             onClick={this.handleMiniClick}/><i
          className="gk-icon-times" onClick={this.handleHideClick}/>
        </div>
      </div>)}
      <div className="gk-uploader-body">
        <Table fit={this.props.fit || this.props.dialog}
               ref={(table) => this.table = table}
               data={this.state.list}
               header={!this.props.auto}
               showCheckbox={!this.props.auto}
               height={this.props.height}
               onCheck={this.handleCheck}
               onCheckAll={this.handleCheck}
               onBeforeSelect={() => false}
               empty={<div className="gk-uploader-empty">
                 <div ref={empty => this.empty = empty} className="gk-uploader-empty-content"
                      style={this.state.emptyStyle}>
                   {this.props.children}
                 </div>
               </div>}
        >
          <Table.Column checkbox={!this.props.auto} width={30} align="center"/>
          <Table.Column property="name" label={this.state.headLabel} render={
            (props) => <React.Fragment>
              <Fileicon filename={props.name} size="24"/>
              {props.name}
            </React.Fragment>
          }>
          </Table.Column>
          <Table.Column property="size" width={80} formatter={value => bitSize(value)}/>
          <Table.Column property="percent" width={130} formatter={this.formatState}/>
          <Table.Column property="state" formatter={this.formatOption} align="center" width={100}/>
        </Table>
      </div>
    </section>)
  }
}

Uploader.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  auto: PropTypes.bool,
  fit: PropTypes.bool,
  dnd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  chunked: PropTypes.bool,
  server: PropTypes.string,
  picker: PropTypes.object,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  headTpl: PropTypes.string,
  formData: PropTypes.object,
  buttons: PropTypes.array,
  options: PropTypes.object,
  dialog: PropTypes.bool,
  translate: PropTypes.object,
  hideDelete: PropTypes.bool,
  onBefore: PropTypes.func,
  onBeforeCheck: PropTypes.func,
  onCheckResponse: PropTypes.func,
  emptyWidth: PropTypes.number
};

Uploader.defaultProps = {
  auto: true,
  height: 400,
  headTpl: 'selected :d',
  emptyWidth: 500
};

export default Uploader;