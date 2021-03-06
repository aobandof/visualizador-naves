import { useState, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';

const passengersWereStartship = css`
  flex: 0 0 20%;
  padding: 0rem 1rem;
  p {
    margin: .3rem 0rem;
  }
`;

function PasajerosNave({ url }) {

  const [ passengers, setPassengers ] = useState([]);
  
  function getAllPeople() {
    let people = [];
    // first page
    return axios("https://swapi.co/api/people/")
      .then(response => {
          people = response.data.results;
          return response.data.count;
      })
      .then(count => {
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        let promises = [];
        for (let i = 2; i <= numberOfPagesLeft; i++) {
            promises.push(axios(`https://swapi.co/api/people?page=${i}`));
        }
        return Promise.all(promises);
      })
      .then(response => {
        people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
        return people;
      })
      .catch(error => console.log(error));
  }

  useEffect( () => {
    (async function getPassengers() {
      const starwarsPeople = await getAllPeople();
      const passengersStartship = starwarsPeople.filter(passenger => passenger.starships.includes(url))
      setPassengers(passengersStartship);
    })();
  }, [url]);

  return (
    <div css={passengersWereStartship}>
      <div className="title">
        <h1>Pasajeros</h1>
      </div>
      <div className="content">
        {
          passengers.map(passenger => (
            <p key={passenger.name}>{passenger.name}</p>
          ))
        }
      </div>
    </div>
  )
}

export default PasajerosNave
