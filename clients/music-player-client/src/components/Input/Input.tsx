import React from 'react';
import clsx from 'clsx';
import { TextField, TextFieldProps } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import './Input.css';

export const Input: React.FC<InputProps> = ({ className, validationValues, error, ...inputProps }) => {
  const errorValues = {
    ...(validationValues ?? {}),
    field: inputProps.label,
  };

  if (errorValues.fieldToMatch) {
    errorValues.fieldToMatch = <FormattedMessage id={errorValues.fieldToMatch} />;
  }

  return (
    <TextField
      autoComplete="off"
      {...inputProps}
      className={clsx('input', className)}
      error={!!error}
      helperText={error && <FormattedMessage id={`common.form.errors.${error}`} values={errorValues} />}
    />
  );
}

interface IInputProps {
  name: string;
  validationValues?: any;
  error?: string | undefined;
}

export type InputProps = IInputProps & TextFieldProps;
