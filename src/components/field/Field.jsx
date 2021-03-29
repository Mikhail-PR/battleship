import React from "react";

import { Cell, SelectedShip } from "../";

const Field = ({
  id,
  isPlayerField,
  selectedShip,
  sendRotate,
  removeSelectedShip,
  endDeployState,
  shipsLengths,
  isDeployState,
  isCurMove,
  changeMove,
  endGame,
}) => {
  const [cells, setCells] = React.useState();
  const [ships, setShips] = React.useState([]);
  const [curSelectedShip, setCurSelectedShip] = React.useState();
  const [preshowedShip, setPreshowedShip] = React.useState();
  const [preshowedCell, setPreshowedCell] = React.useState();
  const [isIncorrectDeploy, setIsIncorrectDeploy] = React.useState();
  const [aiMoves, setAiMoves] = React.useState([]);
  const [playerMoves, setPlayerMoves] = React.useState([]);
  const [deadsCount, setDeadsCount] = React.useState(0);

  React.useEffect(() => {
    init();
    !isPlayerField && aiDeploy();
  }, []);

  React.useEffect(() => !isPlayerField && shipPreshow(), [curSelectedShip]);

  React.useEffect(() => !isPlayerField && deployShip(), [preshowedShip]);

  React.useEffect(
    () =>
      isPlayerField && ships.length === shipsLengths.length && endDeployState(),
    [ships.length]
  );

  React.useEffect(() => isPlayerField && setCurSelectedShip(selectedShip), [
    selectedShip,
  ]);

  React.useEffect(() => isPlayerField && shipPreshow(), [
    preshowedCell,
    curSelectedShip,
  ]);

  React.useEffect(() => isPlayerField && isCurMove && makeAiMove(), [
    isCurMove,
  ]);

  React.useEffect(() => changeMove(), [aiMoves, playerMoves]);

  React.useEffect(
    () => !isDeployState && deadsCount === ships.length && endGame(id),
    [deadsCount]
  );

  const init = () => {
    const fieldCells = [];

    for (let i = 0; i < 10; i++) {
      fieldCells[i] = new Array(10);

      for (let j = 0; j < 10; j++) {
        fieldCells[i][j] = null;
      }
    }

    setCells(fieldCells);
  };

  const aiDeploy = () =>
    shipsLengths.forEach((shipLength) => rndShipDeploy(shipLength));

  const rndShipDeploy = (length) => {
    setTimeout(() => {
      setPreshowedCell(getRndCoords());
      setCurSelectedShip({
        length: length,
        isRotate: getRandomInt(0, 1) === 1,
      });
    });
  };

  const getRndCoords = () => [getRandomInt(0, 9), getRandomInt(0, 9)];

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const deployShip = () => {
    if (isDeployState) {
      if (!isPlayerField && preshowedShip) {
        if (!isIncorrectDeploy) {
          setShips([...ships, preshowedShip]);
        } else {
          rndShipDeploy(preshowedShip.cells.length);
        }
      }

      if (isPlayerField && !isIncorrectDeploy) {
        if (curSelectedShip) {
          setShips([...ships, preshowedShip]);
          removeSelectedShip();
        }
      }
    }
  };

  const shipIndexCheck = (iCoord, jCoord) => {
    let shipIndex = null;

    if (ships) {
      for (let i = 0; i < ships.length; i++) {
        const shipCells = ships[i].cells;

        if (shipCells) {
          for (let j = 0; j < shipCells.length; j++) {
            if (shipCells[j][0] === iCoord && shipCells[j][1] === jCoord) {
              shipIndex = i;
              return shipIndex;
            }
          }
        }
      }
    }
    return shipIndex;
  };

  const cellPreshow = (coords) => isPlayerField && setPreshowedCell(coords);

  const shipPreshow = () => {
    if (curSelectedShip && preshowedCell) {
      const length = curSelectedShip.length;
      const isRotate = curSelectedShip.isRotate;
      const shipExpansion = Math.floor(length / 2);
      const isEvenLength = length % 2 === 0;
      const i = preshowedCell[0];
      const j = preshowedCell[1];
      const curPreshowedShipCells = [];
      let inc, dec;

      if (!isRotate) {
        inc = i;
        dec = i;
      } else if (isRotate) {
        inc = j;
        dec = j;
      }

      let isIncorrect = false;

      let expansion = 0;
      while (expansion < shipExpansion) {
        expansion++;
        inc++;
        dec--;

        const isRemoveTail = isEvenLength && expansion === shipExpansion;

        if (!isIncorrect)
          isIncorrect = !outFieldPreshowCheck(inc, dec, isRemoveTail, isRotate);

        if (!isRotate) {
          curPreshowedShipCells.push([dec, j]);

          if (isRemoveTail) break;

          curPreshowedShipCells.push([inc, j]);
        } else {
          curPreshowedShipCells.push([i, inc]);

          if (isRemoveTail) break;

          curPreshowedShipCells.push([i, dec]);
        }
      }

      curPreshowedShipCells.push(preshowedCell);

      if (!isIncorrect)
        isIncorrect = !unoccupiedCellsCheck(curPreshowedShipCells);

      setIsIncorrectDeploy(isIncorrect);
      setPreshowedShip({ cells: curPreshowedShipCells, hp: length });
    }
  };

  const unoccupiedCellsCheck = (ship) => {
    if (ships && ship) {
      const occupiedCellsCombinations = [];
      ships.forEach((ship) => occupiedCellsCombinations.push(ship.cells));
      const occupiedCells = occupiedCellsCombinations.flat();

      for (let i = 0; i < occupiedCells.length; i++) {
        const occupiedCoords = occupiedCells[i];

        if (occupiedCoords) {
          const cellMatch = ship.find(
            (coords) =>
              coords[0] === occupiedCoords[0] && coords[1] === occupiedCoords[1]
          );

          if (cellMatch) return false;
        }
      }
    }
    return true;
  };

  const outFieldPreshowCheck = (inc, dec, isRemoveTail, isRotate) => {
    if (isRemoveTail) {
      if (!isRotate) {
        inc--;
      } else {
        dec++;
      }
    }
    return inc >= 0 && inc < 10 && dec >= 0 && dec < 10;
  };

  const preshowDestroy = () => {
    if (isPlayerField) {
      setPreshowedShip(null);
      setPreshowedCell(null);
    }
  };

  const preshowCheck = (i, j) =>
    preshowedShip &&
    preshowedShip.cells.find((coords) => i === coords[0] && j === coords[1]);

  const shipDeadCheck = (shipId) => ships[shipId] && ships[shipId].hp === 0;

  const hit = (shipId) =>
    ships[shipId] &&
    setShips(
      ships.map((ship, i) => {
        if (i === shipId) {
          const hp = --ship.hp;

          if (hp === 0) setDeadsCount((prewDeadsCount) => ++prewDeadsCount);
          return { cells: ship.cells, hp };
        }
        return ship;
      })
    );

  const moveCheck = (moves, i, j) =>
    moves.find((coords) => i === coords[0] && j === coords[1]);

  const makeAiMove = () => {
    let rndCoords;

    while (true) {
      rndCoords = getRndCoords();

      if (!moveCheck(aiMoves, rndCoords[0], rndCoords[1])) break;
    }

    setAiMoves([...aiMoves, rndCoords]);
  };

  const makePlayerMove = (coords) => setPlayerMoves([...playerMoves, coords]);

  return (
    <>
      <div
        className="field"
        onMouseLeave={() => preshowDestroy()}
        onClick={() => deployShip()}
      >
        {cells &&
          cells.map((row, i) =>
            row.map((cell, j) => {
              const id = shipIndexCheck(i, j);
              return (
                <Cell
                  isPlayerCell={isPlayerField}
                  preshow={cellPreshow.bind(this)}
                  coords={[i, j]}
                  shipId={id}
                  isDeployState={isDeployState}
                  isDead={!isDeployState && shipDeadCheck(id)}
                  hit={hit.bind(this)}
                  isAiMove={moveCheck(aiMoves, i, j)}
                  isPlayerMove={moveCheck(playerMoves, i, j)}
                  isCurMove={isCurMove}
                  makeMove={makePlayerMove.bind(this)}
                  key={i + j}
                />
              );
            })
          )}
      </div>

      {isPlayerField && isDeployState && (
        <div className="field field--fake">
          {cells &&
            cells.map((row, i) =>
              row.map((cell, j) => (
                <Cell
                  isPreshowCell={curSelectedShip && preshowCheck(i, j)}
                  shipId={shipIndexCheck(i, j)}
                  isIncorrectPreshow={curSelectedShip && isIncorrectDeploy}
                  key={i + j}
                  isPlayerCell={true}
                />
              ))
            )}
        </div>
      )}

      {curSelectedShip && isPlayerField && (
        <SelectedShip
          ship={curSelectedShip}
          sendRotate={sendRotate}
          isDeployState={isDeployState}
        />
      )}
    </>
  );
};

export default Field;
