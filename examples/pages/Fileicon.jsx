import React from 'react'
import {GkFileicon} from 'gokuai-components/src';

export default class Fileicon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h3 className="demo-title">
          文件图标
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkFileicon size="256" filename="file.png"/>
          <GkFileicon size="128" filename="file.png"/>
          <GkFileicon size="64" filename="file.png"/>
          <GkFileicon size="32" filename="file.png"/>
          <GkFileicon size="24" filename="file.png"/>
          <GkFileicon size="16" filename="file.png"/>
        </div>
        <h3 className="demo-title">
          文件类型
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkFileicon size="64" filename="file.png"/>
          <GkFileicon size="64" filename="file.mp4"/>
          <GkFileicon size="64" filename="file.mp3"/>
          <GkFileicon size="64" filename="file.php"/>
          <GkFileicon size="64" filename="file.html"/>
          <GkFileicon size="64" filename="file.js"/>
          <GkFileicon size="64" filename="file.txt"/>
          <GkFileicon size="64" filename="file.rar"/>
          <GkFileicon size="64" filename="file.exe"/>
          <GkFileicon size="64" filename="file.ai"/>
          <GkFileicon size="64" filename="file.apk"/>
          <GkFileicon size="64" filename="file.cdr"/>
          <GkFileicon size="64" filename="file.dmg"/>
          <GkFileicon size="64" filename="file.md"/>
          <GkFileicon size="64" filename="file.psd"/>
          <GkFileicon size="64" filename="file.ipa"/>
          <GkFileicon size="64" filename="file.gnode"/>
          <GkFileicon size="64" filename="file.doc"/>
          <GkFileicon size="64" filename="file.xls"/>
          <GkFileicon size="64" filename="file.ppt"/>
          <GkFileicon size="64" filename="file.udf"/>
          <GkFileicon size="64" type="lock"/>
        </div>
        <h3 className="demo-title">
          文件夹类型
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkFileicon size="64" folder/>
          <GkFileicon size="64" folder type="share"/>
          <GkFileicon size="64" folder type="cache"/>
          <GkFileicon size="64" folder type="download"/>
          <GkFileicon size="64" folder type="lock"/>
          <GkFileicon size="64" folder type="sync"/>
          <GkFileicon size="64" folder type="upload"/>
          <GkFileicon size="64" folder type="collection-public"/>
          <GkFileicon size="64" folder={true} type="collection-private"/>
        </div>
        <h3 className="demo-title">
          文件缩略图
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkFileicon size="256" filename="file.png"
                      thumbnail="http://pic.58pic.com/58pic/14/91/48/58Q58PICM3d_1024.jpg"/>
          <GkFileicon size="128" filename="file.png"
                      thumbnail="http://pic.58pic.com/58pic/14/91/48/58Q58PICM3d_1024.jpg"/>
          <GkFileicon size="64" filename="file.png"
                      thumbnail="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_58ae1.png"/>
        </div>
      </div>
    )
  }
}