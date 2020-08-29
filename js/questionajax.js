 // answer_type
$(document).ready(function(){
GetType();
});
function GetType(){
var url = 'https://localhost:44364/api/questiontype/only';
$.ajax({
  type: "GET",
  url: url,
  success: function (result) {
    console.log(result);
    var _options ="";
    $.each(result, function(i, value) {
        _options +=('<option value="'+ value.code+'">'+ value.code +'</option>');
    });
    $('#questiontype').append(_options);
      }
  });
}

function AddQuestionAnswer(){
  var y = $('#InputAnswers').map( function(i,el){
    var result = {};
    result[el.content,'content'] = $(el).val();
    return result;
  }).get();
  console.log(y);
       var obj = {
         content: document.getElementById("InputContent").value,
         skills: document.getElementById("ajax").value,
         answers:y,
       };
       var k = JSON.stringify(obj);
       console.log(k);
       var url = 'https://localhost:44364/api/questionanswers';
       $.ajax({
           type: "POST",
           url: url,
           data: k,
           contentType: "application/json",
           dataType: "json",
           success: function (result) {
             console.log(result);
             window.location.reload();
             window.alert("Sucessful");
           },
           error: function (xhr, status, error) {
           }
       });
   };
