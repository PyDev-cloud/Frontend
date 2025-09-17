import React from "react";
import { useForm } from "react-hook-form";

const OccupationForm = ({ onNext, onBack }) => {
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-3">
        <label className="form-label">Occupation</label>
        <input className="form-control" {...register("occupation")} />
      </div>
      <div className="mb-3">
        <label className="form-label">Company Name</label>
        <input className="form-control" {...register("company_name")} />
      </div>
      <div className="mb-3">
        <label className="form-label">Designation</label>
        <input className="form-control" {...register("designation")} />
      </div>
      <div className="mb-3">
        <label className="form-label">Annual Income</label>
        <input type="number" className="form-control" {...register("annual_income")} />
      </div>
      <button type="button" className="btn btn-secondary me-2" onClick={onBack}>Back</button>
      <button type="submit" className="btn btn-primary">Next</button>
    </form>
  );
};

export default OccupationForm;
