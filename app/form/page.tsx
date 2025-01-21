'use client'


import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, formService } from '@/app/services/formService'

export default function FormSubmissionPage () {
  const router = useRouter();
  const { slug } = router.query;
  const [form, setForm] = useState<Form | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchForm = async () => {
      if (slug) {
        try {
          const fetchedForm = await formService.getFormById(slug as string);
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

  const handleSubmit = () => {
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
