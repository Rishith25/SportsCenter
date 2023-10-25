/* eslint-disable @typescript-eslint/no-unused-vars */

interface Article {
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

// interface Articles {
//   id: number;
//   title: string;
//   summary: string;
//   date: string;
//   thumbnail: string;
// }

export const initialState: ArticleDetailsState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface ArticleDetailsState {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

// export const initialArticleState: ArticlesState = {
//   articles: [],
//   isLoading: false,
//   isError: false,
//   errorMessage: "",
// };

// export interface Article_DetailsState {
//   article_details: Article_Details[];
//   isLoading: boolean;
//   isError: boolean;
//   errorMessage: string;
// }

export type ArticleDetailsActions =
  | { type: "FETCH_ARTICLE_DETAILS_REQUEST" }
  | { type: "FETCH_ARTICLE_DETAILS_SUCCESS"; payload: Article }
  | { type: "FETCH_ARTICLE_DETAILS_FAILURE"; payload: string }

export const reducer = (
  state: ArticleDetailsState = initialState,
  action: ArticleDetailsActions
): ArticleDetailsState => {
  switch (action.type) {
    case "FETCH_ARTICLE_DETAILS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLE_DETAILS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: [action.payload],
      };
    case "FETCH_ARTICLE_DETAILS_FAILURE":
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
