let Tabuleiro = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let VezDe = "X";
let linha
let coluna
const Celulas = Array.from(document.getElementsByClassName("celula"));
function checarVencedor(jogador) {
    for (let i = 0; i < 3; i++) {
        if (
            Tabuleiro[i][0] === jogador &&
            Tabuleiro[i][1] === jogador &&
            Tabuleiro[i][2] === jogador
        ) {
            celulaGanhadoras(i, 0, i, 1, i, 2);
            return true;
        }
        if (
            Tabuleiro[0][i] === jogador &&
            Tabuleiro[1][i] === jogador &&
            Tabuleiro[2][i] === jogador
        ) {
            celulaGanhadoras(0, i, 1, i, 2, i);
            return true;
        }
    }

    if (
        Tabuleiro[0][0] === jogador &&
        Tabuleiro[1][1] === jogador &&
        Tabuleiro[2][2] === jogador
    ) {
        celulaGanhadoras(0, 0, 1, 1, 2, 2);
        return true;
    }

    if (
        Tabuleiro[0][2] === jogador &&
        Tabuleiro[1][1] === jogador &&
        Tabuleiro[2][0] === jogador
    ) {
        celulaGanhadoras(0, 2, 1, 1, 2, 0);
        return true;
    }

    return false;
}

function TabuleiroCheio () {
 return Tabuleiro.every(linha => linha.every(celula => celula !== ""))
} 
const Empate = TabuleiroCheio ()
function celulaGanhadoras(linha1, coluna1, linha2, coluna2, linha3, coluna3) {
    Celulas[linha1 * 3 + coluna1].classList.add('winner');
    Celulas[linha2 * 3 + coluna2].classList.add('winner');
    Celulas[linha3 * 3 + coluna3].classList.add('winner');
}
function EndGame () {
    Celulas.forEach((celula) => {
                celula.textContent = ""
                Tabuleiro = [
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""]
                  ];
                 
                  setTimeout(() => {
                    celula.removeAttribute("clicada"); 
                    VezDe = "X";
                }, 10);
                  
            })
}
function movimentoDoJogador(celula, indice) { 
    
    celula.addEventListener("click", () => { 
        if (celula.hasAttribute("clicada")) {
                    return
          } 
        linha = Math.floor(indice / 3)
        coluna = indice % 3;
        if (Tabuleiro[linha][coluna] === "") { 
            Tabuleiro[linha][coluna] = VezDe;
            celula.textContent = VezDe;
        }  
       
        const venceu = checarVencedor(VezDe)
        const empate = TabuleiroCheio()
        if (venceu === true || empate === true) {
            if (venceu === true) {
                setTimeout(() => {
                     alert('Vitoria do jogador X')
                    }, 100)
            }else if (empate === true) {
                setTimeout(() => {
                    alert('Empate')
                    }, 100)
            }
            setTimeout(() => {
                EndGame();
            }, 500);
        }else if(venceu === false) {
                movimentoDaMaquina()
                VezDe = 'X'
           
        }
        celula.setAttribute("clicada", "true");
      
        }) 
       
    }

    // ---------------------------------------------------------
    function movimentoDaMaquina() {
        const bestMove = getBestMove();
        const linha = bestMove.linha;
        const coluna = bestMove.coluna;
        Tabuleiro[linha][coluna] = "O"
        const index = linha * 3 + coluna;
        const celula = Celulas[index];
        celula.textContent = "O"
        VezDe = "O"
        celula.setAttribute("clicada", "true");
        const venceu = checarVencedor(VezDe)
        const empate = TabuleiroCheio()
        celula.addEventListener("click", () => {
            movimentoDoJogador(celula, index); 
        });
        if (venceu === true || empate === true) {
            if (venceu === true) {
                setTimeout(() => {
                alert('Vitoria do jogador O')
                }, 100)
            }else if (empate === true) {
                setTimeout(() => {
                alert('Empate')
                }, 100)
            }
            setTimeout(() => {
                EndGame();
            }, 500);
            } 
        celula.removeEventListener("click", movimentoDoJogador);
    }

    function minimax(Tabuleiro, depth, isMaximizingPlayer) {
        if (checarVencedor('X')) {
            return -1;
        } else if (checarVencedor('O')) {
            return 1;
        } else if (TabuleiroCheio()) {
            return 0;
        }
        if (isMaximizingPlayer) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (Tabuleiro[i][j] === '') {
                        Tabuleiro[i][j] = 'O';
                        const score = minimax(Tabuleiro, depth + 1, false);
                        Tabuleiro[i][j] = '';
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (Tabuleiro[i][j] === '') {
                        Tabuleiro[i][j] = 'X';
                        const score = minimax(Tabuleiro, depth + 1, true);
                        Tabuleiro[i][j] = '';
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
    function getBestMove() {
        let bestScore = -Infinity;
        let bestMove;
    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Tabuleiro[i][j] === '') {
                    Tabuleiro[i][j] = 'O';
                    if (checarVencedor('X')) {
                        Tabuleiro[i][j] = '';
                        continue; 
                    }
                    const score = minimax(Tabuleiro, 0, false);
                    Tabuleiro[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { linha: i, coluna: j };
                    }
                }
            }
        }
    
        return bestMove;
    }

    Celulas.forEach(movimentoDoJogador) 

