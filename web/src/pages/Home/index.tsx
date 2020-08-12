import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const Home = () => {
  return (
    <div id='page-home'>
      <div className='content'>
        <Header />
        <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>
            Ajudando pessoas a encontrarem pontos de coleta de forma eficiente
          </p>

          <Link to='/cadastro'>
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastr um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
