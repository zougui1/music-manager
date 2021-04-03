import { useEffect } from 'react';
import { isPlatform, getPlatforms } from '@ionic/react';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { MusicStatus } from 'types-pkg';

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
import { buildUrl } from './utils';
import { useQuery, useEvent } from './hooks';
import { updateConnectionStatus, useOnUserChange } from './features/client';
import { downloadStillOnGoing } from './features/downloading';
import { useToastContainer } from './useToastContainer';

const { PushNotifications } = Plugins;
const downloadingMusicsUrl = buildUrl('/api/musics', {
  status: [MusicStatus.TO_DOWNLOAD, MusicStatus.DOWNLOADING],
});

export const App: React.FC<AppProps> = ({ language }) => {
  const dispatch = useDispatch();
  const musics = useQuery<any[]>('downloading-musics', downloadingMusicsUrl, {
    enabled: false,
  });

  musics.remove()
  useEffect(() => {
    dispatch(initApp(language));
  }, []);

  useOnUserChange(() => {
    musics.refetch();
  }, [musics.refetch]);

  useEffect(() => {
    if (musics.data) {
      const downloadings = musics.data.filter(music => music.status === MusicStatus.DOWNLOADING);

      if (musics.data.length) {
        dispatch(downloadStillOnGoing({
          totalCount: musics.data.length,
          downloadingCount: downloadings.length,
        }));
      }
    }
  }, [musics.data]);

  useEvent(['online', 'offline'], () => {
    dispatch(updateConnectionStatus());
  });

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

  useToastContainer();

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
