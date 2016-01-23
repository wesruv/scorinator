/**
 * Poorest mans global storage
 * @todo replace this sack of shit
 */

var globalStore = {};

export default{
  get(fieldName) {
    return globalStore[fieldName];
  },

  set(fieldName, value) {
    globalStore[fieldName] = value;
    return value;
  }

};
