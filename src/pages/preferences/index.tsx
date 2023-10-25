/* eslint-disable @typescript-eslint/no-unused-vars */
import NewPreferences from "./NewPreferences";

const Preferences = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <>
      {isAuthenticated && <NewPreferences />}
    </>
  );
};
export default Preferences;
