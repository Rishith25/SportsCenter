/* eslint-disable @typescript-eslint/no-unused-vars */

interface Preferences {
  id: number;
  sports: string;
  teams: string
}

export const initialState: PreferencesState = {
  preferences: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface PreferencesState {
  preferences: Preferences[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type PreferencesActions =
  | { type: "FETCH_PREFERENCES_REQUEST" }
  | { type: "FETCH_PREFERENCES_SUCCESS"; payload: Preferences[] }
  | { type: "FETCH_PREFERENCES_FAILURE"; payload: string }

export const reducer = (
  state: PreferencesState = initialState,
  action: PreferencesActions
): PreferencesState => {
  switch (action.type) {
    case "FETCH_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case "FETCH_PREFERENCES_FAILURE":
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
