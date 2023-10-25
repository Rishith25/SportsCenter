/* eslint-disable @typescript-eslint/no-unused-vars */

interface Match {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string; // This should be a Date if you parse it properly
  endsAt: string; // This should be a Date if you parse it properly
  score: {
    [teamName: string]: string;
  };
  teams: Team[];
  sportName: string;
  playingTeam: number;
  story: string;
}

interface Team {
  id: number;
  name: string;
}

export const initialState: MatchDetailsState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface MatchDetailsState {
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type MatchDetailsActions =
  | { type: "FETCH_MATCH_DETAILS_REQUEST" }
  | { type: "FETCH_MATCH_DETAILS_SUCCESS"; payload: Match }
  | { type: "FETCH_MATCH_DETAILS_FAILURE"; payload: string }

export const reducer = (
  state: MatchDetailsState = initialState,
  action: MatchDetailsActions
): MatchDetailsState => {
  switch (action.type) {
    case "FETCH_MATCH_DETAILS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCH_DETAILS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        matches: [action.payload],
      };
    case "FETCH_MATCH_DETAILS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
