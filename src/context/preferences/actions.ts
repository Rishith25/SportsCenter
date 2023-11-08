/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constants';

export const fetchPreferences = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";

    try {
      dispatch({ type: "FETCH_PREFERENCES_REQUEST" });
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch({ type: "FETCH_PREFERENCES_SUCCESS", payload: data.preferences });
      // setArticles(data);
      // setIsLoading(false);
    } catch (error) {
      console.log("Error fetching artilces:", error);
      dispatch({ type: "FETCH_PREFERENCES_FAILURE" });
    }
  };