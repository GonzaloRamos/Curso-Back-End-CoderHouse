const Utils = require("./Utils");
const {STATUS} = require("../constants/api.constants");
class ApiUtils extends Utils {
  /**
   * Formats the given error and messages into an object
   * @param {*} error
   * @param {*} message
   * @returns {Object}
   */

  static formatErrorObject = (error, message) => ({error, message});

  static getSameKeys(obj1, obj2) {
    const keys1 = Object.keys(obj1._doc);
    const keys2 = Object.keys(obj2);
    const commonkeys = keys1.filter((element) => keys2.includes(element));

    return commonkeys;
  }
}

module.exports = ApiUtils;
