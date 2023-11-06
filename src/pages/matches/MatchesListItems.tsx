/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useMatchesState } from "../../context/matches/context";
import { MapPinIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
export default function MatchesListItems() {
  const state: any = useMatchesState();

  const { matches, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <span className="text-black dark:text-white">Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {matches
        .filter((match: any) => match.isRunning)
        .map((match: any) => (
          // <Link key={match.id} to={`${match.id}`}>
          <div
            key={match.id}
            className="bg-white w-96 h-44 border border-gray-300 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg p-2 py-3 relative"
            style={{
              whiteSpace: "nowrap",
              overflow: "visible",
              textOverflow: "ellipsis",
            }}
          >
            {/* Sport Name Box */}
            <div className="bg-blue-400 text-white text-sm font-semibold py-2 px-4 rounded-t-lg absolute top-0 left-0 right-0 text-center">
              {match.sportName}
            </div>
            <div className="">
              {match.isRunning && <ScoreCard matchID={match.id} />}
            </div>
          </div>
        ))}
      {matches
        .filter((match: any) => !match.isRunning)
        .slice(0, 5)
        .map((match: any) => (
          // <Link key={match.id} to={`${match.id}`}>
          <div
            key={match.id}
            className="bg-white w-96 h-44 border border-gray-300 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg p-2 py-3 relative"
            style={{
              whiteSpace: "nowrap",
              overflow: "visible",
              textOverflow: "ellipsis",
            }}
          >
            {/* Sport Name Box */}
            <div className="bg-blue-400 text-white text-sm font-semibold py-2 px-4 rounded-t-lg absolute top-0 left-0 right-0 text-center">
              {match.sportName}
            </div>
            <div className="">{<ScoreCard matchID={match.id} />}</div>
          </div>
        ))}
    </>
  );
}

const ScoreCard = ({ matchID }: { matchID: number }) => {
  const [fetchScores, setFetchScores] = useState(false);
  const [match, setMatch] = useState<string>();
  // console.log(match);
  const fetchMatch = async () => {
    setFetchScores(true);
    await fetch(`${API_ENDPOINT}/matches/${matchID}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data);
        setFetchScores(false);
      });
  };

  useEffect(() => {
    fetchMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchID]);

  return match ? (
    <div key={match.id}>
      <Link to={`matches/${match.id}`}>
        <div className="flex py-4">
          {match.isRunning ? (
            
              <div className="flex items-center justify-between">
                <div className="flex items-center py-3 text-sm text-gray-600 dark:text-gray-400 justify-between">
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-4 w-4 dark:text-white" />
                    <div className="px-1 dark:text-white">
                      {new Date(match.endsAt).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center p-1 rounded-full bg-green-700 animate-pulse dark:bg-green-300" />
                    <p className="items-end px-1 text-green-700 text-sm dark:text-green-300">
                      Live now
                    </p>
                  </div>
                </div>
              </div>
            
          ) : (
            <div className="flex text-sm py-3 text-neutral-500 gap-1 dark:text-neutral-300">
              <CalendarDaysIcon className="w-4 h-4 dark:text-white" />
              <p className="dark:text-white">
                {new Date(match.endsAt).toDateString()}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between space-x-4 rounded-md text-black">
          <div className="flex items-center space-x-2">
            <div className="font-semibold dark:text-white">
              {match?.teams[0].name}
            </div>
            <div className="bg-green-500 text-white px-2 rounded-md">
              {match?.score[match?.teams[0].name]}
            </div>
          </div>
          <div className="text-gray-400 font-bold justify-between">vs</div>
          <div className="bg-green-500 text-white px-2 rounded-md">
            {match?.score[match?.teams[1].name]}
          </div>
          <div className="flex items-center space-x-2">
            <div className="font-semibold dark:text-white">
              {match?.teams[1].name}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex py-2 items-end justify-between">
        <MapPinIcon className="w-4 h-4 text-sm text-gray-600  dark:text-white" />
        <p className="px-1 text-sm text-gray-600 dark:text-white">
          {match.location}
        </p>
        <div style={{ flex: 1 }}></div>
        <button onClick={fetchMatch} className="rounded-full">
          <ArrowPathIcon
            className={`w-6 h-6 text-black dark:text-white  ${
              fetchScores && "rotate-180"
            } transition-all`}
          />
        </button>
      </div>
    </div>
  ) : null;
};
