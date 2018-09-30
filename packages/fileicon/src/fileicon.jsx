import React from 'react';
import PropTypes from 'prop-types';
import {getExt} from 'gokuai-components/src/common/util';

class Fileicon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isThumbnail: !!this.props.thumbnail
    };
  }

  setThumbnailState = (isThumbnail) => {
    this.setState({
      isThumbnail: isThumbnail
    });
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.thumbnail !== this.props.thumbnail) {
      this.setState({
        isThumbnail: !!nextProps.thumbnail
      });
    }
    return true;
  }

  render() {
    let sizeCls = 'gk-fileicon-' + this.props.size;

    if (this.state.isThumbnail) {
      return (<img className={sizeCls} src={this.props.thumbnail} onError={() => this.setThumbnailState(false)} />)
    } else {
      let typeCls = '';
      if (this.props.folder) {
        typeCls = 'gk-fileicon-' + (this.props.type ? this.props.type + '-folder' : 'folder');
      } else {
        typeCls = 'gk-fileicon-' + (this.props.type || getExt(this.props.filename));
      }
      return (<i className={sizeCls + ' ' + typeCls} />);
    }
  }
}

Fileicon.propTypes = {
  folder: PropTypes.bool,
  type: PropTypes.string,
  thumbnail: PropTypes.string,
  filename: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

Fileicon.defaultProps = {
  size: 32
};

export default Fileicon;