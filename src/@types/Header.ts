// src/components/FormBuilder/Header.ts

import { HeaderType } from "./FormBuilder";

export interface HeaderProps {
  header: HeaderType;
  setHeader: React.Dispatch<React.SetStateAction<HeaderType>>;
}
