import React, { useEffect, useState } from 'react';

const Qwerty = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch("https://iloilo-coffee-house-api.onrender.com/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
          console.log(data)
        } else {
          throw new Error(`Failed to fetch user data! Status code: ${response.status}`);
        }
      } catch (err) {
        console.error("An error occurred while fetching user data:", err);
        setError(err.message);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      {error ? (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      ) : userData ? (
        <div>
          <h2>User Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Qwerty;