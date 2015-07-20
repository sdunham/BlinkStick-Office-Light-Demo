$(document).ready(function(){
	//Light Toggle Demo
	$('.bs_toggle').click(function(e){
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

	//Runner Blink Demo
	$('.runner_blink').click(function(e){
		e.preventDefault();
		$.post('/runner-blink', function(res){
			console.log(res);
		});
	});

	//Random Morph Demo
	$('.random_morph').click(function(e){
		e.preventDefault();
		$.post('/random-morph', function(res){
			console.log(res);
		});
	});
});