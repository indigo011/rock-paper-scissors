// valores possíveis de retorno: rock, paper ou scissors
// entrada: o usuário deve clicar no botão
// como escolher um dos valores...
// ao dividir qualquer número por 3, o resto
// sempre será 0, 1 ou 2
// um valor é gerado pseudoaleatoriamente por math random
// o valor é convertido para um inteiro positivo
// esse valor é então divido por 3
// se o resto da divisao for 0: retorna rock
// se o resto for 1: retorna paper
// se o resto for 2: retorna scissors
// saída: um dos 3 valores é retornado

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
    const opcao = chooseNumber()

    return getOption(opcao)
}

function getHumanChoice() {
    const opcao = prompt("Digite pedra, papel ou tesoura")

    if (opcao === "pedra") {
        return "rock"
    }

    if (opcao === "papel") {
        return "paper"
    }

    if (opcao === "tesoura") {
        return "scissors"
    }

}

function hello() {
    // clicou em jogar
    // exibe na tela "pensando..."
    // informa se ganhou ou perdeu
    // mostra o score

    const displayContainer = document.querySelector(".display")
    const resultContainer = document.querySelector(".result")
    const scoreDisplay = document.querySelector(".score")

    resultContainer.textContent = "Pensando..."

    const humanChoice = getHumanChoice()
    const computerChoice = getComputerChoice()

    let result = playRound(humanChoice, computerChoice)

    if (result === 1) {
        resultContainer.textContent = "VOCÊ GANHOU!"
    }
    else if (result === 0) {
        resultContainer.textContent = "VOCÊ PERDEU!"
        displayContainer.classList.add("lose")
    }
    else {
        resultContainer.textContent = "EMPATOU!"
    }

    setTimeout(()=>{
        // mostra o score
        updateScores()
        scoreDisplay.classList.add("showScore")
    }, 1000)

    //redefine após 3 segundos
    setTimeout(()=>{
        resultContainer.textContent = ""

        if (displayContainer.classList.contains("lose")) {
            displayContainer.classList.remove("lose")
        }

        scoreDisplay.classList.remove("showScore")
    }, 3000)
}

function updateScores() {
    const humanScoreElement = document.querySelector(".humanScore")
    const computerScoreElement = document.querySelector(".computerScore")

    humanScoreElement.textContent = humanScore
    computerScoreElement.textContent = computerScore
}

humanScore = 0
computerScore = 0

updateScores()


function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase()
    computerChoice = computerChoice.toLowerCase()

    // pedra + pedra = nulo
    // papel + papel = nulo
    // tesoura + tesoura = nulo
    // pedra + papel = papel
    // pedra + tesoura = pedra
    // tesoura + papel = tesoura

    if (humanChoice === computerChoice) {
        return -1
    }
    
    // human wins
    if (humanChoice === "rock" && computerChoice === "scissors") {
        humanScore++;
        return 1
    }

    if (humanChoice === "paper" && computerChoice === "rock") {
        humanScore++;
        return 1
    }

    if (humanChoice === "scissors" && computerChoice === "paper") {
        humanScore++;
        return 1
    }

    // computer wins
    if (computerChoice === "rock" && humanChoice === "scissors") {
        computerScore++;
        return 0
    }

    if (computerChoice === "paper" && humanChoice === "rock") {
        computerScore++;
        return 0
    }

    if (computerChoice === "scissors" && humanChoice === "paper") {
        computerScore++;
        return 0
    }
}


