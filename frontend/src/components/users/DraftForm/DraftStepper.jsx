import React, { useState } from "react";
import DraftUserForm from "./DraftUserForm";
import ProfileForm from "./ProfileForm";
import OccupationForm from "./OccupationForm";
import { useAuth } from "../../../context/AuthContext";
import {
  createDraftUser,
  addDraftProfile,
  addDraftOccupation,
  finalizeDraftUser,
} from "../../../api/users";

const DraftStepper = () => {
  const { user } = useAuth();
  const token = user?.token;

  const [step, setStep] = useState(1);
  const [draftToken, setDraftToken] = useState(null);
  const [userData, setUserData] = useState({});

  const nextStep = async (data) => {
    if (!token) {
      console.error("Token not found. Please login.");
      return;
    }

    try {
      if (step === 1) {
        // Create draft user
        const res = await createDraftUser(data, token);
        setDraftToken(res.data.token); // API থেকে tokenParam
        setUserData(data);
        setStep(step + 1);
      } else if (step === 2) {
        // Add profile
        await addDraftProfile(draftToken, data, token);
        setStep(step + 1);
      } else if (step === 3) {
        // Add occupation
        await addDraftOccupation(draftToken, data, token);
        setStep(step + 1);
      } else if (step === 4) {
        // Finalize draft user
        await finalizeDraftUser(draftToken, token);
        alert("Draft user created successfully!");
        setStep(1); // Step reset
        setDraftToken(null);
        setUserData({});
      }
    } catch (err) {
      console.error("Error in step:", step, err);
      alert(err.response?.data?.detail || "Something went wrong");
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="card p-3">
      <h4>Step {step}</h4>

      {step === 1 && <DraftUserForm onNext={nextStep} />}
      {step === 2 && <ProfileForm onNext={nextStep} onBack={prevStep} />}
      {step === 3 && <OccupationForm onNext={nextStep} onBack={prevStep} />}
      {/* Step 4: could be Nominee/Kid/Document forms if needed */}
    </div>
  );
};

export default DraftStepper;
