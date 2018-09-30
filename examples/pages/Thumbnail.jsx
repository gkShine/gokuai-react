import React from 'react';
import {getData} from "../api";
import {GkThumbnail} from 'gokuai-components/src';

class Thumbnail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      images: []
    }
  }

  componentDidMount() {
    getData({size: 20}).then(data => {
      let images = [];
      data.forEach(dat => {
        images.push(dat.pic)
      });
      this.setState({
        data: data,
        images: images
      })
    });
  }

  render() {
    return (
      <div className="container">
        <h3 className="demo-title">
          基础缩略图
        </h3>
        <div className="demo-block">
          <GkThumbnail data={this.state.images} size={{w: 136, h: 136}}/>
        </div>
        <h3 className="demo-title">
          含有选择框
        </h3>
        <div className="demo-block">
          <GkThumbnail data={this.state.images} size={{w: 136, h: 136}} shortcut checkbox/>
        </div>
      </div>
    );
  }
}

export default Thumbnail;
