export const registerUser = async (userData) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => response.json());
};
