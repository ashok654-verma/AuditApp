import React from 'react';
import { RoleProvider } from './src/hooks/context/RoleContext';
import Navigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const App = () => (
  <RoleProvider>
    <SafeAreaProvider>
    <Navigator />
    </SafeAreaProvider>
  </RoleProvider>
);

export default App;
