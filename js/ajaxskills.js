  $(document).ready(function(){
  GetAPI();
});
function PutSkill(){
  var body = {
    id : document.getElementById("inputIDUpdate").value,
    name : document.getElementById("inputNameUpdate").value,
    short_description: document.getElementById("inputShortDescriptionUpdate").value,
    description: document.getElementById("inputDescriptionUpdate").value
  };
  var skillname = document.getElementById('inputNameUpdate').value;
  var short_description = document.getElementById('inputShortDescriptionUpdate').value;
  var description = document.getElementById('inputDescriptionUpdate').value;
  if (skillname=="" || short_description=="" ||description=="" ) {
    alert("Vui lòng nhập đầy đủ");
        return false;
  }
  table = $('#skilltable').DataTable();
  var url = 'https://localhost:44364/api/skills/' +  document.getElementById("inputIDUpdate").value ;
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
function GetAPI(){
  $('#skilltable').DataTable( {
    ajax:{
      url:'https://localhost:44364/api/skills/only',
      dataSrc:''
    },
    columns: [
    { title: "Id" , data:'id'},
    { title: "Name",data:'name' },
    { title: "Short Description",data:'short_description'},
    { title: "Description",data:'description'},
    {title: "Action",
     render: function (data, type, row) {
      return '<a  class="fa fa-pencil-square-o" style="background-color: white;" data-toggle="modal" data-target="#exampleModalCenter_Update" href="#" onclick="getSkillById('+row['id']+');" ></a> | <a class="fa fa-trash-o"  href="#" data-toggle="modal" data-target="#DeleteConfirm" onclick ="getSkillById('+row['id']+')"></a> | <a class="fa fa-info-circle" data-toggle="modal" data-target="#exampleModalCenter_Detail" href="#" onclick="getOnlyById('+row['id']+')" ></a> '
        }
      },
      ]
    } );
  }
function PostSkill(){
  var body = {
    name : document.getElementById("inputName").value,
    short_description: document.getElementById("inputShortDescription").value,
    description: document.getElementById("inputDescription").value
  };
  var skillname = document.getElementById('inputName').value;
  var short_description = document.getElementById('inputShortDescription').value;
  var description = document.getElementById('inputDescription').value;
  if (skillname=="" || short_description=="" ||description=="" ) {
    window.alert("Vui lòng nhập đầy đủ thông tin");
    return false;
  //  window.alert("Vui lòng nhập đầy đủ thông tin");
  }
var table = $('#skilltable').DataTable() ;
var url = 'https://localhost:44364/api/skills';
$.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(body),
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
       window.alert("Successful");
       table.ajax.reload();
    },
    error: function (xhr, status, error) {
    }
});
}
function DeleteSkill()
{
var table = $('#skilltable').DataTable();
var url = 'https://localhost:44364/api/skills/' + document.getElementById("inputIDdelete").value;
$.ajax({
type: "DELETE",
url: url,
contentType: "application/json",
dataType: "json",
  success: function (result,status) {
  window.alert("Successful");
  table.ajax.reload();
},
error: function (xhr, status, error) {
}
});
}
function getSkillById(id){
var url = 'https://localhost:44364/api/skills/' + id ;
$.ajax({
type: "GET",
url: url,
success: function (result) {
console.log(result);
    $('#inputIDdelete').val(result.id);
    $('#inputIDUpdate').val(result.id);
    $('#inputNameUpdate').val(result.name);
    $('#inputShortDescriptionUpdate').val(result.short_description);
    $('#inputDescriptionUpdate').val(result.description);
    },
  })
}
function getOnlyById(id)
{
var url = 'https://localhost:44364/api/skills/' + id;
$.ajax({
type: "GET",
url: url,
success: function (result) {
console.log(result);
$('#inputIdDetails').val(result.id);
$('#inputNameDetails').val(result.name);
$('#inputShortDescriptionDetails').val(result.short_description);
$('#inputDescriptionDetails').val(result.description);
// Update
$('#inputIDUpdate').val(result.id);
$('#inputNameUpdate').val(result.name);
$('#inputShortDescriptionUpdate').val(result.short_description);
$('#inputDescriptionUpdate').val(result.description);
},
  error:function(xhr,Status,error){
  }
});
}
