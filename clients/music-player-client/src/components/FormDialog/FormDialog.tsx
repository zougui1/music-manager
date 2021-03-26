import { useRef, useState } from 'react';

//import { CreatePlaylistForm } from './CreatePlaylistForm';
import { Dialog, DialogProps } from '../Dialog';
import { Form, FormProps } from '../Form';

export const FormDialog: React.FC<FormDialogProps> = ({ fields, onSubmit, schema, okButtonProps, ...dialogProps }) => {
  const formRef = useRef<HTMLFormElement>();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleDialogOk = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  }

  const handleValidityChange = (isFormValid: boolean) => {
    setIsFormValid(isFormValid);
  }

  return (
    <Dialog
      {...dialogProps}
      okButtonProps={{
        ...(okButtonProps ?? {}),
        disabled: okButtonProps?.disabled || !isFormValid,
      }}
      onOk={handleDialogOk}
    >
      <Form
        fields={fields}
        onSubmit={onSubmit}
        schema={schema}
        formRef={formRef as any}
        onValidityChange={handleValidityChange}
      />
    </Dialog>
  );
}

export interface PlaylistFormData {
  name: string;
}

export interface FormDialogProps extends DialogProps {
  onSubmit: FormProps<any>['onSubmit'];
  fields: FormProps<any>['fields'];
  schema?: FormProps<any>['schema'];
}
