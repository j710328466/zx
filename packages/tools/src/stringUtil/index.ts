/**
 * 字符串操作
 *
 * isNull - 空校验
 * isNumber - 数字校验
 * filterNull - 空数据过滤
 * toYuan - 分转化成元
 * toFen - 元转化为分
 */
 class StringUtil {
  /**
   * 空校验
   * 空数据集合：undefined,'undefined',null,'null','(null)','NaN',''
   *
   * @param {String} str - 字符串
   * @return {Boolean} true-空，false-非空
   * @example
   *
   * isNull();
   * // => true
   *
   * isNull('undefined');
   * // => true
   */
  isNull = (str: string) => {
    if (
      typeof str === 'undefined'
      || str === 'undefined'
      || str === null
      || str === 'null'
      || str === '(null)'
      || str === 'NaN'
      || str === ''
    ) {
      return true;
    }
    return false;
  };

  /**
   * 数字校验
   *
   * @param {String} str - 字符串
   * @return {Boolean} true-数字，false-非数字
   * @example
   *
   * isNumber('20');
   * // => true
   *
   * isNumber('.2');
   * // => false
   */
  isNumber = (str: string) => /^-?\d+(\.\d+)?$/.test(str);

  /**
   * 空数据过滤
   *
   * @param {String} str - 字符串
   * @param {String} [format=''] - 格式化
   * @return {String} 过滤后的数据
   * @example
   *
   * filterNull('xxx');
   * // => xxx
   *
   * filterNull();
   * // =>
   *
   * filterNull(null, '--');
   * // => --
   */
  filterNull = (str: string, format = '') => {
    if (this.isNull(str)) {
      return format;
    }
    return str;
  };

  /**
   * 分->元
   * 为防止浮点数及大数运算精度丢失，故采用字符串形式解析
   *
   * @param {String} str - 分
   * @param {String} [format='0.00'] - 格式化
   * @return {String} 元
   * @example
   */
  toYuan = (str: string | number, format = '0.00') => {
    if (!/^-?(\d|[1-9]\d+)(\.\d+)?$/.test(String(str))) {
      return format;
    }
    str = str.toString();
    let result = '';
    if (str[0] === '-') {
      result = '-';
      str = str.substr(1);
    }
    if (str.indexOf('.') > -1) {
      str = str.replace(/\.\d+$/, ''); // Trim decimal at the ending.
    }
    const len = str.length;
    switch (len) {
    case 1:
      result += `0.0${str}`;
      break;
    case 2:
      result += `0.${str}`;
      break;
    default:
      result += `${str.substr(0, len - 2)}.${str.substr(len - 2)}`;
    }

    return result;
  };

  /**
   * 元->分
   * 为防止浮点数及大数运算精度丢失，故采用字符串形式解析
   *
   * @param {String} str - 元
   * @param {String} [format='0'] - 格式化
   * @return {String} 分
   * @example
   *
   */
  toFen = (str: string | number, format = '0') => {
    if (!/^-?(\d|[1-9]\d+)(\.\d+)?$/.test(String(str))) {
      return format;
    }
    str = str.toString();
    let result = '0';
    if (str.indexOf('.') > -1) {
      const strArr = str.split('.');
      const len = strArr[1].length;
      switch (len) {
      case 1:
        // 特殊数据：0.0 => 000、 0.1 => 010
        result = `${strArr[0]}${strArr[1]}0`;
        break;
      case 2:
        // 特殊数据：0.00 => 000、 0.01 => 001、 0.10 => 010
        result = str.replace('.', '');
        break;
      default:
        // 只保留两位小数
        // 特殊数据：0.000 => 000、 0.001 => 000、 0.010 => 001、 0.101 => 010
        result = `${strArr[0]}${strArr[1].substr(0, 2)}`;
      }
    } else {
      result = `${str}00`;
    }
    // 特殊数据处理：000 => 0、 001 => 1、 010 => 10
    result = result.replace(/^(-?)(0{1,2})/, '$1'); // Trim zeros at the beginning.

    return result;
  };
}

export default new StringUtil();
