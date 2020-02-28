/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const detail = css`
  flex: 0 0 55%;
  padding: 0rem 1rem;
`;


function DetalleNave({ startship }) {
  console.log(startship);
  return (
    <div css={detail}>
      <div className="title">
        <h1>{startship.name}</h1>
        {startship.model}
      </div>
      <div className="content">
        <div>
          <h2>Fabricante</h2>
          {startship.manufacturer}
        </div>
        <div>
          <h2>Largo</h2>
          {startship.length} fts.
        </div>
        <div>
          <h2>Valor</h2>
          {startship.cost_in_credits} créditos
        </div>
        <div>
          <h2>Cantidad de Pasajeros</h2>
          {startship.passengers}
        </div>
        </div>
    </div>
  )
}

export default DetalleNave
