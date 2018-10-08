import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // eslint-disable-next-line
    let el = ReactDom.findDOMNode(this.elRef);
    let position = window.getComputedStyle(el.children[0]).position;
    if (position === 'static' || position === '') {
      this.static = true;
    }
  }

  render() {
    const classList = classnames({
      'gk-loading-scope': this.props.loading
    });
    const style = {position: this.props.loading && this.static ? 'relative' : ''};
    return (<div className={classList} style={style} ref={el => this.elRef = el}>
      {this.props.children}
      {this.props.loading &&
      <div key="loading" className="gk-loading-wrapper"
           style={{
             backgroundColor: this.props.backgroundColor,
             opacity: 1
           }}>
        <div className={classnames({'gk-loading': true, 'gk-loading-text': this.props.text !== undefined})}>
          <svg className="gk-loading-spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"/>
          </svg>
          {this.props.text !== undefined && <p>{this.props.text}</p>}
        </div>
      </div>}
    </div>);
  }
}

Loading.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  children: PropTypes.object,
  backgroundColor: PropTypes.string
};

export default Loading;