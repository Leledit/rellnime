import { ChangeEvent } from "react";

export const handleChancheField = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormsFilds: any,
  formsFilds: any
) => {
  const targetName = e.target.name;
  const targetValue = e.target.value;

  setFormsFilds({
    ...formsFilds,
    [targetName]: {
      value: targetValue,
      error: onValidateError(targetValue,targetName),
    },
  });
};

const onValidateError = (value: string, field: string) =>{

  if(field === 'password'){
    return value.length < 3 ? true : false
  }

  if(field === 'email'){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailRegex.test(value) ? true : false
  }

  return true
}

export const onValidateFieldsEmpty = (setFormsFilds: any) => {
  return new Promise((resolve, reject) => {
    setFormsFilds((prevValues: any) => {
      const updatedValues = { ...prevValues };
  
      for (const key in updatedValues) {
        if (
          updatedValues.hasOwnProperty(key) &&
          updatedValues[key as keyof any].value === ""
        ) {
          updatedValues[key as keyof any].error = true;
        } else {
          updatedValues[key as keyof any].error = false;
        }
      }
  
      return updatedValues;
    });

    resolve("")
  })  
};
