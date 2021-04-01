import { FormattedMessage } from 'react-intl';

import { LoadingToast } from '../../../../components/LoadingToast';

export const ServerProcessingToast: React.FC = () => {
  return (
    <LoadingToast
      label={<FormattedMessage id="common.serverProcessingRequest" />}
    />
  );
}
