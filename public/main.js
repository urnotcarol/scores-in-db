$("#scoreList").on('click', 'th', function() {
  $.get('/scores', {
    sk: $(this).data("id"),
    so: $(this).data("order")
  }, function(result) {
    var outputs = result.map(function(elem) {
      return '<tr>' +
        '<td>' + elem.name + '</td>' +
        '<td>' + elem.chinese + '</td>' +
        '<td>' + elem.math + '</td>' +
        '<td>' + elem.english + '</td>' +
        '<td><input type="button" value="删除"></td>' +
        '</tr>';
    }).join();
    $("#scores").html(outputs);
  });

  if ($(this).data("order") === "des") {
    $(this).data("order", "asc");
  } else {
    $(this).data("order", "des");
  }
});
  
