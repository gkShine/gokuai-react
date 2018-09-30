import React from 'react';
import {GkSlide} from 'gokuai-components/src';
import {getData} from "../api";

import './Slide.scss';

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      images: []
    };
  }

  componentDidMount() {
    getData({size: 20}).then(data => {
      let images = [];
      data.forEach(dat => {
        images.push(dat.pic);
      });
      this.setState({
        data: data,
        images: images
      })
    });
  }

  render() {
    const style = {height: '400px', width: '600px'};
    const options = {
      left: [{
        title: '下载',
        icon: 'fa fa-save',
        handle(btn) {
          console.log(btn);
        }
      }]
    };
    return (
      <div className="container">
        <h3 className="demo-title">
          单文件幻灯片
        </h3>
        <div className="demo-block" style={style}>
          {this.state.images.length > 0 && <GkSlide fit current={this.state.images[2]}/>}
        </div>
        <h3 className="demo-title">
          多文件幻灯片
        </h3>
        <div className="demo-block" style={style}>
          {this.state.images.length > 0 && <GkSlide fit list={this.state.images} toolbar current={this.state.images[1]}/>}
        </div>
        <h3 className="demo-title">
          图文幻灯片
        </h3>
        <div className="demo-block" style={style}>
          {this.state.data.length > 0 && <GkSlide fit list={this.state.data} toolbar options={options}>
            {(item) => (<div className="item">
                <h4>{item.name}</h4>
                <p>
                  <img src={item.pic}/>
                </p>
              </div>)}
          </GkSlide>}
        </div>
      </div>
    );
  }
}

export default Slide;