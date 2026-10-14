const rockBtn = document.querySelector('#rockBtn');
const paperBtn = document.querySelector('#paperBtn');
const scissorsBtn = document.querySelector('#scissorsBtn');
const btnsContainer = document.querySelector('.btns-container');

const scores = { humanScore: 0, computerScore: 0 };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function roundAnimation() {
	const frames = ['ROCK', 'PAPER', 'SCISSORS', 'GO!'];

	const lastIndex = frames.length - 1;

	for (const [index, frame] of frames.entries()) {
		if (index === lastIndex) {
			showFrame(frame, 'black', 'greenyellow');
		} else if (index % 2 === 0) {
			showFrame(frame, 'black', 'white');
		} else {
			showFrame(frame, 'white', 'black');
		}

		await sleep(280);
	}

	await sleep(1500);
}

async function startGame(event) {
	const btn = event.target.closest('button');

	if (!btn) return;

	let humanChoice = btn.value;

	// rock, paper, scissors, go!
	await roundAnimation();

	let result = playRound(humanChoice, getComputerChoice());

	updateScores(result, scores);
	displayRoundResult(result);
	await sleep(2000);

	displayFinalResult(scores);
	await sleep(3000);
	hideFrame('.scores');
}

btnsContainer.addEventListener('click', startGame);

function showFrame(text, textColor, backgroundColor) {
	const frame = document.querySelector('.frame');

	frame.textContent = text;
	frame.style.color = textColor;
	frame.style.backgroundColor = backgroundColor;
	frame.classList.add('frameActive');
}

function hideFrame(className) {
	const frame = document.querySelector(className);

	if (frame.classList.contains('frameActive')) {
		frame.classList.remove('frameActive');
	}
}

function displayRoundResult(result) {
	if (result === 'win') {
		showFrame('YOU WIN!', 'black', 'greenyellow');
		return;
	}

	if (result === 'lose') {
		showFrame('YOU LOSE!', 'black', 'red');
		return;
	}

	showFrame("IT'S A TIE!", 'black', 'white');
}

function getHumanChoice() {
	user_choice = null;

	btnsContainer.classList.toggle('activeBtnsContainer');

	while (!user_choice) {}
}

function chooseNumber() {
	const randomNumber = Math.random() * 100;
	return Math.round(randomNumber) % 3;
}

function getOption(option) {
	if (option === 0) {
		return 'rock';
	}
	if (option === 1) {
		return 'paper';
	}

	return 'scissors';
}

function getComputerChoice() {
	return getOption(chooseNumber());
}

// does rock beat paper?
function beats(choice1, choice2) {
	if (choice1 === 'rock' && choice2 === 'scissors') {
		return true;
	}

	if (choice1 === 'paper' && choice2 === 'rock') {
		return true;
	}

	if (choice1 === 'scissors' && choice2 === 'paper') {
		return true;
	}

	return false;
}

function playRound(humanChoice, computerChoice) {
	if (humanChoice === computerChoice) {
		return 'tie';
	}

	if (beats(humanChoice, computerChoice)) {
		return 'win';
	}

	return 'lose';
}

function updateScores(roundResult, scores) {
	if (roundResult === 'tie') {
		return;
	}

	if (roundResult === 'win') {
		scores.humanScore++;
		return;
	}

	scores.computerScore++;
}

function displayFinalResult(scores) {
	const scoresFrame = document.querySelector('.scores');
	const scoresTitle = document.querySelector('.scoreTitle');
	const humanScoreSpan = document.querySelector('.humanScore');
	const computerScoreSpan = document.querySelector('.computerScore');

	hideFrame('.frame');

	if (scores.humanScore > scores.computerScore) {
		scoresTitle.textContent = 'YOU WIN THE GAME';
	} else {
		scoresTitle.textContent = 'YOU LOSE THE GAME';
	}

	humanScoreSpan.textContent = scores.humanScore;
	computerScoreSpan.textContent = scores.computerScore;

	scoresFrame.classList.add('frameActive');
}
