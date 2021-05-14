/**
 * @class
 * @classdesc Describe http option
 */
class CustomHttpOption {
  /**
   * @constructor
   */
  constructor() {
    /** @type {string} */
    this.url = '';
    /** @type {number} */
    this.timeout = -1;
    /** @type {Map<string, object>} */
    this.headers = new Map();
    /** @type {Map<string, object>} */
    this.parameters = new Map();
    /** @type {Map<string, object>} */
    this.attachments = new Map();
  }

  /**
   * @description Set url
   * @param {string} url
   * @returns {CustomHttpOption}
   */
  setUrl(url = '') {
    this.url = url;
    return this;
  }

  /**
   * @description Set request timeout in seconds
   * @param {number} seconds
   * @returns {CustomHttpOption}
   */
  timeoutIn(seconds = -1) {
    this.timeout = seconds;
    return this;
  }

  /**
   * @description Add header
   * @param {string} key
   * @param {object} value
   * @returns {CustomHttpOption}
   */
  addHeader(key, value) {
    this.headers.set(key, value);
    return this;
  }

  /**
   * @description Add parameter
   * @param {string} key
   * @param {object} value
   * @returns {CustomHttpOption}
   */
  addParameter(key, value) {
    this.parameters.set(key, value);
    return this;
  }

  /**
   * @description Add attachment
   * @param {string} key
   * @param {object} value
   * @returns {CustomHttpOption}
   */
  addAttachment(key, value) {
    this.attachments.set(key, value);
    return this;
  }
}

module.exports = CustomHttpOption;
