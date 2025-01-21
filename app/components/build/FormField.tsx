'use client'


import React from "react";
import { Field } from "@/app/components/build/FormBuilder";

type Props = {
  field: Field;
  onClick: () => void;
  onDelete: (id: string) => void;
};

export const FormField: React.FC<Props> = ({ field, onClick, onDelete }) => {
  return (
    <div
      className="p-4 mb-2 bg-gray-100 rounded shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <span>{field.label} ({field.type})</span>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(field.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

