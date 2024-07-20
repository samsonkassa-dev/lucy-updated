"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback, SetStateAction } from "react";
import { FInalRecommendation, MultiLangCourseData } from "@/types/type";

interface FormContextType {
  frequencyImmediately: string;
  setFrequencyImmediatelty: React.Dispatch<React.SetStateAction<string>>;
  finalRecommendation: FInalRecommendation[ ] | null;
  setFinalRecommendation: React.Dispatch<React.SetStateAction<FInalRecommendation[] | null>>;
  frequency: boolean;
  setFrequency: React.Dispatch<SetStateAction<boolean>>;
  studentName: string[];
  setStudentName: React.Dispatch<React.SetStateAction<string[]>>;
  parentId: number | null;
  setParentId: (id: number) => void;
  courseData: MultiLangCourseData | null;
  setCourseData: React.Dispatch<React.SetStateAction<MultiLangCourseData | null>>;
  nextPage: () => void;
  prevPage: () => void;
  page: number;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [parentId, setParentId] = useState<number | null>(null);
  const [courseData, setCourseData] = useState<MultiLangCourseData | null>(null);
  const [finalRecommendation, setFinalRecommendation] = useState<FInalRecommendation[] | null>(null);
  const [studentName, setStudentName] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [frequencyImmediately, setFrequencyImmediatelty] = useState<string | ''>('');

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return (
    <FormContext.Provider
      value={{
        frequencyImmediately,
        setFrequencyImmediatelty,
        finalRecommendation,
        setFinalRecommendation,
        frequency,
        setFrequency,
        studentName,
        setStudentName,
        parentId,
        setParentId,
        courseData,
        setCourseData,
        page,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
