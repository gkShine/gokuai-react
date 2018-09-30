export default {
  name: '$permissions',

  //同步包含权限
  sync: ['file_upload', 'file_write', 'file_read', 'file_preview', 'file_delete'],

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
  setDist(dir, permissions) {
    if (dir) {
      this.permissions.dist = this._value(permissions);
    } else { //文件没权限
      this.permissions.dist = this.permissions.current;
    }
    this.setDir(dir);
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
    },

    //交集
    _intersect(array1, array2) {
      return array1.filter(v => array2.includes(v));
    },

    //同步权限
    sync() {
      return this.root.permissions.dist.indexOf('file_sync') > -1;
    },

    //无操作权限
    empty() {
      return this._intersect(this.root.sync, this.root.permissions.current).length === 0;
    },

    //上传文件
    upload() {
      if (this.root.link && !this.linkUpload()) {
        return false;
      }
      return this.sync() || this._intersect(['file_upload', 'file_write'], this.root.permissions.current).length > 0;
    },

    //预览文件
    preview() {
      if (this.root.link && !this.linkPreview()) {
        return false;
      }
      return this.sync() || this._intersect(['file_preview', 'file_read'], this.root.permissions.dist).length > 0;
    },

    //重命名文件
    rename() {
      return this.sync() || this.edit();
    },

    //编辑文件
    edit() {
      return this.sync() || this.root.permissions.dist.indexOf('file_write') > -1;
    },

    //新建文件(夹)
    create() {
      return this.sync() || this.upload();
    },

    //打开文件(夹)
    open() {
      return this.sync() || (this.root.dir ? !this.empty() : this.download());
    },

    //下载文件
    download() {
      if (this.root.link && !this.linkDownload()) {
        return false;
      }
      return this.sync() || this.root.permissions.dist.indexOf('file_read') > -1;
    },

    //删除文件
    delete() {
      return this.sync() || this.root.permissions.dist.indexOf('file_delete') > -1;
    },

    //分享外链
    link() {
      return this.root.permissions.dist.indexOf('file_link') > -1;
    },

    //查看回收站
    recycle() {
      return this.root.permissions.root.indexOf('file_recycle') > -1;
    },

    //恢复回收站
    recover() {
      return this.recover();
    },

    //彻底删除
    deleteCom() {
      return this.root.permissions.root.indexOf('file_delete_com') > -1;
    },

    //查看历史
    history() {
      return this.root.permissions.root.indexOf('file_history') > -1;
    },

    //恢复历史
    recoverHistory() {
      return this.history();
    },

    //外链上传
    linkUpload() {
      return this.root.permissions.link.indexOf('file_upload') > -1;
    },

    //外链预览
    linkPreview() {
      return this.root.permissions.link.indexOf('file_preview') > -1
    },

    //外链下载
    linkDownload() {
      return this.root.permissions.link.indexOf('file_download') > -1
    }
  }
};