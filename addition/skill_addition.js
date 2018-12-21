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
	var answer = 0;
	for (var i = 0; i < DEFAULTS.CURRENT_NUMBERS.length; i++) {
		answer += DEFAULTS.CURRENT_NUMBERS[i];
	}
	DEFAULTS.ANSWER = answer;

	//Do visual stuff
	$("#interface li:nth-child(n+1):nth-child(-n+" + ($("#interface ul li").length - 4) + ")").remove();
	for (var i = DEFAULTS.CURRENT_NUMBERS.length - 1; i >= 0; i--) {
		if (i == 0) {
			$("<li><p>" + DEFAULTS.CURRENT_NUMBERS[i] + "</p></li>").insertBefore("#interface ul li:first-child");
		}
		else {
			$("<li><p>+" + DEFAULTS.CURRENT_NUMBERS[i] + "</p></li>").insertBefore("#interface ul li:first-child");
		}
	}
	$("#response").removeClass("right");
	$("#response").removeClass("wrong");
}

//Inclusive, Exclusive
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
