let dropdown = document.getElementById('show_skills');
dropdown.length = 0;
dropdown.selectedIndex = 0;
const url='https://localhost:44364/api/skills/only';
const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
const data = JSON.parse(request.responseText);
console.log(data);
let option;
for (let i = 0; i < data.length; i++) {
  option = document.createElement('option');
  option.text = data[i].name;
  option.value = data[i].id;
  dropdown.add(option);
  }
}
request.onerror = function() {
console.error('An error occurred fetching the JSON from ' + url);
};
request.send();


$(document).ready(function(){
GetSkill();
});
function GetSkill(){
var url = 'https://localhost:44364/api/skills/only';
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
    $('#skill').append(_options);
      }
  });
}
