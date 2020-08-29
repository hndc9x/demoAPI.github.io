$(document).ready(function(){
GetAPI();
GetClass();
GetClass1();
});
function GetAPI(){
  var url = 'https://localhost:44364/api/member/all';
              $('#table').DataTable({
                ajax:{
                  url:url,
                  dataSrc:''
                },
                columns:[
                  {title:"ID", data:'id'},
                  {title:"User Name", data:'username'},
                  {title:"Full Name",data:'fullname'},
                  {title:"Email",data:'email'},
                  {title:"BirthDay",data:'birthday'},
                  {title:"Phone",data:'phone'},
                  {title:"Class",data:'class'},
                  {title:"Activated",data:'activated'},
                ]
              });
}
function GetIDUser(){
       var obj = {
         fullname: document.getElementById("P_fullname").value,
         id: "string",
         username:document.getElementById("P_username").value,
         email: document.getElementById("P_email").value,
         };
       var k = JSON.stringify(obj);
       console.log(k);
       var url = 'https://localhost:44364/api/user';
       $.ajax({
           type: "POST",
           url: url,
           mode: 'cors',
           data: JSON.stringify(obj),
           contentType: "application/json",
          // / dataType: "json",
           success: function (result ,status) {
           $('#idusername').val(result);
           },
           error: function (xhr, status, error) {
           }
       });
   };
        function Add(){
               var obj = {
                 id : document.getElementById("idusername").value,
                 username:document.getElementById("P_username").value,
                 fullname: document.getElementById("P_fullname").value,
                 email: document.getElementById("P_email").value,
                 brithday: document.getElementById("P_brithday").value,
                 phone: document.getElementById("P_phone").value,
                 class: document.getElementById("getclassedit").value,
               };
              var id = document.getElementById("idusername").value;
              var username =document.getElementById("P_username").value;
              var fullname = document.getElementById("P_fullname").value;
              var email = document.getElementById("P_email").value;
              var brithday= document.getElementById("P_brithday").value;
              var phone= document.getElementById("P_phone").value;
              var classes= document.getElementById("getclassedit").value;
              if (id ==""|| username ==""||fullname ==""|| email ==""||birthday ==""||phone ==""||classes =="") {
                window.alert("Vui Lòng Nhập Đầy Đủ Thông Tin");
                return false;
              }
               var table= $('#table').DataTable();
               var url = 'https://localhost:44364/api/member';
               $.ajax({
                   type: "POST",
                   url: url,
                   data: JSON.stringify(obj),
                   contentType: "application/json",
                   dataType: "json",
                   success: function (result) {
                     console.log(result);
                     window.alert("Sucessful");
                     table.ajax.reload();
                   },
                   error: function (xhr, status, error) {
                   }
               });
           };
function Update(){
          var obj = {
         username: document.getElementById("Put_username").value,
         class: document.getElementById("getclassedit").value
       };
       var k = JSON.stringify(obj);
       console.log(k);
        var table= $('#table').DataTable();
         $.ajax({
           type: "PUT",
           url: "https://localhost:44364/api/member/" + document.getElementById("EnterID").value,
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
                   $.ajax({
                       url: "https://localhost:44364/api/member/" + document.getElementById("EnterID").value ,
                       type: "DELETE",
                       contentType: "application/json",
                       dataType: "json",
                       success: function (result) {
                        console.log(result);
                        window.location.reload();
                        window.alert("Successful");
                       },
                       error: function (errormessage) {
                           alert(errormessage.responseText);
                       }
                   });
           };
           function getDataById(){
              var url = "https://localhost:44364/api/member/" + document.getElementById("EnterID").value;
              $.ajax({
               type: "GET",
               url: url,
               contentType: false,
               processData: false,
               mode: 'cors',
               success: function (result , status) {
                console.log(result);
                    $('#D_idusername').val(result.id);
                    $('#Put_username').val(result.username);
              },
              error:function(xhr,Status,error){
                window.location.reload();
                window.alert("Vui lòng nhập ID trước");
              }
              })
            };
 function Details()  {
    var url = "https://localhost:44364/api/member/" + document.getElementById("EnterID").value;
    $.ajax({
     type: "GET",
     url: url,
     contentType: false,
     processData: false,
     success: function (result) {
      console.log(result);
          $('#D_id').val(result.id);
          $('#D_username').val(result.username);
          $('#D_fullname').val(result.fullname);
          $('#D_email').val(result.email);
          $('#D_brithday').val(result.brithday);
          $('#D_phone').val(result.phone);
          $('#D_class').val(result.class);
    },
    error:function(xhr,Status,error){
      window.alert("Vui lòng nhập ID trước");
      window.location.reload();
    }
    })
  }
  function GetClass(){
    var url = 'https://localhost:44364/api/classes/all';
    $.ajax({
      type: "GET",
      url: url,
      contentType: false,
      processData: false,
      success: function (result) {
        console.log(result);
        var _options ="";
        $.each(result, function(i, value) {
            _options +=('<option value="'+ value.id+'">'+ value.name +'</option>');
        });
        $('#getclassedit').append(_options);
          }
      });
    }

    function GetClass1(){
      var url = 'https://localhost:44364/api/classes/all';
      $.ajax({
        type: "GET",
        url: url,
        contentType: false,
        processData: false,
        success: function (result) {
          console.log(result);
          var _options ="";
          $.each(result, function(i, value) {
              _options +=('<option value="'+ value.id+'">'+ value.name +'</option>');
          });
          $('#getclassedit1').append(_options);
            }
        });
      }
