'use client'

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Form, formService } from '@/app/services/formService';

export default function FormSubmissionPage() {
  const pathname = usePathname();
  const slug = pathname?.split('/').pop();
  const [form, setForm] = useState<Form | null>({
    id: "2",
    title: "Man",
    description: "VGjhkjhwldkvjhjsdlkhFKBDBASBJDF",
    fields: [
      {
        id: "2",
        label: "Man",
        type: "text",
        required: true,
        options: ['Should be a number'],
        placeholder: "Put results here.",
        defaultValue: true
      },
        {
          id: "2",
          label: "Man",
          type: "select",
          required: true,
          options: ['Should be a number', 'dfdgsbnh', 'fwregrhn', 'dsafwgerhnt'],
          placeholder: "Put results here.",
          defaultValue: true
        },
    ],
    createdAt: '2026',
    updatedAt: '2027'
  });
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchForm = async () => {
      if (slug) {
        try {
          const fetchedForm = await formService.getFormById(slug);
          setForm(fetchedForm);
        } catch (error) {
          console.error("Failed to fetch form:", error);
        }
      }
    };

    fetchForm();
  }, [slug]);

  const handleChange = (fieldId: string, value: string) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  if (!form) {
    return <p>Loading form...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{form.title}</h1>
      <p className="mb-6 text-gray-600">{form.description}</p>

      <form onSubmit={handleSubmit}>
        {form.fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block text-lg font-medium mb-2">{field.label}</label>
            <input
              type={field.type}
              className="w-full p-2 border rounded"
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
