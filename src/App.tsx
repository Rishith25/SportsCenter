import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";

import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/matches/context";
import { ArticleDetailsProvider } from "./context/articles_details/context";
import { MatchDetailsProvider } from "./context/match_details/context";
import { SportsProvider } from "./context/sports/context";
import { PreferencesProvider } from "./context/preferences/context";
import { TeamsProvider } from "./context/teams/context";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <ArticlesProvider>
        <MatchesProvider>
          <ArticleDetailsProvider>
            <MatchDetailsProvider>
              <TeamsProvider>
                <SportsProvider>
                  <PreferencesProvider>
                    <RouterProvider router={router} />
                  </PreferencesProvider>
                </SportsProvider>
              </TeamsProvider>
            </MatchDetailsProvider>
          </ArticleDetailsProvider>
        </MatchesProvider>
      </ArticlesProvider>
    </div>
  );
};
export default App;
