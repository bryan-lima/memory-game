/**************************************************************************************
*
* Desenvolvido por BRYAN LIMA
* GitHub: https://github.com/bryan-lima
*
* Atividade Acadêmica - Jogo da Memória
* Análise e Desenvolvimento de Sistemas - ADS
* Repositório deste projeto: https://github.com/bryan-lima/memory-game
*
**************************************************************************************/

// Controla score
function ScoreBoardGameControl() {
	var score = 0;
	var POINT_GAME = 10;
  var corrects = 0;
 
	this.updateScore =  function() {
		var scoreDiv = document.getElementById("score");
		scoreDiv.innerHTML =  score;
	}

	this.incrementScore =  function() {
		corrects++;
    score+= POINT_GAME;
    var TOTAL_CORRECT = checkPairs();
		if (corrects ==  TOTAL_CORRECT) {
			alert("Fim de Jogo! Seu Score foi " + score);
		}
	}

	this.decrementScore =  function() {
		score-= POINT_GAME-5;
  }
  
  this.clearScore = function() {
    score = 0;
    corrects = 0;
    this.updateScore();
  }

  this.scoreNow = function() {
    return score
  }
}

// Instancia objeto
scoreControl = new ScoreBoardGameControl;

/*
  Adaptado código de url:https://marina-ferreira.github.io/tutorials/js/memory-game.pt-br/
  Autora: Marina Ferreira
*/

// Seleciona todos os elementos com a classe ".memory-card" e armazena na constante cards
const cards = document.querySelectorAll('.memory-card');

// Definição das variáveis e valor padrão
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Vira a carta (aplica classe flip)
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

// Verifica se as cartas viradas deram match
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

// Desativa click das cartas que deram match, aplica classe match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  firstCard.classList.add('match');
  secondCard.removeEventListener('click', flipCard);
  secondCard.classList.add('match');

  scoreControl.incrementScore();
  scoreControl.updateScore();

  resetBoard();
}

// Retorna (desvira) cartas que não deram match à posição original
function unflipCards() {
  firstCard.classList.add('no-match');
  secondCard.classList.add('no-match');

  scoreControl.decrementScore();
  scoreControl.updateScore();

  setTimeout(() => {
    firstCard.classList.remove('flip');
    firstCard.classList.remove('no-match');
    secondCard.classList.remove('flip');    
    secondCard.classList.remove('no-match');
    resetBoard();
  }, 1500);
}

// Retorna valor padrão das variáveis
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// Reinicia as configurações do jogo
function restartGame() {
  cards.forEach(card => card.classList.remove('no-match'));
  cards.forEach(card => card.classList.remove('match'));
  cards.forEach(card => card.classList.remove('flip'));
  cards.forEach(card => card.addEventListener('click', flipCard));
  scoreControl.clearScore();
  resetBoard();
  shuffle();
}

// Verifica se é página com-10-pares.html ou com-15-pares.html e retorna quantidade de pares
function checkPairs() {
  let urlGame = window.location.pathname;
  if (urlGame == '/memory-game/com-10-pares.html') {
    qtyPairs = 10;
  }
  if (urlGame == '/memory-game/com-15-pares.html') {
    qtyPairs = 15;
  }
  return qtyPairs
}

// Verifica se é página com-10-pares.html ou com-15-pares.html e retorna quantidade de cartas
function checkCards() {
  let urlGame = window.location.pathname;
  if (urlGame == '/memory-game/com-10-pares.html') {
    qtyCards = 20;
  }
  if (urlGame == '/memory-game/com-15-pares.html') {
    qtyCards = 30;
  }
  return qtyCards
}

// Ordena as cartas de forma randômica
function shuffle() {
  number = checkCards();
  cards.forEach(card => {
  let ramdomPos = Math.ceil(Math.random() * number);
  card.style.order = ramdomPos; 
  });
};

// Adiciona click nos cards
cards.forEach(card => card.addEventListener('click', flipCard));

// Função chamada ao carregar página (com-10-pares.html ou com-15-pares.html)
function createGame() {
  shuffle();
}
