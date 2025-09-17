import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const KidForm = ({ onNext, onBack }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      kids: [{ name: "", dob: "", gender: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "kids",
  });

  const submit = (data) => {
    onNext(data.kids);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 mb-3">
          <h6>Kid {index + 1}</h6>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input className="form-control" {...register(`kids.${index}.name`)} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" {...register(`kids.${index}.dob`)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Gender</label>
            <select className="form-select" {...register(`kids.${index}.gender`)}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button type="button" className="btn btn-danger btn-sm mt-2" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn btn-secondary me-2" onClick={onBack}>Back</button>
      <button type="button" className="btn btn-info me-2" onClick={() => append({ name: "", dob: "", gender: "" })}>
        Add Kid
      </button>
      <button type="submit" className="btn btn-primary">Next</button>
    </form>
  );
};

export default KidForm;
