$("#scoreList").on('click', 'th', function() {
  $.get('/sort-score', {
    sk: $(this).data("id"),
    so: $(this).data("order")
  }, function(result) {
    var outputs = result.map(function(elem) {
      return '<tr class=' + elem.students + '>' +
        '<td>' + elem.name + '</td>' +
        '<td>' + elem.chinese + '</td>' +
        '<td>' + elem.math + '</td>' +
        '<td>' + elem.english + '</td>' +
        '<td><button class="del" data-id=' + elem.student_id + '>X</td>' +
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
  var that = this;
  $.ajax({
    type: "DELETE",
    url: '/delete-item',
    data: {
      sid: $(that).data("id")
      },
    success: function(result) {
      if (result.status == 200) {
        $(that).parent().parent().remove();
      }
    }
  });
});

$('#scoreList').on('click', '.append', function() {
  var that = this;
  var name = $(this).closest("tr").find('.name').val();
  var chinese = $(this).closest("tr").find('.chinese').val();
  var math = $(this).closest("tr").find('.math').val();
  var english = $(this).closest("tr").find('.english').val();
  $.ajax({
    type: "POST",
    url: '/append-item',
    data: {
      sname: name,
      schinese: chinese,
      smath: math,
      senglish: english
    },
    success: function(result) {
      if (result.status == 200) {
        var id =  result.data.sid;
        $(that).closest("table").find("tbody").append("<tr><td>" +
        name + "</td><td>" +
        chinese + "</td><td>" +
        math + "</td><td>" +
        english + "</td><td><button class='del' data-id=" +
        id + ">X</td></tr>");
      }
    }
  });
});
