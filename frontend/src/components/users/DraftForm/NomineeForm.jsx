import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const NomineeForm = ({ onNext, onBack }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      nominees: [{ name: "", relation: "", phone: "", address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nominees",
  });

  const submit = (data) => {
    onNext(data.nominees);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 mb-3">
          <h6>Nominee {index + 1}</h6>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input className="form-control" {...register(`nominees.${index}.name`)} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Relation</label>
            <input className="form-control" {...register(`nominees.${index}.relation`)} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Phone</label>
            <input className="form-control" {...register(`nominees.${index}.phone`)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Address</label>
            <input className="form-control" {...register(`nominees.${index}.address`)} />
          </div>
          <button type="button" className="btn btn-danger btn-sm mt-2" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn btn-secondary me-2" onClick={onBack}>Back</button>
      <button type="button" className="btn btn-info me-2" onClick={() => append({ name: "", relation: "", phone: "", address: "" })}>
        Add Nominee
      </butto
