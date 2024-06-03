// src/components/FormBuilder/Header.ts

export interface HeaderProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}
