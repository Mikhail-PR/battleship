import React from "react";
import { Redirect } from "react-router";

import { Field, ShipsSelectArea } from "../../components";
import Player from "./Player";

const Game = ({ gameProps, sendPlayersNames, isEndGame }) => {
  const shipsLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const [players] = React.useState([]);
  const [curPLayer, setCurPlayer] = React.useState();
  const [selectedShip, setSelectedShip] = React.useState();
  const [isDeployState, setIsDeployState] = React.useState(true);

  React.useEffect(() => {
    if (gameProps.side === "left") {
      players.push(new Player(gameProps.name));
      players.push(new Player());
    } else if (gameProps.side === "right") {
      players.push(new Player());
      players.push(new Player(gameProps.name));
    }
    setCurPlayer(players[0]);
  }, []);

  const changeDeployState = () =>
    setIsDeployState((prevDeployState) => !prevDeployState);

  const winGame = (fieldId) => {
    const loserId = fieldId;
    const winnerId = loserId === 0 ? 1 : 0;

    sendPlayersNames({
      winnerName: players[winnerId].name,
      loserName: players[loserId].name,
    });
  };

  const changeCurPlayer = () =>
    setCurPlayer((prevCurPlayer) => {
      const curPlayerId = prevCurPlayer === players[0] ? 1 : 0;
      return players[curPlayerId];
    });

  const selectShip = (ship) => setSelectedShip(ship);

  const setRotate = (rotate) =>
    setSelectedShip((prevShip) => {
      const ship = {
        ...prevShip,
        isRotate: rotate,
      };
      return ship;
    });

  return !isEndGame ? (
    <div className="content">
      <div className="fields-wrapper">
        {players.map((player, id) => (
          <div
            className="field-wrapper"
            style={{ zIndex: id === 1 && player.isAi ? 0 : 1 }}
            key={player.name}
          >
            <h2 className="player-name">{player.name}</h2>
            <Field
              id={id}
              shipsLengths={shipsLengths}
              isPlayerField={!player.isAi}
              selectedShip={!player.isAi && selectedShip}
              sendRotate={setRotate.bind(this)}
              removeSelectedShip={selectShip.bind(this)}
              endDeployState={changeDeployState.bind(this)}
              isDeployState={isDeployState}
              isCurMove={!isDeployState && curPLayer !== player}
              changeMove={changeCurPlayer.bind(this)}
              endGame={winGame.bind(this)}
            />
          </div>
        ))}
      </div>
      {!isDeployState && (
        <h3 className="cur-move">Ход игрока {curPLayer.name}...</h3>
      )}
      {isDeployState && (
        <ShipsSelectArea
          shipsLengths={shipsLengths}
          sendShip={selectShip.bind(this)}
        />
      )}
    </div>
  ) : (
    <Redirect to="/endgame" />
  );
};

export default Game;
