import React from 'react';
import {GkDropdown, GkButton} from 'gokuai-components/src';

export default class Dropdown extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="demo-title">
          下拉选择框
        </h3>
        <div className="demo-block" style={{padding: '20px'}}>
          <GkDropdown style={{display: 'inline-block'}} menu={
            <GkDropdown.Menu show-arrow>
              <GkDropdown.Item>下拉项一</GkDropdown.Item>
              <GkDropdown.Item>下拉项二</GkDropdown.Item>
              <GkDropdown.Item>下拉项三</GkDropdown.Item>
              <GkDropdown.Item>下拉项四</GkDropdown.Item>
            </GkDropdown.Menu>
          }>
            <GkButton>点击出下拉</GkButton>
          </GkDropdown>
          <GkDropdown style={{display: 'inline-block'}} menu={
            <GkDropdown.Menu show-arrow trigger="hover">
              <GkDropdown.Item>下拉项一</GkDropdown.Item>
              <GkDropdown.Item>下拉项二</GkDropdown.Item>
              <GkDropdown.Item>下拉项三</GkDropdown.Item>
              <GkDropdown.Item>下拉项四</GkDropdown.Item>
            </GkDropdown.Menu>}>
            <GkButton>划过出下拉</GkButton>
          </GkDropdown>
        </div>
      </div>
    );
  }
}