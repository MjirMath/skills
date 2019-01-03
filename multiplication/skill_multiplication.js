//CONSTANTS(ish)
var DEFAULTS = {
	MIN_DIGITS: 1,
	MIN_NUMBERS: 2,
	DIGITS: 1,
	NUMBERS: 2,
	CURRENT_NUMBERS: [],
	ANSWER: null
}

//GLOBAL VARIABLES
var correct = null;

//Main
generateProblem();

//Events
window.onkeyup = function(e) {
	if (e.keyCode == 13) {
		checkAnswer();
	}
}

function toggleSettings(div) {
	if ($(div).hasClass("close") == true) {
		$(div).removeClass("close");
		$(div).addClass("open");
	} else {
		$(div).removeClass("open");
		$(div).addClass("close");
	}
}

function checkAnswer() {
	if ($("#answer").val() == DEFAULTS.ANSWER) {
		$("#response").addClass("right");
		$("#response").removeClass("wrong")
	} else {
		$("#response").addClass("wrong");
		$("#response").removeClass("right")
	}
}

// TODO: Clean-up this function
function generateProblem() {
	//Generate the numbers
	DEFAULTS.CURRENT_NUMBERS = [];
 	for (var i = 0; i < DEFAULTS.NUMBERS; i++) {
		//Generate random numbers based on how many digits
		var tempNums = [];
		for (var j = 0; j < DEFAULTS.DIGITS; j++) {
			tempNums.push(getRandomInt(0, 10));
		}
		//'Add' up the digits
		var newNum = 0;
		for (var j = 0; j < tempNums.length; j++) {
			newNum += tempNums[j] * Math.pow(10, j);
		}
		DEFAULTS.CURRENT_NUMBERS.push(newNum);
	}

	//Figure out the answer
	var answer = DEFAULTS.CURRENT_NUMBERS[0];
	for (var i = 1; i < DEFAULTS.CURRENT_NUMBERS.length; i++) {
		answer *= DEFAULTS.CURRENT_NUMBERS[i];
	}
	DEFAULTS.ANSWER = answer;

	//Do visual stuff
	//Display if correct or not
	$("#interface li:nth-child(n+1):nth-child(-n+" + ($("#interface ul li").length - 4) + ")").remove();
	for (var i = DEFAULTS.CURRENT_NUMBERS.length - 1; i >= 0; i--) {
		if (i == 0) {
			$("<li><p>" + DEFAULTS.CURRENT_NUMBERS[i] + "</p></li>").insertBefore("#interface ul li:first-child");
		}
		else {
			$("<li><p>x" + DEFAULTS.CURRENT_NUMBERS[i] + "</p></li>").insertBefore("#interface ul li:first-child");
		}
	}
	$("#response").removeClass("right");
	$("#response").removeClass("wrong");
	//Set height of settings
	var appHeight = $("#app").height();
	$("#settings-container").css("height", (String(appHeight) + "px"));
}

//Inclusive, Exclusive
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

//SETTING FUNCTIONS
function changeDigits(increment) {
	DEFAULTS.DIGITS += increment;
	if (DEFAULTS.DIGITS < DEFAULTS.MIN_DIGITS) {
		DEFAULTS.DIGITS = DEFAULTS.MIN_DIGITS;
	}
	$("#settings .setting:first-child p:nth-child(3)").html(String(DEFAULTS.DIGITS));
}

function changeNumbers(increment) {
	DEFAULTS.NUMBERS += increment;
	if (DEFAULTS.NUMBERS < DEFAULTS.MIN_NUMBERS) {
		DEFAULTS.NUMBERS = DEFAULTS.MIN_NUMBERS;
	}
	$("#settings .setting:nth-child(2) p:nth-child(3)").html(String(DEFAULTS.NUMBERS));
}
