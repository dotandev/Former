'use client'

import React, { useState } from "react";
import { FormField, formService } from "@/app/services/formService";

export default function FormBuilderPage () {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = () => {
    setFields([
      ...fields,
      { id: `${Date.now()}`, label: "New Field", type: "text", required: false },
    ]);
  };

  const handleSaveForm = async () => {
    try {
      const newForm = {
        title: formTitle,
        description: formDescription,
        fields,
      };
      await formService.createForm(newForm);
      window.open("/forms", "_self");
    } catch (error) {
      console.error("Failed to save form:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Form Builder</h1>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">Form Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Fields</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
          onClick={addField}
        >
          Add Field
        </button>
        <ul className="space-y-4">
          {fields.map((field, index) => (
            <li key={field.id} className="p-4 border rounded">
              <span>{index + 1}. {field.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleSaveForm}
      >
        Save Form
      </button>
    </div>
  );
};

