export const apiRequest = async (
  endpoint: any,
  method = "GET",
  data: any,
  token: any
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let body: string | undefined;

  const requestOptions = {
    method,
    headers,
    body,
  };

  if (method === "POST" && data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${endpoint}`,

      requestOptions
    );

    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      throw new Error(json.error || "Request failed");
    }
  } catch (error: any) {
    throw new Error(error.message || "Request failed");
  }
};
