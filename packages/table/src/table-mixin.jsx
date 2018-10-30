import React from 'react';
import PropTypes from 'prop-types';
import {intersect, getSelected} from "gokuai-components/src/common/util";

export default function tableMixin(WrappedComponent, handleShortcut) {
  class Mixin extends React.Component {
    constructor(props) {
      super(props);

      this.scrollCheckAll = this.scrollSelectAll = false;

      this.checked = getSelected(this.props.defaultCheckedIndex, this.props.data);
      this.selected = getSelected(this.props.defaultIndex, this.props.data);
      if (this.props.checkOnSelect) {
        this.selected = Object.assign(this.selected, this.checked);
      }

      if (this.props.selectOnCheck) {
        this.checked = Object.assign(this.checked, this.selected);
      }

      this.state = {
        change: false
      };
    }

    updateData(newProps) {
      this.checked = intersect(this.checked, newProps.data);
      this.selected = intersect(this.selected, newProps.data);
      if (this.scrollOnCheck && this.scrollCheckAll) {
        this.scrollCheckAll = false;
        this.handleCheckAll(true);
      }
      if (this.scrollOnSelect && this.scrollSelectAll) {
        this.scrollSelectAll = false;
        this.handleSelectAll();
      }
    }

    getLineSize() {
      let el = this.ref.thumbnail;
      if (!el.childNodes.length) {
        return 0;
      }
      let child = el.childNodes[0];
      return parseInt(
        (el.clientWidth - parseInt(window.getComputedStyle(el).padding) * 2)
        / (child.clientWidth + parseInt(window.getComputedStyle(child).margin) * 2)
      );
    }

    getSelected() {
      return Object.values(this.selected);
    }

    getSelectedIndex() {
      return Object.keys(this.selected);
    }

    getChecked() {
      return Object.values(this.checked);
    }

    getCheckedIndex() {
      return Object.keys(this.checked);
    }

    $emit() {
      let funcName = arguments[0];
      funcName = 'on' + funcName[0].toUpperCase() + funcName.substring(1);
      let args = Array.prototype.slice.apply(arguments);
      args = args.slice(1);
      typeof this.props[funcName] === 'function' && this.props[funcName](...args);
    }

    updateChecked = () => {
      if (this.props.selectOnCheck) {
        this.checked = Object.assign({}, this.selected);
        this.$emit('check', this.getChecked(), event);
      }

      this.setState({
        change: !this.state.change
      });
    };

    updateSelected = (index) => {
      if (this.props.checkOnSelect) {
        this.selected = Object.assign({}, this.checked);
        this.lastIndex = index;
        this.$emit('select', this.getSelected(), event);
      }

      this.setState({
        change: !this.state.change
      });
    };

    handleLoadMore = () => {
      if (this.scrollOnCheck) {
        this.scrollCheckAll = this.getSelectedIndex().length === this.data.length;
      }
      if (this.scrollOnSelect) {
        this.scrollSelectAll = this.getSelectedIndex().length === this.data.length;
      }
      this.$emit('loadMore');
    };

    handleCheck = (item, index, event) => {
      if (event.target.checked) {
        this.checked[index] = item;
      } else {
        delete this.checked[index];
      }
      this.updateSelected(index);
      this.$emit('check', this.getChecked(), event);
    };

    handleCheckAll = (checked, event) => {
      if (checked) {
        this.checked = Object.assign({}, this.props.data);
      } else {
        this.checked = [];
      }
      this.updateSelected(this.checked.length - 1);
      this.$emit('checkAll', event);
    };

    handleSelect = (item, index, event) => {
      if (typeof this.props.onBeforeSelect === 'function' && !this.props.onBeforeSelect(item, index, event)) {
        return false;
      }
      const nativeEvent = event.nativeEvent || event;
      this.clickItem = true;
      clearTimeout(this.clickTimer);
      this.clickTimer = setTimeout(() => {
        if (nativeEvent && (nativeEvent.ctrlKey || nativeEvent.metaKey)) {
          let selected = this.selected;
          this.selected = {};
          if (selected[index] === undefined) {
            selected[index] = item;
            this.lastSelectedIndex = index;
            this.selected = selected;
          } else {
            delete selected[index];
            this.selected = selected;
          }
        } else {
          this.selected = {};
          if (nativeEvent && nativeEvent.shiftKey && this.lastSelectedIndex > -1) {
            for (let i = Math.min(index, this.lastSelectedIndex); i <= Math.max(index, this.lastSelectedIndex); i++) {
              this.selected[i] = this.props.data[i];
            }
          } else {
            if (this.selected[index] !== undefined) {
              return;
            }
            this.selected[index] = item;
            this.lastSelectedIndex = index;
          }
        }
        this.clickItem = false;
        this.lastIndex = index;
        this.updateChecked();
        this.$emit('select', this.getSelected(), event);
      }, 20);
    };

    handleSelectAll = (event) => {
      this.selected = Object.assign({}, this.props.data);
      this.lastIndex = this.props.data.length - 1;
      this.updateChecked();
      this.$emit('selectAll', event);
    };

    handleCancelSelect = (event) => {
      if (this.clickItem) {
        return;
      }
      this.selected = {};
      this.lastIndex = -1;
      this.updateChecked();
      this.$emit('select', null, event);
    };

    handleSelectTo = (offset, event) => {
      if (this.lastIndex === -1) {
        return false;
      }
      let index = parseInt(this.lastIndex) + offset;
      if (index < 0 || index > this.props.data.length - 1) {
        return false;
      }
      this.handleSelect(this.props.data[index], index, event);
    };

    handleContextMenu = (item, index, event) => {
      if (this.props.onContextMenu === undefined) {
        return;
      }
      if (this.props.contextSelected && this.selected[index] === undefined) {
        this.handleSelect(item, index, event);
      }
      this.$emit('contextMenu', Object.values(this.selected), event);
      event.stopPropagation();
      event.preventDefault();
    };

    handleDoubleClick = (data, event) => {
      clearTimeout(this.clickTimer);
      this.$emit('doubleClick', data, event);
    };

    handleDocumentKeyDown = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.keyCode === 65) { //ctrl+a || meta+a
        this.handleSelectAll();
        event.preventDefault();
        return false;
      } else if (event.keyCode === 33) { //PgUp
        this.handleSelect(this.data[0], 0, event);
        event.preventDefault();
      } else if (event.keyCode === 35 || event.keyCode === 34) { //End || PgDn
        this.handleSelect(this.data[this.data.length - 1], this.props.data.length - 1, event);
        event.preventDefault();
      }

      if (!Object.keys(this.selected).length) {
        return false;
      }

      if (event.keyCode === 13) { //enter
        this.handleDoubleClick(Object.values(this.selected)[0], Object.keys(this.selected)[0], event);
        event.preventDefault();
        return;
      }

      handleShortcut(this, event);
    };

    componentDidMount() {
      this.props.shortcut && document.addEventListener('keydown', this.handleDocumentKeyDown);
    }

    componentWillUnmount() {
      this.props.shortcut && document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    shouldComponentUpdate(newProps, newState) {
      if (newState.change === this.state.change) {
        this.updateData(newProps);
      }
      return true;
    }

    render() {
      let style = {};
      if (!this.props.fit && this.props.height) {
        style.height = this.props.height + 'px';
      }
      let newProps = {
        $handleCheck: this.handleCheck,
        $handleSelect: this.handleSelect,
        $handleCheckAll: this.handleCheckAll,
        $handleContextMenu: this.handleContextMenu,
        $handleDoubleClick: this.handleDoubleClick,
        $handleCancelSelect: this.handleCancelSelect,
        $handleLoadMore: this.handleLoadMore,
        $selected: this.selected,
        $checked: this.checked,
        $style: style
      };
      return (<WrappedComponent ref={ref => this.ref = ref} {...this.props} {...newProps} />);
    }
  }

  Mixin.propTypes = {
    loading: PropTypes.bool,
    fit: PropTypes.bool,
    shortcut: PropTypes.bool,
    contextSelected: PropTypes.bool,
    scrollOnCheck: PropTypes.bool,
    scrollOnSelect: PropTypes.bool,
    defaultIndex: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
    defaultCheckedIndex: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
    selectOnCheck: PropTypes.bool,
    checkOnSelect: PropTypes.bool,
    onCheck: PropTypes.func,
    onCheckAll: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onContextMenu: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onBeforeSelect: PropTypes.func
  };

  Mixin.defaultProps = {
    defaultCheckedIndex: [],
    selectOnCheck: true,
    checkOnSelect: true
  };

  return Mixin;
}