import { redirect } from "react-router-dom";
import { serverErrorCheck } from "./error.helper";

export const getGames = async (
  userId = null,
  page = null,
  type = null,
  search = null
) => {
  const queryParams = { user_id: userId, page, type, search };
  const nullFilteredQueryParams = {};
  for (var key in queryParams) {
    if (queryParams[key]) {
      nullFilteredQueryParams[key] = queryParams[key];
    }
  }
  const fetchUrl =
    "http://localhost:3000/game?" +
    new URLSearchParams(nullFilteredQueryParams);

  const response = await fetch(fetchUrl);
  await serverErrorCheck(response);

  return await response.json();
};

export const submitGameToServer = async (request, url, method) => {
  const formdata = await request.formData();
  let gametime = formdata.get("gametime");
  const gametimestamp = new Date(gametime).getTime();
  const json = {
    hometeam: formdata.get("hometeam"),
    awayteam: formdata.get("awayteam"),
    gametime: gametimestamp,
  };
  const response = await fetch(url, {
    method,
    body: JSON.stringify(json),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 403) {
    return redirect("/logout");
  }

  if (response.status === 400) {
    const responseJson = await response.json();
    return responseJson.errors;
  }
  await serverErrorCheck(response);

  const gameJson = await response.json();

  return redirect(`/game/${gameJson.data.id}`);
};

export const gameLoader = async ({ params }) => {
  const gameResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/game/${params.gameId}`
  );
  if (gameResponse.status == 404) {
    throw new Error("Game not found!");
  }
  await serverErrorCheck(gameResponse);

  const gameData = await gameResponse.json();
  return gameData.data;
};