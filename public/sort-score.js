function sortScore(scores, key, order) {
  var result = [];

  if (order === "des") {
    result = scores.sort(function(a, b) {
      return a[key] - b[key];
    });
  } else {
    result = scores.sort(function(a, b) {
      return b[key] - a[key];
    });
  }
  return result;
}

module.exports = sortScore;
