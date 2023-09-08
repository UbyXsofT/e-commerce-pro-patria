import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { margin } from "@mui/system";
import React, { Dispatch, SetStateAction } from "react";

type PasswordInputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  name: string;
  label: string;
  id: string;
  fullWidth?: boolean;
  margin?: "dense" | "normal" | "none";
  error?: boolean;
};

const PasswordInput = ({ value, setValue, name, label, id, fullWidth, margin, error }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextField
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      name={name}
      label={label}
      id={id}
      margin={margin ? margin : "none"}
      fullWidth={fullWidth ? fullWidth : false}
      type={showPassword ? "text" : "password"}
      error={error ? error : false}
      onBlur={(e) => setValue(e.target.value.trim())}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="Toggle Password Visibility" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
