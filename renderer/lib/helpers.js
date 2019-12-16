module.exports = {
  emptyObject(object) {
    if (typeof object !== 'object') {
      return true;
    }
    return Object.keys(object).length === 0;
  },
};
