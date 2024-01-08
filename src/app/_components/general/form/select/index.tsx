"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  useTheme,
} from "@mui/material";
import styles from "./index.module.scss";

interface props {
  label: string;
  name: string;
  value: string[];
  onChange: (e: any) => void;
  error: any;
  options: string[];
}

export default function FormSelect({
  label,
  name,
  onChange,
  value,
  error,
  options,
}: props) {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  return (
    <>
      <FormControl sx={{ width: "100%", marginBottom: "35px" }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={value}
          name={name}
          onChange={onChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          error={error}
          style={{color:'rgba(0, 0, 0, 0.6)'}}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(name, value, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
        {error ? (
          <p className={styles.msgErroInput}>Este campo é obrigatorio</p>
        ) : (
          <></>
        )}
      </FormControl>
    </>
  );
}
