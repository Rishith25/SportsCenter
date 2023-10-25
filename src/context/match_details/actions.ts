/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constants';

  export const matchDetails = async (dispatch: any, id: any) => {
    try {
      const token = localStorage.getItem("authToken") ?? "";
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      }
      const matchdata = await response.json();
      if (matchdata.errors && matchdata.errors.length > 0) {
        return { ok: false, error: matchdata.errors[0].message }
      }
      dispatch({ type: 'FETCH_MATCH_DETAILS_SUCCESS', payload: matchdata });
      console.log(matchdata)
    } catch (error) {
      console.error('Operation failed:', error);
      return { ok: false, error }
    }
  };