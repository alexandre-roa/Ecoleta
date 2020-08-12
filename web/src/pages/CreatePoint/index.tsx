import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';

import './styles.css';
import Header from '../../components/Header';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0
  ]);
  const [inicialPosition, setInicialPosition] = useState<[number, number]>([
    0,
    0
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })

  const history = useHistory()

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then(response => {
        const ufInicials = response.data.map(uf => uf.sigla);

        setUfs(ufInicials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords
      setInicialPosition([latitude, longitude])
    })
  },[])

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handlMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){

    const {value, name} = event.target

    setFormData({...formData, [name]: value})
  }

  function handleSelectItem(id : number) {
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {

      setSelectedItems([...selectedItems, id])
    }

  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const {name, email, whatsapp} = formData
    const uf = selectedUf
    const city = selectedCity
    const [latitude, longitude] = selectedPosition
    const items = selectedItems

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    }
    await api.post('points', data)

    alert('Cadastro realizado com sucesso')

    history.push('/')
  }

  return (
    <div id='page-create-point'>
      <div className='content'>
        <Header backToHome={true} />
        <form onSubmit={handleSubmit}>
          <h1>
            Cadastro do <br /> ponto de coleta
          </h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className='field'>
              <label htmlFor='name'>Nome da entidade</label>
              <input type='text' name='name' id='name' onChange={handleInputChange}/>
            </div>

            <div className='field-group'>
              <div className='field'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' onChange={handleInputChange}/>
              </div>
              <div className='field'>
                <label htmlFor='whatsapp'>WhatsApp</label>
                <input type='text' name='whatsapp' id='whatsapp' onChange={handleInputChange}/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            {/* // <Map
            //   center={inicialPosition}
            //   zoom={15}
            //   onClick={handlMapClick}
            // >
            //   <TileLayer
            //     attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            //     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            //   />
            //   <Marker position={selectedPosition} />
            // </Map> */}

            <div className='field-group'>
              <div className='field'>
                <label htmlFor='uf'>UF</label>
                <select
                  name='uf'
                  id='uf'
                  value={selectedUf}
                  onChange={handleSelectUF}
                >
                  <option value='0'>Selecione o Estado</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>

              <div className='field'>
                <label htmlFor='city'>Cidade</label>
                <select
                  name='city'
                  id='city'
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value='0'>Selecione a Cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítems de coleta</h2>
              <span>Selecione um ou mais ítems abaixo</span>
            </legend>
            <ul className='items-grid'>
              {items.map(item => (
                <li 
                  key={item.id} 
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type='submit'>Cadastrar ponto de coleta</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePoint;
