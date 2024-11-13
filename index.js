/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { UserProvider } from './src/components/context';  // Import your UserProvider

// Wrap the App component with UserProvider to provide the user context throughout the app
AppRegistry.registerComponent(appName, () => () => (
  <UserProvider>  {/* Wrap your app with the UserProvider */}
    <App />
  </UserProvider>
));
