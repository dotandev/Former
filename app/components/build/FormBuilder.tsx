'use client'


import { useDragAndDrop } from "@/app/hooks/useDragAndDrop";
import { useFormBuilder } from "@/app/hooks/useFormBuilder";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


export type Field = {
    id: string;
    label: string;
    type: string; 
    required: boolean;
    rules?: string[]; 
    options?: string[]; 
  };

export const FormBuilder = () => {
  const { fields, addField, updateField, removeField, reorderFields } =
    useFormBuilder();

  const { onDragEnd } = useDragAndDrop(reorderFields);

  const handleAddField = () => {
    addField({ id: Date.now().toString(), label: "New Field", type: "text" });
  };

  return (
    <div>
      <button
        onClick={handleAddField}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Field
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="formFields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 mb-2 bg-gray-100 rounded shadow"
                    >
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          updateField(field.id, { label: e.target.value })
                        }
                        className="p-2 border rounded"
                      />
                      <button
                        onClick={() => removeField(field.id)}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
