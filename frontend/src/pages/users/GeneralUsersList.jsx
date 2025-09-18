import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllUsers } from "../../api/users";
import { Link } from "react-router-dom";

const GeneralUsersList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      getAllUsers(user.token)
        .then((res) => setUsers(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div>লোড হচ্ছে...</div>;
  if (!users.length) return <div>কোনো User পাওয়া যায়নি</div>;

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Members List</h2>
        <button className="btn btn-primary">➕ Add New Member</button>
      </div>

      {/* Top Controls */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          Show{" "}
          <select className="form-select d-inline-block w-auto">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>{" "}
          entries
        </div>
        <div>
          Search:{" "}
          <input type="text" className="form-control d-inline-block w-auto" />
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Sl</th>
            <th>Name</th>
            <th>User Name</th>
            <th>User Level</th>
            <th>Status</th>
            <th>St. Change</th>
            <th>Action</th>
            <th>Change Privilege</th>
            <th>View</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.id}>
              <td>{idx + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className="badge bg-success">Active</span>
              </td>
              <td>
                <button className="btn btn-link p-0 text-decoration-none">
                  Make Inactive
                </button>
              </td>
              <td>-</td>
              <td>
                <div className="d-flex gap-2">
                  <select className="form-select form-select-sm w-auto">
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                  <button className="btn btn-success btn-sm">Save</button>
                </div>
              </td>
              <td>
                <Link to={`/users/draft/${u.id}`} className="btn btn-info btn-sm">
                  View
                </Link>
              </td>
              <td>
                <button className="btn btn-outline-primary btn-sm">
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="d-flex justify-content-between align-items-center">
        <div>Showing 1 to {users.length} of {users.length} entries</div>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled">
              <span className="page-link">Previous</span>
            </li>
            <li className="page-item active">
              <span className="page-link">1</span>
            </li>
            <li className="page-item">
              <span className="page-link">2</span>
            </li>
            <li className="page-item">
              <span className="page-link">Next</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default GeneralUsersList;
