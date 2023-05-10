import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo'
import './styles/Header.css'

export default function Header() {
    let navigate = useNavigate();
    return (
        <header>
            <nav>
                <div className="logo-container" onClick={() => navigate('/')}>
                    <Logo />
                </div>
                <div className='project-name'>
                    <h1>AmazingMaze</h1>
                    <h3>Be Ready To Be Amazed</h3>
                </div>
                <div className="nav-links">
                    <div onClick={() => navigate('/')}>Pagina Inicial</div>
                    <div onClick={() => navigate('/about-us')}>Sobre Nós</div>
                    <div onClick={() => navigate('/about-the-project')}>Sobre o Projeto</div>
                </div>
            </nav>
        </header>
    );
}