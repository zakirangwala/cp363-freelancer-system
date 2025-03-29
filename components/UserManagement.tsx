import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", formData);
      setFormData({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">User Management</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-500">User List</h3>
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 border rounded shadow">
              <p className="font-medium text-blue-500">{user.name}</p>
              <p className="text-blue-400">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
