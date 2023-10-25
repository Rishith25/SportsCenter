/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  MatchDetailsState,
  MatchDetailsActions,
} from "./reducer";

const MatchDetailsStateContext = createContext<MatchDetailsState | undefined>(
  undefined
);

type MatchDetailsDispatch = React.Dispatch<MatchDetailsActions>;
const MatchDetailsDispatchContext = createContext<
  MatchDetailsDispatch | undefined
>(undefined);

export const MatchDetailsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MatchDetailsStateContext.Provider value={state}>
      <MatchDetailsDispatchContext.Provider value={dispatch}>
        {children}
      </MatchDetailsDispatchContext.Provider>
    </MatchDetailsStateContext.Provider>
  );
};
export const useMatchDetailsState = () => useContext(MatchDetailsStateContext);
export const useMatchDetailsDispatch = () =>
  useContext(MatchDetailsDispatchContext);
