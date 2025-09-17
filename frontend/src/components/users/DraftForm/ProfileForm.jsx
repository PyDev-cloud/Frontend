import React from "react";
import { useForm } from "react-hook-form";

const ProfileForm = ({ formData = {}, setFormData, editMode = true, onNext, onBack }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: formData,
  });

  // formData পরিবর্তন হলে reset
  React.useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const submit = (data) => {
    setFormData(data); // parent state update
    if (editMode && onNext) {
      onNext(data); // next step only in create mode
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input type="date" className="form-control" {...register("dob")} disabled={!editMode} />
      </div>
      <div className="mb-3">
        <label className="form-label">Gender</label>
        <select className="form-select" {...register("gender")} disabled={!editMode}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea className="form-control" {...register("address")} disabled={!editMode}></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Blood Group</label>
        <input className="form-control" {...register("blood_group")} disabled={!editMode} />
      </div>

      <div className="d-flex">
        {onBack && (
          <button type="button" className="btn btn-secondary me-2" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {editMode ? "Save" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
