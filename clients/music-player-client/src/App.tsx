import { useEffect } from 'react';
import { isPlatform, getPlatforms } from '@ionic/react';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

import { Route } from 'react-router-dom';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonIcon,
  IonLabel,
  IonTabButton,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, searchOutline, library, settingsOutline } from 'ionicons/icons';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

// Routes
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { LibraryPage } from './pages/LibraryPage';
import { SearchPage } from './pages/SearchPage';
import { SettingsPage } from './pages/SettingsPage';
import { PlaylistPage } from './pages/PlaylistPage';

import { ProtectedRoute } from './components/ProtectedRoute';
import { initApp } from './store';

const { PushNotifications } = Plugins;

export const App: React.FC<AppProps> = ({ language }) => {
  const dispatch = useDispatch();

  dispatch(initApp(language));

  useEffect(() => {
    if (!isPlatform('desktop')) {
      /*PushNotifications.requestPermission()
        .then(res => {
          if (res.granted) {
            console.log('can use push notifs');
            PushNotifications.register();
          } else {
            console.log('cannot use push notifs');
          }
        })*/
    }
  }, []);

  /*useEffect(() => {
    const notificationServer = 'http://localhost:3334';
    const url = new URL(env.MERCURE_URL);
    url.searchParams.append('topic', `${notificationServer}/progress`);

    const eventSource = new EventSource(url.toString());

    eventSource.onopen = () => console.log('eventSource open');
    eventSource.onerror = (err) => console.log('eventSource error:', err);
    eventSource.onmessage = (e) => console.log('progress:', JSON.parse(e.data));
  }, []);*/

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <ProtectedRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <ProtectedRoute exact path="/library" component={LibraryPage} />
          <ProtectedRoute exact path="/search" component={SearchPage} />
          <ProtectedRoute exact path="/settings" component={SettingsPage} />

          <ProtectedRoute exact path="/playlists/:id" component={PlaylistPage} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" selectedTab="library">
          <IonTabButton tab="home" href="/">
            <IonIcon icon={home} />
            <IonLabel>
              <FormattedMessage id="common.home" />
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/library">
            <IonIcon icon={library} />
            <IonLabel>
              <FormattedMessage id="common.library" />
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/search">
            <IonIcon icon={searchOutline} />
            <IonLabel>
              <FormattedMessage id="common.search" />
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsOutline} />
            <IonLabel>
              <FormattedMessage id="common.settings" />
            </IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}

export interface AppProps {
  language: string;
}
