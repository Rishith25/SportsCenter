/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";

export const fetchMatches = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data.matches });
    // setArticles(data);
    // setIsLoading(false);
  } catch (error) {
    console.log("Error fetching matches:", error);
    dispatch({ type: "FETCH_MATCHES_FAILURE" });
  }
};

export const matchDetails =async (dispatch: any, id: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_SCORE_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch({ type: "FETCH_SCORE_SUCCESS", payload: data });
    // setArticles(data);
    // setIsLoading(false);
  } catch (error) {
    console.log("Error fetching matches:", error);
    dispatch({ type: "FETCH_SCORE_FAILURE" });
  }
}