export function bitSize(num, lower) {
  if (num === undefined || num === '-') {
    return num;
  }
  if (typeof(num) !== 'number') {
    num = Number(num);
  }
  if (num < 0) {
    return '';
  }
  let type = lower && ['b', 'kb', 'mb', 'gb', 'tb', 'pb'] || ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let j = 0;
  while (num >= 1024) {
    if (j >= 5)
      return num + type[j];
    num = num / 1024;
    j++;
  }
  if (num === 0) {
    return num;
  } else {
    return Math.round(num * 100) / 100 + type[j];
  }
}

export function strToB(str) {
  str = str.toUpperCase();
  let unit = str.match(/[A-Z]+/i)[0];
  let size = str.match(/[0-9]+/)[0];
  switch (unit) {
    case 'KB':
    case 'K':
      size = size * 1024;
      break;
    case 'MB':
    case 'M':
      size = size * 1048576;
      break;
    case 'GB':
    case 'G':
      size = size * 1073741824;
      break;
    case 'TB':
    case 'T':
      size = size * 1099511627776;
      break;
    case 'PB':
    case 'P':
      size = size * 1125899906842624;
      break;
    case 'EB':
    case 'E':
      size = size * 1152921504606847000;
      break;
  }
  return size;
}

export function formatDate(date, format) {
  format = format ? format : 'yyyy-MM-dd hh:mm:ss';
  let o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second

    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

export function timeToDate(timestamp, format) {
  return formatDate(new Date(timestamp), format);
}

export function getOS() {
  let os = 'Others';
  if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
    os = 'Android';
  } else if (navigator.userAgent.indexOf('iPhone') > -1) {
    os = 'iOS';
  } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
    os = 'WP';
  } else if (window.navigator.userAgent.indexOf('Windows NT') > -1) {
    os = 'Windows';
  } else if (window.navigator.userAgent.indexOf('Mac') > -1) {
    os = 'Mac';
  } else if (window.navigator.userAgent.indexOf('X11') > -1) {
    os = 'UNIX';
  } else if (window.navigator.userAgent.indexOf('Linux') > -1) {
    os = 'Linux';
  }
  return os;
}

export function isIE() {
  let ua = navigator.userAgent.toLowerCase();
  let isIE = ua.indexOf("msie") > -1;
  if (isIE) {
    return ua.match(/msie ([\d.]+)/)[1];
  }
  return false;
}

/**
 * 获取两个对象的交集
 */
export function intersect(obj1, obj2, isArray) {
  let result = {};
  for (let i in obj1) {
    for (let j in obj2) {
      if (JSON.stringify(obj1[i]) === JSON.stringify(obj2[j])) {
        result[j] = obj1[i];
        break;
      }
    }
  }
  return isArray ? Object.values(result) : result;
}

export function getSelected(defaultIndex, data) {
  let selected = {};
  if (defaultIndex === undefined) {
    return selected;
  }
  if (typeof defaultIndex === 'object') {
    defaultIndex.forEach((index) => {
      selected[index] = data[index];
    });
  } else {
    selected[defaultIndex] = data[defaultIndex];
  }
  return selected;
}

export function getExt(filename) {
  return filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
}

export function baseName(path) {
  path = path.toString();
  return path.replace(/\\/g, '/').replace(/.*\//, '');
}

export function dirName(path) {
  path = path.toString();
  return path.indexOf('/') < 0 ? '' : path.replace(/\\/g, '/').replace(/\/[^/]*$/, '');
}