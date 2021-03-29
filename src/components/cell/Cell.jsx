import React from "react";

const Cell = ({
  shipId,
  selectShip,
  isPlayerCell,
  preshow,
  coords,
  isPreshowCell,
  isIncorrectPreshow,
  isDeployState,
  isDead,
  hit,
  isAiMove,
  isPlayerMove,
  isCurMove,
  makeMove,
  isSelectedShip,
}) => {
  const isShip = shipId || shipId === 0;
  const [isHit, setIsHit] = React.useState(false);
  const [isMiss, setIsMiss] = React.useState(false);
  const isHandleMove =
    isCurMove && !isPlayerCell && !isDeployState && !isHit && !isMiss;

  React.useEffect(() => {
    if (isAiMove || isPlayerMove) showMove();
  }, [isAiMove, isPlayerMove]);

  const click = (e) => {
    if (isHandleMove) {
      makeMove(coords);
    } else if (selectShip) {
      selectShip(shipId, e);
    }
  };

  const showMove = () => {
    if (isShip) {
      setIsHit(true);
      hit(shipId);
    } else {
      setIsMiss(true);
    }
  };

  return (
    <div
      onClick={(e) => click(e)}
      onMouseOver={() => preshow && preshow(coords)}
      style={{
        transition:
          isPlayerCell && !isDeployState
            ? "none"
            : "background-color 1000ms ease",
      }}
      className={
        "cell" +
        `${isShip && isPlayerCell ? " cell--allied" : ""}` +
        `${
          isPlayerCell && isDeployState && !isSelectedShip
            ? " cell--transparent"
            : ""
        }` +
        `${isPreshowCell && !isShip ? " cell--preshow" : ""}` +
        `${
          isPreshowCell && isIncorrectPreshow && !isShip
            ? " cell--incorrect"
            : ""
        }` +
        `${isHit && !isDead ? " cell--hit" : ""}` +
        `${isDead && isShip ? " cell--dead" : ""}`
      }
    >{`${isMiss ? "⚫" : ""}`}</div>
  );
};

export default Cell;
