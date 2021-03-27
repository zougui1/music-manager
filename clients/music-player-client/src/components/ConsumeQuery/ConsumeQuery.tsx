import { IonSpinner } from '@ionic/react';

import './ConsumeQuery.css';
import { QueryResult } from '../../hooks';

export const ConsumeQuery: React.FC<ConsumeQueryProps> = ({ query, children }) => {
  if (query.isLoading) {
    return (
      <div className="spinner-container">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  console.log(query)

  if (query.isError) {
    console.log(query.error.response?.data ?? query.error.message);

    return null;
  }

  return children;
}

export interface ConsumeQueryProps {
  query: QueryResult;
  children?: any;
}
