$(document).ready(function (){
  GetAPI();
});
function PutClasses() {
  var table = $('#classtable').DataTable();
  var body = {
    id: document.getElementById("inputIDUpdate").value,
    code: document.getElementById("inputCodeUpdate").value,
    name: document.getElementById("inputNameUpdate").value,
    short_description: document.getElementById("inputShortDescriptionUpdate").value,
    description: document.getElementById("inputDescriptionUpdate").value
  };
  var code = document.getElementById('inputCodeUpdate').value;
  var name = document.getElementById('inputNameUpdate').value;
  var short_description = document.getElementById('inputShortDescriptionUpdate').value;
  var description = document.getElementById('inputDescriptionUpdate').value;
  if (code=="" || short_description=="" ||description=="" || name=="") {
    window.alert("Vui lòng nhập đầy đủ thông tin");
    return false;
  //  window.alert("Vui lòng nhập đầy đủ thông tin");
  }
  var url = 'https://localhost:44364/api/classes/' + document.getElementById("inputIDUpdate").value;
  $.ajax({
    type: "PUT",
    url: url,
    data: JSON.stringify(body),
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
       table.ajax.reload();
       window.alert("Successful");
    },
    error: function (xhr, status, error) {
    },
  });
}
function GetAPI() {
  var url = 'https://localhost:44364/api/classes/all';
  $('#classtable').DataTable({
    ajax:{
      url:url,
      dataSrc:''
    },
    columns:[
      {title:'ID',data:'id'},
      {title:'Code',data:'code'},
      {title:'Name',data:'name'},
      {title:'Description',data:'description'},
      {title:'Short description',data:'short_description'},
      {
        title: "Action",
        render: function (data, type, row) {
          return '<a  class="fa fa-pencil-square-o"  data-toggle="modal" data-target="#UpdateClass" href="#" onclick="getClassesById(' + row['id'] + ')" ></a> | <a class="fa fa-trash-o"  href="#" data-toggle="modal" data-target="#DeleteConfirm" onclick ="getClassesById(' + row['id']+ ')"></a> | <a class="fa fa-info-circle" data-toggle="modal" data-target="#DetailsClass" href="#" onclick="getOnlyById(' + row['id'] + ')" ></a> '
        }
      },
    ]
  });

}
function PostClasses() {
  var body = {
    code: document.getElementById("inputCode").value,
    name: document.getElementById("inputName").value,
    short_description: document.getElementById("inputShortDescription").value,
    description: document.getElementById("inputDescription").value
  };
  var code = document.getElementById('inputCode').value;
  var name = document.getElementById('inputName').value;
  var short_description = document.getElementById('inputShortDescription').value;
  var description = document.getElementById('inputDescription').value;
  if (code=="" || short_description=="" ||description=="" || name=="") {
    window.alert("Vui lòng nhập đầy đủ thông tin");
    return false;
  //  window.alert("Vui lòng nhập đầy đủ thông tin");
  }
  var table = $('#classtable').DataTable();
  var url = 'https://localhost:44364/api/classes';
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(body),
    contentType: "application/json",
    dataType: "json",
    success: function (result){
      table.ajax.reload();
      window.alert("Successful");
    },
    error: function (xhr, status, error) {
    }
  });
}
function DeleteClasses() {
  var url = 'https://localhost:44364/api/classes/' + document.getElementById("inputIDdelete").value;
  var table = $('#classtable').DataTable();
  $.ajax({
    type: "DELETE",
    url: url,
    contentType: "application/json",
    dataType: "json",
    success: function (result){
      table.ajax.reload();
      window.alert("Successful");
    },
    error: function (xhr, status, error) {
    }
  });
}
function getClassesById(data) {
  var url = 'https://localhost:44364/api/classes/' + data;
  $.ajax({
    type: "GET",
    url: url,
    contentType: false,
    processData: false,
    success: function (result) {
      console.log(result);
          $('#inputIDdelete').val(result.id);
          $('#inputIDUpdate').val(result.id);
          $('#inputCodeUpdate').val(result.code);
          $('#inputNameUpdate').val(result.name);
          $('#inputDescriptionUpdate').val(result.description);
          $('#inputShortDescriptionUpdate').val(result.short_description);
          $('#inputCheckUpdate').val(result.activated);
    },
    error: function (xhr, Status, error) { }
  })

}
function getOnlyById(dataset) {

  var url = 'https://localhost:44364/api/classes/' + dataset;
  $.ajax({
    type: "GET",
    url: url,
    contentType: false,
    processData: false,
    success: function (result) {
      console.log(result);
      $('#inputIdDetails').val(result.id);
      $('#inputCodeDetails').val(result.code);
      $('#inputNameDetails').val(result.name);
      $('#inputDescriptionDetails').val(result.description);
      $('#inputShortDescriptionDetails').val(result.short_description);

      $('#inputIDUpdate').val(result.id);
      $('#inputCodeUpdate').val(result.code);
      $('#inputNameUpdate').val(result.name);
      $('#inputDescriptionUpdate').val(result.description);
      $('#inputShortDescriptionUpdate').val(result.short_description);
      $('#inputCheckUpdate').val(result.activated);
    },
    error: function (xhr, Status, error) {
    }
  });
}
