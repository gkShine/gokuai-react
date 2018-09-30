import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { genFiles, rootFile, genData } from './data';

export default {
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    mock.onGet('/file').reply(() => {
      // eslint-disable-next-line
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, rootFile]);
        }, 1000);
      });
    });

    mock.onGet('/data').reply(config => {
      let {size} = config.params;
      // eslint-disable-next-line
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, genData(size || 200)]);
        }, 1000);
      });
    });

    //获取文件列表（分页）
    mock.onGet('/file/listpage').reply(config => {
      let {page, fullpath} = config.params;
      fullpath = fullpath || '';
      let mockFiles = genFiles(30);
      let total = mockFiles.length;
      mockFiles = mockFiles.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      mockFiles.forEach(file => {
        file.fullpath = (fullpath ? (fullpath + '/') : '') + file.fullpath;
      });
      // eslint-disable-next-line
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            list: mockFiles
          }]);
        }, 1000);
      });
    });
  }
}