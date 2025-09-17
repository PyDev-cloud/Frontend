import React, { useState } from "react";
import { updateDraftUser } from "../../../api/users";
import { useAuth } from "../../../context/AuthContext";

const UpdateDraftUserForm = ({ draftId, initialData, onUpdate }) => {
  const { user } = useAuth();
  const token = user?.token;

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    role: initialData.role || "General User",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateDraftUser(draftId, formData, token);
      onUpdate(); // Callback to reload detail view
    } catch (err) {
      console.error(err);
      setError("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Edit Draft User</h4>
      {error && <p className="text-danger">{error}</p>}

      <div className="mb-2">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label>Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-control"
        >
          <option value="General User">General User</option>
          <option value="President">President</option>
          <option value="Finance Secretary">Finance Secretary</option>
          <option value="Office Admin">Office Admin</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default UpdateDraftUserForm;
