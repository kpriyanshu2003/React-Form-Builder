// src/components/FormBuilder/index.tsx

export interface DataType {
  id: string;
  value: string | null;
  type?: string;
  required?: boolean;
  options?: [{ id: string; value: string }];
  date?: Date | null;
  time?: Date | null;
}
