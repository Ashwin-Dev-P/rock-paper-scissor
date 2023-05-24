"use strict";

const human_option_images = document.getElementsByClassName("human_options");
const human_score_span = document.getElementById("human_score");
const computer_score_span = document.getElementById("computer_score");
const outputDiv = document.getElementById("output");
outputDiv.style.visibility = "hidden";

// Add event listeners
for (let option_i = 0; option_i < 3; option_i++) {
	human = option_i + 1;
	human_option_images[option_i].addEventListener("click", selectOption);
}

const values = {
	1: "rock",
	2: "paper",
	3: "scissors",
};

var human_score = 0;
var computer_score = 0;
var human = 0;
var computer = 0;
var result = "";
var win = null;

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function computerPlay() {
	const computer_selection_img = document.querySelector(
		"#computer_selection source",
	);

	computer = getRandom(1, 3);

	const image_name = values[computer];

	const src = `./assets/images/${image_name}.webp`;
	computer_selection_img.setAttribute("srcset", src);

	document.querySelector("#human_selection img").classList.remove("my-spin");
	document.querySelector("#computer_selection img").classList.remove("my-spin");
}

// Human play
function selectOption(event) {
	// create spinning animation
	document.querySelector("#human_selection img").className = " my-spin";
	document.querySelector("#computer_selection img").className = " my-spin";

	const { src, id } = event.target;
	human = id;

	const human_selection_img = document.querySelector("#human_selection source");
	human_selection_img.setAttribute("srcset", src);

	// Wait for the animation get finished
	setTimeout(computerPlay, 450);

	computeResult();
	displayResult();
}

function computeResult() {
	if (human == computer) {
		win = null;
	} else if (
		(human == 1 && computer == 3) ||
		(human == 2 && computer == 1) ||
		(human == 3 && computer == 2)
	) {
		win = true;
	} else {
		win = false;
	}
	console.log("Computed result:", human, computer, win);
}

function displayResult() {
	outputDiv.style.visibility = "visible";
	if (win == null) {
		outputDiv.classList.remove("my-danger");
		outputDiv.classList.remove("my-success");
		outputDiv.innerText = "Tie";
	} else if (win == true) {
		outputDiv.classList.remove("my-danger");
		outputDiv.classList.add("my-success");

		outputDiv.innerText = "You won";
		human_score += 1;
		human_score_span.innerText = human_score;
	} else {
		outputDiv.classList.remove("my-success");
		outputDiv.classList.add("my-danger");

		outputDiv.innerText = "You lost";
		computer_score += 1;
		computer_score_span.innerText = computer_score;
	}
}
