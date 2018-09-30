import React from 'react'
import {GkMenu, GkButton} from 'gokuai-components/src';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      command1: '',
      command2: ''
    };
    this.data = [
      {
        command: '菜单一',
        label: '菜单一'
      }, {
        command: '菜单二',
        label: '菜单二',
        keymap: 'meta+c'
      }, {
        command: '菜单三',
        label: '菜单三',
        after: (<i className="gk-icon-stop"/>)
      }, {
        command: '菜单四',
        label: '菜单四',
        children: [
          {
            command: '菜单五',
            label: '菜单五'
          }, {
            command: '菜单六',
            label: '菜单六',
            children: [
              {
                command: '菜单八',
                label: '菜单八'
              }, {
                command: '菜单九',
                label: '菜单九'
              }
            ]
          }, {
            command: '菜单七',
            label: '菜单七'
          }
        ]
      }
    ];
    this.buttonRef = React.createRef();
    this.blockRef = React.createRef();
  }

  showCommand = (command) => {
    this.setState({command1: command});
  };

  showCommand2 = (command) => {
    this.setState({command2: command});
  };

  render() {
    return (
      <div className="container">
        <h3 className="demo-title">
          点击菜单
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkButton ref={this.buttonRef}>显示菜单</GkButton>
          {this.state.command1}
          <GkMenu target={this.buttonRef} command={this.showCommand.bind(this)} show-arrow>
            <GkMenu.Item command="菜单一" icon="gk-icon-stop">菜单一</GkMenu.Item>
            <GkMenu.Item command="菜单二">菜单二</GkMenu.Item>
            <GkMenu.Item command="菜单三">菜单三</GkMenu.Item>
            <GkMenu.Item command="菜单四">菜单四</GkMenu.Item>
          </GkMenu>
        </div>
        <h3 className="demo-title">
          右键菜单
        </h3>
        <div className="demo-block" style={{height: '400px', width: '600px', padding: '20px'}} ref={this.blockRef}>
          当前选中为 {this.state.command2}
        </div>
        <GkMenu target={this.blockRef} trigger="contextmenu" command={this.showCommand2} data={this.data} />
      </div>
    )
  }
}