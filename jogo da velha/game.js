// Board do jogo.
var board = ["", "", "", "", "", "", "", "", ""];
// Jogador da vez, o valor será 0 para O e 1 para X.
var playerTurn = 0;
// Simbolos que represetam cada jogador.
var symbols = ["O", "X"];
// Estado de jogo, ao ser verdadeiro o round termina.
var endGame = false;
// Estado de empate, caso não existam mais campos vazios e nem uma combinação vitoriaosa.
var drawGame = false;
// Combinações vitoriosas.
var winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Postição vitoriosa do round autal.
var winPos = [];
//Placar dos jogadores O e X.
var scoreboard = [0, 0];

// Ação de movimentação
function handlerMove(position) {

    // Caso endGame sejá verdadeiro não será permitido realizar mais movimentos.
    if (endGame) {
        return;
    }
    //Valida se o quadrado selecionado pelo jogador é vazio, se sim inclui o simbolo do jogador dentro do board, senão nem uma movimentção será realizada.
    if (board[position] == "") {
        board[position] = symbols[playerTurn];

        //Verifica se o lance atual gerou alguma combinação vitoriosa, senão altera a vez do jogador.
        endGame = turnWin();
        if (!endGame) {
            playerTurn = (playerTurn == 0) ? 1 : 0;
        }
    }
    //Valida se existem quadrados vazios, caso nao existam quadrados vazios a rodada é dada como empate.
    if (!endGame) endGame = turnDraw();

    return endGame;
};

//Verifica se existe alguma combinação vitoriosa.
function turnWin() {

    for (i = 0; i < winStates.length; i++) {
        let seq = winStates[i];

        let pos1 = seq[0];
        let pos2 = seq[1];
        let pos3 = seq[2];

        if (board[pos1] == board[pos2] && board[pos1] == board[pos3] && board[pos1] != "") {
            scoreboard[playerTurn] += 1;
            winPos.push(pos1, pos2, pos3);
            return true;
        }
    };
    return false;
};

//Verifica se existe algum quadrado vazio.
function turnDraw() {
    for (i of board)
        if (i == "") return false;

    drawGame = true;
    return true;
};

//Reinicia todo o board para uma nova rodada.
function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    winPos = [];
    playerTurn = 0;
    endGame = false;
    drawGame = false;
}