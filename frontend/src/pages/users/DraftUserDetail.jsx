import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  getDraftUser, 
  updateDraftUser,
  addDraftProfile,
  addDraftOccupation
} from "../../api/users";

import DraftUserForm from "../../components/users/DraftForm/DraftUserForm";
import ProfileForm from "../../components/users/DraftForm/ProfileForm";
import OccupationForm from "../../components/users/DraftForm/OccupationForm";

const DraftUserEditStepper = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const token = user?.token;

  const [draftUser, setDraftUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  // individual form edit mode
  const [editMode, setEditMode] = useState({
    personal: false,
    profile: false,
    occupation: false
  });

  // form data
  const [personalData, setPersonalData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [occupationData, setOccupationData] = useState({});

  // Fetch draft user
  const fetchDraftUser = async () => {
    setLoading(true);
    try {
      const res = await getDraftUser(id, token);
      setDraftUser(res.data);
      setPersonalData(res.data);
      setProfileData(res.data.profile || {});
      setOccupationData(res.data.occupation || {});
    } catch (err) {
      console.error(err);
      alert("Failed to fetch draft user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && token) fetchDraftUser();
  }, [id, token]);

  // Handlers for saving each form
  const handleSavePersonal = async () => {
    try {
      await updateDraftUser(id, personalData, token);
      setDraftUser(prev => ({ ...prev, ...personalData }));
      setEditMode(prev => ({ ...prev, personal: false }));
      alert("Personal info updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update personal info");
    }
  };

  const handleSaveProfile = async () => {
    try {
      await addDraftProfile(id, profileData, token);
      setDraftUser(prev => ({ ...prev, profile: profileData }));
      setEditMode(prev => ({ ...prev, profile: false }));
      alert("Profile info updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile info");
    }
  };

  const handleSaveOccupation = async () => {
    try {
      await addDraftOccupation(id, occupationData, token);
      setDraftUser(prev => ({ ...prev, occupation: occupationData }));
      setEditMode(prev => ({ ...prev, occupation: false }));
      alert("Occupation info updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update occupation info");
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (loading) return <p>Loading...</p>;
  if (!draftUser) return <p>No user found</p>;

  return (
    <div className="card p-3">
      <h4>Draft User Edit (Stepper)</h4>
      <div>Step {step}</div>

      {step === 1 && (
        <div>
          <DraftUserForm
            formData={personalData}
            setFormData={setPersonalData}
            editMode={editMode.personal}
          />
          {editMode.personal ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSavePersonal}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditMode(prev => ({ ...prev, personal: false }))}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-warning" onClick={() => setEditMode(prev => ({ ...prev, personal: true }))}>Edit</button>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <ProfileForm
            formData={profileData}
            setFormData={setProfileData}
            editMode={editMode.profile}
          />
          {editMode.profile ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSaveProfile}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditMode(prev => ({ ...prev, profile: false }))}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-warning" onClick={() => setEditMode(prev => ({ ...prev, profile: true }))}>Edit</button>
          )}
        </div>
      )}

      {step === 3 && (
        <div>
          <OccupationForm
            formData={occupationData}
            setFormData={setOccupationData}
            editMode={editMode.occupation}
          />
          {editMode.occupation ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSaveOccupation}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditMode(prev => ({ ...prev, occupation: false }))}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-warning" onClick={() => setEditMode(prev => ({ ...prev, occupation: true }))}>Edit</button>
          )}
        </div>
      )}

      <div className="mt-3">
        {step > 1 && <button className="btn btn-secondary me-2" onClick={prevStep}>Back</button>}
        {step < 3 && <button className="btn btn-primary" onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};

export default DraftUserEditStepper;
