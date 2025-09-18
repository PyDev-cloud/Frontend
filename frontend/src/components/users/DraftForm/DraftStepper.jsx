import React, { useState } from "react";
import DraftUserForm from "./DraftUserForm";
import { useAuth } from "../../../context/AuthContext";

const DraftStepper = () => {
  const { user } = useAuth();
  const token = user?.token;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = (data) => {
    if (data) {
      setFormData({ ...formData, ...data });
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="card shadow p-4">
      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${step === 1 ? "active" : ""}`}
            onClick={() => setStep(1)}
          >
            Personal Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${step === 2 ? "active" : ""}`}
            onClick={() => setStep(2)}
          >
            Occupation Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${step === 3 ? "active" : ""}`}
            onClick={() => setStep(3)}
          >
            Nominee Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${step === 4 ? "active" : ""}`}
            onClick={() => setStep(4)}
          >
            Kids Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${step === 5 ? "active" : ""}`}
            onClick={() => setStep(5)}
          >
            Upload Doc
          </button>
        </li>
      </ul>

      {/* Step Contents */}
      <div className="tab-content">
        {step === 1 && (
          <DraftUserForm
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <div>
            <h5 className="mb-3">Occupation Info</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Company</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Designation</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h5 className="mb-3">Nominee Info</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nominee Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Relation</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h5 className="mb-3">Kids Info</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Kid Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h5 className="mb-3">Upload Documents</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">NID Front</label>
                <input type="file" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">NID Back</label>
                <input type="file" className="form-control" />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button className="btn btn-success">
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftStepper;
