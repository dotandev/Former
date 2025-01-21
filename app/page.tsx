'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, formService } from "@/app/services/formService";

export default function Dashboard () {
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const fetchedForms = await formService.getForms();
        setForms(fetchedForms);
      } catch (error) {
        console.error("Failed to fetch forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleCreateForm = () => {
    router.push("/form-builder");
  };

  const handleViewResponses = (formId: string) => {
    router.push(`/form/${formId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-6 hover:bg-blue-600"
        onClick={handleCreateForm}
      >
        Create New Form
      </button>

      {loading ? (
        <p>Loading forms...</p>
      ) : forms.length === 0 ? (
        <p>No forms available. Start creating your first form!</p>
      ) : (
        <ul className="space-y-4">
          {forms.map((form) => (
            <li
              key={form.id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{form.title}</h2>
                <p className="text-gray-600">{form.description}</p>
              </div>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleViewResponses(form.id)}
              >
                View Responses
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

