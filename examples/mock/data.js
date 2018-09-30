import Mock from 'mockjs'

let extensions = ['doc', 'text', 'pdf', 'ppt', 'xls', 'mp4', 'php', 'html', 'htm', 'mp3', 'mp4', 'doc', 'jpg', 'md', 'txt',  'zip', 'exe', 'ai', 'apk', 'cdr', 'dmg', 'ipa', 'iso', 'psd'];

let genFiles = (length) => {
  let files = [];
  let dirLength = Mock.Random.integer(0, length);
  for (let i = 0; i < length; i++) {
    let dir = 0;
    if (i < dirLength) {
      dir = 1;
    }
    let filename = Mock.Random.ctitle(3, 40);
    filename = dir ? filename : filename + '.' + Mock.Random.pick(extensions);
    let file = {
      "mount_id": Mock.Random.integer(1, 10000),
      "hash": Mock.Random.string(40),
      "dir": dir,
      "fullpath": filename,
      "filename": filename,
      "filehash": dir ? "" : Mock.Random.string(40),
      "filesize": dir ? "" : Mock.Random.integer(0, 1073741824),
      "last_member_name": Mock.Random.cname(),
      "last_dateline": Date.parse(Mock.Random.datetime()) / 1000,
      "thumb": dir ? '' : Mock.Random.boolean() && Mock.Random.dataImage('125x125', '我是文件') || '',
      "previewUrl": Mock.Random.dataImage()
    };
    files.push(Mock.mock(file));
  }
  return files;
};

let rootFile = {
  "mount_id": Mock.Random.integer(1, 10000),
  "hash": Mock.Random.string(40),
  "dir": 1,
  "fullpath": "",
  "filename": Mock.Random.ctitle(3, 20),
  "filehash": "",
  "filesize": "",
  "last_member_name": Mock.Random.cname(),
  "last_dateline": Date.parse(Mock.Random.datetime()) / 1000,
  // "thumb": Mock.Random.dataImage('125x125', '我是文件夹'),
  "previewUrl": Mock.Random.dataImage()
};

let genData = (length) => {
  let data = [];
  for (let i = 0; i < length; i++) {
    let dat = {
      "id": Mock.Random.integer(1, 10000),
      "name": Mock.Random.ctitle(3, 20),
      "username": Mock.Random.cname(),
      "date": Mock.Random.datetime(),
      "pic": Mock.Random.dataImage()
    };
    data.push(Mock.mock(dat));
  }
  return data;
};
export {genFiles, rootFile, genData};