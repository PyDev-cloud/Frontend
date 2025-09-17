import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const DocumentForm = ({ onNext, onBack }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      documents: [{ doc_type: "", file: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const submit = (data) => {
    // Convert file inputs to FormData if needed
    const formDataList = data.documents.map(doc => {
      const formData = new FormData();
      formData.append("doc_type", doc.doc_type);
      formData.append("file", doc.file[0]);
      return formData;
    });
    onNext(formDataList);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 mb-3">
          <h6>Document {index + 1}</h6>
          <div className="mb-2">
            <label className="form-label">Document Type</label>
            <input className="form-control" {...register(`documents.${index}.doc_type`)} required />
          </div>
          <div className="mb-2">
            <label className="form-label">File</label>
            <input type="file" className="form-control" {...register(`documents.${index}.file`)} required />
          </div>
          <button type="button" className="btn btn-danger btn-sm mt-2" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn btn-secondary me-2" onClick={onBack}>Back</button>
      <button type="button" className="btn btn-info me-2" onClick={() => append({ doc_type: "", file: null })}>
        Add Document
      </button>
      <button type="submit" className="btn btn-primary">Finalize</button>
    </form>
  );
};

export default DocumentForm;
