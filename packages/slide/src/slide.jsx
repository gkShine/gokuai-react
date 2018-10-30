import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from '../../tooltip';

class Slide extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.current || this.props.list[0]
    };
    this.selectedIndex = this.getIndex(this.props.current);
    if (this.props.toolbar) {
      const options = this.props.options;
      this.left = options.left;
      this.right = options.right;
      this.center = this.props.list ? Object.assign({
        prev: 'prev',
        text: '[index] of [count]',
        next: 'next'
      }, options.center) : {
        prev: false,
        text: '',
        right: false
      };
    }
  }

  formatText(text) {
    return text.replace('[index]', this.selectedIndex + 1).replace('[count]', this.props.list.length);
  }

  getIndex(current) {
    if (!this.props.toolbar) {
      return 0;
    }
    let nodeValue = typeof current === 'string' ? current : this.props.id === undefined ? JSON.stringify(current) : current[this.props.id];
    for (let i = 0; i < this.props.list.length; i++) {
      let value = this.props.list[i];
      if (typeof value === 'string') {
        if (value === nodeValue) {
          return i;
        }
      } else {
        if (this.props.id !== undefined) {
          if (value[this.props.id] === nodeValue) {
            return i;
          }
        } else {
          if (JSON.stringify(value) === nodeValue) {
            return i;
          }
        }
      }
    }
    return 0;
  }

  handleBtn(btn) {
    if (typeof btn.handle === 'function') {
      btn.handle(this.state.selected);
    }
  }

  handlePrev = () => {
    if (this.selectedIndex === 0) {
      return;
    }
    this.setState({
      selected: this.props.list[--this.selectedIndex]
    });
    this.props.onChange && this.props.onChange(this.state.selected);
  };

  handleNext = () => {
    if (this.selectedIndex === (this.props.list.length - 1)) {
      return;
    }
    this.setState({
      selected: this.props.list[++this.selectedIndex]
    });
    this.props.onChange && this.props.onChange(this.state.selected);
  };

  handleDocumentKeydown = (event) => {
    if (event.keyCode === 37) { //arrow left
      this.handlePrev();
      event.preventDefault();
    } else if (event.keyCode === 39) { //arrow right
      this.handleNext();
      event.preventDefault();
    }
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({
        selected: nextProps.current
      });
      this.selectedIndex = this.getIndex(nextProps.current);
    }
    return true;
  }

  componentDidMount() {
    if (this.props.shortcut && this.props.list) {
      document.addEventListener('keydown', this.handleDocumentKeydown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeydown);
  }

  render() {
    const classList = classnames({
      'gk-slide': true,
      'gk-slide-fit': this.props.fit,
      'gk-slide-with-toolbar': this.props.toolbar
    });

    return (
      <section className={classList}>
        <div className="gk-slide-content">
          {!!this.props.children && this.props.children(this.state.selected) ||
          <div className="gk-slide-images"><img src={this.state.selected}/></div>}
        </div>
        {
          this.props.toolbar && (
            <div className="gk-slide-toolbar">
              <div className="gk-slide-toolbar-left">
                {this.left && this.left.map((btn, idx) => <Tooltip placement="top" key={idx}><i className={btn.icon} title={btn.title}
                                                                      onClick={() => this.handleBtn(btn)}/></Tooltip>)}
              </div>
              <div className="gk-slide-toolbar-center">
                {this.center.prev && <Tooltip placement="top"><i title={this.center.prev} className={classnames({
                  'gk-icon-angleleft': true,
                  'gk-disable': this.selectedIndex === 0
                })} onClick={this.handlePrev}/></Tooltip>}
                <span>{this.formatText(this.center.text)}</span>
                {this.center.next && <Tooltip placement="top"><i title={this.center.next} className={classnames({
                  'gk-icon-angleright': true,
                  'gk-disable': this.selectedIndex === (this.props.list.length - 1)
                })} onClick={this.handleNext}/></Tooltip>}
              </div>
              <div className="gk-slide-toolbar-right">
                {this.right && this.right.map((btn, idx) => <Tooltip placement="top" key={idx}><i className={btn.icon} title={btn.title}
                                                               onClick={() => this.handleBtn(btn)}/></Tooltip>)}
              </div>
            </div>)
        }
      </section>
    );
  }
}

Slide.propTypes = {
  fit: PropTypes.bool,
  toolbar: PropTypes.bool,
  list: PropTypes.array,
  options: PropTypes.object,
  current: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  id: PropTypes.string,
  children: PropTypes.func,
  onChange: PropTypes.func,
  shortcut: PropTypes.bool
};

Slide.defaultProps = {
  options: {},
  shortcut: true
};

export default Slide;