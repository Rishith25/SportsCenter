/* eslint-disable @typescript-eslint/no-unused-vars */

interface Matches {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string; // This should be a Date if you parse it properly
  isRunning: boolean;
  teams: Team[];
}

interface Team {
  id: number;
  name: string;
}

export const initialState: MatchesState = {
    matches: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
  };

export interface MatchesState {
  matches: Matches[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type MatchesActions = 
  | { type: 'FETCH_MATCHES_REQUEST' }
  | { type: 'FETCH_MATCHES_SUCCESS'; payload: Matches[] }
  | { type: 'FETCH_MATCHES_FAILURE'; payload: string }

  export const reducer = (state: MatchesState = initialState, action: MatchesActions): MatchesState => {
    switch (action.type) {
        case "FETCH_MATCHES_REQUEST":
          return {
            ...state,
            isLoading: true
          };   
        case "FETCH_MATCHES_SUCCESS":
          return {
            ...state,
            isLoading: false,
            matches: action.payload,
          };      
        case "FETCH_MATCHES_FAILURE":
          return {
            ...state,
            isLoading: false,
            isError: true, 
            errorMessage: action.payload
          };           
        default:
          return state;
      }
  }