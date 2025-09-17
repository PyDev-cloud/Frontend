import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDraftUser } from "../../api/users";

const DraftUserDetail = () => {
  const { id } = useParams(); // route param
  const { user } = useAuth();
  const [draftUser, setDraftUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      getDraftUser(id, user.token)
        .then((res) => setDraftUser(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, user]);

  if (loading) return <div>লোড হচ্ছে...</div>;
  if (!draftUser) return <div>Draft User পাওয়া যায়নি</div>;

  return (
    <div className="container mt-4">
      <h2>Draft User Details</h2>
      <p><strong>Name:</strong> {draftUser.name}</p>
      <p><strong>Email:</strong> {draftUser.email}</p>
      <p><strong>Phone:</strong> {draftUser.phone}</p>
      <p><strong>Role:</strong> {draftUser.role}</p>

      {draftUser.profile && (
        <>
          <h4>Profile</h4>
          <p><strong>DOB:</strong> {draftUser.profile.dob}</p>
          <p><strong>Gender:</strong> {draftUser.profile.gender}</p>
          <p><strong>Address:</strong> {draftUser.profile.address}</p>
          <p><strong>Blood Group:</strong> {draftUser.profile.blood_group}</p>
        </>
      )}

      {draftUser.occupation && (
        <>
          <h4>Occupation</h4>
          <p><strong>Company:</strong> {draftUser.occupation.company_name}</p>
          <p><strong>Designation:</strong> {draftUser.occupation.designation}</p>
          <p><strong>Annual Income:</strong> {draftUser.occupation.annual_income}</p>
        </>
      )}

      {draftUser.nominees?.length > 0 && (
        <>
          <h4>Nominees</h4>
          <ul>
            {draftUser.nominees.map(n => (
              <li key={n.id}>{n.name} ({n.relation}) - {n.phone}</li>
            ))}
          </ul>
        </>
      )}

      {draftUser.kids?.length > 0 && (
        <>
          <h4>Kids</h4>
          <ul>
            {draftUser.kids.map(k => (
              <li key={k.id}>{k.name} ({k.gender}) - {k.dob}</li>
            ))}
          </ul>
        </>
      )}

      {draftUser.documents?.length > 0 && (
        <>
          <h4>Documents</h4>
          <ul>
            {draftUser.documents.map(d => (
              <li key={d.id}>{d.doc_type}: {d.file_path}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DraftUserDetail;
