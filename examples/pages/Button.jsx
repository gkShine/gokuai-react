import React from 'react';
import {GkButton} from 'gokuai-components/src';

class Button extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="demo-title">
          按钮
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkButton>默认按钮</GkButton>
          <GkButton type="primary">主要按钮</GkButton>
          <GkButton type="success">成功按钮</GkButton>
          <GkButton type="info">信息按钮</GkButton>
          <GkButton type="warning">警告按钮</GkButton>
          <GkButton type="danger">错误按钮</GkButton>
        </div>
        <h3 className="demo-title">
          按钮大小
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkButton>默认按钮</GkButton>
          <GkButton size="medium">中等按钮</GkButton>
          <GkButton size="small">小型按钮</GkButton>
          <GkButton size="mini">超小按钮</GkButton>
        </div>
        <h3 className="demo-title">
          按钮组
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkButton.Group>
            <GkButton>老大</GkButton>
            <GkButton>老二</GkButton>
            <GkButton>老三</GkButton>
          </GkButton.Group>
        </div>
      </div>
    );
  }
}

export default Button;