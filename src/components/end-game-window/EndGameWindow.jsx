import React from "react";
import { Link } from "react-router-dom";

function EndGameWindow({ winnerName, removePlayersNames }) {
  return (
    <div className="end-game-window">
      <h2 className="end-game-window__title">
        Игрок {winnerName} одержал победу!
      </h2>
      <div className="end-game-window__btn-wrapper">
        <Link to="/">
          <button
            className="end-game-window__btn"
            onClick={() => removePlayersNames()}
          >
            Выход
          </button>
        </Link>
        <Link to="/game">
          <button
            className="end-game-window__btn"
            onClick={() => removePlayersNames()}
          >
            Играть ещё
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EndGameWindow;
