/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constants';

export const fetchTeams = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";

    try {
      dispatch({ type: "FETCH_TEAMS_REQUEST" });
      const response = await fetch(`${API_ENDPOINT}/teams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: data });
      // setArticles(data);
      // setIsLoading(false);
    } catch (error) {
      console.log("Error fetching teams:", error);
      dispatch({ type: "FETCH_TEAMS_FAILURE" });
    }
  };