import { DataType } from "./FormBuilder";

export interface LayoutType {
  item: DataType;
  handleValue: (
    id: string,
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  deleteEl: (id: string) => void;
  handleRequired: (id: string) => void;
  handleElType: (id: string, type: string) => void;
  duplicateElement: (elId: string, elType: string) => void;
  children: React.ReactNode;
}
