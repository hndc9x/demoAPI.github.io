$(document).ready(function(){
GetAPI();
});
function PutCategory(){
var body = {
  id : document.getElementById("inputIDUpdate").value,
  name : document.getElementById("inputNameUpdate").value,
  short_description: document.getElementById("inputShortDescriptionUpdate").value,
  description: document.getElementById("inputDescriptionUpdate").value
};
var name = document.getElementById('inputNameUpdate').value;
var short_description = document.getElementById('inputShortDescriptionUpdate').value;
var description = document.getElementById('inputDescriptionUpdate').value;
if (name=="" || short_description=="" ||description=="" ) {
  window.alert("Vui lòng nhập đầy đủ thông tin");
  return false;
};
var table = $('#catetable').DataTable() ;
var url = 'https://localhost:44364/api/categories/' +  document.getElementById("inputIDUpdate").value ;
$.ajax({
  type: "PUT",
  url: url,
  data: JSON.stringify(body),
  contentType: "application/json",
  dataType: "json",
  success: function (result) {
   console.log(result,status);
   window.alert("Successful");
  table.ajax.reload();
 },
 error: function (xhr, status, error) {
 },
});
}
function GetAPI(){
  var url = 'https://localhost:44364/api/categories/all';
    $('#catetable').DataTable( {
          ajax:{
            url:url,
            dataSrc:''
          },
          columns: [
          { title: "Id",data:'id' },
          { title: "Name",data:'name' },
          { title: "Short Description",data:'short_description'},
          { title: "Description",data:'description'},
          {title: "Action",
           render: function (data, type, row) {
            return '<a  class="fa fa-pencil-square-o"  data-toggle="modal" data-target="#UpdateCate" href="#" onclick="getCategoryById('+row['id']+')" ></a> | <a class="fa fa-trash-o"  href="#" data-toggle="modal" data-target="#DeleteConfirm" onclick ="getCategoryById('+row['id']+');"></a> | <a class="fa fa-info-circle" data-toggle="modal" data-target="#DetailsCate" href="#" onclick="Details('+row['id']+')" ></a> '
          }
        },
        ]
      });
}
function PostCategory(){
var body = {
name : document.getElementById("inputName").value,
short_description: document.getElementById("inputShortDescription").value,
description: document.getElementById("inputDescription").value
};
var name = document.getElementById('inputName').value;
var short_description = document.getElementById('inputShortDescription').value;
var description = document.getElementById('inputDescription').value;
if (name=="" || short_description=="" ||description=="" ) {
  window.alert("Vui lòng nhập đầy đủ thông tin");
  return false;

};
var table = $('#catetable').DataTable() ;
var url = 'https://localhost:44364/api/categories';
$.ajax({
type: "POST",
url: url,
data: JSON.stringify(body),
contentType: "application/json",
dataType: "json",
success: function (result) {
 console.log(result);
 window.alert("Successful");
 table.ajax.reload();
},
error: function (xhr, status, error) {

}
});
}

function DeleteCategory()
{
  var table = $('#catetable').DataTable();
  var url = 'https://localhost:44364/api/categories/' + document.getElementById("inputIDdelete").value;
  $.ajax({
    type: "DELETE",
    url: url,
    contentType: "application/json",
    dataType: "json",
    success: function (result ,status) {
      table.ajax.reload();
      window.alert("Successful");
},
error: function (xhr, status, error) {
}
});
}
function getCategoryById(id)
{
var url = 'https://localhost:44364/api/categories/' + id ;
$.ajax({
type: "GET",
url: url,
success: function (result) {
console.log(result);
  $('#inputIDdelete').val(result.id);
  $('#inputIDUpdate').val(result.id);
  $('#inputNameUpdate').val(result.name);
  $('#inputDescriptionUpdate').val(result.description);
  $('#inputShortDescriptionUpdate').val(result.short_description);
},
error:function(xhr,Status,error){}
})
}

function Details(id)
{
var url = 'https://localhost:44364/api/categories/' + id ;
$.ajax({
type: "GET",
url: url,
success: function (result) {
console.log(result);
  $('#inputIDDetails').val(result.id);
  $('#inputNameDetails').val(result.name);
  $('#inputDescriptionDetails').val(result.description);
  $('#inputShortDescriptionDetails').val(result.short_description);
  //Update
  $('#inputIDUpdate').val(result.id);
  $('#inputNameUpdate').val(result.name);
  $('#inputDescriptionUpdate').val(result.description);
  $('#inputShortDescriptionUpdate').val(result.short_description);
},
error:function(xhr,Status,error){}
})
}
