$(document).ready(function(){
	$('#bs_toggle').click(function(e){
		e.preventDefault();
		$.post('/toggle-light', function(res){
			console.log(res);
			if(res.isOn){
				//Do something to indicate light is on
			}
			else{
				//Do something to indicate light is off
			}
		});
	});
});