function serializeEntries(inputs) {
  var result = [];
  inputs.forEach(function(elem) {
    var existId = result.filter(function(item) {
      return item.student_id === elem.student_id;
    });
    if (existId.length === 0) {
      var temp = {};
      temp.student_id = elem.student_id;
      temp.name = elem.name;
      temp[elem.course_name] = elem.score;
      result.push(temp);
    } else {
      result.forEach(function(item) {
        if (item.student_id === elem.student_id) {
          item[elem.course_name] = elem.score;
        }
      });
    }
  });
  return result;
}

module.exports = serializeEntries;
