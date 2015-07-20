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

module.exports = router;
