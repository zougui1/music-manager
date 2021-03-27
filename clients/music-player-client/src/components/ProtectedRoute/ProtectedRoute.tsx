import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { State } from '../../store';

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const user = useSelector((state: State) => state.client.user);
  const accessToken = useSelector((state: State) => state.client.accessToken);

  return user && accessToken
    ? <Route {...props} />
    : <Redirect to="/login" />;
}
