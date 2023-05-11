import React, { useState, useEffect } from "react";
import Maze from "./Maze";
import './styles/MazeGame.css'

function gerarLabirinto() {
    const linhas = 20;
    const colunas = 20;
  
    // Criar matriz vazia
    const labirinto = [];
    for (let i = 0; i < linhas; i++) {
      const linha = [];
      for (let j = 0; j < colunas; j++) {
        linha.push(0);
      }
      labirinto.push(linha);
    }
  
    // Preencher bordas com paredes
    for (let i = 0; i < linhas; i++) {
      labirinto[i][0] = 1;
      labirinto[i][colunas - 1] = 1;
    }
    for (let j = 0; j < colunas; j++) {
      labirinto[0][j] = 1;
      labirinto[linhas - 1][j] = 1;
    }
  
    const direcoes = [
      { linha: -1, coluna: 0 },
      { linha: 0, coluna: 1 },
      { linha: 1, coluna: 0 },
      { linha: 0, coluna: -1 }
    ];
  
    const pilha = [{ linha: 1, coluna: 1 }]; // Posição inicial
    labirinto[1][1] = 1; // Definir a posição inicial como caminho
  
    while (pilha.length > 0) {
      const atual = pilha[pilha.length - 1];
      const vizinhos = [];
  
      for (const direcao of direcoes) {
        const vizinhoLinha = atual.linha + direcao.linha * 2;
        const vizinhoColuna = atual.coluna + direcao.coluna * 2;
  
        if (
          vizinhoLinha > 0 &&
          vizinhoLinha < linhas &&
          vizinhoColuna > 0 &&
          vizinhoColuna < colunas &&
          labirinto[vizinhoLinha][vizinhoColuna] === 0
        ) {
          vizinhos.push({ linha: vizinhoLinha, coluna: vizinhoColuna });
        }
      }
  
      if (vizinhos.length === 0) {
        pilha.pop();
      } else {
        const vizinho = vizinhos[Math.floor(Math.random() * vizinhos.length)];
        const caminhoLinha = (atual.linha + vizinho.linha) / 2;
        const caminhoColuna = (atual.coluna + vizinho.coluna) / 2;
  
        labirinto[caminhoLinha][caminhoColuna] = 1; // Abrir caminho entre células
        labirinto[vizinho.linha][vizinho.coluna] = 1; // Mover para a próxima célula
  
        pilha.push({ ...vizinho });
      }
    }
  
    return labirinto;
  }

  export default function MazeGame() {
    const [maze, setMaze] = useState([]);
    const [playerPosition, setPlayerPosition] = useState({
      row: 1,
      column: 1,
    });
  
    const handleKeyDown = (event) => {
      const { key } = event;
  
      switch (key) {
        case "ArrowUp":
          if (
            playerPosition.row > 0 &&
            maze[playerPosition.row - 1][playerPosition.column] === 0
          ) {
            setPlayerPosition((prev) => ({
              ...prev,
              row: prev.row - 1,
            }));
          }
          break;
        case "ArrowDown":
          if (
            playerPosition.row < maze.length - 1 &&
            maze[playerPosition.row + 1][playerPosition.column] === 0
          ) {
            setPlayerPosition((prev) => ({
              ...prev,
              row: prev.row + 1,
            }));
          }
          break;
        case "ArrowLeft":
          if (
            playerPosition.column > 0 &&
            maze[playerPosition.row][playerPosition.column - 1] === 0
          ) {
            setPlayerPosition((prev) => ({
              ...prev,
              column: prev.column - 1,
            }));
          }
          break;
        case "ArrowRight":
          if (
            playerPosition.column < maze[0].length - 1 &&
            maze[playerPosition.row][playerPosition.column + 1] === 0
          ) {
            setPlayerPosition((prev) => ({
              ...prev,
              column: prev.column + 1,
            }));
          }
          break;
        default:
          break;
      }
    };
  
    useEffect(() => {
        const generatedMaze = gerarLabirinto(); // Corrigido para chamar a função gerarLabirinto
        setMaze(generatedMaze);
      }, []);
    
    return (
    <div
        className="maze-game"
        onKeyDown={handleKeyDown}
        tabIndex="0"
        style={{ width: `${maze?.[0]?.length * 30}px` }}
    >
        <div>
        <p>Clique no labirinto e depois</p>
        <p>Use as teclas de direção para mover o jogador</p>
        <div style={{ display: "flex" }}>
            <Maze maze={maze} playerPosition={playerPosition} />
        </div>
        </div>
    </div>
    );
}