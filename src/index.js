import axios from 'axios';

const HTTPClient = axios.create({
  baseURL: 'http://data.nba.com',
});

const getFormattedDate = ({ year, month, day }) => {
  // 11 = December
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const formattedMonth = month > 9 ? month : `0${month}`;
  const formattedDay = day > 9 ? day : `0${day}`;
  return `${year}${formattedMonth}${formattedDay}`;
};

const getGames = ({ year, month, day }) => HTTPClient({
  method: 'GET',
  url: `/data/5s/json/cms/noseason/scoreboard/${getFormattedDate({ year, month, day })}/games.json`,
}).then((response) => response.data);

const getBoxScore = ({
  year,
  month,
  day,
  gameId,
}) => HTTPClient({
  method: 'GET',
  url: `/data/5s/json/cms/noseason/game/${getFormattedDate({ year, month, day })}/${gameId}/boxscore.json`,
}).then((response) => response.data);

const getPlayByPlay = ({
  year,
  month,
  day,
  gameId,
}) => HTTPClient({
  method: 'GET',
  url: `/data/5s/json/cms/noseason/game/${getFormattedDate({ year, month, day })}/${gameId}/pbp_all.json`,
}).then((response) => response.data);

export {
  getGames,
  getBoxScore,
  getPlayByPlay,
};
