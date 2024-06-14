
$("#restart").click(function(){
  $("#menu2").html("<p>Restart?</p><p id='yes'>Yes</p><p id='no'>no</p>");
  $("#yes").click(function(){
	location.reload();
  });
  $("#no").click(function(){
	$("#menu2").html("");
  });
});
  
$("#credits").click(function(){
  $("#menu2").html("<p class='name'>ANDREA MARCOSANO</p><p class='name'>MATTEO GUGLIELMI</p>");
});


