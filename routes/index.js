var express = require('express');
var router = express.Router();
var blinkstick = require('blinkstick');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BlinkStick Node Demo' });
});

/* POST toggle light */
router.post('/toggle-light', function(req, res, next){
	
	var led = blinkstick.findFirst();

	led.getColor(function(err, r, g, b){
		console.log(r, g, b);
		blnIsOn = (r!==0||g!==0||b!==0);
		console.log(blnIsOn);

		if(blnIsOn){
			led.morph('green', function(){
				setTimeout(function(){
					led.blink('green', {repeats:5, delay:200}, function(){
						led.turnOff()
					})
				}, 1000);
			});
		}
		else{
			led.blink('#00AEEF', {repeats:5, delay:200}, function(){
				led.setColor('#00AEEF')
			})
		}
	});

	res.send({isOn: blnIsOn});
});

/* POST Runner Example */
router.post('/runner-blink', function(req, res, next){
	var device = blinkstick.findFirst();
	if (device) {
	    var finished = false;
	    var ledCount = 7;
	    var index = 0;
	    var rotations = 0;

	    var setColor = function () {
	        console.log(index);
	        device.blink("random", {'channel':0, 'index':index, 'delay':1}, function() {
	            if (index == ledCount && rotations == 10) {
	                finished = true;
	            }
	            else if(index == ledCount && rotations < 10){
	            	rotations += 1;
	            	index = 0;
	            	setTimeout(setColor, 10);
	            }
	            else {
	                index += 1;
	                setTimeout(setColor, 10);
	            }
	        });
	    }

	    //You need to set mode only once. Run the code below if you haven't already set
	    //BlinkStick Pro to mode 2
	    
	    device.setMode(2, function() {
	        setColor();
	    });

	    //setColor();

	    var wait = function () {
	    	if (!finished){
	    		setTimeout(wait, 100);
	    	}
	    	else{
	    		device.setMode(3, function(){
	    			res.send({modeReverted: true});
	    		});
	    	}
	    }
	    wait();
	}
});

/* POST Runner Example */
router.post('/random-morph', function(req, res, next){
	var device = blinkstick.findFirst();
	if (device) {
	    var finished = false;
	    var index = 0;

	    var morphColor = function () {
	        console.log(index);
	        device.morph("random", function() {
	            if (index == 10) {
	                finished = true;
	            }
	            else {
	                index += 1;
	                setTimeout(morphColor, 500);
	            }
	        });
	    }

	    morphColor();

	    var wait = function () {
	    	if (!finished){
	    		setTimeout(wait, 100);
	    	}
	    	else{
	    		device.turnOff();
	    		res.send({demoComplete: true});
	    	}
	    }
	    wait();
	}
});

module.exports = router;
