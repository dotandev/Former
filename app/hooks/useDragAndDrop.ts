'use client'

import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";

type ReorderCallback = (startIndex: number, endIndex: number) => void;

export const useDragAndDrop = (onReorder: ReorderCallback) => {

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) return; 

      if (source.index !== destination.index) {
        onReorder(source.index, destination.index);
      }
    },
    [onReorder]
  );

  return {
    onDragEnd,
  };
};
