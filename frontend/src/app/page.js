"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Create or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (editId) {
        await axios.put(`http://localhost:5000/api/users/${editId}`, { name, email, mobile, password });
      } else {
        await axios.post("http://localhost:5000/api/users", { name, email, mobile, password });
      }
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setPassword(user.password);
    setEditId(user._id);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Users List</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {editId ? "Update" : "Add"} User
        </button>
      </form>

      {/* User List */}
      <ul className="mt-6 space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="p-4 bg-gray-100 flex justify-between items-center rounded-md"
          >
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-lg font-semibold">{user.mobile}</p>
              <p className="text-gray-600">{user.password}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
