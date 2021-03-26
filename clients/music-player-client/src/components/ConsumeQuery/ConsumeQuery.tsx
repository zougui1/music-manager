import { IonSpinner } from '@ionic/react';

import './ConsumeQuery.css';

export const ConsumeQuery: React.FC<ConsumeQueryProps> = ({ query, children }) => {
  if (query.isLoading) {
    return (
      <div className="spinner-container">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (query.isError) {
    try {
      console.log(JSON.parse(query.error.message));
    } catch (error) {
      console.log(query.error.message);
    }

    return null;
  }

  return children;
}

export interface IQuery {
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export interface ConsumeQueryProps {
  query: IQuery;
  children?: any;
}
