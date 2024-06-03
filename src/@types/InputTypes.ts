import { DataType } from "./FormBuilder";
export interface InputTypes {
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
}
export interface ExtendDateInput {
  handleDate: (id: string, dateVal: Date | null) => void;
}

export interface ExtendRadioInput {
  addOption: (id: string, newOption: DataType) => void;
  handleOptionValues: (
    elId: string,
    optionId: string,
    optionVal: string
  ) => void;
  deleteOption: (elId: string, elType: string) => void;
}

export interface ExtendTimeInput {
  handleTime: (id: string, dateVal: Date | null) => void;
}
