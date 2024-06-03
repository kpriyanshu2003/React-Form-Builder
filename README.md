# React Form Builder

## Description

- This is a google form clone created with ReactJs.
- [docs](#docs-for-this-project)

## Installation

NOTE: Node.js version 16 required to run.

```bash
git clone {GIT_URL}
cd {PROJECTNAME}
yarn
yarn dev
```

## Features

- Add/Delete Elements
- Duplicate ELements
- Set input required
- Drag elements to reorder
- Multiple element types
  - TextInput
  - TextArea
  - RadioInput
  - NumberInput
  - DateInput
  - TimeInput

# Docs for this project

This is a close on [Google Forms](https://docs.google.com/forms/) project. It is a simple project that allows you to create forms.

## How to use

This docs lists how the project is made up.

### Folder Structure

- `src/`: Contains the source code for the project.
- `src/components/`: Contains the components for the project.
  <br/> <br/>
- `src/components/FormBuilder`: Contains the form builder component.
- `src/components/FormBuilder/index.tsx`: Form builder file, that manages everything
- `src/components/FormBuilder/Header.tsx`: The initial UI which is rendered when we load up the page.
- `src/components/FormBuilder/constants.ts`: JSON for all the types of form fields.
  <br/> <br/>
- `src/components/FormBuilder/elements/`: Contains the form elements.
- `src/components/FormBuilder/elements/index.tsx`: Defines all the form elements exports
  <br/> <br/>
- `src/components/FormBuilder/elements/TextField.tsx`: Text field component.
- `src/components/FormBuilder/elements/TextArea.tsx`: Text area component.
- `src/components/FormBuilder/elements/NumberInput.tsx`: Number component.
- `src/components/FormBuilder/elements/Checkbox.tsx`: Checkbox component.
- `src/components/FormBuilder/elements/RadioInput.tsx`: Radio component.
- `src/components/FormBuilder/elements/DateInput.tsx`: Date component.
- `src/components/FormBuilder/elements/TimeInput.tsx`: Time component.
  <br/> <br/>
- `src/components/FormBuilder/elements/layout/index.tsx`: Have no idea what this does. <!-- It is simply defined in the project. -->

### File Explanation

### `src/components/FormBuilder/index.tsx`

This is the main file that loads up the entire form, and provides the UI for the form builder.

1. Add an Element

```typescript
const addElement = () => {
  const data = {
    id: uuid(),
    value: null,
    type: formEl[0].value,
    required: false,
  };
  setData((prevState: DataType[]) => [...prevState, data]);
};
```

Function is called when, a new block needs to be added to the form. It creates a new object with default values.

2. Delete element

```typescript
const deleteEl = (id: string) =>
  setData((prevState) => prevState.filter((val) => val.id !== id));
```

Function is called when, a block needs to be deleted. In which case, it filters out the block with the given id.

3. Add element at specific position and return array

```typescript
const addAfter = (elArray: DataType[], index: number, newEl: DataType) => [
  ...elArray.slice(0, index + 1),
  newEl,
  ...elArray.slice(index + 1),
];
```

Function is called when, a new block needs to be added at a specific position.\
It slices the array and adds the new block at the given index.\

How it works ? \
`elArray.slice(0, index + 1)` - Slices the array from 0 to the given index.\
`newEl` - Adds the new block.\
`elArray.slice(index + 1)` - Slices the array from the given index to the end.

4. Duplicate element

```typescript
const duplicateElement = (elId: string, elType: string) => {
  const elIdx = data.findIndex((el) => el.id === elId);
  const newEl = {
    id: uuid(),
    value: null,
    type: elType,
    required: false,
  };
  const newArr = addAfter(data, elIdx, newEl);
  setData(newArr);
};
```

Function is called when, a block needs to be duplicated. In which case it copies the attributes from block and, creates a new just after it.

5. Handle sorting of elements - I think not being used

```typescript
const handleOnChange = ({ items }: { items: DataType[] }) => setData(items);
```

Function is called using an onChange listened, and returns the original array.

6. Handle Input Values

```typescript
const handleValue = (
  id: string,
  e:
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
) => {
  const newArr = data.map((el) => {
    if (el.id === id) return { ...el, value: e.target.value };
    else return el;
  });
  setData(newArr);
};
```

Function is used to update data in the form, which is called when the input value is changed.

It matches, the element id with the given id, and updates the value.

7. Handle Required

```typescript
const handleRequired = (id: string) => {
  const newArr = data.map((el) => {
    if (el.id === id) return { ...el, required: !el.required };
    else return el;
  });
  setData(newArr);
};
```

Function is used to update data in the form, which is called when the required button is toggled.

8. Handle Element Type

```typescript
const handleElType = (id: string, type: string) => {
  const newArr = data.map((el) => {
    if (el.id === id) return { ...el, type: type };
    else return el;
  });
  setData(newArr);
};
```

Function is used to update data in the form, which is called when the element type is changed.

9. Handle Options

```typescript
const addOption = (id: string, newOption: DataType) => {
  const newArr = data.map((el) => {
    if (el.id === id) {
      const objVal = "options" in el ? el?.options : [];
      const options = Array.isArray(objVal) ? objVal : [];
      return { ...el, options: [...options, newOption] };
    } else return el;
  });
  setData(newArr as DataType[]);
};
```

Function is used to update data in the form, which is called when a new option is added. ( Radio Inputs )

Function Explanation :\

- Map function on all the data:\
- Check if element id === current id
  - If yes, then check if options exist in the element
    - If yes then, return the options
    - If no, then return an empty array
  - If yes, then check if options is an array
    - If yes, then return the options array
    - If no, then return an empty array
  - Return the element with the new options array
- If no, then return the element

10. Handle Date

```typescript
const handleDate = (id: string, dateVal: Date | null) => {
  const newArr = data.map((el) => {
    if (el.id === id) return { ...el, date: dateVal };
    else return el;
  });
  setData(newArr as DataType[]);
};
```

Function is used to update data in the form, which is called when the date is changed.

11. Handle Time

```typescript
const handleTime = (id: string, dateVal: Date | null) => {
  const newArr = data.map((el) => {
    if (el.id === id) return { ...el, time: dateVal };
    else return el;
  });
  setData(newArr);
};
```

Function is used to update data in the form, which is called when the time is changed.

12. Change Option Values

```typescript
const handleOptionValues = (
  elId: string,
  optionId: string,
  optionVal: string
) => {
  const newArr = data.map((el) => {
    if (el.id === elId) {
      el?.options &&
        el?.options.map((opt) => {
          if (opt.id === optionId) opt.value = optionVal;
        });
      return el;
    } else return el;
  });
  setData(newArr);
};
```

Function Explanantion : \

- Map function on all the data:\
  - If element id === current id
    - If yes, then check if options exist in the element
    - And, then map function on all the options
      - If option id === current option id
        - If yes, then update the value
    - Return the element
  - If no, then return the element

13. Delete Option - When Radio Input

```typescript
const deleteOption = (elId: string, optionId: string) => {
  const newArr = data.map((el) => {
    if (el.id === elId) {
      const newOptions =
        el?.options && el?.options.filter((opt) => opt.id !== optionId);
      return { ...el, options: newOptions || [] };
    } else return el;
  });
  setData(newArr as DataType[]);
};
```

Function Explanation : \

- Map funciton on all data
  - If element id === current id
    - If yes, then filter out the option with the given id
    - Return the element with the new options array
  - If no, then return the element

### `src/components/FormBuilder/elements/*.tsx`

Every function in the irrespective of its type accepts the following props:

```typescript
export interface InputTypes {
  item: DataType;
  handleValue: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
```

`handleValue` in the interface `InputTypes` is having that kind of type, because few places in the project, it is used for input fields and few places for text area.\

### `src/components/FormBuilder/elements/layout/index.tsx`

This is the sample layout file, required for creating a new input type.\
Use this when you want to create a new input type.
