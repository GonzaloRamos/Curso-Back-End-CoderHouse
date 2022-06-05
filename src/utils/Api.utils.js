const Utils = require("./Utils");
const {STATUS} = require("../config/constants/api.constants");
class ApiUtils extends Utils {
  /**
   * Formats the given error and messages into an object
   * @param {*} error
   * @param {*} message
   * @returns {Object}
   */

  static formatErrorObject = (error, message) => ({error, message});

  /**
   * It takes two objects and returns an array of the keys that are common to both objects.
   * @param obj1 - The object that you want to update
   * @param obj2 - The object that you want to compare with.
   * @returns An array of common keys between the two objects.
   */
  static getSameKeys(obj1, obj2) {
    const keys1 = Object.keys(obj1._doc);
    const keys2 = Object.keys(obj2);
    const commonkeys = keys1.filter((element) => keys2.includes(element));

    return commonkeys;
  }
}

module.exports = ApiUtils;
