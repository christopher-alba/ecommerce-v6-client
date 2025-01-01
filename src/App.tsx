import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance from "./api";
import { useEffect } from "react";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    setAccessTokenInLocalStorage();
  }, [isAuthenticated]);

  const setAccessTokenInLocalStorage = async () => {
    if (isAuthenticated) {
      const accessToken = await getAccessTokenSilently();
      localStorage.setItem("accessToken", accessToken);
      const response = await axiosInstance.post("/auth/client", {
        userInfo: {
          firstName: user?.given_name,
          lastName: user?.family_name,
          email: user?.email,
        },
      });
      alert(JSON.stringify(response));
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user?.name || "User"}</h2>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <button
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Login
        </button>
      )}
      <button
        onClick={async () => {
          const response = await axiosInstance.get("/protected/test");
          alert(JSON.stringify(response));
        }}
      >
        Test Valid API
      </button>
      <button
        onClick={async () => {
          try {
            const response = await axiosInstance.get("/protected/test/admin");
            alert(JSON.stringify(response));
          } catch (err) {
            alert(JSON.stringify(err));
          }
        }}
      >
        Test Invalid API
      </button>
    </div>
  );
}

export default App;
