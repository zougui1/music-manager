import { FormattedMessage } from 'react-intl';

import { fieldsData, formSchema } from './addSongFormDialogData';
import { FormDialog } from '../../../components/FormDialog';

export const AddSongFormDialog: React.FC<AddSongFormDialogProps> = ({ isOpen, onClose, onOk }) => {

  return (
    <FormDialog
      isOpen={isOpen}
      title={<FormattedMessage id="common.newSong" />}
      onClose={onClose}
      okButtonProps={{
        label: <FormattedMessage id="common.addSong" />
      }}
      onSubmit={onOk}
      fields={fieldsData}
      schema={formSchema}
    />
  );
}

export interface AddSongFormData {
  link: string;
}

export interface AddSongFormDialogProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOk: (data: AddSongFormData) => void;
}
