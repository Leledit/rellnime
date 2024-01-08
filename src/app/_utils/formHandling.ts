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
      error: onValidateError(targetValue, targetName),
    },
  });
};

export const handleChancheFieldFile = (
  e: ChangeEvent<HTMLInputElement>,
  setFormsFilds: any,
  formsFilds: any
) => {
  const targetName = e.target.name;

  if (e.target.files) {
    const targetValue = e.target.files[0];

    setFormsFilds({
      ...formsFilds,
      [targetName]: {
        value: targetValue,
        error: targetValue ? true : false,
      },
    });
  }
};

const onValidateError = (value: string, field: string) => {
  if (
    field === "password" ||
    field === "nextSeason" ||
    field === "previousSeason" ||
    field === "synopsis"
  ) {
    return value.length < 3 ? true : false;
  }

  if (field === "email") {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailRegex.test(value) ? true : false;
  }

  if (field === "watched" || field === "status") {
    return value.length === 0 ? true : false;
  }

  if (field === "qtdEpisodes" || field === "releaseYear" || field === "note") {
    if (parseInt(value) === 0 || parseInt(value) < 0) {
      return true;
    } else {
      return false;
    }
  }

  return true;
};

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

    resolve("");
  });
};
