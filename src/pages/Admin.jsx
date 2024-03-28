import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getGames } from "../helpers/game.helper";

/**
 * @param {{request: Request}} param0
 */
export const adminLoader = async ({ request }) => {
  const urlString = request.url;
  const url = new URL(urlString);
  const pageParam = url.searchParams.get("page");
  const type = url.searchParams.get("type");
  let page = pageParam ? +pageParam : 1;
  page = page >= 1 ? page : 1;
  const userId = +localStorage.getItem("userId");

  return getGames(userId, page, type);
};

const Admin = () => {
  const response = useLoaderData();
  const [, setSearchParams] = useSearchParams();
  let games = response.data;

  async function onFilter(e) {
    const type = e.target.value;
    setSearchParams((prev) => {
      return { ...prev, type };
    });
  }
  games = games.map((g) => {
    return { ...g, gametimeDisplay: new Date(g.gametime).toLocaleString() };
  });
  return (
    <>
      <div className="row">
        <div className="col">
          <h1>My Games</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="fitler" className="form-label">
            Filter Games
          </label>

          <select onChange={onFilter} id="fitler" className="form-control">
            <option value="all">All</option>
            <option value="live">Live</option>
            <option value="over">Games Ended</option>
            <option value="not_started">Not Started</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Home Team</th>
                <th>Away Team</th>
                <th>Game Time</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {games.map((g) => {
                return (
                  <tr key={g.id}>
                    <td>{g.id}</td>
                    <td>{g.hometeam}</td>
                    <td>{g.awayteam}</td>
                    <td>{g.gametimeDisplay}</td>
                    <td>
                      <NavLink
                        to={`/admin/game/${g.id}`}
                        className="btn btn-success"
                      >
                        Edit Game
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={`/admin/game/${g.id}/updatescore`}
                        className="btn btn-info"
                      >
                        Update Score
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination meta={response.meta} />
    </>
  );
};

export default Admin;