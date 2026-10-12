// user clicks play button
// for each round in a range of 5 rounds:
//      game displays round n
//      game prompts the user to choose between rock, paper and scissors
//      game shows the result
//      game increments the score of the winner
//      if  any of the scores is equal to 3 breaks the loop
// displays winners

// user clicks playGame
async function playGame() {
    const playBtn = document.querySelector("#playBtn")
    const scores = {humanScore: 0, computerScore: 0}
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    playBtn.disabled = true

    for (let round = 1; round <= 5; round++) {
        showFrame(`Round ${round}`, "black", "yellow")
        await sleep(1000)

        const humanChoice = getHumanChoice()
        const computerChoice = getComputerChoice()
       
        let result = playRound(humanChoice, computerChoice)

        updateScores(result, scores)
        displayRoundResult(result)
        await sleep(2000)

        if (scores.humanScore === 3 || scores.computerScore === 3) {
            break
        }

        setTimeout(()=>{return}, 1000)
    }
    

    displayFinalResult(scores) 
    await sleep(3000)
    hideFrame(".scores")
    playBtn.disabled = false
}

function showFrame(text, textColor, backgroundColor) {
    const frame = document.querySelector(".frame")

    frame.textContent = text
    frame.style.color = textColor
    frame.style.backgroundColor = backgroundColor
    frame.classList.add("frameActive")
}

function hideFrame(className) {
    const frame = document.querySelector(className)

    if (frame.classList.contains("frameActive")) {
        frame.classList.remove("frameActive")
    }
}

function displayRoundResult(result) {
    if (result === "win") {
        showFrame("YOU WIN!", "black", "greenyellow")
        return
    }

    if (result === "lose") {
        showFrame("YOU LOSE!", "black", "red")
        return
    }

    showFrame("IT'S A TIE!", "black", "white")
}

function getHumanChoice() {
    return prompt("Enter rock, scissors or paper").toLowerCase()
}

function chooseNumber() {
    const randomNumber = Math.random() * 100
    return Math.round(randomNumber) % 3
}

function getOption(option) {
    if (option === 0) {
        return "rock"
    }
    if (option === 1) {
        return "paper"
    }

    return "scissors"
}

function getComputerChoice() {
    return getOption(chooseNumber())
}

// does rock beat paper?
function beats(choice1, choice2) {
    if (choice1 === "rock" && choice2 === "scissors") {
        return true
    }

    if (choice1 === "paper" && choice2 === "rock") {
        return true
    }

    if (choice1 === "scissors" && choice2 === "paper") {
        return true
    }

    return false
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "tie"
    }

    if (beats(humanChoice, computerChoice)) {
        return "win"
    }

    return "lose"
}

function updateScores(roundResult, scores) {
    if (roundResult === "tie") {
        return
    }

    if (roundResult === "win") {
        scores.humanScore++
        return
    }

    scores.computerScore++
}

function displayFinalResult(scores) {
    const scoresFrame = document.querySelector(".scores")
    const scoresTitle = document.querySelector(".scoreTitle")
    const humanScoreSpan = document.querySelector(".humanScore")
    const computerScoreSpan = document.querySelector(".computerScore")

    hideFrame(".frame")

    if (scores.humanScore > scores.computerScore) {
        scoresTitle.textContent = "YOU WIN THE GAME"
    } 
    else {
        scoresTitle.textContent = "YOU LOSE THE GAME"
    }

    humanScoreSpan.textContent = scores.humanScore
    computerScoreSpan.textContent = scores.computerScore

    scoresFrame.classList.add("frameActive")
}
