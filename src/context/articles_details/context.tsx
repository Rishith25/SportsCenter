/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  ArticleDetailsState,
  ArticleDetailsActions,
} from "./reducer";

const ArticleDetailsStateContext = createContext<
  ArticleDetailsState | undefined
>(undefined);

type ArticleDetailsDispatch = React.Dispatch<ArticleDetailsActions>;
const ArticleDetailsDispatchContext = createContext<
  ArticleDetailsDispatch | undefined
>(undefined);

export const ArticleDetailsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleDetailsStateContext.Provider value={state}>
      <ArticleDetailsDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDetailsDispatchContext.Provider>
    </ArticleDetailsStateContext.Provider>
  );
};
export const useArticleDetailsState = () =>
  useContext(ArticleDetailsStateContext);
export const useArticleDetailsDispatch = () =>
  useContext(ArticleDetailsDispatchContext);
