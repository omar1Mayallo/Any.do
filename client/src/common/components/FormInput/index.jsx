import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  TextField,
} from "@mui/material";
import React from "react";

const FormInput = ({ValidationError}) => {
  return (
    <TextField
      // variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      error={false}
      helperText={false ? "Email is not a valid email address" : null}
    />
  );
};

export default FormInput;
