import { EndGameWindow } from "../components";
import { Stats } from "../components";

function EndGame({ winnerName, removePlayersNames }) {
  return (
    <div className="content">
      <EndGameWindow
        winnerName={winnerName}
        removePlayersNames={removePlayersNames}
      />
      <Stats />
    </div>
  );
}

export default EndGame;
