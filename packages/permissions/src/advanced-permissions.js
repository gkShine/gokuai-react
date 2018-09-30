export default {
  name: '$advPermissions',

  permissions: {
    root: [],
    link: [],
    dist: [],
    current: []
  },

  dir: false,
  link: false,

  initialize(permissions) {
    if (permissions instanceof Object) {
      this.permissions = Object.assign(this.permissions, permissions);
      if (this.permissions.link.length > 0) {
        this.link = true;
      }
    }
    this.check.initialize(this);
    return this;
  },

  //设置库
  setRoot(permissions) {
    this.permissions.root = this._value(permissions);
    return this;
  },

  //设置外链权限
  setLink(permissions) {
    this.permissions.link = this._value(permissions);
    this.link = true;
    return this;
  },

  //设置父文件夹
  setCurrent(permissions) {
    this.permissions.current = this._value(permissions);
    return this;
  },

  //设置目标文件(夹)
  setDist(permissions, dir) {
    this.permissions.dist = this._value(permissions);
    this.dir = dir;
    return this;
  },

  //设置是否为文件夹
  setDir(dir) {
    this.dir = dir;
    return this;
  },

  //获取值
  _value(value) {
    let array = [];
    if (value instanceof Function) {
      array = value();
    } else {
      array = value;
    }
    return array instanceof Array ? array : [];
  },

  check: {
    initialize(root) {
      this.root = root;
      this.link.initialize(root, this);
    },

    //交集
    _intersect(array1, array2) {
      return array1.filter(v => array2.includes(v));
    },

    //无操作权限
    empty() {
    },

    //新建文件(夹)
    create() {
    },

    //预览文件
    preview() {
    },

    //重命名文件
    rename() {
    },

    //编辑文件
    edit() {
    },

    //上传文件
    upload() {
    },

    //打开文件(夹)
    open() {
    },

    //下载文件
    download() {
    },

    //删除文件
    delete() {
    },

    //分享外链
    link() {
    },

    //查看回收站
    recycle() {
    },

    //恢复回收站
    recover() {
    },

    //彻底删除
    deleteCom() {
    },

    //查看历史
    history() {
    },

    //恢复历史
    recoverHistory() {
    }
  }
};