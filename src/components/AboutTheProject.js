import React from 'react';
import './styles/AboutTheProject.css';
import Header from './Header';

function AboutTheProject() {
    return (
        <div className="about-the-project">
            <Header />
            <h2>Sobre o projeto</h2>
            <p>O AmazingMaze é um game desenvolvido para web em que o usuário deve resolver um labirinto. O labirinto em questão possui diversos caminhos para se chegar ao final, alguns mais longos e outros mais curtos. a pontuação do jogador depende de qual caminho ele usou para resolver o labirinto e em quanto tempo ele conseguiu concluir o mapa. E aí, topa o desafio?</p>
            <p>O menor caminho do labirinto é calculado usando o algoritmo de Dijkstra</p>

        </div>
    );
}

export default AboutTheProject;