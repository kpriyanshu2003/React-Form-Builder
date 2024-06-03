import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";
import Nestable from "react-nestable";

// Material UI
import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import {
  TextFieldInput,
  TextArea,
  NumberInput,
  RadioInput,
  DateInput,
  TimeInput,
} from "./elements";

import { formEl } from "./constants";
import Header from "./Header";
import { DataType } from "../../@types/FormBuilder";

const FormBuilder = () => {
  const [title, setTitle] = useState("Sample Title");
  const [description, setDescription] = useState("Sample Descrpition");
  const [data, setData] = useState<DataType[]>([]);
  const [formData, setFormData] = useState("text");

  const items = data;
  const initVal = formEl[0]?.value;

  // Add new element
  const addElement = () => {
    const data = {
      id: uuid(),
      value: null,
      type: formData,
      required: false,
    };
    setData((prevState: DataType[]) => [...prevState, data]);
    setFormData(initVal);
  };

  // Delete element
  const deleteEl = (id: string) =>
    setData((prevState) => prevState.filter((val) => val.id !== id));

  // Add element at specific pos and return arr
  const addAfter = (elArray: DataType[], index: number, newEl: DataType) => {
    return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
  };

  // Duplicate element
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

  // TODO : Add Type
  // Handle sorting of elements - I think not being used
  const handleOnChangeSort = ({ items }: { items: DataType[] }) =>
    setData(items);

  // Handle Input Values
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

  // Handle Required
  const handleRequired = (id: string) => {
    const newArr = data.map((el) => {
      if (el.id === id) return { ...el, required: !el.required };
      else return el;
    });
    setData(newArr);
  };

  // Handle Element Type
  const handleElType = (id: string, type: string) => {
    const newArr = data.map((el) => {
      if (el.id === id) return { ...el, type: type };
      else return el;
    });
    setData(newArr);
  };

  // TODO : Add Type
  // Handle Options
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

  // Handle Date
  const handleDate = (id: string, dateVal: Date | null) => {
    const newArr = data.map((el) => {
      if (el.id === id) return { ...el, date: dateVal };
      else return el;
    });
    setData(newArr as DataType[]);
  };

  // Handle Time
  const handleTime = (id: string, dateVal: Date | null) => {
    const newArr = data.map((el) => {
      if (el.id === id) return { ...el, time: dateVal };
      else return el;
    });
    setData(newArr);
  };

  // Change Option Values
  const handleOptionValues = (
    elId: string,
    optionId: string,
    optionVal: string
  ) => {
    const newArr = data.map((el) => {
      if (el.id === elId) {
        el?.options &&
          el?.options.map((opt) => {
            if (opt.id === optionId) {
              opt.value = optionVal;
            }
          });
        return el;
      } else return el;
    });
    setData(newArr);
  };

  // Delete Option - When Radio Input
  const deleteOption = (elId: string, optionId: string) => {
    const newArr = data.map((el) => {
      if (el.id === elId) {
        const newOptions =
          el?.options && el?.options.filter((opt) => opt.id !== optionId);
        return { ...el, options: newOptions || [] }; // Ensure newOptions is always an array
      } else return el;
    });
    setData(newArr as DataType[]);
  };

  // Render items
  const renderElements = ({ item }: { item: DataType }) => {
    switch (item.type) {
      case "text":
        return (
          <TextFieldInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "textarea":
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "number":
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "radio":
        return (
          <RadioInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      case "date":
        return (
          <DateInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleDate={handleDate}
            duplicateElement={duplicateElement}
          />
        );
      case "time":
        return (
          <TimeInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleTime={handleTime}
            duplicateElement={duplicateElement}
          />
        );
      default:
        return <Fragment></Fragment>;
    }
  };

  console.log(data);

  return (
    <Fragment>
      <Grid container spacing={1} direction="row" justifyContent="center">
        <Grid item md={6}>
          <Header
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
          <Nestable
            items={items}
            renderItem={renderElements}
            maxDepth={1}
            onChange={handleOnChangeSort}
          />
        </Grid>
        <Grid item md={1}>
          <Tooltip title="Add Element" aria-label="add-element">
            <IconButton
              aria-label="add-element"
              onClick={addElement}
              sx={{ position: "sticky", top: 30 }}
            >
              <AddCircleOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default FormBuilder;
