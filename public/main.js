$("#scoreList").on('click', 'th', function() {
  $.get('/sort-score', {
    sk: $(this).data("id"),
    so: $(this).data("order")
  }, function(result) {
    var outputs = result.map(function(elem) {
      return '<tr>' +
        '<td>' + elem.name + '</td>' +
        '<td>' + elem.chinese + '</td>' +
        '<td>' + elem.math + '</td>' +
        '<td>' + elem.english + '</td>' +
        '<td><button class="del" data-id=' + elem.student_id + '>删除</td>' +
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

$("#scoreList").on('click', '.del', function() {
  $.get('/delete-item', {
    sid: $(this).data("id")
  }, function(result) {
    if (result.status == 200) {
      $(this).parent().remove();
    }
  });
});
