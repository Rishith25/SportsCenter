/* eslint-disable @typescript-eslint/no-unused-vars */

interface Articles {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  content?: string;
  teams: {
    id: number;
    name: string;
  }[];
}

export const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface ArticlesState {
  articles: Articles[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type ArticlesActions =
  | { type: "FETCH_ARTICLES_REQUEST" }
  | { type: "FETCH_ARTICLES_SUCCESS"; payload: Articles[] }
  | { type: "FETCH_ARTICLES_FAILURE"; payload: string }
  | { type: "FETCH_ARTICLE_DETAILS_SUCCESS"; payload: Articles };

export const reducer = (
  state: ArticlesState = initialState,
  action: ArticlesActions
): ArticlesState => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case "FETCH_ARTICLES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "FETCH_ARTICLE_DETAILS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: [action.payload],
      };
    default:
      return state;
  }
};
