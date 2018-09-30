import React from 'react';
import {getData} from "../api";
import {GkTable} from 'gokuai-components/src';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    getData({size: 20}).then(data => {
      this.setState({
        data: data
      })
    });
  }

  handleSort = (column, order) => {
    console.log(column, order);
  };

  render() {
    return (
      <div className="container">
        <h3 className="demo-title">
          基础表格
        </h3>
        <div className="demo-block">
          <GkTable data={this.state.data} shortcut onContextMenu={(selected) => {console.log(selected)}}>
            <GkTable.Column width={10}/>
            <GkTable.Column property="id"/>
            <GkTable.Column property="name"/>
            <GkTable.Column property="username"/>
            <GkTable.Column property="date"/>
          </GkTable>
        </div>
        <h3 className="demo-title">
          含有选择框表格
        </h3>
        <div className="demo-block">
          <GkTable data={this.state.data} shortcut header height={500} onSort={this.handleSort}>
            <GkTable.Column width={30} checkbox/>
            <GkTable.Column width={100} property="id" label="#"/>
            <GkTable.Column property="name" label="标题" sortable="desc"/>
            <GkTable.Column width={150} property="username" label="名字"/>
            <GkTable.Column width={200} property="date" sortable label="时间"/>
          </GkTable>
        </div>
      </div>
    )
  }
}

export default Table;