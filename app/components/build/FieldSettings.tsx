'use client'


import React, { useState } from "react";
import { Field } from "@/app/components/build/FormBuilder";

type Props = {
  field: Field;
  updateField: (id: string, updatedField: Partial<Field>) => void;
};

export const FieldSettings: React.FC<Props> = ({ field, updateField }) => {
  const [label, setLabel] = useState(field.label);
  const [required, setRequired] = useState(field.required);

  const handleSave = () => {
    updateField(field.id, { label, required });
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Field Settings</h3>
      <div className="mb-4">
        <label className="block mb-2">Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={required}
            onChange={() => setRequired(!required)}
            className="mr-2"
          />
          Required
        </label>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

