'use client'

import React from "react";
import { Field } from "@/app/components/build/FormBuilder";

type Props = {
  fields: Field[];
  formTitle: string;
  formDescription: string;
};

export const FormPreview: React.FC<Props> = ({ fields, formTitle, formDescription }) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{formTitle || "Untitled Form"}</h1>
        {formDescription && (
          <p className="text-gray-600 mt-2">{formDescription}</p>
        )}
      </div>


      <form className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center text-gray-500">No fields added yet.</div>
        ) : (
          fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block font-medium text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderFieldInput(field)}
            </div>
          ))
        )}
      </form>


      <div className="mt-8 text-center">
        <img
          src="https://via.placeholder.com/600x300"
          alt="Form Preview Placeholder"
          className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

const renderFieldInput = (field: Field) => {
  switch (field.type) {
    case "text":
      return (
        <input
          type="text"
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      );
    case "email":
      return (
        <input
          type="email"
          placeholder={`Enter your ${field.label.toLowerCase()}`}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      );
    case "number":
      return (
        <input
          type="number"
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      );
    case "select":
      return (
        <select className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300">
          {field.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "textarea":
      return (
        <textarea
          rows={4}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      );
    default:
      return (
        <input
          type="text"
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      );
  }
};
