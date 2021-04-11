import React from 'react';
import { Route } from 'react-router-dom';

import { Header } from './components';
import { Home, Game, EndGame } from './pages';

function App() {
  const [gameProps, setGameProps] = React.useState();
  const [playersNames, setPlayersNames] = React.useState();

  React.useEffect(() => playersNames && saveStats(), [playersNames]);

  const saveStats = () => {
    let stats = JSON.parse(localStorage.getItem('stats'));

    if (!stats) stats = [];

    const winnerStat = stats.find(playerStat => playerStat.name === playersNames.winnerName);
    const loserStat = stats.find(playerStat => playerStat.name === playersNames.loserName);

    [winnerStat, loserStat].forEach((stat, i) => {
      const isWinStat = i === 0;
      const name = isWinStat ? playersNames.winnerName : playersNames.loserName;
      const count = isWinStat ? 'winCount' : 'loseCount';

      if (!stat) {
        stat = { name, winCount: 0, loseCount: 0 };
        stats.push(stat);
      }

      ++stat[count];
    })

    statsSort(stats);
    stats = JSON.stringify(stats);
    localStorage.setItem('stats', stats);
  }

  const statsSort = (stats) => stats.sort((a, b) => b.winCount - a.winCount);

  const removePlayersNames = () => setPlayersNames(null);

  return (
    <>
      <Header />
      <Route path={process.env.PUBLIC_URL + "/"} render={() => <Home setGameProps={setGameProps} />} exact />
      <Route path="/game" render={() => <Game
        gameProps={gameProps}
        sendPlayersNames={setPlayersNames}
        isEndGame={playersNames ? true : false} />}
        exact />
      <Route path="/endgame" render={() => <EndGame
        winnerName={playersNames.winnerName}
        removePlayersNames={removePlayersNames.bind(this)}
      />} exact />
    </>
  );
}

export default App;
