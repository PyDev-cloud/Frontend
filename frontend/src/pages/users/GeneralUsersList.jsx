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
      <h2>All Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.role}</td>
              <td>
                <Link to={`/users/draft/${u.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralUsersList;
