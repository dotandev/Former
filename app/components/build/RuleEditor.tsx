'use client'


import React, { useState } from "react";
import { Field } from "@/app/components/build/FormBuilder";

type Props = {
  field: Field;
  updateField: (id: string, updatedField: Partial<Field>) => void;
};

export const RuleEditor: React.FC<Props> = ({ field, updateField }) => {
  const [rule, setRule] = useState("");

  const addRule = () => {
    if (rule) {
      updateField(field.id, { rules: [...(field.rules || []), rule] });
      setRule("");
    }
  };

  const removeRule = (index: number) => {
    const updatedRules = field.rules?.filter((_, i) => i !== index);
    updateField(field.id, { rules: updatedRules });
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Rule Editor</h3>
      <div className="mb-4">
        <label className="block mb-2">Add Rule</label>
        <input
          type="text"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={addRule}
        >
          Add Rule
        </button>
      </div>
      <ul>
        {field.rules?.map((r, index) => (
          <li key={index} className="mb-2">
            <span>{r}</span>
            <button
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => removeRule(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

