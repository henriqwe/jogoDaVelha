//Adiciona o evento de click nos quadrados ao arquivo html ser completamente carregado.
document.addEventListener("DOMContentLoaded", () => {
    var squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener('click', handlerClick);
    });
});

// Ação de movimentação do jogador
function handlerClick(event) {
    //Realiza a movimenteção e verifica se o round foi encerrado. 
    if (handlerMove(event.target.id)) {
        setTimeout(() => {
            // Altera o background-color para verde dos ids que fazem parte da combinação vitoriosa deste round.
            for (i = 0; i < winPos.length; i++)
                document.getElementById(winPos[i]).style = "background-color: green;"
            setTimeout(() => {
                //Verifica se a rodada atual foi empate. se sim exibe a mensagem de empate na tela, senão exibe uma mensagem na tela informando o jogador vitorioso dessa rodada.
                if (drawGame) {
                    var showDraw = document.getElementById("modalDraw");
                    showDraw.setAttribute("class", "show");
                    setTimeout(() => {
                        showDraw.removeAttribute("class");
                    }, 1500)
                } else {
                    var WinPlayer = (playerTurn == 0) ? "modalWinPlayer0" : "modalWinPlayer1"
                    var showWinPlayer = document.getElementById(WinPlayer);
                    showWinPlayer.setAttribute("class", "show");
                    setTimeout(() => {
                        showWinPlayer.removeAttribute("class");

                    }, 1500)

                }
            }, 11);
        }, 10);
        //Atualização para uma nova rodada.
        setTimeout(() => {
            updateScoreboard();
            resetBoard();
            resetViewer();
        }, 1500);

    };

    updateSquare(event.target.id);
}

// Atualiza o quadro selecionado pelo jogador com o seu simbolo.
function updateSquare(position) {
    var square = document.getElementById(position.toString());
    var symbol = board[position];
    square.innerHTML = `<div class="${symbol}"></div>`;
}

// Inicia um novo round.
function resetViewer() {
    document.getElementById("board").innerHTML = '<div>    <div class="square" id="0"></div>    <div class="square" id="1"></div>    <div class="square" id="2"></div></div><div>    <div class="square" id="3"></div>    <div class="square" id="4"></div>    <div class="square" id="5"></div></div><div>    <div class="square" id="6"></div>    <div class="square" id="7"></div>    <div class="square" id="8"></div></div>';
    var squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        square.addEventListener('click', handlerClick);
    });
}

// Atualiza a Scoreboard.
function updateScoreboard() {
    document.getElementById("scoreboardO").innerHTML = scoreboard[0];
    document.getElementById("scoreboardX").innerHTML = scoreboard[1];
}