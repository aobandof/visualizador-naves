import { useState, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import 'normalize.css';

import DetalleNave from './components/DetalleNave';
import PasajerosNave from './components/PasajerosNave';


import bg from './img/bg.png';

// Styles
const main = css`
  width: 100%;
  height: 100vh;
  margin: 0px;
  background: url(${bg});
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0rem;

  select {
    color: white;
    border: 0px solid white;
    background-color: black;
    padding: .5rem .5rem;
    width: 100%;
  }
  >div {
    width: 90%;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    margin-bottom: 1rem;
    color: black;
    h1, h2 {
      margin: 0px;
    }
    .title {
      padding: .5rem;
      border-bottom: 1px solid black; 
      text-align: center;     
    }
    .content {
      display: flex;
      flex-direction: column;
      text-align: center;
      div {
        margin: .8rem; 
      }

    }
  }
`;


function App() {
  const  [ startships, setStartships ]= useState([])
  const [ startship, updateStartchip ] = useState({}); 

  const handlerChangeStartship = (e) => {
    updateStartchip(startships[e.target.value]);
  }
  useEffect( () => {
    (async function getStartships() {
      const url = `https://swapi.co/api/starships/`;
      try {
        const { data } = await axios({
          url,
          method: 'GET',
        })
        setStartships(data.results);
        // startships = data.results;
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  return (

    <div css={main}>
      <div>
        <select onChange={handlerChangeStartship} >
          <option value="">Seleccione una nave...</option>
        {
          startships.map((startship, index) => (
            <option key={index} value={index}>{startship.name}</option>
          ))
        }
        </select>
      </div>
      <DetalleNave startship={startship} />
      <PasajerosNave url={startship.url} />
    </div>
  );
}

export default App;
