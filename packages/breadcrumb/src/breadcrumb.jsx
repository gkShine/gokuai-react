import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../../button';
import Menu from '../../menu';

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.width = 0;
    this.current = '';
    this.timer = 0;
    this.state = {
      list: [],
      menu: [],
      mode: 'normal'
    }
  }

  $emit() {
    let functions = arguments[0];
    let args = Array.prototype.slice.apply(arguments);
    args = args.slice(1);
    functions.split(' ').map((funcName) => {
      funcName = 'on' + funcName[0].toUpperCase() + funcName.substring(1);

      typeof this.props[funcName] === 'function' && this.props[funcName](...args);
    });
  }

  findIndex(item) {
    if (this.props.id) {
      for (let i = 0; i < this.props.data.length; i++) {
        if (this.props.data[i][this.props.id] === item[this.props.id]) {
          return i;
        }
      }
    } else {
      for (let i = 0; i < this.props.data.length; i++) {
        if (JSON.stringify(this.props.data[i]) === JSON.stringify(item)) {
          return i;
        }
      }
    }
    return -1;
  }

  handleShowMenu = (event) => {
    this.moreRef.show(event.target);
    event.nativeEvent.stopImmediatePropagation();
  };

  handleGoto = (event) => {
    if (event.key === 'Enter') {
      this.handleChangeMode('normal');
      if (event.target.value === this.current) {
        return;
      }
      this.$emit('navigator', this.value);
    }
  };

  handlePrevNext = (offset) => {
    if (offset > 0) {
      this.$emit('next');
    } else {
      this.$emit('prev');
    }
  };

  handleClick = (item, event) => {
    if (item[this.value] === this.current) {
      return;
    }
    this.$emit('click navigator', item[this.props.value], item, this.findIndex(item), event);
  };

  handleChangeMode = (mode, event) => {
    let newMode = mode;
    switch (mode) {
      case 'input':
        if (this.props.onNavigator !== undefined) {
          newMode = mode;
        }
        break;
    }
    this.inset = true;
    this.setState({
      mode: newMode
    });
    event && event.nativeEvent.stopImmediatePropagation();
  };

  handleChange = () => {
    if (!this.props.data.length) {
      return;
    }
    this.current = this.props.data[this.props.data.length - 1][this.props.value];
    let data = Array.from(this.props.data);

    setTimeout(() => {
      let children = this.listRef.children;
      let width = children[0].clientWidth + 38;
      let menu = [];
      for (let i = children.length - 1; i > 0; i--) {
        width += children[i].clientWidth;
        if (width >= this.width && i !== children.length - 1) {
          menu = data.splice(1, i);
          break;
        }
      }
      this.inset = true;
      this.setState({
        list: data,
        menu: menu
      });
    }, 100);
  };

  handleDocumentClick = () => {
    this.state.mode === 'input' && this.setState({
      mode: 'normal'
    });
  };

  handleWindowResize = () => {
    if (this.state.mode === 'normal') {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.handleChange();
      }, 500);
    }
  };

  componentDidMount() {
    this.width = this.elRef.clientWidth - 26;
    if (this.props.showNav) {
      this.width = this.width - this.opsRef.clientWidth;
    }
    this.handleChange();
    document.addEventListener('click', this.handleDocumentClick);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate() {
    if (this.inset) {
      this.inset = false;
    } else {
      this.handleChange();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  renderItem(list, item, idx) {
    return <li key={idx} className="gk-breadcrumb-item">
      {
        idx < list.length - 1 &&
        <React.Fragment>
          <a href="javascript:void(0)" title={item[this.props.label]}
             onClick={event => this.handleClick(item, event)}>{item[this.props.label]}</a>
          <i className="gk-icon-angleright"/>
        </React.Fragment> ||
        <span title={item[this.props.label]}
              onClick={event => this.handleChangeMode('input', event)}>{item[this.props.label]}</span>
      }
    </li>
  }

  render() {
    return (
      <div className="gk-breadcrumb" ref={el => this.elRef = el} style={this.props.style}>
        {this.props.showNav &&
        <Button.Group ref={(ops) => this.opsRef = ops} className="gk-breadcrumb-ops" plain>
          <Button icon="gk-icon-angleleft" onClick={() => this.handlePrevNext(-1)}/>
          <Button icon="gk-icon-angleright" onClick={() => this.handlePrevNext(-1)}/>
        </Button.Group>
        }

        <ul ref={list => this.listRef = list} className={classnames({
          'gk-breadcrumb-list': true,
          ['gk-breadcrumb-' + (this.state.mode === 'full' ? 'full' : 'hidden')]: true
        })}>
          {
            this.props.data.map((item, idx) => this.renderItem(this.props.data, item, idx))
          }
        </ul>
        {this.state.mode === 'input' && <input className="gk-breadcrumb-input" defaultValue={this.current} autoFocus
                                               onClick={event => event.nativeEvent.stopImmediatePropagation()}
                                               onKeyPress={this.handleGoto}/>}
        {this.state.mode === 'normal' &&
        <ul className="gk-breadcrumb-list">
          {
            this.state.list.map((item, idx) =>
              <React.Fragment key={idx}>
                {this.state.menu.length > 0 && idx === 1 &&
                <li key={idx + 100} className="gk-breadcrumb-item">
                  <a href="javascript:void(0)" onClick={this.handleShowMenu}>...</a>
                  <i className="gk-icon-angleright"/>
                </li>}
                {this.renderItem(this.state.list, item, idx)}
              </React.Fragment>
            )
          }
        </ul>}
        <Menu ref={more => this.moreRef = more} arrow command={this.handleClick}>
          {
            this.state.menu.map((item, idx) =>
              <Menu.Item key={idx} command={item}>{item[this.props.label]}</Menu.Item>
            )
          }
        </Menu>
      </div>
    )
  }
}

Breadcrumb.propTypes = {
  style: PropTypes.object,
  data: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.string,
  showNav: PropTypes.bool,
  id: PropTypes.string,
  onNavigator: PropTypes.func,
  onClick: PropTypes.func,
};

Breadcrumb.defaultProps = {
  label: 'label',
  value: 'value'
};

export default Breadcrumb;