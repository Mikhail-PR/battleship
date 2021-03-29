import React from "react";

import { Cell } from "../";

const ShipsSelectArea = ({ shipsLengths, sendShip }) => {
  const [cells, setCells] = React.useState();
  const [ships, setShips] = React.useState([]);

  React.useEffect(() => {
    init();
    shipsInit();
  }, []);

  const init = () => {
    const fieldCells = [];

    for (let i = 0; i < 6; i++) {
      fieldCells[i] = new Array(21);

      for (let j = 0; j < 21; j++) {
        fieldCells[i][j] = null;
      }
    }

    setCells(fieldCells);
  };

  const shipsInit = () => {
    const initShips = [];
    let column = -1;

    shipsLengths.forEach((shipLength) => {
      const ship = [];
      column = column + 2;

      for (let shipCell = 0; shipCell < shipLength; shipCell++) {
        const row = shipCell + 1;

        ship.push([row, column]);
      }

      initShips.push(ship);
    });

    setShips(initShips);
  };

  const shipIndexCheck = (iCoord, jCoord) => {
    let shipIndex = null;

    for (let i = 0; i < ships.length; i++) {
      const ship = ships[i];

      for (let j = 0; j < ship.length; j++) {
        if (ship[j][0] === iCoord && ship[j][1] === jCoord) {
          shipIndex = i;
          return shipIndex;
        }
      }
    }
    return shipIndex;
  };

  const deleteShip = (shipId) =>
    setShips(ships.filter((ship, id) => id !== shipId));

  const selectShip = (id, e) => {
    if (id || id === 0) {
      const length = ships[id].length;
      deleteShip(id);

      sendShip({
        id,
        length,
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  return (
    <div className="ships-select-area__wrapper">
      <h2 className="ships-select-area__title">Выберите корабли</h2>
      <div className="ships-select-area">
        {cells &&
          cells.map((row, i) =>
            row.map((cell, j) => (
              <Cell
                shipId={shipIndexCheck(i, j)}
                selectShip={selectShip.bind(this)}
                isPlayerCell={true}
                key={i + j}
              />
            ))
          )}
      </div>
      <ul className="ships-select-area__tutorial">
        <li className="ships-select-area__tutorial-item">
          ЛКМ - выбор/размещение корабля
        </li>
        <li className="ships-select-area__tutorial-item">
          ПКМ - поворот выбранного корабля
        </li>
      </ul>
    </div>
  );
};

export default ShipsSelectArea;
