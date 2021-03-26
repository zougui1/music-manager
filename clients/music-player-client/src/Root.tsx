import { IonApp } from '@ionic/react'
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import flatten from 'flat';

import { store } from './store';
import { App } from './App';
import translations from './translations';
import { ObjectOf } from './types';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import 'react-toastify/dist/ReactToastify.css';

/* Theme variables */
import './theme/variables.css';
import './theme/utils.css';
import './theme/layout.css';
import './theme/toastify.css';
import './theme/form.css';

const queryClient = new QueryClient();

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    }
  }
});

export const Root: React.FC = () => {
  const language = navigator.language.split('-')[0];
  const messages = flatten(translations[language] || translations.en) as ObjectOf<string>;

  return (
    <IonApp>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <IntlProvider
            messages={messages}
            locale={language}
            defaultLocale="en"
          >
            <QueryClientProvider client={queryClient}>
              <App language={language} />

              <ToastContainer
                position="bottom-right"
                newestOnTop={false}
                pauseOnFocusLoss
              />

              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </IntlProvider>
        </MuiThemeProvider>
      </Provider>
    </IonApp>
  );
}
