import React from 'react';
import {bitSize} from "../../src/common/util";
import {GkUploader,GkButton,GkTable} from 'gokuai-components/src';


class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.list = [];
    this.formData = {
      code: ''
    };
    this.autoButtons = [
      {
        class: 'auto-gk-uploader-file',
        type: 'file',
        label: '上传文件'
      },
      {
        class: 'auto-gk-uploader-folder',
        type: 'folder',
        label: '上传文件夹',
      }
    ];
    this.dialogButtons = [
      {
        class: 'dialog-gk-uploader-file',
        type: 'file',
        label: '上传文件'
      },
      {
        class: 'dialog-gk-uploader-folder',
        type: 'folder',
        label: '上传文件夹',
      }
    ];
    this.translate = {
      'delete': '删除',
      'upload file': '上传文件',
      'upload folder': '上传文件夹',
      'Upload Finish': '上传完成',
      'Uploading (:n/:t)': '上传中(:n/:t)'
    };
  }

  checkSize({size}) {
    if (size > 2090774) {
      return '超出大小[401]';
    }
    return true;
  }

  formatSize(value) {
    return bitSize(value);
  }

  uploadSuccess(file) {
    this.list.push({
      name: file.name,
      size: file.size
    })
  }

  handleUpload = () => {
    this.uploader.upload();
  };

  render() {
    return (
      <div className="container">
        <h3 className="demo-title">
          文件上传
        </h3>
        <div className="demo-block" style={{width: '800px'}}>
          <div className="demo-toolbar">
            <GkUploader.Buttons buttons={this.autoButtons} dropdown>上传</GkUploader.Buttons>
          </div>
          <GkUploader buttons={this.autoButtons} style={{height: '400px'}}
                       server="http://yunku.goukuai.test/index/test_upload" headTpl="已选择:d个" fit>
            <h3>可直接拖拽文件到这里上传，最大文件不超过1GB</h3>
            <div>
              <h4>温馨提示:</h4>
              <ul>
                <li>1.支持IE10以上或极速浏览器</li>
                <li>2.严格遵守法律法规，严禁在互联网上存储，处理，传输，发布泄密信息</li>
              </ul>
            </div>
          </GkUploader>
        </div>
        <h3 className="demo-title">
          文件手动上传
        </h3>
        <div className="demo-block" style={{width: '1024px'}}>
          <div className="demo-toolbar">
            <GkUploader.Buttons translate={this.translate} />
            <GkButton onClick={this.handleUpload} style={{marginLeft: '5px'}}>开始上传</GkButton>
          </div>
          <GkUploader before-check={this.checkSize} style={{height: '600px'}} ref={(uploader) => {this.uploader = uploader}}
                       server="http://yunku.goukuai.test/index/test_upload" headTpl="已选择:d个" fit auto={false}
                       form-data={this.formData}>
            <div>
              <h4>温馨提示:</h4>
              <ul>
                <li>1.支持IE10以上或极速浏览器</li>
                <li>2.严格遵守法律法规，严禁在互联网上存储，处理，传输，发布泄密信息</li>
              </ul>
            </div>
          </GkUploader>
        </div>
        <h3 className="demo-title">
          弹出式上传
        </h3>
        <div className="demo-block" style={{width: '1024px', height: '660px'}}>
          <div className="demo-toolbar">
            <GkButton.Group>
              <GkUploader.Buttons buttons={this.dialogButtons} dropdown>上传</GkUploader.Buttons>
              <GkButton>下载</GkButton>
            </GkButton.Group>
          </div>
          <GkTable data={this.list} height="600" className="file-list" empty={<div className="gk-uploader-empty">
            <div className="gk-uploader-empty-content" style={{marginLeft: '-234px', marginTop: '-71px'}}>
              <h3>可直接拖拽文件到这里上传，最大文件不超过1GB</h3>
              <div>
                <h4>温馨提示:</h4>
                <ul>
                  <li>1.支持IE10以上或极速浏览器</li>
                  <li>2.严格遵守法律法规，严禁在互联网上存储，处理，传输，发布泄密信息</li>
                </ul>
              </div>
            </div>
          </div>}>
            <GkTable.Column width="40" />
            <GkTable.Column property="name" label="文件名" />
            <GkTable.Column property="size" width="120" formatter={this.formatSize} label="文件大小" />
          </GkTable>
          <GkUploader onBeforeCheck={this.checkSize} buttons={this.dialogButtons} translate={this.translate} dnd=".file-list" dialog
                       style={{width: '600px',right: '20px', bottom: 0}} server="http://yunku.goukuai.test/index/test_upload"
                       head-tpl="已选择:d个" height={400} success={this.uploadSuccess}>
            <div>
              <h4>温馨提示:</h4>
              <ul>
                <li>1.支持IE10以上或极速浏览器</li>
                <li>2.严格遵守法律法规，严禁在互联网上存储，处理，传输，发布泄密信息</li>
              </ul>
            </div>
          </GkUploader>
        </div>
      </div>
    )
  }
}

export default Upload;