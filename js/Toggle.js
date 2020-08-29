$("#button").click(function() {
  $("#box form").toggle("slow");
  return false;
});

$("#button1").click(function() {
  $("#box1 form").toggle("slow");
  return false;
});

$("#button2").click(function() {
  $("#box2 form").toggle("slow");
  return false;
});


// Tabmenu
function openTab(evt, Name) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(Name).style.display = "block";
  evt.currentTarget.className += " active";
}
