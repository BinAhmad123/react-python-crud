// api.js
const API_BASE_URL = "http://localhost:5000/api/users";

export const fetchUsers = async () => {
  const response = await fetch(API_BASE_URL);
  return await response.json();
};

export const createUser = async (user) => {
  console.log("create", user);
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 0,
      name: user.name,
      age: user.age,
      gender: user.gender,
      country: user.country,
    }),
  });
  return await response.json();
};

export const updateUser = async (user) => {
  console.log("upadate", user);
  const response = await fetch(`${API_BASE_URL}/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await response.json();
};

export const deleteUser = async (userId) => {
  await fetch(`${API_BASE_URL}/${userId}`, { method: "DELETE" });
};
