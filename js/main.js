var step = new Stepper({
	canvasId : "canvas_container",
	width : 200,
	height : 200,
	strokeWidth : {
		bcg : 20,
		inner : 10
	},
	colors : {
		bcg : '#ccc',
		inner : 'teal',
		label : 'teal',
		pourcent : 'teal',
		unselectedLabel : 'grey'
	},
	activeStep : 4,
	steps : ['step1', 'step2', 'step3', 'step4', 'step5'],
	transitionTime : 0.5,
	fontSize : {
		label : 20,
		percent : 30,
		unselected : 10
	},
	fontFamily : {
		label : 'arial',
		percent : 'arial'
	},
	offsets : {
		label : 20,
		percent : 25,
		unselected : 15
	},
	unselectedOpacity : 0.8
})

step.changeStep(5);