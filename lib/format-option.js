module.exports = function formatOption(name, value) {
  return value ? [name, value].join(' ') : '';
};
