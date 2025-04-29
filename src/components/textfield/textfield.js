import { TextField, MenuItem, InputAdornment} from "../../MaterialComponents";
import React, { useState } from "react";
import "./textfield.css"

const FormTextField = ({
  label,
  value,
  onChange = () => { },
  variant = "outlined",
  margin,
  type,
  disabled,
  onKeyDown,
  id,
  errorMessage = "",
  fullWidth = true,
  helperText,
  startIcon = null,
  endIcon = null,
  required = false,
  validateEmail = false,
  validateAadhaar = false,
  validatePAN = false,
  validateNumber = false,
  validateOnChange = false,
  validatePassword = false,
  select = false,
  options = [],

  
  ...props
}) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(helperText || "");
  const [isTouched, setIsTouched] = useState(false);

  const validateField = (value) => {
    let isValid = true;
    let validationMessage = '';

    if (required && !value.trim()) {
      isValid = false;
      validationMessage = `${label || "This Field"} is required`;
    } else if (validateEmail && value.trim() && !/^\S+@\S+\.\S+$/.test(value)) {
      isValid = false;
      validationMessage = "Enter a valid email address.";
    } else if (validateAadhaar && value.trim() && !/^\d{12}$/.test(value)) {
      isValid = false;
      validationMessage = "Enter a valid Aadhaar number (12 digits).";
    } else if (validatePAN && value.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {
      isValid = false;
      validationMessage = "Enter a valid PAN number (e.g., ABCDE1234F).";
    }else if(validateNumber && value.trim() && !/^(0|91)?[789]\d{9}$/.test(value)){
      isValid = false;
      validationMessage = "Enter a valid Mobile number (e.g., 9547858574)."; 
    }
    else if (validatePassword && value.trim() && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value)){
      isValid = false;
      validationMessage = "Password must contain at least 8 characters, including UPPER/lowercase and numbers.";
    }

    setError(!isValid);
    setErrorText(validationMessage);

    return isValid;
  };

  const handleBlur = () => {
    setIsTouched(true);
    validateField(value);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
      if (type === "date" || type === "time") {
      onChange(newValue); 
    } else {
      onChange(newValue);
      if (validateOnChange && isTouched) {
        validateField(newValue);
      }
    }
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown = {onKeyDown}
      variant={variant}
      margin="normal"
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      autoComplete="off"
      error={error && isTouched}
      helperText={isTouched && error ? errorText : helperText}
      select={select}
      slotProps={{
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : null,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : null,

        }
      }}
      {...props}
    >
      {select &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default FormTextField;