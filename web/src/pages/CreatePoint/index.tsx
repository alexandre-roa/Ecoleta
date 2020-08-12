import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const CreatePoint = () => {
  return (
    <div id='page-create-point'>
      <div className='content'>
        <Header backToHome={true} />
      </div>
    </div>
  );
};

export default CreatePoint;
