export const apiRequest = async (
  endpoint,
  method = "GET",
  data = null,
  token
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestOptions = {
    method,
    headers,
  };

  if (method === "POST" && data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${endpoint}`,
      requestOptions
    );

    // Handle response (e.g., parsing JSON)
    const json = await response.json();

    // Perform post-response actions (e.g., error handling, token refreshing)
    if (response.ok) {
      return json;
    } else {
      throw new Error(json.error || "Request failed");
    }
  } catch (error) {
    throw new Error(error.message || "Request failed");
  }
};
