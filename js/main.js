var step = new Stepper({
	id : "canvas_container",
	width : 200,
	height : 200,
	strokeWidth : 20,
	innerStrokeWidth : 10,
	colors : {
		bcg : '#ccc',
		inner : 'teal',
		label : 'teal',
		pourcent : 'teal',
		unselectedLabel : 'grey'
	},
	activeStep : 4,
	steps : ['step1', 'step2', 'step3', 'step4', 'step5'],
	swapTime : 0.5,
	labelFontSize : 20,
	pecentFontSize : 30,
	labelFontFamily : 'arial',
	percentFontFamily : 'arial',
	labelOffset : 20,
	percentOffset : 25,
	unselectedOffset : 15,
	unselectedFontSize : 10,
	unselectedOpacity : 0.8
})

step.changeStep(5);