import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.elRef = React.createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.el = ReactDom.findDOMNode(this.elRef.current || this.elRef);
    let position = window.getComputedStyle(this.el).position;
    if (position === 'static' || position === '') {
      this.static = true;
    }
  }

  render() {
    const el = this.props.children;
    const children = [];
    React.Children.map(el.props.children, (child) => {
        children.push(child);
      }
    );

    if (this.props.loading) {
      children.push(
        <div key={el.props.children.length} className="gk-loading-wrapper"
             style={{
               backgroundColor: this.props.backgroundColor,
               opacity: 1,
               top: this.el.scrollTop + 'px',
               left: this.el.scrollLeft + 'px',
               right: -this.el.scrollLeft + 'px',
               bottom: -this.el.scrollTop + 'px',
             }}>
          <div className={classnames({'gk-loading': true, 'gk-loading-text': this.props.text !== undefined})}>
            <svg className="gk-loading-spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"/>
            </svg>
            {this.props.text !== undefined && <p>{this.props.text}</p>}
          </div>
        </div>
      );
    }

    return React.cloneElement(el, {
      ref: this.elRef,
      children: children,
      className: el.props.className + (this.props.loading ? ' gk-loading-scope' : ''),
      style: {
        position: this.props.loading && this.static ? 'relative' : ''
      }
    });
  }
}

Loading.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  children: PropTypes.object,
  backgroundColor: PropTypes.string
};

export default Loading;