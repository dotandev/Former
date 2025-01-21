'use client'


import { useState } from "react";

type Field = {
  id: string;
  label: string;
  type: string; 
  required?: boolean;
  options?: string[]; 
};

export const useFormBuilder = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (newField: Field) => {
    setFields((prevFields) => [...prevFields, newField]);
  };

  const updateField = (id: string, updatedField: Partial<Field>) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const reorderFields = (startIndex: number, endIndex: number) => {
    const updatedFields = Array.from(fields);
    const [removed] = updatedFields.splice(startIndex, 1);
    updatedFields.splice(endIndex, 0, removed);
    setFields(updatedFields);
  };

  return {
    fields,
    addField,
    updateField,
    removeField,
    reorderFields,
  };
};
