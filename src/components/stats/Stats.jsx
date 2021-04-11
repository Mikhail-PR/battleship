import React from "react";

function Stats() {
  const [stats, setStats] = React.useState();

  React.useEffect(
    () => setStats(JSON.parse(localStorage.getItem("battleshipStats"))),
    []
  );

  return stats ? (
    <div className="stats">
      <h1 className="stats__title">Статистика</h1>
      <table className="stats__table">
        <tbody className="stats__table-body">
          <tr className="stats__table-title-row">
            <th className="stats__table-title">Имя игрока</th>
            <th className="stats__table-title">Победы</th>
            <th className="stats__table-title">Поражения</th>
          </tr>
          {stats.map(({ name, winCount, loseCount }) => (
            <tr className="stats__table-row" key={name}>
              <th className="stats__table-cell">{name}</th>
              <th className="stats__table-cell">{winCount}</th>
              <th className="stats__table-cell">{loseCount}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
}

export default Stats;
