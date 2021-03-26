import { FormattedMessage } from 'react-intl';

import { fieldsData, formSchema } from './createPlaylistFormDialogData';
import { FormDialog } from '../../../../../components/FormDialog';

export const CreatePlaylistFormDialog: React.FC<CreatePlaylistFormDialogProps> = ({ isOpen, onClose, onOk }) => {
  return (
    <FormDialog
      isOpen={isOpen}
      title={<FormattedMessage id="common.newPlaylist" />}
      onClose={onClose}
      okButtonProps={{
        label: <FormattedMessage id="common.createPlaylist" />
      }}
      onSubmit={onOk}
      fields={fieldsData}
      schema={formSchema}
    />
  );
}

export interface PlaylistFormData {
  name: string;
}

export interface CreatePlaylistFormDialogProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOk: (data: PlaylistFormData) => void;
}
