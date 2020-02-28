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

function PasajerosNave({ url, updateUploaded }) {

  const [ passengers, setPassengers ] = useState([]);
  
  function getAllStarwarsPeople() {
    let people = [];
    // first page
    return axios("https://swapi.co/api/people/")
      .then(response => {
          // collect people from first page
          people = response.data.results;
          return response.data.count;
      })
      .then(count => {
        // exclude the first request
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        let promises = [];
        // start at 2 as you already queried the first page
        for (let i = 2; i <= numberOfPagesLeft; i++) {
            promises.push(axios(`https://swapi.co/api/people?page=${i}`));
        }
        return Promise.all(promises);
      })
      .then(response => {
        //get the rest records - pages 2 through n.
        people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
        return people;
      })
      .catch(error => console.log("Properly handle your exception here"));
  }

  useEffect( () => {
    (async function getPassengers() {
      const starwarsPeople = await getAllStarwarsPeople();
      const passengersStartship = starwarsPeople.filter(passenger => passenger.starships.includes(url))
      setPassengers(passengersStartship);
    })();
  }, [url]);
  updateUploaded(true);

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
