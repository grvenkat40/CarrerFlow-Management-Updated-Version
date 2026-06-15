// utils/auth.js

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem(
        "access",
        data.access
      );

      return data.access;
    }

    return null;
  } catch (error) {
    return null;
  }
};


// utils/auth.js

export const authenticatedFetch = async (
  url,
  options = {},
  setSessionExpired
) => {
  let access =
    localStorage.getItem("access");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access}`,
    },
  });

  if (response.status === 401) {
    access = await refreshAccessToken();

    if (!access) {
      setSessionExpired(true);
      return null;
    }

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${access}`,
      },
    });
  }

  return response;
};