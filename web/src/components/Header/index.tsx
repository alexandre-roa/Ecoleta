import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  backToHome?: boolean;
}

const Header: React.FC<PageHeaderProps> = ({backToHome = false }) => {
  return (
    <header>
      <img src={logo} alt='Logo' />
      {backToHome && (
        <Link to='/'>
          <FiArrowLeft />
          Voltar para home
        </Link>
      )}
    </header>
  );
};

export default Header;
