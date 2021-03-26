import { useEffect, Ref } from 'react';
import { IonButton } from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Grid } from '@material-ui/core';
import { ObjectSchema } from 'joi';

import { Input } from '../Input';
import { FieldData } from '../../types';

export const Form: React.FC<FormProps<any>> = ({ onValidityChange, fields, schema, submitLabel, onSubmit, formRef }) => {
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: schema ? joiResolver(schema) : undefined,
    mode: 'onChange',
  });

  const { isDirty, isValid } = formState;
  const isFormValid = isDirty && isValid;

  useEffect(() => {
    onValidityChange?.(isFormValid);
  }, [isFormValid]);

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ label, ...props }) => (
        <Input
          {...props}
          key={props.name}
          label={<FormattedMessage id={label} />}
          inputRef={register}
          error={errors[props.name]?.type}
        />
      ))}

      <input type="submit" />

      {submitLabel && (
        <Grid container justify="flex-end" className="form-row">
          <IonButton disabled={!isFormValid} type="submit">
            {submitLabel}
          </IonButton>
        </Grid>
      )}
    </form>
  );
}

export interface FormProps<TFormData> {
  onSubmit: (formData: TFormData) => void;
  schema?: ObjectSchema;
  fields: FieldData[];
  submitLabel?: React.ReactChild;
  onValidityChange?: (isValid: boolean) => void;
  formRef?: Ref<HTMLFormElement>;
}
