module.exports = {
  formatDate: function (dateTime) {
    return new Date(dateTime).toLocaleDateString('en-US');
  },
};
