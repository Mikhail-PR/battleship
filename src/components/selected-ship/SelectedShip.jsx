import React from "react";

import { Cell } from "../";

const SelectedShip = ({ ship, sendRotate, isDeployState }) => {
  const [x, setX] = React.useState();
  const [y, setY] = React.useState();
  const [width, setWidth] = React.useState();
  const [height, setHeight] = React.useState();
  const [columns, setColumns] = React.useState();
  const [rows, setRows] = React.useState();
  const [isRotate, setIsRotate] = React.useState();
  const [renderShip, setRenderShip] = React.useState();

  React.useEffect(() => createShip(), []);

  React.useEffect(() => {
    if (renderShip) {
      const listener = (e) => {
        if (e.type === "mousemove") {
          moveAt(e.pageX, e.pageY);
        } else if (e.type === "contextmenu") {
          rotateShip(e);
        }
      };

      const show = () => {
        document.addEventListener("mousemove", listener);
        document.addEventListener("contextmenu", listener);
        moveAt(ship.x, ship.y);
      };

      const removeListeners = () => {
        document.removeEventListener("mousemove", listener);
        document.removeEventListener("contextmenu", listener);
      };

      show();

      return removeListeners;
    }
  }, [renderShip]);

  React.useEffect(() => sendRotate(isRotate), [isRotate]);

  const rotateShip = (e) => {
    e.preventDefault();

    setIsRotate((prevIsRotate) => !prevIsRotate);
  };

  const moveAt = (x, y) => {
    setX(x - width / 2);
    setY(y - height / 2);
  };

  const createShip = () => {
    const cellSize = 50;
    const length = ship.length;
    const width = cellSize;
    const height = cellSize * length;

    setX(ship.x);
    setY(ship.y);
    setWidth(width);
    setHeight(height);
    setColumns(1);
    setRows(length);
    setIsRotate(false);

    const renderedShip = new Array(length);

    for (let i = 0; i < length; i++) {
      renderedShip[i] = (
        <Cell
          shipId={true}
          isDeployState={isDeployState}
          isPlayerCell={true}
          isSelectedShip={true}
          key={i}
        />
      );
    }

    setRenderShip(renderedShip);
  };

  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, calc(100% / ${rows}))`,
        transform: `rotate(${!isRotate ? 0 : 90}deg)`,
      }}
      className="selected-ship"
    >
      {renderShip}
    </div>
  );
};

export default SelectedShip;
