import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import imgHome from '../assets/logo.svg';

const Header = () => {
  return (
    <div id='page-home'>
        <div className="content">
      <header>
        <img src={imgHome} alt='Imagem de fundo' />
      </header>
      <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>Ajudando pessoas a encontrarem pontos de coleta de forma eficiente</p>

          <a href='/cadastro'>
              <span>
                  <FiLogIn />
              </span>
              <strong>Cadastr um ponto de coleta</strong>

          </a>
      </main>
      </div>
    </div>
  );
};

export default Header;
