$(document).ready(function(){
GetAPI();
});
function GetAPI(){
var url = 'https://localhost:44364/api/certifications';
        $('#table').DataTable( {
          ajax:{
            url:url,
            dataSrc:''
          },
          columns: [
          { title: "ID" , data:"id"},
          { title: "Code" , data:"code"},
          { title: "Certification Title" , data:"title"},
          { title: "Short Description",data:"short_description"},
          { title: "Description",data:"description"},
          { title: "Skills", data:"skills",
          render:function(d){
            if(d !== null){
                     var table = "<table>";
                     $.each(d, function(k, v){
                         table += "<tr><td>" + v.name + "</td></tr>";
                     });
                     return table + "</table>";
                 }else{
                     return "";
                 }
          }
        },
          {title: "Action",
           render: function (data, type, row) {
            return '<a  class="fa fa-pencil-square-o"  data-toggle="modal" data-target="#exampleModal1" href="#" onclick="getDataById('+row['id']+')" ></a> | <a class="fa fa-trash-o"  href="#" data-toggle="modal" data-target="#DeleteConfirm" onclick ="getDataById('+row['id']+')"></a> | <a class="fa fa-info-circle" data-toggle="modal" data-target="#exampleModal2" href="#" onclick="Details('+row['id']+')" ></a> '
          }
        },
        ]
      });
}
        function Add(){
          var y = $('#show_skills option:selected').map( function(i,el){
            var result = {};
            result[el.id,'id'] = $(el).val();
            return result;
          }).get();
          //  y = JSON.stringify(y);
          console.log(y);
               var obj = {
                 title : document.getElementById("T").value,
                 skills: y,
                 code: document.getElementById("C").value,
                 short_description: document.getElementById("SD").value,
                 description: document.getElementById("D").value,
               };
               var title = document.getElementById('T').value;
               var skill = document.getElementById('show_skills').value;
               var code = document.getElementById('C').value;
               var short_description = document.getElementById('SD').value;
               var description = document.getElementById('D').value;
               if (title=="" ||skill=="" ||code==""|| short_description=="" ||description=="" ) {
                 window.alert("Vui lòng nhập đầy đủ thông tin");
                 return false;
               //  window.alert("Vui lòng nhập đầy đủ thông tin");
               }
               var table = $('#table').DataTable() ;
               var k = JSON.stringify(obj);
               console.log(k);
               var url = 'https://localhost:44364/api/certifications';
               $.ajax({
                   type: "POST",
                   url: url,
                   data: JSON.stringify(obj),
                   contentType: "application/json",
                   dataType: "json",
                   success: function (result) {
                     table.ajax.reload();
                     window.alert("Sucessful");
                   },
                   error: function (xhr, status, error) {
                   }
               });
           };
           function Update(){
             var y = $('#skill option:selected').map( function(i,el){
             var result = {};
             result[el.id,'id'] = $(el).val();
             return result;
             }).get();
         //  y = JSON.stringify(y);
          console.log(y);
          var obj = {
         id:document.getElementById("UID").value ,
         title : document.getElementById("UTitle").value,
         skills :y,
         code: document.getElementById("UCode").value,
         short_description: document.getElementById("USDescription").value,
         description: document.getElementById("UDescription").value
       };
       var title = document.getElementById('UTitle').value;
       var skill = document.getElementById('skill').value;
       var code = document.getElementById('UCode').value;
       var short_description = document.getElementById('USDescription').value;
       var description = document.getElementById('UDescription').value;
       if (title=="" ||skill=="" ||code==""|| short_description=="" ||description=="" ) {
         window.alert("Vui lòng nhập đầy đủ thông tin");
         return false;
       }
        var table = $('#table').DataTable() ;
       var k = JSON.stringify(obj);
       console.log(k);
       var url = 'https://localhost:44364/api/certifications/' + document.getElementById("UID").value ;
         $.ajax({
           type: "PUT",
           url: url,
           data: JSON.stringify(obj),
           contentType: "application/json",
           dataType: "json",
           success: function (result) {
             console.log(result);
            table.ajax.reload();
             window.alert("Successful");
           },
           error: function (xhr, status, error) {
         },
       });
     };
           function Delete() {
               var table = $('#table').DataTable() ;
                   $.ajax({
                       url: "https://localhost:44364/api/certifications/" + document.getElementById("DID").value ,
                       type: "DELETE",
                       contentType: "application/json",
                       dataType: "json",
                       success: function (result, status) {
                         table.ajax.reload();
                         window.alert("Successful");
                       },
                       error: function (errormessage) {
                           alert(errormessage.responseText);
                          // table.ajax.reload();
                       }
                   });
           };
function getDataById(id)  {
   var url = 'https://localhost:44364/api/certifications/' + id ;
   $.ajax({
    type: "GET",
    url: url,
    success: function (result) {
     console.log(result);
        $('#DID').val(result.id);
         $('#UID').val(result.id);
         $('#UCode').val(result.code);
         $('#UTitle').val(result.title);
         $('#USDescription').val(result.short_description);
         $('#UDescription').val(result.description);
    //     $('#skill').val(result.skills[0].name);
   },
   error:function(xhr,Status,error){}
   })
 }
 function Details(id)  {
    var url = 'https://localhost:44364/api/certifications/' + id ;
    $.ajax({
     type: "GET",
     url: url,
     success: function (result) {
      console.log(result);
          $('#ID_Details').val(result.id);
          $('#Code_Details').val(result.code);
          $('#Title_Details').val(result.title);
          $('#SDescription_Details').val(result.short_description);
          $('#Description_Details').val(result.description);
          $('#skill').val(result.skills);

          //Update
          $('#UID').val(result.id);
          $('#UCode').val(result.code);
          $('#UTitle').val(result.title);
          $('#USDescription').val(result.short_description);
          $('#UDescription').val(result.description);

    },
    error:function(xhr,Status,error){}
    })
  }
