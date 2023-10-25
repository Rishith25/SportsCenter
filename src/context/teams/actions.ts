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

  export const articleDetails = async (dispatch: any, id: any) => {
    try {
      const token = localStorage.getItem("authToken") ?? "";
      const response = await fetch(`${API_ENDPOINT}/teams/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      }
      const articledata = await response.json();
      if (articledata.errors && articledata.errors.length > 0) {
        return { ok: false, error: articledata.errors[0].message }
      }
      dispatch({ type: 'FETCH_TEAM_DETAILS_SUCCESS', payload: articledata });
      console.log(articledata)
    } catch (error) {
      console.error('Operation failed:', error);
    // Dialogue 5: And for error I'll return status called "ok", with value `false`.
      return { ok: false, error }
    }
  };