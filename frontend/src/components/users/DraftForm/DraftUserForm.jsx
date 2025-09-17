import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const DraftUserForm = ({ formData = {}, setFormData, editMode = true, onNext }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: formData,
  });



  const onSubmit = (data) => {
    setFormData(data);
    if (onNext) onNext(data); // create stepper এ next call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" {...register("name")} disabled={!editMode} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input className="form-control" {...register("phone")} disabled={!editMode} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Alternative Phone</label>
        <input className="form-control" {...register("alternative_phone")} disabled={!editMode} />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" {...register("email")} disabled={!editMode} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Role</label>
        <select className="form-select" {...register("role")} disabled={!editMode} required>
          <option value="General User">General User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
        <button className="btn btn-primary" type="submit">Next</button>
      
    </form>
  );
};

export default DraftUserForm;
