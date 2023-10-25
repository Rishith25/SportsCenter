/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constants';

  export const articleDetails = async (dispatch: any, id: any) => {
    try {
      const token = localStorage.getItem("authToken") ?? "";
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
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
      dispatch({ type: 'FETCH_ARTICLE_DETAILS_SUCCESS', payload: articledata });
      console.log(articledata)
    } catch (error) {
      console.error('Operation failed:', error);
      return { ok: false, error }
    }
  };