import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { getGames } from "../helpers/game.helper";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Game from "../components/Game";

/**
 * @param {{request: Request}} param0
 */
export const homeLoader = async ({ request }) => {
  const urlString = request.url;
  const url = new URL(urlString);
  const page = url.searchParams.get("page") ?? 1;
  const search = url.searchParams.get("search");
  const type = url.searchParams.get("type") ?? "all";

  return await getGames(null, page, type, search);
};

const Home = () => {
  const response = useLoaderData();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [, setSearchParams] = useSearchParams();
  function onSearch() {
    setSearchParams((prev) => {
      prev.set("page", 1);
      prev.set("type", type);
      if (search) {
        prev.set("search", search);
      } else {
        prev.delete("search");
      }

      return prev;
    });
  }
  return (
    <>
      <div className="row">
        <div className="col col-5">
          <label htmlFor="search" className="form-label">
            Search
          </label>
          <input
            name="search"
            type="text"
            id="search"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="col col-5">
          <label htmlFor="fitler" className="form-label">
            Filter Games
          </label>

          <select
            onChange={(e) => setType(e.target.value)}
            value={type}
            id="fitler"
            className="form-control"
          >
            <option value="all">All</option>
            <option value="live">Live</option>
            <option value="over">Games Ended</option>
            <option value="not_started">Not Started</option>
          </select>
        </div>
        <div className="col col-2 ">
          <button
            onClick={onSearch}
            className="btn search-btn btn-primary w-100"
          >
            Search
          </button>
        </div>
      </div>
      {response.data.map((g) => {
        return <Game key={g.id} game={g} />;
      })}
      <div className="row">
        <div className="col">
          <Pagination meta={response.meta} />
        </div>
      </div>
    </>
  );
};

export default Home;