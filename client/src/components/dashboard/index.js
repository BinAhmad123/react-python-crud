import React, { useState, useEffect, useCallback } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../actions/user";
import "./style.css";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    country: "",
  });
  const [editingUser, setEditingUser] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    country: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    fetchData();
  }, []);

  const handleCreateUser = useCallback(async () => {
    const createdUser = await createUser(newUser);
    setUsers((prevUsers) => [...prevUsers, createdUser]);
    setNewUser({
      id: users.length + 1,
      name: "",
      age: "",
      gender: "",
      country: "",
    });
  }, [newUser, users]);

  const handleUpdateUser = useCallback(async () => {
    const updatedUser = await updateUser(editingUser);
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  }, [editingUser]);

  const handleDeleteUser = useCallback(async (userId) => {
    await deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }, []);

  const handleInputChange = useCallback((e) => {
    console.log("ddd", editingUser);
    const { name, value } = e.target;
    setEditingUser((prevEditingUser) => ({
      ...prevEditingUser,
      [name]: value,
    }));
  }, []);

  const handleInputCreate = useCallback((e) => {
    setEditingUser({ id: "", name: "", age: "", gender: "", country: "" });
    const { name, value } = e.target;
    setNewUser((user) => ({ ...user, [name]: value }));
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>age</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.country}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {editingUser && editingUser.id && (
            <tr className="editing">
              <td>{editingUser.id}</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="age"
                  value={editingUser.age}
                  onChange={handleInputChange}
                  placeholder="age"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="gender"
                  value={editingUser.gender}
                  onChange={handleInputChange}
                  placeholder="Gender"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="country"
                  value={editingUser.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                />
              </td>
              <td>
                <button onClick={handleUpdateUser}>Save</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
              </td>
            </tr>
          )}
          <tr className="creating">
            <td>{users.length + 1}</td>
            <td>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputCreate}
                placeholder="Name"
                required
              />
            </td>
            <td>
              <input
                type="text"
                name="age"
                value={newUser.age}
                onChange={handleInputCreate}
                placeholder="age"
              />
            </td>
            <td>
              <input
                type="text"
                name="gender"
                value={newUser.gender}
                onChange={handleInputCreate}
                placeholder="Gender"
              />
            </td>
            <td>
              <input
                type="text"
                name="country"
                value={newUser.country}
                onChange={handleInputCreate}
                placeholder="Country"
              />
            </td>
            <td>
              <button onClick={handleCreateUser}>Create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
